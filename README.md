# Forma · Erste Schritte

Forma modelliert aus Sprache. Du beschreibst ein Haus, Forma baut es aus echten Bauteilen, du änderst es von Hand oder im Chat, und am Ende rendert Forma es auf deinem Mac. Alles bleibt auf deinem Rechner.

## 1. Öffnen

1. DMG öffnen, **Forma** in den Ordner **Programme** ziehen.
2. Beim ersten Mal: Forma im Ordner Programme mit **Rechtsklick, dann „Öffnen"** starten und die Nachfrage bestätigen. Das ist nötig, weil die App noch nicht bei Apple registriert ist. Danach öffnet sie sich wie jede andere App.
3. Falls macOS „beschädigt" meldet: Terminal öffnen und `xattr -cr /Applications/Forma.app` eingeben, dann noch einmal mit Rechtsklick öffnen.

## 2. KI wählen (eine Minute)

Beim ersten Start öffnet sich das Fenster **Einstellungen**. Der einfachste Weg ist **Forma Cloud**: Du trägst den Lizenzschlüssel aus deinem Abo ein (portantica.net), fertig. Chat, Websuche und KI-Renderings sind enthalten, ohne eigenes KI-Konto.

Wer lieber eine eigene KI anschließt, wählt einen dieser Anbieter:

| Anbieter | Kosten | Wofür |
|---|---|---|
| **Forma Cloud** | im Abo enthalten | Lizenzschlüssel eintragen, nichts weiter nötig |
| **Google Gemini** | kostenlos mit Google-Konto | gut für den Anfang, Schlüssel in Google AI Studio |
| **Groq** | kostenlos | sehr schnell, offene Modelle |
| **OpenAI** | wenige Cent je Auftrag | beste Qualität, einziger Weg für KI-Renderings |
| **Ollama** | kostenlos, lokal | läuft ganz ohne Internet, braucht die Ollama-App und ein großes Modell |

Schlüssel holen: der Link „Schlüssel holen" steht neben dem Feld. Schlüssel einfügen, „Prüfen" drücken, fertig. Der Schlüssel bleibt auf deinem Mac.

**Ohne eigenen Schlüssel:** Wenn du schon Claude Code, Codex oder Gemini CLI benutzt, kannst du Forma von dort steuern. Unter Einstellungen, Abschnitt „Aus Claude Code, Codex, Gemini CLI steuern", steht die fertige Konfiguration zum Kopieren. Dann baut deine bestehende KI das Modell, mit Internetrecherche und allem, was sie kann.

## 3. Blender laden (einmal, 350 MB)

Für echte Renderings braucht Forma Blender. In den Einstellungen auf **„Blender laden"** drücken. Forma holt die offizielle Version von blender.org und richtet sie ein. Rendern ist danach kostenlos und läuft auf deiner Grafikkarte.

Hast du Blender schon in Programme, findet Forma es von selbst.

## 4. Loslegen

- **Beispielprojekt öffnen** (Knopf in den Einstellungen) und im Chat schreiben: „Mach das Dach zum Pultdach nach Süden" oder „Ein Geschoss mehr".
- **Neues Projekt:** „Ein Ferienhaus, 9 mal 7 Meter, zwei Geschosse, Satteldach, Terrasse nach Süden."
- **Von Hand:** Befehlszeile unten wie in Rhino (`box`, `wall`, `slab`, `move`), Gumball, Eigenschaften links.
- **Rendern:** grüner Knopf, Stimmung wählen. Vorschau in Sekunden, Tafel in Minuten.
- **Pläne:** Grundriss, Schnitt, Ansicht als PDF. Dafür muss Google Chrome (oder Brave, Edge, Chromium) installiert sein.
- **Export:** Menü `•••`, Rhino 3dm, IFC, STEP, 3MF.

## 5. Aufs Handy

Menü `•••`, „Aufs Handy holen", QR-Code mit der Handykamera scannen. Im selben WLAN geht es sofort. Am Handy: oben das Modell, unten Chat und Bilder. Was du am Handy sagst, erscheint sofort am Mac. In Safari „Teilen, Zum Home-Bildschirm" macht daraus eine App.

Von unterwegs: Tailscale auf Mac und Handy installieren, dann zeigt der Dialog einen Link, der überall geht.

## 6. Wenn etwas hakt

- **Pläne als PDF gehen nicht:** Google Chrome installieren.
- **Rhino-Dateien importieren fragt nach „Command Line Tools":** bestätigen, macOS installiert Python-Werkzeuge einmalig.
- **Protokoll:** Menü Hilfe, „Protokoll zeigen". Datenordner: Menü Hilfe, „Datenordner im Finder zeigen".
- **Alles zurücksetzen:** Datenordner löschen, Forma neu starten.

Forma ist in Arbeit. Was fehlt oder stört, bitte kurz an Tassilo schreiben, am besten mit Screenshot.

Lizenzen: Blender steht unter GPL und läuft als eigenes Programm; die Skripte, die Blender steuern, liegen im Programm als Quelltext bei. Texturen und HDRIs sind CC0 (ambientCG, Poly Haven). OpenCascade (LGPL mit Ausnahme) rechnet die Kurven.
