[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/UUyjzCM2)
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=11213872&assignment_repo_type=AssignmentRepo)
**Achtung dies ist eine Hausarbeit als Gruppenaufgabe.**

# Hausarbeit als Prüfungsleistung in Webtechnologie

Bitte lesen Sie erst den gesamten Text, bevor Sie mit der Aufgabe anfangen.

Dieses Repository enthält einen Startpunkt (Boilerplate) auf dem aufbauend die Aufgabe umgesetzt werden kann.

Momentan wird ein Button und eine `<p>`-Element angezeigt. Das `<p>`-Element enthält den Text zu einem Zähler, der mit 0 initialisiert ist.

Mit jedem Click auf den Button wird der Zähler um 1 erhöht.

Machen Sie sich zunächst mit dem Code vertraut. Sie können den Counter natürlich entfernen, er dient nur als Beispiel.

## Codeorganisation

Es gibt die folgenden Ordner

- node_module - darin befinden sich benötigte Bibliotheken. Diesen Ordner müssen Sie sonst nicht weiter beachten
- public - darin befinden sich die html-Dokumente und die Bundle-Dateien, wenn sie erzeugt werden. Sie müssen nur die index.html anpassen. Nach dem Bundeln sind hier auch .js und .css Dateien, diese sollten Sie nicht ändern, da diese automatisch erzeugt werden
- src - darin befinden sich die JavaScript und CSS Dateien, die Sie bearbeiten können. Sie können neue Module zufügen, müssen diese aber dann importieren. Sehen Sie sich die app.js als Beispiel an, dass ist der Einstiegspunkt.

Es gibt auf oberster Ebene noch die weitere Dateien:

- .gitignore - darin wird festgelegt, welche Dateien nicht eingecheckt werden sollen, z.B. weil Sie automatisch erzeugt werden.
- package.json - die Konfigurationsdatei für npm
- package-lock.json - eine weiter Date von npm, in der die genauen Versionen der Abhängigkeiten festgehalten werden
- LICENSE - diese Datei können Sie ignorieren
- README.md - die Datei die Sie gerade lesen
- server.js - der Server, der den public-Ordner bereitstellt
- websocket.mjs - der Websocket-Server, der die Serverfunktionen Chat und Spielnachrichten bereitstellt (darf gerne angepasst werden).

## Nutzung von npm

Wie immer müssen sie am Anfang einmal die Abhängigkeiten installieren:

`npm install`

In der package.json sehen Sie die definierten Skripte:

- `npm run build`
- `npm start`

Mit build können Sie das Projekt so bauen, dass alles im public Ordner auf einen Webserver geladen werden kann; das nennt man deploy.

Am einfachsten ist es, Sie starten beim Entwickeln den Server von esbuild mit `npm start`. Der Server ist dann unter http://127.0.0.1:3000/ erreichbar, allerdings werden nur Dateien mit den Endungen .js, .mjs und .css, sowie Dateien aus dem Ordner templates (wenn angelegt) ausgeliefert. Alle anderen Routen liefern die index.html aus; so kann ein Router im Frontend ungestört arbeiten, auch wenn nicht der Root-Pfad aufgerufen wird.

## Tests

Es gibt diesmal keine Tests, das Projekt wird manuell bewertet.

# Aufgabe

*Abgabe bis 19.06.2023*

