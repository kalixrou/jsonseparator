// compile-systems.js
// Compilator: combină toate systems/*.json într-un singur en.json

const fs = require("fs");
const path = require("path");

const SYSTEMS_DIR = path.join(__dirname, "systems");
const OUTPUT = path.join(__dirname, "en.json");

function readJSON(filePath) {
    try {
        return JSON.parse(fs.readFileSync(filePath, "utf8"));
    } catch (e) {
        console.error("Eroare JSON:", filePath, e.message);
        return {};
    }
}

function main() {
    const files = fs.readdirSync(SYSTEMS_DIR).filter(f => f.endsWith(".json"));

    const combined = {};

    files.forEach(file => {
        const full = path.join(SYSTEMS_DIR, file);
        const data = readJSON(full);

        Object.keys(data).forEach(key => {
            combined[key] = data[key];
        });
    });

    // sortăm cheile
    const sorted = {};
    Object.keys(combined).sort().forEach(k => sorted[k] = combined[k]);

    fs.writeFileSync(OUTPUT, JSON.stringify(sorted, null, 4), "utf8");
    console.log("✔ Compilare finală completă → en.json");
}

main();
