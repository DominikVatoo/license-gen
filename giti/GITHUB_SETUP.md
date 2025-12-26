# GitHub Setup Anleitung

## Option 1: Mit Git (empfohlen)

### 1. Git installieren
Download: https://git-scm.com/download/win

### 2. Repository erstellen
```bash
cd c:\Users\DomKe\Desktop\giti
git init
git add .
git commit -m "Initial release: License Generator & Checker v1.0.0"
git branch -M main
```

### 3. Auf GitHub
1. Gehe zu https://github.com/new
2. Repository Name: `license-gen` (oder beliebig)
3. Description: `CLI tool to generate licenses and check dependency license compatibility`
4. Public
5. **NICHT** "Initialize with README" anklicken
6. Create repository

### 4. Pushen
```bash
git remote add origin https://github.com/DEIN-USERNAME/license-gen.git
git push -u origin main
```

### 5. Release erstellen
1. Gehe zu deinem Repository auf GitHub
2. Klicke auf "Releases" → "Create a new release"
3. Tag: `v1.0.0`
4. Release title: `License Generator & Checker v1.0.0`
5. Description:
```
# License Generator & Checker v1.0.0

A powerful CLI tool to generate open-source licenses and check dependency license compatibility.

## Features
- Generate licenses (MIT, Apache-2.0, GPL, BSD, ISC, and more)
- Check dependency license compatibility
- Analyze license statistics
- Interactive CLI interface

## Installation
```bash
npm install -g license-gen
```

## Quick Start
```bash
license-gen generate
license-gen check
license-gen stats
```

See README.md for full documentation.
```
6. Publish release

---

## Option 2: GitHub Desktop (einfacher)

### 1. GitHub Desktop installieren
Download: https://desktop.github.com/

### 2. Repository erstellen
1. Öffne GitHub Desktop
2. File → Add Local Repository
3. Wähle: `c:\Users\DomKe\Desktop\giti`
4. Klicke "create a repository"
5. Name: `license-gen`
6. Initialize with README: **NEIN** (haben wir schon)

### 3. Commit & Push
1. Alle Dateien sollten links angezeigt werden
2. Summary: `Initial release: License Generator & Checker v1.0.0`
3. Description: `Complete CLI tool with generator and checker functionality`
4. Commit to main
5. Publish repository
6. Public repository
7. Push origin

### 4. Release erstellen
Siehe Option 1, Schritt 5

---

## Option 3: Manuell über GitHub Web

### 1. Repository erstellen
1. Gehe zu https://github.com/new
2. Repository Name: `license-gen`
3. Description: `CLI tool to generate licenses and check dependency license compatibility`
4. Public
5. **NICHT** "Initialize with README" anklicken
6. Create repository

### 2. Dateien hochladen
1. Klicke "uploading an existing file"
2. Ziehe alle Dateien aus `c:\Users\DomKe\Desktop\giti` in den Browser
3. Commit message: `Initial release: License Generator & Checker v1.0.0`
4. Commit changes

### 3. Release erstellen
Siehe Option 1, Schritt 5

---

## Nach dem Release

### NPM veröffentlichen (optional)
```bash
npm login
npm publish
```

### Repository-Settings optimieren
1. Gehe zu Settings
2. Füge Topics hinzu: `license`, `cli`, `generator`, `checker`, `nodejs`, `npm`
3. Website: Link zu NPM-Package (falls veröffentlicht)
4. Aktiviere Issues & Discussions

### README-Badge hinzufügen
```markdown
![npm version](https://img.shields.io/npm/v/license-gen.svg)
![license](https://img.shields.io/github/license/DEIN-USERNAME/license-gen.svg)
![downloads](https://img.shields.io/npm/dm/license-gen.svg)
```

---

## Empfehlung

**Option 1 (Git CLI)** ist am professionellsten und gibt dir volle Kontrolle.
**Option 2 (GitHub Desktop)** ist am einfachsten für Anfänger.
**Option 3 (Web)** funktioniert, aber ist umständlich für zukünftige Updates.

Ich empfehle **Option 1** - einmal Git installieren, dann ist alles einfach!
