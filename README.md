# Projektbeschreibung: Vier Gewinnt mit WebSockets

## Projektübersicht

Das "Vier Gewinnt"-Projekt ist eine Webanwendung, die das klassische Strategiespiel in einer modernen, interaktiven Form umsetzt. Das Spiel wird mit **HTML, CSS und JavaScript** entwickelt und nutzt **WebSockets**, um ein Multiplayer-Erlebnis in Echtzeit zu ermöglichen.

Das Ziel ist es, dass zwei Spieler das Spiel über das Internet gegeneinander spielen können, wobei ihre Züge synchronisiert werden. Zusätzlich gibt es eine Lobby für die Spielersuche und die Möglichkeit, während des Spiels zu chatten.

## Hauptfunktionen

### 1. Darstellung des Spielbretts
- Das Spielfeld wird als HTML-Elemente oder mit SVG dargestellt.
- Das Raster orientiert sich an den klassischen "Vier Gewinnt"-Regeln (7 Spalten, 6 Reihen).

### 2. Drag & Drop-Mechanismus
- Die Spieler können ihre Spielsteine per Drag & Drop in die gewünschte Spalte des Spielbretts setzen.
- Das System sorgt automatisch dafür, dass die Steine nur auf die unterste freie Position in der gewählten Spalte fallen.

### 3. Gewinner-Erkennung mit Soundeffekten
- Das Spiel erkennt automatisch, wenn ein Spieler vier Steine in einer Reihe (horizontal, vertikal oder diagonal) erreicht.
- Sobald ein Spieler gewinnt, wird ein Soundeffekt abgespielt, um den Sieg zu signalisieren.

### 4. Spieleridentifikation mit Avataren
- Spieler geben ihre **E-Mail-Adresse** als ID bzw. Spielername an.
- Ein Avatar-Bild wird über **Gravatar** per API-Anfrage geladen und angezeigt.

### 5. Online-Multiplayer über WebSockets
- Spieler können über WebSockets in Echtzeit gegeneinander antreten.
- Ein WebSocket-Server verwaltet Verbindungen und synchronisiert Spielzüge zwischen den Spielern.
- Das Spiel kann auf zwei verschiedenen Browsern oder Geräten parallel gespielt werden.

### 6. Routing-System
- Die Anwendung nutzt einen **Frontend-Router**, um zwischen verschiedenen Sichten zu wechseln (z. B. Startseite, Spielansicht, Lobby).

### 7. Lobby mit Chat-Funktion
- Spieler können in einer Lobby nach Gegnern suchen.
- Während des Spiels gibt es eine **Chatfunktion**, um mit dem Gegner zu kommunizieren.

## Technische Umsetzung

### **Technologien & Werkzeuge**
- **Frontend**: HTML, CSS, JavaScript
- **WebSocket-Server**: Node.js mit WebSocket-Unterstützung
- **Build-Tool**: esbuild (für schnelle Entwicklung und Deployment)
- **Avatar-Integration**: Gravatar API
- **Routing**: Clientseitiger Router für die Navigation

### **Projektstruktur**
- `public/` → HTML-Dateien & gebundelte JS/CSS-Dateien
- `src/` → Hauptentwicklungsordner mit JavaScript und CSS
- `server.js` → Server zur Bereitstellung der Anwendung
- `websocket.mjs` → WebSocket-Server zur Spielverwaltung
- `.gitignore` → Dateien, die nicht ins Repository gehören
- `package.json` → npm-Konfigurationsdatei

## Installation & Nutzung

1. **Projekt klonen:**
   ```bash
   git clone 
   cd connect-four-websockets
   ```

2. **Abhängigkeiten installieren:**
   ```bash
   npm install
   ```

3. **Server starten:**
   ```bash
   npm start
   ```
   Die Anwendung ist dann unter `http://127.0.0.1:3000/` erreichbar.

4. **Spiel starten:**
   - Einen weiteren Browser oder ein anderes Gerät öffnen und verbinden.
   - Ein Spiel starten oder einem laufenden Spiel beitreten.

