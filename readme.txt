# 🌍 RAGE:MP JSON Translation Manager

![Node Version](https://img.shields.io/badge/node-v12.22.12-green?style=for-the-badge&logo=node.js)
![Platform](https://img.shields.io/badge/platform-RAGE:MP-orange?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)

[🇬🇧 English Version](#english-version) | [🇷🇴 Versiunea în Română](#romanian-version)

---

<a name="english-version"></a>
## 🇬🇧 English Version

### Description
These scripts are used for translating massive `.json` files, specifically designed for RAGE:MP servers (handling files with over 24,000 lines). Translating such large files manually makes it difficult to understand the context of the systems being translated.

I created an AI-assisted system that:
1.  **Iterates** through all keys with indexes and separates them.
2.  **Automatically creates** files in a `systems / key / index` structure.
3.  **Sorts** all similar found keys into a specific JSON file.

### Example
Instead of a mixed file, keys are grouped logically. For example, all `wedding.` keys are placed into `wedding.json`:

```json
{
    "wedding.divorce.male": "should be your wife",
    "wedding.divorce.female": "should be your husband",
    "wedding.divorce.notify": "For a divorce near you %1%",
    "wedding.divorce.notify2": "Request sent",
    "wedding.divorce.accept": "Do you agree to a divorce?",
    "wedding.divorce.accept.fail": "The partner refused to divorce",
    "wedding.divorce.accept.ok": "You have been successfully divorced",
    "wedding.divorce.nomoney": "You do not have enough money",
    "wedding.divorce.ok": "Action successfully completed"
}
```
*This makes the work much easier and divides it into systematic fragments.*

### 🚀 Usage Guide

#### 1. DECOMPILATION (Splitting)
1.  Add your language file (e.g., `en.json` or `ru.json`) to the script's root folder.
2.  **Prerequisite:** Install Node.js **v12.22.12-x64**. Make sure the path is correctly added to your system environment variables.
3.  Open a terminal in the folder (Shift + Left Click -> Open PowerShell window here) and run:
    ```bash
    node create-systems-advanced
    ```
4.  **Result:** If Node is installed correctly and your file exists, the script will create a `systems` folder containing all separated keys.

#### 2. COMPILATION (Merging)
1.  After finishing your translations or modifications in the `systems` folder, **delete** the old language file (e.g., `en.json` / `ru.json`) from the main directory.
2.  Open the PowerShell console again (Shift + Left Click) and run:
    ```bash
    node compile-systems
    ```
3.  **Result:** The script will generate the new complete language file (e.g., `en.json`) in the main folder.

#### 3. VALIDATION
> ⚠️ **Recommendation:** Only use validation if you suspect there are duplicate keys or missing indexes. The system may still make small mistakes, but the margin of error is around 1% (in my tests it was as low as 0.03%).

### 💡 Note
I performed the translation using `en.json`. It is recommended that you also use `en.json` for the process and then copy the translations to your desired destination.

---

<a name="romanian-version"></a>
## 🇷🇴 Versiunea în Română

### Descriere
Aceste scripturi sunt utilizate pentru traducerea fișierelor `.json` foarte mari. În cazul meu, pentru RAGE:MP, traduc un fișier de 24.000 linii și îmi este foarte greu să-mi dau seama ce sisteme traduc.

Așa că am creat cu AI-ul un sistem care:
1.  **Parcurge** toate cheile cu indexuri și le separă.
2.  **Creează automat** fișiere în `systems / cheie / index`.
3.  **Sortează** toate cheile găsite asemănătoare într-un fișier JSON.

### Exemplu
Toate cheile care vor fi găsite cu `wedding.` vor fi adăugate automat într-un fișier `wedding.json` (absolut toate):

```json
{
    "wedding.divorce.male": "should be your wife",
    "wedding.divorce.female": "should be your husband",
    "wedding.divorce.notify": "For a divorce near you %1%",
    "wedding.divorce.notify2": "Request sent",
    "wedding.divorce.accept": "Do you agree to a divorce?",
    "wedding.divorce.accept.fail": "The partner refused to divorce",
    "wedding.divorce.accept.ok": "You have been successfully divorced",
    "wedding.divorce.nomoney": "You do not have enough money",
    "wedding.divorce.ok": "Action successfully completed"
}
```
*Asta face munca mult mai ușoară și o împarte în fragmente sistematice.*

### 🚀 Utilizare

#### 1. DECOMPILARE
1.  Adaugă în folderul tău fișierul `en.json` / `ru.json` sau orice ai tu.
2.  **Cerință:** Instalează NODE **v12.22.12-x64** (adaugă calea corectă pentru path; întreabă AI-ul pentru ajutor dacă nu știi).
3.  Rulează prin Shift + Click stânga -> "Open PowerShell window here" și scrie:
    ```bash
    node create-systems-advanced
    ```
4.  **Rezultat:** Dacă ai instalat node corect și fișierul tău există în folderul scriptului, vei vedea că va crea un folder `systems` (aici vei avea toate cheile separate).

#### 2. COMPILARE
1.  După traducere / modificările pe care vrei tu să le faci, **șterge** vechiul fișier de limbă (`en.json` / `ru.json`) din directorul folderului.
2.  Deschide din nou cu Shift și click stânga mouse Consola PowerShell și scrie:
    ```bash
    node compile-systems
    ```
3.  **Rezultat:** O să vezi că în folderul principal creează fișierul `en.json` sau `ru.json` (sau ce ai tu).

#### 3. VALIDARE
> ⚠️ **Notă:** Recomand validarea doar dacă ai suspiciunea că există chei duplicate sau index-uri ne-adăugate. Să știi că mai face greșeli și mai elimină din ele, dar marja e undeva la 1% (la mine a fost mai mică, de 0.03%).

### 💡 PS
Am tradus folosind `en.json` (nu știu dacă va merge altceva). Mai bine folosești și tu tot `en.json` și după copiezi traducerile unde ai tu nevoie.

**Spor la tradus!**