// Forma · Website: Sprache (de, en, es), Konstanten für Name und Links. Kein Framework.
'use strict';

const PRODUKT = 'Forma';          // Name, später austauschbar
const DOWNLOAD_ARM = 'https://github.com/tassilodlts/forma-app/releases/latest/download/Forma-Apple-Silicon.dmg';         // Mac, Apple Silicon (.dmg)
const DOWNLOAD_X64 = 'https://github.com/tassilodlts/forma-app/releases/latest/download/Forma-Intel.dmg';         // Mac, Intel (.dmg)
const CHECKOUT = { pro: 'mailto:tassilodlts@gmail.com?subject=Forma%20Pro', studio: 'mailto:tassilodlts@gmail.com?subject=Forma%20Studio' };   // Abo starten je Plan (später Paddle)

const TEXTE = {
  de: {
    meta: 'Beschreib dein Haus. Forma baut es. Modellieren mit Sprache für Architekten, auf dem Mac.',
    'nav.funktionen': 'Funktionen', 'nav.preis': 'Preis', 'nav.faq': 'Fragen',
    'held.titel1': 'Beschreib dein Haus.', 'held.titel2': 'Forma baut es.',
    'held.text': 'Du schreibst, was du willst. Forma setzt echte Bauteile, rendert auf deinem Mac und schreibt die Pläne als PDF.',
    'held.ladenArm': 'Laden für Mac (Apple Silicon)', 'held.ladenX64': 'Laden für Mac (Intel)',
    'held.klein': 'macOS 13 oder neuer. Ab 45 € im Monat. Nach drei Monaten nicht zufrieden? Alles zurück.',
    'bild.app': 'Die App: Chat links, Modell rechts, Einstellungen in der App.',
    'bild.render': 'Rendering mit Blender Cycles, berechnet auf dem eigenen Mac.',
    'bild.tafel': 'Wettbewerbsbild aus Forma, Projekt FIVE CLEARINGS, Vancouver.',
    'schritte.titel': 'So geht es',
    'schritte.1t': 'Laden', 'schritte.1': 'Die App laden, in den Programme-Ordner ziehen, öffnen.',
    'schritte.2t': 'Lizenz eintragen', 'schritte.2': 'Den Schlüssel aus deiner Bestätigungsmail in die Einstellungen kopieren.',
    'schritte.3t': 'Beschreiben', 'schritte.3': 'Im Chat schreiben: „Zwei Geschosse, Flachdach, Fenster nach Süden.“ Forma baut die Bauteile.',
    'schritte.4t': 'Rendern', 'schritte.4': 'Blick wählen, Stimmung wählen, rendern. Pläne als PDF, Modell als 3dm oder IFC.',
    'fkt.titel': 'Was Forma kann',
    'fkt.1t': 'Echte Bauteile', 'fkt.1': 'Wände, Decken, Stützen, Fenster, Treppen. Mit Maßen, Schichten und Mengen, nicht nur Flächen.',
    'fkt.2t': 'Rhino-Befehle', 'fkt.2': 'Wer Rhino kennt, tippt die bekannten Befehle. Der Chat versteht beides.',
    'fkt.3t': 'Export 3dm und IFC', 'fkt.3': 'Das Modell geht weiter nach Rhino, Revit, ArchiCAD oder zum Tragwerksplaner.',
    'fkt.4t': 'Rendering auf deinem Mac', 'fkt.4': 'Blender Cycles läuft lokal, so oft du willst. Dazu KI-Renderings für Stimmung und Vegetation.',
    'fkt.5t': 'Pläne als PDF', 'fkt.5': 'Grundrisse, Schnitte, Ansichten und Tafeln kommen fertig aus dem Modell.',
    'fkt.6t': 'Vom Handy und aus dem Terminal', 'fkt.6': 'Unterwegs im Browser bedienen. Oder aus Claude Code, Codex und Gemini CLI steuern.',
    'preis.titel': 'Zwei Pläne', 'preis.einheit': 'im Monat zzgl. MwSt.',
    'studio.l1': 'Alles aus Pro, ohne Grenzen: KI, KI-Renderings, Websuche',
    'studio.l2': 'Persönliche Beratung: Architekt am Telefon oder per Video, wenn du sie brauchst',
    'studio.l3': 'Modellierungshilfe: Wir bauen oder richten dein Projekt mit dir ein',
    'studio.l4': 'Wünsche an Forma kommen zuerst dran', 'studio.knopf': 'Studio anfragen',
    'preis.l1': 'KI für das Modell, unbegrenzt', 'preis.l2': '60 KI-Renderings im Monat',
    'preis.l3': 'Blender-Rendering unbegrenzt, auf deinem Mac', 'preis.l4': 'Alle Updates',
    'preis.knopf': 'Abo starten',
    'preis.garantie': 'Nach drei Monaten nicht zufrieden? Du bekommst alles zurück. Gilt für beide Pläne.',
    'faq.titel': 'Fragen',
    'faq.1f': 'Was brauche ich?', 'faq.1': 'Einen Mac mit macOS 13 oder neuer und Internet für die KI. Für Renderings installiert Forma Blender von blender.org, ein Klick genügt.',
    'faq.2f': 'Gibt es Forma für Windows?', 'faq.2': 'Noch nicht. Forma läuft auf dem Mac. Schreib uns, wenn du eine Windows-Version willst, wir zählen mit.',
    'faq.3f': 'Wo liegen meine Daten?', 'faq.3': 'Auf deinem Mac. Projekte, Modelle und Renderings bleiben lokal. An die KI gehen nur die Texte deines Chats und, wenn du es willst, das Bild für ein KI-Rendering.',
    'faq.4f': 'Brauche ich einen eigenen KI-Schlüssel?', 'faq.4': 'Nein. Im Abo ist die KI enthalten. Wer eigene Schlüssel hat (OpenAI, Gemini, Groq, OpenRouter, Ollama), kann sie in den Einstellungen eintragen.',
    'faq.5f': 'Muss ich Blender kennen?', 'faq.5': 'Nein. Forma stellt Kamera, Licht und Materialien selbst ein und startet Blender im Hintergrund. Du siehst nur das Bild.',
    'faq.6f': 'Wie kündige ich?', 'faq.6': 'Jederzeit mit einem Klick im Kundenkonto. Das Abo läuft bis zum Monatsende, danach ist Schluss. Deine Dateien bleiben bei dir.',
    'fuss.impressum': 'Impressum', 'fuss.datenschutz': 'Datenschutz'
  },
  en: {
    meta: 'Describe your building. Forma builds it. Language-driven modelling for architects, on the Mac.',
    'nav.funktionen': 'Features', 'nav.preis': 'Pricing', 'nav.faq': 'FAQ',
    'held.titel1': 'Describe your building.', 'held.titel2': 'Forma builds it.',
    'held.text': 'You write what you want. Forma places real building elements, renders on your Mac and writes the drawings as PDF.',
    'held.ladenArm': 'Download for Mac (Apple Silicon)', 'held.ladenX64': 'Download for Mac (Intel)',
    'held.klein': 'macOS 13 or newer. From €45 a month. Not happy after three months? Full refund.',
    'bild.app': 'The app: chat on the left, model on the right, settings inside the app.',
    'bild.render': 'Rendering with Blender Cycles, computed on your own Mac.',
    'bild.tafel': 'Competition image made in Forma, project FIVE CLEARINGS, Vancouver.',
    'schritte.titel': 'How it works',
    'schritte.1t': 'Download', 'schritte.1': 'Download the app, drag it to Applications, open it.',
    'schritte.2t': 'Enter your licence', 'schritte.2': 'Copy the key from your confirmation email into Settings.',
    'schritte.3t': 'Describe', 'schritte.3': 'Type in the chat: "Two storeys, flat roof, windows facing south." Forma builds the elements.',
    'schritte.4t': 'Render', 'schritte.4': 'Pick a view, pick a mood, render. Drawings as PDF, model as 3dm or IFC.',
    'fkt.titel': 'What Forma does',
    'fkt.1t': 'Real building elements', 'fkt.1': 'Walls, slabs, columns, windows, stairs. With dimensions, layers and quantities, not just surfaces.',
    'fkt.2t': 'Rhino commands', 'fkt.2': 'If you know Rhino, type the commands you know. The chat understands both.',
    'fkt.3t': 'Export 3dm and IFC', 'fkt.3': 'The model moves on to Rhino, Revit, ArchiCAD or your structural engineer.',
    'fkt.4t': 'Rendering on your Mac', 'fkt.4': 'Blender Cycles runs locally, as often as you like. Plus AI renderings for mood and vegetation.',
    'fkt.5t': 'Drawings as PDF', 'fkt.5': 'Plans, sections, elevations and boards come straight from the model.',
    'fkt.6t': 'From your phone and the terminal', 'fkt.6': 'Use it in the browser on the go. Or drive it from Claude Code, Codex and Gemini CLI.',
    'preis.titel': 'Two plans', 'preis.einheit': 'per month plus VAT',
    'studio.l1': 'Everything in Pro, no limits: AI, AI renderings, web search',
    'studio.l2': 'Personal advice: an architect by phone or video whenever you need one',
    'studio.l3': 'Modelling help: we build or set up your project with you',
    'studio.l4': 'Your requests for Forma come first', 'studio.knopf': 'Ask for Studio',
    'preis.l1': 'AI for the model, unlimited', 'preis.l2': '60 AI renderings per month',
    'preis.l3': 'Unlimited Blender rendering, on your Mac', 'preis.l4': 'All updates',
    'preis.knopf': 'Start subscription',
    'preis.garantie': 'Not happy after three months? You get everything back. Applies to both plans.',
    'faq.titel': 'Questions',
    'faq.1f': 'What do I need?', 'faq.1': 'A Mac with macOS 13 or newer and internet for the AI. For renderings Forma installs Blender from blender.org, one click is enough.',
    'faq.2f': 'Is there a Windows version?', 'faq.2': 'Not yet. Forma runs on the Mac. Let us know if you want a Windows version, we are keeping count.',
    'faq.3f': 'Where is my data?', 'faq.3': 'On your Mac. Projects, models and renderings stay local. Only your chat text goes to the AI, and the image for an AI rendering if you ask for one.',
    'faq.4f': 'Do I need my own AI key?', 'faq.4': 'No. The AI is included in the subscription. If you have your own keys (OpenAI, Gemini, Groq, OpenRouter, Ollama), you can enter them in Settings.',
    'faq.5f': 'Do I need to know Blender?', 'faq.5': 'No. Forma sets camera, light and materials itself and runs Blender in the background. You only see the image.',
    'faq.6f': 'How do I cancel?', 'faq.6': 'Any time with one click in your account. The subscription runs until the end of the month, then it stops. Your files stay with you.',
    'fuss.impressum': 'Legal notice', 'fuss.datenschutz': 'Privacy'
  },
  es: {
    meta: 'Describe tu casa. Forma la construye. Modelado con lenguaje natural para arquitectos, en el Mac.',
    'nav.funktionen': 'Funciones', 'nav.preis': 'Precio', 'nav.faq': 'Preguntas',
    'held.titel1': 'Describe tu casa.', 'held.titel2': 'Forma la construye.',
    'held.text': 'Escribes lo que quieres. Forma coloca elementos constructivos reales, renderiza en tu Mac y genera los planos en PDF.',
    'held.ladenArm': 'Descargar para Mac (Apple Silicon)', 'held.ladenX64': 'Descargar para Mac (Intel)',
    'held.klein': 'macOS 13 o posterior. Desde 45 € al mes. ¿No te convence tras tres meses? Te devolvemos todo.',
    'bild.app': 'La app: chat a la izquierda, modelo a la derecha, ajustes dentro de la app.',
    'bild.render': 'Render con Blender Cycles, calculado en tu propio Mac.',
    'bild.tafel': 'Imagen de concurso hecha en Forma, proyecto FIVE CLEARINGS, Vancouver.',
    'schritte.titel': 'Cómo funciona',
    'schritte.1t': 'Descargar', 'schritte.1': 'Descarga la app, arrástrala a Aplicaciones, ábrela.',
    'schritte.2t': 'Introducir la licencia', 'schritte.2': 'Copia la clave de tu correo de confirmación en Ajustes.',
    'schritte.3t': 'Describir', 'schritte.3': 'Escribe en el chat: «Dos plantas, cubierta plana, ventanas al sur.» Forma construye los elementos.',
    'schritte.4t': 'Renderizar', 'schritte.4': 'Elige la vista, elige el ambiente, renderiza. Planos en PDF, modelo en 3dm o IFC.',
    'fkt.titel': 'Qué hace Forma',
    'fkt.1t': 'Elementos constructivos reales', 'fkt.1': 'Muros, losas, pilares, ventanas, escaleras. Con medidas, capas y cantidades, no solo superficies.',
    'fkt.2t': 'Comandos de Rhino', 'fkt.2': 'Si conoces Rhino, escribe los comandos de siempre. El chat entiende ambos.',
    'fkt.3t': 'Exportar 3dm e IFC', 'fkt.3': 'El modelo pasa a Rhino, Revit, ArchiCAD o al ingeniero de estructuras.',
    'fkt.4t': 'Render en tu Mac', 'fkt.4': 'Blender Cycles funciona en local, tantas veces como quieras. Además, renders con IA para ambiente y vegetación.',
    'fkt.5t': 'Planos en PDF', 'fkt.5': 'Plantas, secciones, alzados y paneles salen listos del modelo.',
    'fkt.6t': 'Desde el móvil y la terminal', 'fkt.6': 'Úsalo en el navegador donde estés. O contrólalo desde Claude Code, Codex y Gemini CLI.',
    'preis.titel': 'Dos planes', 'preis.einheit': 'al mes más IVA',
    'studio.l1': 'Todo lo de Pro, sin límites: IA, renders con IA, búsqueda web',
    'studio.l2': 'Asesoría personal: un arquitecto por teléfono o vídeo cuando lo necesites',
    'studio.l3': 'Ayuda de modelado: construimos o preparamos tu proyecto contigo',
    'studio.l4': 'Tus peticiones para Forma van primero', 'studio.knopf': 'Solicitar Studio',
    'preis.l1': 'IA para el modelo, sin límite', 'preis.l2': '60 renders con IA al mes',
    'preis.l3': 'Render con Blender sin límite, en tu Mac', 'preis.l4': 'Todas las actualizaciones',
    'preis.knopf': 'Empezar suscripción',
    'preis.garantie': '¿No te convence tras tres meses? Te devolvemos todo. Vale para los dos planes.',
    'faq.titel': 'Preguntas',
    'faq.1f': '¿Qué necesito?', 'faq.1': 'Un Mac con macOS 13 o posterior e internet para la IA. Para renders, Forma instala Blender desde blender.org con un clic.',
    'faq.2f': '¿Hay versión para Windows?', 'faq.2': 'Todavía no. Forma funciona en el Mac. Escríbenos si quieres Windows, llevamos la cuenta.',
    'faq.3f': '¿Dónde están mis datos?', 'faq.3': 'En tu Mac. Proyectos, modelos y renders se quedan en local. A la IA solo va el texto de tu chat y, si lo pides, la imagen para un render con IA.',
    'faq.4f': '¿Necesito mi propia clave de IA?', 'faq.4': 'No. La IA está incluida en la suscripción. Si tienes claves propias (OpenAI, Gemini, Groq, OpenRouter, Ollama), puedes introducirlas en Ajustes.',
    'faq.5f': '¿Tengo que saber Blender?', 'faq.5': 'No. Forma ajusta cámara, luz y materiales por sí misma y ejecuta Blender en segundo plano. Tú solo ves la imagen.',
    'faq.6f': '¿Cómo cancelo?', 'faq.6': 'En cualquier momento con un clic en tu cuenta. La suscripción sigue hasta fin de mes y luego termina. Tus archivos se quedan contigo.',
    'fuss.impressum': 'Aviso legal', 'fuss.datenschutz': 'Privacidad'
  }
};

