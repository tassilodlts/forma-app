// Forma · Website: Sprache (de, en, es) automatisch nach Browser, Konstanten für Name und Links. Kein Framework.
'use strict';

const PRODUKT = 'Forma';          // Name, später austauschbar
const DOWNLOAD_ARM = 'https://github.com/tassilodlts/forma-app/releases/latest/download/Forma-Apple-Silicon.dmg';         // Mac, Apple Silicon (.dmg)
const DOWNLOAD_X64 = 'https://github.com/tassilodlts/forma-app/releases/latest/download/Forma-Intel.dmg';         // Mac, Intel (.dmg)
const CHECKOUT = { pro: 'mailto:tassilodlts@gmail.com?subject=Forma%20Pro', studio: 'mailto:tassilodlts@gmail.com?subject=Forma%20Studio' };   // Abo starten je Plan (später Paddle)

const TEXTE = {
  de: {
    meta: 'Beschreib dein Haus. Forma baut es. Modellieren mit Sprache für Architekten, auf dem Mac.',
    'nav.projekte': 'Projekte', 'nav.funktionen': 'Funktionen', 'nav.preis': 'Preis', 'nav.faq': 'Fragen', 'nav.kaufen': 'Kaufen',
    'held.titel1': 'Beschreib dein Haus.', 'held.titel2': 'Forma baut es.',
    'held.text': 'Skizze, Plan, PDF, Rhino-Datei oder ein Satz: Forma baut daraus echte Bauteile, rendert auf deinem Mac und schreibt die Pläne.',
    'held.ladenArm': 'Forma für Mac laden (Apple Silicon)', 'held.ladenX64': 'Forma für Mac laden (Intel)',
    'held.klein': 'Ein Programm für den Mac, macOS 13 oder neuer. Laden ist frei. Beim ersten Start fragt Forma nach dem Schlüssel, den bekommst du mit dem Abo ab 45 € im Monat. Vom Handy aus bedienst du Forma im Browser, solange dein Mac läuft. Nach drei Monaten nicht zufrieden? Alles zurück.', 'held.kaufen': 'Schlüssel kaufen',
    'bild.band': 'FIVE CLEARINGS aus der Luft. Entwurf, Modell und Bild aus Forma.',
    'modell.titel': 'Sprich mit dem Modell', 'modell.text': 'So fühlt sich Forma an: Du sagst, was du sehen willst. Zwei echte Projekte, direkt aus dem Programm. Drehen mit einem Finger, zoomen mit zwei. In der App baut die KI auch um.',
    'modell.frage': 'Sag dem Modell, was du sehen willst …', 'modell.reiterM': 'Villa von 1913', 'modell.fehler': 'Modell konnte nicht geladen werden.',
    'chip.m1': 'Schneide das Erdgeschoss auf', 'chip.m2': 'Wie sah es 1913 aus?', 'chip.m3': 'Nimm die Nachbarn weg', 'chip.m4': 'Obergeschoss von oben, axonometrisch', 'chip.m5': 'Zeig mir den Garten', 'chip.zurueck': 'Alles zurück',
    'chip.v1': 'Nur das Tragwerk', 'chip.v2': 'Schneide bei 60 Metern', 'chip.v3': 'Ohne die Stadt', 'chip.v4': 'Runter auf den Sockel', 'chip.v5': 'Von oben, axonometrisch',
    'bild.app': 'So sieht Forma aus: Bauteile und Ebenen links, das Modell in der Mitte, der Chat rechts. Hier FIVE CLEARINGS mit 69 510 Bauteilen.',
    'schritte.titel': 'So fängst du an',
    'schritte.1t': 'Forma laden', 'schritte.1': 'Das Programm für den Mac laden, in den Ordner Programme ziehen, mit Rechtsklick öffnen.',
    'schritte.2t': 'Schlüssel eintragen', 'schritte.2': 'Beim ersten Start fragt Forma nach dem Lizenzschlüssel. Den bekommst du per Mail, sobald du das Abo abschließt. Einfügen, fertig.',
    'schritte.3t': 'Anfangen, wie du willst', 'schritte.3': 'Lade Skizzen, Pläne, PDFs oder Rhino-Dateien hoch, diktier oder schreib. Von null oder aus einem bestehenden Projekt. Forma baut, du änderst, dann rendern und Pläne als PDF.',
    'proj.titel': 'Gebaut mit Forma',
    'proj.vanc': 'Hochhaus mit fünf öffentlichen Lichtungen, Wettbewerb 2026. Modell, Renderings, Pläne und Tafeln aus Forma.',
    'vanc.1': 'Der Turm über der Stadt', 'vanc.2': 'Vom Park aus', 'vanc.3': 'Dachgärten auf dem Sockel', 'vanc.4': 'Terrasse im Turm', 'vanc.5': 'Ecke des Sockels', 'vanc.6': 'An der Straße', 'vanc.7': 'Lichtung im Sockel', 'vanc.8': 'Schnitt durch den Turm',
    'proj.muc': 'Umbau einer Villa von 1913 mit Anbau, 2026. Bestand, Entwurf, Innenräume und Grundrisse in Forma, Abstimmung mit dem Bauherrn an den Bildern.', 'proj.muct': 'Villa von 1913',
    'muc.1': 'Straßenecke', 'muc.2': 'Vogelperspektive mit Anbau', 'muc.3': 'Isometrie mit Nachbarn', 'muc.4': 'Dachterrasse', 'muc.5': 'Salon mit Kaminofen', 'muc.6': 'Erdgeschoss mit Möbeln',
    'fkt.titel': 'Was Forma kann',
    'fkt.1t': 'Echte Bauteile', 'fkt.1': 'Wände, Decken, Stützen, Fenster, Treppen. Mit Maßen, Schichten und Mengen, nicht nur Flächen.',
    'fkt.2t': 'Rhino-Befehle', 'fkt.2': 'Wer Rhino kennt, tippt die bekannten Befehle. Der Chat versteht beides.',
    'fkt.3t': 'Export 3dm und IFC', 'fkt.3': 'Das Modell geht weiter nach Rhino, Revit, ArchiCAD oder zum Tragwerksplaner.',
    'fkt.4t': 'Rendering auf deinem Mac', 'fkt.4': 'Blender Cycles läuft lokal, so oft du willst. Dazu KI-Renderings für Stimmung und Vegetation.',
    'fkt.5t': 'Pläne als PDF', 'fkt.5': 'Grundrisse, Schnitte, Ansichten und Tafeln kommen fertig aus dem Modell.',
    'fkt.6t': 'Vom Handy und aus dem Terminal', 'fkt.6': 'Unterwegs im Browser bedienen. Oder aus Claude Code, Codex und Gemini CLI steuern.',
    'preis.titel': 'Zwei Pläne', 'preis.einheit': 'im Monat zzgl. MwSt.',
    'preis.l1': 'KI für das Modell, unbegrenzt', 'preis.l2': '60 KI-Renderings im Monat',
    'preis.l3': 'Blender-Rendering unbegrenzt, auf deinem Mac', 'preis.l4': 'Alle Updates',
    'preis.knopf': 'Abo starten',
    'studio.l1': 'Alles aus Pro, ohne Grenzen: KI, KI-Renderings, Websuche',
    'studio.l2': 'Persönliche Beratung: Architekt am Telefon oder per Video, wenn du sie brauchst',
    'studio.l3': 'Modellierungshilfe: Wir bauen oder richten dein Projekt mit dir ein',
    'studio.l4': 'Wünsche an Forma kommen zuerst dran', 'studio.knopf': 'Studio anfragen',
    'preis.garantie': 'Nach drei Monaten nicht zufrieden? Du bekommst alles zurück. Gilt für beide Pläne.',
    'faq.titel': 'Fragen',
    'faq.1f': 'Was brauche ich?', 'faq.1': 'Einen Mac mit macOS 13 oder neuer und Internet für die KI. Für Renderings installiert Forma Blender von blender.org, ein Klick genügt.',
    'faq.2f': 'Gibt es Forma für Windows?', 'faq.2': 'Noch nicht. Forma läuft auf dem Mac. Schreib uns, wenn du eine Windows-Version willst, wir zählen mit.',
    'faq.3f': 'Wo liegen meine Daten?', 'faq.3': 'Auf deinem Mac. Projekte, Modelle und Renderings bleiben lokal. An die KI gehen nur die Texte deines Chats und, wenn du es willst, das Bild für ein KI-Rendering.',
    'faq.4f': 'Brauche ich einen eigenen KI-Schlüssel?', 'faq.4': 'Nein. Im Abo ist die KI enthalten. Wer eigene Schlüssel hat (OpenAI, Gemini, Groq, OpenRouter, Ollama), kann sie in den Einstellungen eintragen.',
    'faq.5f': 'Muss ich Blender kennen?', 'faq.5': 'Nein. Forma stellt Kamera, Licht und Materialien selbst ein und startet Blender im Hintergrund. Du siehst nur das Bild.',
    'faq.6f': 'Wie kündige ich?', 'faq.6': 'Jederzeit mit einer Mail. Das Abo läuft bis zum Monatsende, danach ist Schluss. Deine Dateien bleiben bei dir.',
    'fuss.impressum': 'Impressum', 'fuss.datenschutz': 'Datenschutz', 'fuss.kontakt': 'Kontakt'
  },
  en: {
    meta: 'Describe your building. Forma builds it. Language-driven modelling for architects, on the Mac.',
    'nav.projekte': 'Projects', 'nav.funktionen': 'Features', 'nav.preis': 'Pricing', 'nav.faq': 'FAQ', 'nav.kaufen': 'Buy',
    'held.titel1': 'Describe your building.', 'held.titel2': 'Forma builds it.',
    'held.text': 'A sketch, a plan, a PDF, a Rhino file or one sentence: Forma turns it into real building elements, renders on your Mac and writes the drawings.',
    'held.ladenArm': 'Download Forma for Mac (Apple Silicon)', 'held.ladenX64': 'Download Forma for Mac (Intel)',
    'held.klein': 'A program for the Mac, macOS 13 or newer. The download is free. On first launch Forma asks for the key, which comes with the subscription from €45 a month. From your phone you control Forma in the browser while your Mac is running. Not happy after three months? Full refund.', 'held.kaufen': 'Buy a key',
    'bild.band': 'FIVE CLEARINGS from the air. Design, model and image from Forma.',
    'modell.titel': 'Talk to the model', 'modell.text': 'This is what Forma feels like: you say what you want to see. Two real projects, straight from the app. Rotate with one finger, zoom with two. In the app the AI also rebuilds.',
    'modell.frage': 'Tell the model what you want to see …', 'modell.reiterM': 'Villa from 1913', 'modell.fehler': 'The model could not be loaded.',
    'chip.m1': 'Cut open the ground floor', 'chip.m2': 'How did it look in 1913?', 'chip.m3': 'Take the neighbours away', 'chip.m4': 'First floor from above, axonometric', 'chip.m5': 'Show me the garden', 'chip.zurueck': 'Everything back',
    'chip.v1': 'Only the structure', 'chip.v2': 'Cut at 60 metres', 'chip.v3': 'Without the city', 'chip.v4': 'Down to the podium', 'chip.v5': 'From above, axonometric',
    'bild.app': 'This is Forma: building elements and layers on the left, the model in the middle, the chat on the right. Here FIVE CLEARINGS with 69,510 elements.',
    'schritte.titel': 'How you start',
    'schritte.1t': 'Download Forma', 'schritte.1': 'Download the Mac program, drag it to Applications, open it with a right click.',
    'schritte.2t': 'Enter your key', 'schritte.2': 'On first launch Forma asks for the licence key. You get it by email as soon as you subscribe. Paste it, done.',
    'schritte.3t': 'Start any way you like', 'schritte.3': 'Upload sketches, drawings, PDFs or Rhino files, dictate or type. From scratch or from an existing project. Forma builds, you adjust, then render and export drawings as PDF.',
    'proj.titel': 'Built with Forma',
    'proj.vanc': 'High-rise with five public clearings, competition 2026. Model, renderings, drawings and boards from Forma.',
    'vanc.1': 'The tower above the city', 'vanc.2': 'From the park', 'vanc.3': 'Roof gardens on the podium', 'vanc.4': 'Terrace in the tower', 'vanc.5': 'Corner of the podium', 'vanc.6': 'On the street', 'vanc.7': 'Clearing in the podium', 'vanc.8': 'Section through the tower',
    'proj.muc': 'Conversion of a 1913 villa with an extension, 2026. Existing building, design, interiors and plans in Forma, agreed with the client on the images.', 'proj.muct': 'Villa from 1913',
    'muc.1': 'Street corner', 'muc.2': 'Bird’s-eye view with extension', 'muc.3': 'Isometric with neighbours', 'muc.4': 'Roof terrace', 'muc.5': 'Salon with wood stove', 'muc.6': 'Ground floor with furniture',
    'fkt.titel': 'What Forma does',
    'fkt.1t': 'Real building elements', 'fkt.1': 'Walls, slabs, columns, windows, stairs. With dimensions, layers and quantities, not just surfaces.',
    'fkt.2t': 'Rhino commands', 'fkt.2': 'If you know Rhino, type the commands you know. The chat understands both.',
    'fkt.3t': 'Export 3dm and IFC', 'fkt.3': 'The model moves on to Rhino, Revit, ArchiCAD or your structural engineer.',
    'fkt.4t': 'Rendering on your Mac', 'fkt.4': 'Blender Cycles runs locally, as often as you like. Plus AI renderings for mood and vegetation.',
    'fkt.5t': 'Drawings as PDF', 'fkt.5': 'Plans, sections, elevations and boards come straight from the model.',
    'fkt.6t': 'From your phone and the terminal', 'fkt.6': 'Use it in the browser on the go. Or drive it from Claude Code, Codex and Gemini CLI.',
    'preis.titel': 'Two plans', 'preis.einheit': 'per month plus VAT',
    'preis.l1': 'AI for the model, unlimited', 'preis.l2': '60 AI renderings per month',
    'preis.l3': 'Unlimited Blender rendering, on your Mac', 'preis.l4': 'All updates',
    'preis.knopf': 'Start subscription',
    'studio.l1': 'Everything in Pro, no limits: AI, AI renderings, web search',
    'studio.l2': 'Personal advice: an architect by phone or video whenever you need one',
    'studio.l3': 'Modelling help: we build or set up your project with you',
    'studio.l4': 'Your requests for Forma come first', 'studio.knopf': 'Ask for Studio',
    'preis.garantie': 'Not happy after three months? You get everything back. Applies to both plans.',
    'faq.titel': 'Questions',
    'faq.1f': 'What do I need?', 'faq.1': 'A Mac with macOS 13 or newer and internet for the AI. For renderings Forma installs Blender from blender.org, one click is enough.',
    'faq.2f': 'Is there a Windows version?', 'faq.2': 'Not yet. Forma runs on the Mac. Let us know if you want a Windows version, we are keeping count.',
    'faq.3f': 'Where is my data?', 'faq.3': 'On your Mac. Projects, models and renderings stay local. Only your chat text goes to the AI, and the image for an AI rendering if you ask for one.',
    'faq.4f': 'Do I need my own AI key?', 'faq.4': 'No. The AI is included in the subscription. If you have your own keys (OpenAI, Gemini, Groq, OpenRouter, Ollama), you can enter them in Settings.',
    'faq.5f': 'Do I need to know Blender?', 'faq.5': 'No. Forma sets camera, light and materials itself and runs Blender in the background. You only see the image.',
    'faq.6f': 'How do I cancel?', 'faq.6': 'Any time with an email. The subscription runs until the end of the month, then it stops. Your files stay with you.',
    'fuss.impressum': 'Legal notice', 'fuss.datenschutz': 'Privacy', 'fuss.kontakt': 'Contact'
  },
  es: {
    meta: 'Describe tu casa. Forma la construye. Modelado con lenguaje natural para arquitectos, en el Mac.',
    'nav.projekte': 'Proyectos', 'nav.funktionen': 'Funciones', 'nav.preis': 'Precio', 'nav.faq': 'Preguntas', 'nav.kaufen': 'Comprar',
    'held.titel1': 'Describe tu casa.', 'held.titel2': 'Forma la construye.',
    'held.text': 'Un boceto, un plano, un PDF, un archivo de Rhino o una frase: Forma lo convierte en elementos constructivos reales, renderiza en tu Mac y genera los planos.',
    'held.ladenArm': 'Descargar Forma para Mac (Apple Silicon)', 'held.ladenX64': 'Descargar Forma para Mac (Intel)',
    'held.klein': 'Un programa para Mac, macOS 13 o posterior. La descarga es gratis. Al abrirlo por primera vez, Forma pide la clave, que llega con la suscripción desde 45 € al mes. Desde el móvil manejas Forma en el navegador mientras tu Mac está encendido. ¿No te convence tras tres meses? Te devolvemos todo.', 'held.kaufen': 'Comprar clave',
    'bild.band': 'FIVE CLEARINGS desde el aire. Diseño, modelo e imagen hechos en Forma.',
    'modell.titel': 'Habla con el modelo', 'modell.text': 'Así se siente Forma: dices lo que quieres ver. Dos proyectos reales, directos del programa. Gira con un dedo, acerca con dos. En la app la IA también reconstruye.',
    'modell.frage': 'Dile al modelo qué quieres ver …', 'modell.reiterM': 'Villa de 1913', 'modell.fehler': 'No se pudo cargar el modelo.',
    'chip.m1': 'Abre la planta baja', 'chip.m2': '¿Cómo era en 1913?', 'chip.m3': 'Quita los vecinos', 'chip.m4': 'Primera planta desde arriba, axonometría', 'chip.m5': 'Enséñame el jardín', 'chip.zurueck': 'Todo como al principio',
    'chip.v1': 'Solo la estructura', 'chip.v2': 'Corta a 60 metros', 'chip.v3': 'Sin la ciudad', 'chip.v4': 'Baja al podio', 'chip.v5': 'Desde arriba, axonometría',
    'bild.app': 'Así es Forma: elementos y capas a la izquierda, el modelo en el centro, el chat a la derecha. Aquí FIVE CLEARINGS con 69 510 elementos.',
    'schritte.titel': 'Cómo empiezas',
    'schritte.1t': 'Descargar Forma', 'schritte.1': 'Descarga el programa para Mac, arrástralo a Aplicaciones, ábrelo con clic derecho.',
    'schritte.2t': 'Introducir la clave', 'schritte.2': 'Al abrirlo por primera vez, Forma pide la clave de licencia. La recibes por correo al contratar la suscripción. Pégala y listo.',
    'schritte.3t': 'Empieza como quieras', 'schritte.3': 'Sube bocetos, planos, PDF o archivos de Rhino, dicta o escribe. Desde cero o a partir de un proyecto existente. Forma construye, tú ajustas, luego renderizas y sacas los planos en PDF.',
    'proj.titel': 'Hecho con Forma',
    'proj.vanc': 'Torre con cinco claros públicos, concurso 2026. Modelo, renders, planos y paneles hechos en Forma.',
    'vanc.1': 'La torre sobre la ciudad', 'vanc.2': 'Desde el parque', 'vanc.3': 'Jardines en la cubierta del podio', 'vanc.4': 'Terraza en la torre', 'vanc.5': 'Esquina del podio', 'vanc.6': 'En la calle', 'vanc.7': 'Claro en el podio', 'vanc.8': 'Sección por la torre',
    'proj.muc': 'Reforma de una villa de 1913 con ampliación, 2026. Estado actual, propuesta, interiores y plantas en Forma, acordados con el cliente sobre las imágenes.', 'proj.muct': 'Villa de 1913',
    'muc.1': 'Esquina de la calle', 'muc.2': 'Vista aérea con la ampliación', 'muc.3': 'Isometría con los vecinos', 'muc.4': 'Terraza en la cubierta', 'muc.5': 'Salón con estufa de leña', 'muc.6': 'Planta baja amueblada',
    'fkt.titel': 'Qué hace Forma',
    'fkt.1t': 'Elementos constructivos reales', 'fkt.1': 'Muros, losas, pilares, ventanas, escaleras. Con medidas, capas y cantidades, no solo superficies.',
    'fkt.2t': 'Comandos de Rhino', 'fkt.2': 'Si conoces Rhino, escribe los comandos de siempre. El chat entiende ambos.',
    'fkt.3t': 'Exportar 3dm e IFC', 'fkt.3': 'El modelo pasa a Rhino, Revit, ArchiCAD o al ingeniero de estructuras.',
    'fkt.4t': 'Render en tu Mac', 'fkt.4': 'Blender Cycles funciona en local, tantas veces como quieras. Además, renders con IA para ambiente y vegetación.',
    'fkt.5t': 'Planos en PDF', 'fkt.5': 'Plantas, secciones, alzados y paneles salen listos del modelo.',
    'fkt.6t': 'Desde el móvil y la terminal', 'fkt.6': 'Úsalo en el navegador donde estés. O contrólalo desde Claude Code, Codex y Gemini CLI.',
    'preis.titel': 'Dos planes', 'preis.einheit': 'al mes más IVA',
    'preis.l1': 'IA para el modelo, sin límite', 'preis.l2': '60 renders con IA al mes',
    'preis.l3': 'Render con Blender sin límite, en tu Mac', 'preis.l4': 'Todas las actualizaciones',
    'preis.knopf': 'Empezar suscripción',
    'studio.l1': 'Todo lo de Pro, sin límites: IA, renders con IA, búsqueda web',
    'studio.l2': 'Asesoría personal: un arquitecto por teléfono o vídeo cuando lo necesites',
    'studio.l3': 'Ayuda de modelado: construimos o preparamos tu proyecto contigo',
    'studio.l4': 'Tus peticiones para Forma van primero', 'studio.knopf': 'Solicitar Studio',
    'preis.garantie': '¿No te convence tras tres meses? Te devolvemos todo. Vale para los dos planes.',
    'faq.titel': 'Preguntas',
    'faq.1f': '¿Qué necesito?', 'faq.1': 'Un Mac con macOS 13 o posterior e internet para la IA. Para renders, Forma instala Blender desde blender.org con un clic.',
    'faq.2f': '¿Hay versión para Windows?', 'faq.2': 'Todavía no. Forma funciona en el Mac. Escríbenos si quieres Windows, llevamos la cuenta.',
    'faq.3f': '¿Dónde están mis datos?', 'faq.3': 'En tu Mac. Proyectos, modelos y renders se quedan en local. A la IA solo va el texto de tu chat y, si lo pides, la imagen para un render con IA.',
    'faq.4f': '¿Necesito mi propia clave de IA?', 'faq.4': 'No. La IA está incluida en la suscripción. Si tienes claves propias (OpenAI, Gemini, Groq, OpenRouter, Ollama), puedes introducirlas en Ajustes.',
    'faq.5f': '¿Tengo que saber Blender?', 'faq.5': 'No. Forma ajusta cámara, luz y materiales por sí misma y ejecuta Blender en segundo plano. Tú solo ves la imagen.',
    'faq.6f': '¿Cómo cancelo?', 'faq.6': 'En cualquier momento con un correo. La suscripción sigue hasta fin de mes y luego termina. Tus archivos se quedan contigo.',
    'fuss.impressum': 'Aviso legal', 'fuss.datenschutz': 'Privacidad', 'fuss.kontakt': 'Contacto'
  }
};