Entwickeln Sie ein *Vier Gewinnt* Spiel (https://de.wikipedia.org/wiki/Vier_gewinnt).

Dabei sind folgende Anforderungen zu erfüllen:

1. Darstellung des Spielbretts mit HTML-Elementen und / oder SVG.
2. Züge sollen über Drag&Drop von den Spielsteinen des jeweiligen Spielers auf die Reihe des Spielbretts, in die der Spielstein soll, umgesetzt werden
3. Für den Gewinner soll ein Sound abgespielt werde.
4. Spieler sollen Email-Adressen als ID bzw. Spielername angeben können. Mit der fetch-API soll ein Avatar-Bild von [gravatar](https://de.gravatar.com/site/implement/images/) geladen werden (auch wenn eigentlich die URL direkt in einem Source-Tag nutzbar ist.)
5. Das Spiel soll über eine Websocket-Verbindung gegen einen anderen Spieler an einem anderen Rechner (zwei Tabs / Browsern / PCs) gespielt werden können. Der Websocket-Server wird in der nächsten Woche gestellt.
6. Die Lösung soll einen Router verwenden um zwischen Sichten umzuschalten.
7. Optional: In einer Lobby zum Auffinden anderer Spieler für ein neues Spiel soll ein Chat möglich sein, ebenso während des Spiels mit dem Gegner. Dies soll ebenfalls über den Websocket laufen.
8. Optional: Animieren Sie das Runterfallen der Spielsteine.

## Hinweise zu Websockets

Der Websocketserver wird gestellt und ermöglicht die Verbindung in eine Lobby und in Räume. Die Nachrichten, die zwischen den Clients ausgetauscht werden, z.B. um über den Zug des Gegenspielers zu berichten, müssen Sie definieren. Der Server verteilt die Nachrichten nur an die Clients in der Lobby oder dem Raum.

## Vorstellung der Ergebnisse

Vorstellung 15 - 20 min im Labor (alle Gruppenteilnehmer*innen beteiligt an der Vorstellung; geht auch über Discord).

In einem der beiden letzten Labore des Semesters.


## Bewertungskriterien

- 60 % der Note ergeben sich aus der Funktionalität gemäß Aufgabenstellung.
- 20 % der Note ergeben sich aus der Einhaltung der Qualitätskriterien (Codeorganisation, Codeformatierung, Kommentare, Lesbarkeit).
- 20 % der Note ergeben sich aus der Präsentation der Ergebnisse.

### Funktionalität

Es gibt jeweils max 10 Punkte für die Umsetzung der Anforderungen 1. bis 6. aus der Aufgabenstellungen.

Für die Anforderungen 7. und 8. werden jeweils 5 weitere Punkte vergeben. Max werden aber 60 Punkte für die Funktionalität vergeben; d.h. mit den Anforderungen 7. und 8. können verlorene Punkte bei den Anforderungen 1. bis 6. aufgefüllt werden, die 60 Punkte können damit aber nicht übererfüllt werden.

### Qualitätskriterien

Es gibt jeweils max 5 Punkte für:

* Codeorganisation
* Codeformatierung
* Kommentare
* Lesbarkeit

### Präsentation

Es gibt jeweils max 5 Punkte für:

* Einhaltung des Zeitkontingents
* Visuelle Präsentation
* Aufbau der Präsentation
* Inhalt

### Bildung der Note aus den Punkten

```
Prozent (Punkte)  Note
100 - 94 %	  1,0	sehr gut
<94 - 89 %	  1,3	sehr gut (-)
<89 - 84 %	  1,7	gut (+)
<84 - 79 %	  2,0	gut
<79 - 73 %	  2,3	gut (-)
<73 - 68 %	  2,7	befriedigend (+)
<68 - 63 %	  3,0	befriedigend
<63 - 57 %	  3,3	befriedigend (-)
<57 - 52 %	  3,7	ausreichend (+)
<52 - 50 %	  4,0	ausreichend
<50 %         5,0	nicht bestanden
```

## Hinweis bei ungleich verteilter Leistung der Gruppenteilnehmer

Es besteht ein Anspruch auf eine individuelle Benotung. Zur Feststellung der individuellen Leistungen können herangezogen werden:

1. Git: Commits, Teilnahme an Diskussionen von Issues usw.
2. Anteil an der Präsentation
3. Aussage der anderen Gruppenteilnehmer

Sollte ein Gruppe das Gefühl habe, dass einzelne Mitglieder sich nicht an der Gruppenleistung beteiligen, wäre zu bevorzugen, wenn die Gruppe dies zunächst intern einvernehmlich klärt und das Gruppenmitglied zu Mitarbeit bewegt. Ansonsten sollte die Gruppe sich bitte frühzeitig an mich wenden, damit das geklärt werden kann.

Im Zweifel können einzelnen Mitglieder durchfallen, wenn diese sich nachweislich nicht beteiligt haben!




