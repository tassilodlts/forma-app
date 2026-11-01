# Forma · Erste Schritte

Du beschreibst ein Haus, Forma baut es aus echten Bauteilen. Du änderst es im Chat oder von Hand, dann rendert Forma auf deinem Mac und schreibt die Pläne als PDF. Alles bleibt auf deinem Rechner.

## 1. Öffnen

DMG öffnen, **Forma** in den Ordner **Programme** ziehen. Beim ersten Mal mit **Rechtsklick, „Öffnen“** starten und bestätigen. Danach öffnet sich Forma wie jede andere App.

Meldet macOS „beschädigt“: Terminal öffnen, `xattr -cr /Applications/Forma.app` eingeben, noch einmal mit Rechtsklick öffnen.

## 2. Schlüssel eintragen

Beim ersten Start öffnet sich das Fenster **Einstellungen**. Den **Lizenzschlüssel** aus deiner Mail einfügen, „Prüfen“ drücken. Fertig. Chat, Websuche und KI-Renderings sind im Abo enthalten.

Wer lieber eine eigene KI anschließt (OpenAI, Gemini, Groq, OpenRouter, Ollama): im selben Fenster den Anbieter wählen und den eigenen Schlüssel eintragen. Der Schlüssel bleibt auf deinem Mac.

## 3. Loslegen

- **Beispielprojekt öffnen** (Knopf in den Einstellungen). Im Chat schreiben: „Mach das Dach zum Pultdach nach Süden“ oder „Ein Geschoss mehr“.
- **Neues Projekt:** „Ein Ferienhaus, 9 mal 7 Meter, zwei Geschosse, Satteldach, Terrasse nach Süden.“
- **Rendern:** grüner Knopf, Stimmung wählen. Beim ersten Mal fragt Forma, ob es Blender laden darf (einmal, 350 MB, von blender.org). Danach rendert dein Mac kostenlos, so oft du willst.
- **Pläne:** Grundriss, Schnitt, Ansicht als PDF. Dafür muss Google Chrome (oder Brave, Edge, Chromium) installiert sein.
- **Export:** Menü `•••`, Rhino 3dm, IFC, STEP, 3MF.

## Wenn du mehr willst

- **Von Hand modellieren:** Befehlszeile unten wie in Rhino (`box`, `wall`, `slab`, `move`), Gumball, Eigenschaften links.
- **Aufs Handy:** Menü `•••`, „Aufs Handy holen“, QR-Code scannen. Im selben WLAN sofort, unterwegs mit Tailscale. In Safari „Teilen, Zum Home-Bildschirm“ macht daraus eine App.
- **Aus Claude Code, Codex oder Gemini CLI steuern:** Einstellungen, Abschnitt „Aus Claude Code, Codex, Gemini CLI steuern“, Konfiguration kopieren. Dann baut deine bestehende KI das Modell.

## Wenn etwas hakt

- **Pläne als PDF gehen nicht:** Google Chrome installieren.
- **Rhino-Import fragt nach „Command Line Tools“:** bestätigen, macOS installiert einmalig Python-Werkzeuge.
- **Protokoll und Datenordner:** Menü Hilfe.
- **Alles zurücksetzen:** Datenordner löschen, Forma neu starten.

Was fehlt oder stört: kurze Mail an tassilodlts@gmail.com, am besten mit Screenshot.

Lizenzen: Blender steht unter GPL und läuft als eigenes Programm; die Skripte, die Blender steuern, liegen im Programm als Quelltext bei. Texturen und HDRIs sind CC0 (ambientCG, Poly Haven). OpenCascade (LGPL mit Ausnahme) rechnet die Kurven.