// Sprache: ?lang= in der Adresse, sonst die Wahl aus diesem Besuch, sonst die Sprache des Geräts (Browsersprachen der Reihe nach), sonst Englisch.
// Die Wahl gilt nur für den Besuch (sessionStorage): beim nächsten Mal zählt wieder die Sprache des Geräts.
function spracheWaehlen() {
  const url = new URLSearchParams(location.search).get('lang');
  if (url && TEXTE[url]) return url;
  try { const g = sessionStorage.getItem('forma.lang'); if (g && TEXTE[g]) return g; } catch {}
  for (const l of navigator.languages || [navigator.language || 'en']) { const k = l.slice(0, 2).toLowerCase(); if (TEXTE[k]) return k; }
  return 'en';
}

function anwenden(lang, merken) {
  const t = TEXTE[lang];
  document.documentElement.lang = lang;
  for (const el of document.querySelectorAll('[data-i18n]')) {
    const s = t[el.dataset.i18n]; if (s == null) continue;
    if (el.tagName === 'META') el.content = s; else el.textContent = s;
  }
  for (const el of document.querySelectorAll('[data-i18n-alt]')) { const s = t[el.dataset.i18nAlt]; if (s) el.alt = s; }
  for (const el of document.querySelectorAll('[data-i18n-ph]')) { const s = t[el.dataset.i18nPh]; if (s) el.placeholder = s; }
  for (const el of document.querySelectorAll('[data-sprache]')) el.classList.toggle('on', el.dataset.sprache === lang);   // ganze Textblöcke (Impressum, Datenschutz)
  for (const b of document.querySelectorAll('.sprachen button')) b.classList.toggle('on', b.dataset.lang === lang);
  if (merken) try { sessionStorage.setItem('forma.lang', lang); } catch {}
}

const alle = (sel, f) => { for (const el of document.querySelectorAll(sel)) f(el); };
alle('[data-produkt]', el => el.textContent = PRODUKT);
alle('[data-i18n]', el => el.textContent = el.textContent.replaceAll('Forma', PRODUKT));
alle('[data-download="arm"]', el => el.href = DOWNLOAD_ARM);
alle('[data-download="x64"]', el => el.href = DOWNLOAD_X64);
alle('[data-checkout]', el => el.href = CHECKOUT[el.dataset.checkout] || CHECKOUT.pro);
alle('[data-jahr]', el => el.textContent = new Date().getFullYear());
for (const lang of Object.keys(TEXTE)) for (const k of Object.keys(TEXTE[lang])) TEXTE[lang][k] = TEXTE[lang][k].replaceAll('Forma', PRODUKT);

anwenden(spracheWaehlen(), false);
document.querySelector('.sprachen')?.addEventListener('click', e => { const b = e.target.closest('button[data-lang]'); if (b) anwenden(b.dataset.lang, true); });