function spracheWaehlen() {
  const url = new URLSearchParams(location.search).get('lang');
  if (url && TEXTE[url]) return url;
  try { const g = localStorage.getItem('forma.lang'); if (g && TEXTE[g]) return g; } catch {}
  const nav = (navigator.language || 'en').slice(0, 2).toLowerCase();
  return TEXTE[nav] ? nav : 'en';
}

function anwenden(lang) {
  const t = TEXTE[lang];
  document.documentElement.lang = lang;
  for (const el of document.querySelectorAll('[data-i18n]')) {
    const s = t[el.dataset.i18n]; if (s == null) continue;
    if (el.tagName === 'META') el.content = s; else el.textContent = s;
  }
  for (const el of document.querySelectorAll('[data-i18n-alt]')) { const s = t[el.dataset.i18nAlt]; if (s) el.alt = s; }
  for (const b of document.querySelectorAll('.sprachen button')) b.classList.toggle('on', b.dataset.lang === lang);
  document.title = PRODUKT;
  try { localStorage.setItem('forma.lang', lang); } catch {}
  try { const u = new URL(location.href); u.searchParams.set('lang', lang); history.replaceState(null, '', u); } catch {}
}

for (const el of document.querySelectorAll('[data-produkt]')) el.textContent = PRODUKT;
for (const el of document.querySelectorAll('[data-i18n]')) el.textContent = el.textContent.replaceAll('Forma', PRODUKT);
document.querySelector('[data-download="arm"]').href = DOWNLOAD_ARM;
document.querySelector('[data-download="x64"]').href = DOWNLOAD_X64;
for (const el of document.querySelectorAll('[data-checkout]')) el.href = CHECKOUT[el.dataset.checkout] || CHECKOUT.pro;
document.querySelector('[data-jahr]').textContent = new Date().getFullYear();
for (const lang of Object.keys(TEXTE)) for (const k of Object.keys(TEXTE[lang])) TEXTE[lang][k] = TEXTE[lang][k].replaceAll('Forma', PRODUKT);

anwenden(spracheWaehlen());
document.querySelector('.sprachen').addEventListener('click', e => { const b = e.target.closest('button[data-lang]'); if (b) anwenden(b.dataset.lang); });
