// validate-systems.js
// Compatibil Node 12 — verifică:
// 1) chei lipsă în systems/*
// 2) duplicări între sisteme
// 3) adaugă automat cheile lipsă în fișierele corecte

const fs = require("fs");
const path = require("path");

const SYSTEMS_DIR = path.join(__dirname, "systems");
const LOG_FILE = path.join(__dirname, "validator.log");

function getSegment(key) {
    return key.split(".")[0];
}

function readJSON(filePath) {
    try {
        return JSON.parse(fs.readFileSync(filePath, "utf8"));
    } catch (e) {
        console.error("Eroare JSON:", filePath, e.message);
        return {};
    }
}

function writeJSON(filePath, obj) {
    fs.writeFileSync(filePath, JSON.stringify(obj, null, 4), "utf8");
}

function main() {
    let log = "=== VALIDATOR REPORT ===\n\n";

    const files = fs.readdirSync(SYSTEMS_DIR).filter(f => f.endsWith(".json"));
    const systemData = {};
    const allKeys = {};

    // 1) Citire sisteme
    files.forEach(file => {
        const seg = file.replace(".json", "");
        const full = path.join(SYSTEMS_DIR, file);
        const data = readJSON(full);

        systemData[seg] = data;

        Object.keys(data).forEach(key => {
            if (!allKeys[key]) allKeys[key] = [];
            allKeys[key].push(seg);
        });
    });

    // 2) Detectare duplicări
    let duplicates = [];

    Object.keys(allKeys).forEach(key => {
        if (allKeys[key].length > 1) {
            duplicates.push({
                key: key,
                files: allKeys[key]
            });
        }
    });

    if (duplicates.length > 0) {
        log += "DUPLICATE KEYS:\n";
        duplicates.forEach(d => {
            log += ` - ${d.key} → apare în: ${d.files.join(", ")}\n`;
        });
        log += "\n";
    } else {
        log += "Nu există duplicări.\n\n";
    }

    // 3) Reconstituie complet EN din systems
    const master = {};
    Object.keys(systemData).forEach(seg => {
        const obj = systemData[seg];
        Object.keys(obj).forEach(k => {
            master[k] = obj[k];
        });
    });

    // 4) Verifică dacă există chei care lipsesc din sistemul corect
    Object.keys(master).forEach(key => {
        const correctSeg = getSegment(key);
        const fileName = correctSeg + ".json";

        if (!files.includes(fileName)) {
            // creăm fișier
            systemData[correctSeg] = {};
        }

        if (!systemData[correctSeg][key]) {
            systemData[correctSeg][key] = master[key];
            log += `Adăugat: ${key} → ${correctSeg}.json\n`;
        }
    });

    // 5) Scrie tot înapoi și sortează
    Object.keys(systemData).forEach(seg => {
        const out = path.join(SYSTEMS_DIR, seg + ".json");
        const sortedKeys = Object.keys(systemData[seg]).sort();
        const sortedObj = {};

        sortedKeys.forEach(k => sortedObj[k] = systemData[seg][k]);

        writeJSON(out, sortedObj);
    });

    fs.writeFileSync(LOG_FILE, log, "utf8");
    console.log("✔ Validator complet. Vezi validator.log");
}

main();
