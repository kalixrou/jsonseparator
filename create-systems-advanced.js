// create-systems-simple.js
// Grupare EXCLUSIV pe primul segment (TOT ce începe cu "vote." → vote.json)
// Compatibil 100% Node v12.22.12

const fs = require("fs");
const path = require("path");

const INPUT_FILE = path.join(__dirname, "en.json");
const OUTPUT_DIR = path.join(__dirname, "systems");
const DUPLICATE_LOG = path.join(__dirname, "duplicates.log");

// asigură folder
function ensureDir(dir) {
    if (!fs.existsSync(dir)) {
        try {
            fs.mkdirSync(dir);
        } catch (err) {
            console.error("Eroare mkdir:", err);
        }
    }
}

function getMainSegment(key) {
    return key.split(".")[0];  // TOT înainte de primul punct
}

function main() {
    console.log("[i] Citire en.json...");

    if (!fs.existsSync(INPUT_FILE)) {
        console.error("[E] en.json lipsă!");
        return;
    }

    let raw = fs.readFileSync(INPUT_FILE, "utf8");
    let data = {};

    try {
        data = JSON.parse(raw);
    } catch (e) {
        console.error("[E] JSON invalid:", e.message);
        return;
    }

    ensureDir(OUTPUT_DIR);

    const groups = {};
    const seen = {};
    const duplicates = [];

    Object.keys(data).forEach(function(key) {
        const value = data[key];
        const segment = getMainSegment(key);

        if (!groups[segment]) {
            groups[segment] = {};
        }

        if (seen[key]) {
            duplicates.push({
                key: key,
                first: seen[key],
                second: segment,
                value: value
            });
        } else {
            seen[key] = segment;
        }

        groups[segment][key] = value;
    });

    console.log("[i] Scriere fișiere...");

    Object.keys(groups).forEach(function(segment) {
        const out = path.join(OUTPUT_DIR, segment + ".json");

        const sortedKeys = Object.keys(groups[segment]).sort();
        const sortedObj = {};

        sortedKeys.forEach(function(k) {
            sortedObj[k] = groups[segment][k];
        });

        fs.writeFileSync(out, JSON.stringify(sortedObj, null, 4), "utf8");
        console.log(" ✔ " + segment + ".json (" + sortedKeys.length + " linii)");
    });

    if (duplicates.length > 0) {
        let text = "=== DUPLICATE DETECTATE ===\n\n";
        duplicates.forEach(function(d) {
            text += `Cheie: ${d.key}\nPrima apariție în: ${d.first}\nA doua în: ${d.second}\nValoare: ${d.value}\n\n`;
        });
        fs.writeFileSync(DUPLICATE_LOG, text, "utf8");
        console.log("\n[WARN] Duplicări detectate → duplicates.log");
    } else {
        console.log("\n[OK] Fără duplicări.");
    }

    console.log("\n[FINAL] Proces complet.");
}

main();
