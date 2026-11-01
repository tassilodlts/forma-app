// Forma · Website: Sprich mit dem Modell (three.js, Draco-GLB aus tools/web_glb.mjs und tools/web_obj_glb.mjs).
// Ein Renderer, zwei Modelle als Reiter. Statt Knöpfen ein Satz: Vorschläge (Chips mit fester Aktion) oder freier Text. Freier Text wird zuerst
// hier mit Stichwörtern (de, en, es) gedeutet, sonst fragt die Seite Forma Cloud (/demo/modell), die ein Sprachmodell auf dieselben Aktionen abbildet.
// Aktionen: Modell, Zustand (1913 / 2026), Gruppen ein und aus, Schnitt (Geschoss: alles darüber fällt weg; längs, quer), Kamera (Perspektive,
// Axonometrie), Blick. Rückseiten geschlossener Körper werden dunkel gezeichnet, so wirkt die Schnittfläche gefüllt. Lädt erst, wenn sichtbar.
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const wrap = document.querySelector('#modell'); if (!wrap) throw new Error('kein #modell');
const canvas = wrap.querySelector('canvas'), status = wrap.querySelector('.m-status'), fehler = wrap.querySelector('.m-fehler'), frage = wrap.querySelector('.m-frage');
const DRACO = 'https://cdn.jsdelivr.net/npm/three@0.170.0/examples/jsm/libs/draco/';
const CLOUD = 'https://cloud.portantica.net/demo/modell';
const FOV = 38;

// Koordinaten: X nach Osten, Y nach oben, Z nach Süden (Norden ist -Z). Schnittebene [nx, ny, nz, c]: sichtbar bleibt, was n·p + c >= 0 erfüllt.
const MODELLE = {
  muenchen: {
    basis: 'modell/muenchen/', dateien: { bestand: 'bestand.glb', vorschlag: 'vorschlag.glb', einrichtung: 'einrichtung.glb', umgebung: 'umgebung.glb', baeume: 'baeume.glb' },
    zustaende: { 1913: { bestand: true, vorschlag: false, einrichtung: false }, 2026: { bestand: false, vorschlag: true, einrichtung: true } }, zustand: '2026',
    nah: 0.5, fern: 600, nahst: 2, fernst: 150, start: 'strasse',
    blicke: { strasse: { pos: [21, 11, 24], ziel: [1, 3, 0] }, garten: { pos: [-16, 9, -23], ziel: [0, 3, 0] }, oben: { pos: [0.01, 42, 0], ziel: [0, 0, 0] } },
    schnitte: { ug: [0, -1, 0, -1.3], eg: [0, -1, 0, 1.3], og: [0, -1, 0, 4.5], dg: [0, -1, 0, 7.6], laengs: [1, 0, 0, 4.32], quer: [0, 0, -1, -0.51] },   // längs durch die Treppe (x = 1,6 m), quer durch die Mitte (y = 5,5 m)
  },
  vancouver: {
    basis: 'modell/vancouver/', dateien: { tragwerk: 'tragwerk.glb', gebaeude: 'gebaeude.glb', stadt: 'stadt.glb', pflanzen: 'pflanzen.glb' },
    baeume: { standorte: 'baeume.json', vorlagen: 'baeume_vorlagen.glb', gruppe: 'pflanzen' }, boden: { r: 1400, y: -0.3 },
    nah: 1, fern: 6000, nahst: 30, fernst: 2500, start: 'block',
    blicke: { block: { pos: [520, 380, 620], ziel: [0, 110, 0] }, turm: { pos: [260, 160, 300], ziel: [0, 150, 0] }, sockel: { pos: [150, 70, 190], ziel: [0, 20, 0] }, oben: { pos: [0.01, 900, 0], ziel: [0, 0, 0] } },
    schnitte: { eg: [0, -1, 0, 6], og: [0, -1, 0, 60], laengs: [-1, 0, 0, 0] },
  },
};

// Antworten je Sprache: was die Seite nach einer Aktion sagt
const SAGT = {
  de: { schnitt: { kein: 'Schnitt zu.', ug: 'Untergeschoss aufgeschnitten.', eg: 'Erdgeschoss aufgeschnitten.', og: 'Obergeschoss aufgeschnitten.', dg: 'Dachgeschoss aufgeschnitten.', laengs: 'Längsschnitt.', quer: 'Querschnitt.' }, zustand: { 1913: 'So war es 1913.', 2026: 'Der Umbau 2026.' }, kamera: { axo: 'Axonometrie.', persp: 'Perspektive.' }, blick: { strasse: 'Blick von der Straße.', garten: 'Blick aus dem Garten.', oben: 'Von oben.', block: 'Der ganze Block.', turm: 'Der Turm.', sockel: 'Der Sockel.' }, an: 'eingeblendet', aus: 'ausgeblendet', gruppen: { bestand: 'Bestand', vorschlag: 'Umbau', einrichtung: 'Einrichtung', umgebung: 'Nachbarn', baeume: 'Bäume', tragwerk: 'Tragwerk', gebaeude: 'Gebäude', stadt: 'Stadt', pflanzen: 'Bäume' }, modell: { muenchen: 'Walhallastraße 8, München.', vancouver: 'FIVE CLEARINGS, Vancouver.' }, schnitt60: 'Bei 60 Metern geschnitten.', alles: 'Alles zurück.', unklar: 'Das habe ich nicht verstanden. Versuch zum Beispiel: „Schneide das Erdgeschoss auf“ oder „ohne Bäume“.', denkt: 'Moment …' },
  en: { schnitt: { kein: 'Cut closed.', ug: 'Basement cut open.', eg: 'Ground floor cut open.', og: 'First floor cut open.', dg: 'Attic cut open.', laengs: 'Lengthwise section.', quer: 'Cross section.' }, zustand: { 1913: 'As it was in 1913.', 2026: 'The 2026 proposal.' }, kamera: { axo: 'Axonometric.', persp: 'Perspective.' }, blick: { strasse: 'View from the street.', garten: 'View from the garden.', oben: 'From above.', block: 'The whole block.', turm: 'The tower.', sockel: 'The podium.' }, an: 'shown', aus: 'hidden', gruppen: { bestand: 'As built', vorschlag: 'Proposal', einrichtung: 'Furniture', umgebung: 'Neighbours', baeume: 'Trees', tragwerk: 'Structure', gebaeude: 'Building', stadt: 'City', pflanzen: 'Trees' }, modell: { muenchen: 'Walhallastraße 8, Munich.', vancouver: 'FIVE CLEARINGS, Vancouver.' }, schnitt60: 'Cut at 60 metres.', alles: 'Everything back.', unklar: 'I did not get that. Try “cut open the ground floor” or “without trees”.', denkt: 'One moment …' },
  es: { schnitt: { kein: 'Corte cerrado.', ug: 'Sótano abierto.', eg: 'Planta baja abierta.', og: 'Primera planta abierta.', dg: 'Ático abierto.', laengs: 'Sección longitudinal.', quer: 'Sección transversal.' }, zustand: { 1913: 'Así era en 1913.', 2026: 'La propuesta de 2026.' }, kamera: { axo: 'Axonometría.', persp: 'Perspectiva.' }, blick: { strasse: 'Vista desde la calle.', garten: 'Vista desde el jardín.', oben: 'Desde arriba.', block: 'Toda la manzana.', turm: 'La torre.', sockel: 'El podio.' }, an: 'visible', aus: 'oculto', gruppen: { bestand: 'Estado original', vorschlag: 'Propuesta', einrichtung: 'Mobiliario', umgebung: 'Vecinos', baeume: 'Árboles', tragwerk: 'Estructura', gebaeude: 'Edificio', stadt: 'Ciudad', pflanzen: 'Árboles' }, modell: { muenchen: 'Walhallastraße 8, Múnich.', vancouver: 'FIVE CLEARINGS, Vancouver.' }, schnitt60: 'Cortado a 60 metros.', alles: 'Todo como al principio.', unklar: 'No lo he entendido. Prueba «abre la planta baja» o «sin árboles».', denkt: 'Un momento …' },
};
const sprache = () => SAGT[document.documentElement.lang] ? document.documentElement.lang : 'en';

let renderer, scene, camera, controls, sichtbar = false, gestartet = false, aktiv = null, axo = false;
const loader = new GLTFLoader(), draco = new DRACOLoader(); draco.setDecoderPath(DRACO); loader.setDRACOLoader(draco);
const SCHNITT = new THREE.MeshBasicMaterial({ color: 0x1c1c1c, side: THREE.BackSide });
const leisten = () => wrap.querySelectorAll('[data-leiste]');

function start() {
  if (gestartet) return; gestartet = true;
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2)); renderer.outputColorSpace = THREE.SRGBColorSpace;
  scene = new THREE.Scene(); scene.background = new THREE.Color(0xffffff);
  scene.add(new THREE.HemisphereLight(0xffffff, 0xb8b8b8, 1.15));
  const sonne = new THREE.DirectionalLight(0xffffff, 1.5); sonne.position.set(300, 500, 200); scene.add(sonne);
  const s2 = new THREE.DirectionalLight(0xffffff, 0.5); s2.position.set(-200, 300, -400); scene.add(s2);
  for (const [name, m] of Object.entries(MODELLE)) {
    m.name = name; m.wurzel = new THREE.Group(); m.wurzel.visible = false; m.gruppen = {}; m.sichtbar = Object.fromEntries(Object.keys(m.dateien).map(k => [k, true])); m.schnittflaechen = []; m.schnitt = null; scene.add(m.wurzel);
    if (m.boden) { const b = new THREE.Mesh(new THREE.CircleGeometry(m.boden.r, 96), new THREE.MeshBasicMaterial({ color: 0xf2f2f2 })); b.rotation.x = -Math.PI / 2; b.position.y = m.boden.y; m.wurzel.add(b); }
  }
  addEventListener('resize', groesse);
  const reiter = wrap.querySelector('.m-reiter button.on') || wrap.querySelector('.m-reiter button');
  aktiviere(reiter ? reiter.dataset.modell : Object.keys(MODELLE)[0]);
  schleife();
}
function schleife() { requestAnimationFrame(schleife); if (!sichtbar || !aktiv) return; controls?.update(); renderer.render(scene, camera); }
function groesse() {
  const w = canvas.clientWidth, h = canvas.clientHeight; renderer.setSize(w, h, false);
  if (camera?.isOrthographicCamera) { const r = camera.userData.r, a = w / h; camera.left = -r * a; camera.right = r * a; camera.top = r; camera.bottom = -r; }
  else if (camera) camera.aspect = w / h;
  camera?.updateProjectionMatrix();
}
function melde(t) { if (status) status.textContent = t || ''; }

// Modell wechseln: Reiter, Chips, Wurzel, Kamera, Schnitt
function aktiviere(name) {
  const m = MODELLE[name]; if (!m || m === aktiv) return;
  if (aktiv) aktiv.wurzel.visible = false;
  aktiv = m; m.wurzel.visible = true;
  for (const b of wrap.querySelectorAll('.m-reiter button')) b.classList.toggle('on', b.dataset.modell === name);
  for (const l of leisten()) l.hidden = l.dataset.leiste !== name;
  blick(m.start); schnitt(m.schnitt || 'kein');
  for (const k of Object.keys(m.dateien)) zeige(k);
  if (m.baeume) ladeBaeume(m);
}
// Sichtbar ist eine Gruppe, wenn ihr Schalter an ist; Gruppen des Zustands folgen dem Zustand
function sollSichtbar(k) { const m = aktiv; if (m.zustaende) { const z = m.zustaende[m.zustand]; if (k in z && !z[k]) return false; } return m.sichtbar[k] !== false; }
function zustand(z) { const m = aktiv; if (!m.zustaende?.[z]) return; m.zustand = z; for (const k of Object.keys(m.dateien)) zeige(k); }
function zeige(k) { const m = aktiv, soll = sollSichtbar(k); if (m.gruppen[k]) m.gruppen[k].visible = soll; else if (soll) lade(k); if (m.baumNetz && m.baeume?.gruppe === k) m.baumNetz.visible = soll; }

async function lade(k) {
  const m = aktiv; if (m.gruppen[k]) return;
  const g = m.gruppen[k] = new THREE.Group(); g.visible = true; m.wurzel.add(g);
  melde('…');
  try {
    const d = await loader.loadAsync(m.basis + m.dateien[k]);
    const netze = []; d.scene.traverse(o => { if (o.isMesh) netze.push(o); });   // erst sammeln: die Schnittflächen kommen als Kinder dazu
    for (const o of netze) {
      const glas = o.material.name === 'glas';
      o.material = new THREE.MeshLambertMaterial({ vertexColors: true, flatShading: true, transparent: glas, opacity: glas ? 0.35 : 1, side: THREE.DoubleSide, depthWrite: !glas });
      o.frustumCulled = false;
      if (!glas) { const s = new THREE.Mesh(o.geometry, SCHNITT); s.frustumCulled = false; s.visible = !!renderer.clippingPlanes.length; o.add(s); m.schnittflaechen.push(s); }
    }
    g.add(d.scene); g.visible = m === aktiv ? sollSichtbar(k) : true; if (status?.textContent === '…') melde('');
  } catch (e) { melde(fehler?.textContent || 'Fehler'); console.error(e); }
}
// Bäume (Vancouver): die Bibliotheksbäume aus Forma als Vorlagen (Rinde, Kronen), an jedem Standort mit Maßstab und Drehung instanziert
async function ladeBaeume(m) {
  if (m.baumNetz) return; m.baumNetz = new THREE.Group(); m.wurzel.add(m.baumNetz);
  try {
    const [B, d] = await Promise.all([(await fetch(m.basis + m.baeume.standorte)).json(), loader.loadAsync(m.basis + m.baeume.vorlagen)]);
    const geo = {}; d.scene.traverse(o => { if (o.isMesh) geo[o.parent?.name || o.name] = o.geometry; });
    const je = {}; for (const b of B) (je[b[0]] ||= []).push(b);
    const mat = new THREE.MeshLambertMaterial({ vertexColors: true, flatShading: true, side: THREE.DoubleSide });
    const M = new THREE.Matrix4(), q = new THREE.Quaternion(), p = new THREE.Vector3(), s = new THREE.Vector3(), ax = new THREE.Vector3(0, 1, 0);
    for (const [i, L] of Object.entries(je)) {
      const g = geo['b' + i]; if (!g) continue;
      const I = new THREE.InstancedMesh(g, mat, L.length);
      L.forEach(([, x, y, z, sk, r], k) => { q.setFromAxisAngle(ax, r * Math.PI / 180); M.compose(p.set(x, y, z), q, s.set(sk, sk, sk)); I.setMatrixAt(k, M); });
      I.frustumCulled = false; m.baumNetz.add(I);
    }
    m.baumNetz.visible = m.sichtbar[m.baeume.gruppe] !== false;
  } catch (e) { console.error(e); }
}

// Kamera: Perspektive oder Axonometrie (Parallelprojektion), beide frei drehbar; Lage und Ziel bleiben beim Wechsel erhalten
function kamera(pos, ziel) {
  const m = aktiv, w = canvas.clientWidth || 1, h = canvas.clientHeight || 1;
  controls?.dispose();
  if (axo) {
    const r = Math.hypot(pos[0] - ziel[0], pos[1] - ziel[1], pos[2] - ziel[2]) * Math.tan(FOV / 2 * Math.PI / 180);   // gleicher Bildausschnitt wie in der Perspektive
    camera = new THREE.OrthographicCamera(-r * w / h, r * w / h, r, -r, -m.fern, m.fern); camera.userData.r = r;
  } else camera = new THREE.PerspectiveCamera(FOV, w / h, m.nah, m.fern);
  camera.position.set(...pos);
  controls = new OrbitControls(camera, canvas); controls.target.set(...ziel);
  controls.enableDamping = true; controls.dampingFactor = 0.08; controls.maxPolarAngle = Math.PI / 2 - 0.02; controls.minDistance = m.nahst; controls.maxDistance = m.fernst; controls.minZoom = 0.2; controls.maxZoom = 20;
  controls.touches = { ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_PAN }; controls.update();
  camera.updateProjectionMatrix();
}
function blick(name) { const b = aktiv.blicke[name]; if (!b) return false; kamera(b.pos, b.ziel); return true; }
function projektion(art) { if ((art === 'axo') === axo) return; axo = art === 'axo'; kamera(camera.position.toArray(), controls.target.toArray()); }
// Schnitt: Geschoss (alles darüber fällt weg), längs, quer oder keiner
function schnitt(name) {
  const m = aktiv, s = m.schnitte[name]; if (name !== 'kein' && !s) return false; m.schnitt = s ? name : null;
  renderer.clippingPlanes = s ? [new THREE.Plane(new THREE.Vector3(s[0], s[1], s[2]), s[3])] : [];
  for (const mm of Object.values(MODELLE)) for (const f of mm.schnittflaechen || []) f.visible = !!s;
  return true;
}

// Eine Aktion ausführen und sagen, was passiert ist
function tun(a) {
  const T = SAGT[sprache()], gesagt = [];
  if (a.modell && MODELLE[a.modell] && MODELLE[a.modell] !== aktiv) { aktiviere(a.modell); gesagt.push(T.modell[a.modell]); }
  const m = aktiv;
  if (a.alles) { m.zustand = '2026'; for (const k of Object.keys(m.dateien)) m.sichtbar[k] = true; axo = false; blick(m.start); schnitt('kein'); for (const k of Object.keys(m.dateien)) zeige(k); return T.alles; }
  if (a.zustand && m.zustaende?.[String(a.zustand)]) { zustand(String(a.zustand)); gesagt.push(T.zustand[a.zustand]); }
  if (a.gruppen) { const an = [], aus = []; for (const [k, v] of Object.entries(a.gruppen)) { if (!(k in m.dateien)) continue; m.sichtbar[k] = !!v; zeige(k); (v ? an : aus).push(T.gruppen[k] || k); }
    if (an.length) gesagt.push(an.join(', ') + ' ' + T.an + '.'); if (aus.length) gesagt.push(aus.join(', ') + ' ' + T.aus + '.'); }
  if (a.kamera && (a.kamera === 'axo' || a.kamera === 'persp')) { projektion(a.kamera); gesagt.push(T.kamera[a.kamera]); }
  if (a.blick && blick(a.blick)) gesagt.push(T.blick[a.blick]);
  if (a.schnitt && schnitt(a.schnitt)) gesagt.push(m.name === 'vancouver' && a.schnitt === 'og' ? T.schnitt60 : T.schnitt[a.schnitt]);
  return gesagt.join(' ');
}

// Freien Text deuten: Stichwörter in drei Sprachen. Liefert eine Aktion oder null.
const W = {
  neg: /\b(ohne|weg|aus\b|versteck|ausblend|nicht|kein|without|hide|remove|no\b|sin\b|quita|oculta|fuera)/i,
  nur: /\b(nur|only|just|solo|sólo|solamente)\b/i,
  gruppen: { umgebung: /nachbar|neighbo|vecin|umgebung|surround|entorno/i, baeume: /b[äa]um|tree|[áa]rbol|vegeta/i, einrichtung: /einricht|m[öo]bel|furnit|mueble|mobiliar|k[üu]che|kitchen|cocina/i, bestand: /bestand|as built|original|1913/i, vorschlag: /umbau|vorschlag|proposal|propuesta|anbau|extension|2026/i, tragwerk: /tragwerk|struktur|structure|estructura|stahl|steel|acero/i, gebaeude: /geb[äa]ude|building|edificio|fassade|fa[çc]ade|fachada/i, stadt: /stadt|city|ciudad|kontext|context|contexto/i, pflanzen: /b[äa]um|tree|[áa]rbol|pflanz|plant/i },
  schnitt: [['ug', /keller|untergeschoss|basement|s[óo]tano|\bug\b/i], ['eg', /erdgeschoss|ground|planta baja|\beg\b|parterre/i], ['og', /obergeschoss|first floor|1st|primera|\bog\b|60 ?m/i], ['dg', /dach|attic|[áa]tico|\bdg\b|roof/i], ['laengs', /l[äa]ngs|length|longitudinal/i], ['quer', /quer|cross|transversal/i]],
  schnittWort: /schnitt|schneid|cut|section|secci[óo]n|corte|corta|abre|open|auf\b/i,
  schnittZu: /\b(zu|kein|schlie[ßs]|close|none|whole|ganz|cerrar|cierra|ninguno|entero|wieder ganz)\b/i,
  kamera: [['axo', /axo|isometr|parallel/i], ['persp', /perspektiv|perspectiv/i]],
  blick: [['oben', /oben|above|top|arriba|vogel|bird|luft|aerial/i], ['garten', /garten|garden|jard[íi]n/i], ['strasse', /stra[ßs]e|street|calle|eingang|entrance|entrada/i], ['turm', /turm|tower|torre|n[äa]her|closer|cerca/i], ['sockel', /sockel|podium|podio/i], ['block', /block|manzana|ganz|whole|everything|todo|weit|far|lejos/i]],
  modell: [['vancouver', /vancouver|five|turm|tower|torre|hochhaus/i], ['muenchen', /m[üu]nchen|munich|m[úu]nich|villa|walhalla|haus\b|house|casa/i]],
  zustand: [['1913', /1913|bestand|alt\b|früher|damals|as built|original|antes|before|antiguo/i], ['2026', /2026|umbau|vorschlag|proposal|neu|new|propuesta|nuevo|jetzt|now|ahora/i]],
  alles: /\b(alles zur[üu]ck|zur[üu]cksetzen|reset|von vorn|everything back|start over|todo como|reiniciar)\b/i,
};
function deuten(text) {
  const t = text.toLowerCase(); const a = {}; let traf = false;
  if (W.alles.test(t)) return { alles: true };
  for (const [k, re] of W.modell) if (re.test(t) && !(k === 'vancouver' && /turm|tower|torre/.test(t) && aktiv.name === 'vancouver')) { if (MODELLE[k] !== aktiv && /vancouver|five|m[üu]nchen|munich|m[úu]nich|villa|walhalla/i.test(t)) { a.modell = k; traf = true; } break; }
  const m = a.modell ? MODELLE[a.modell] : aktiv;
  for (const [k, re] of W.zustand) if (re.test(t) && m.zustaende) { a.zustand = k; traf = true; break; }
  const neg = W.neg.test(t), nur = W.nur.test(t), g = {};
  for (const [k, re] of Object.entries(W.gruppen)) if (k in m.dateien && re.test(t) && !(a.zustand && (k === 'bestand' || k === 'vorschlag'))) g[k] = !neg;
  if (Object.keys(g).length) { if (nur) for (const k of Object.keys(m.dateien)) if (!(k in g) && !(m.zustaende && (k === 'bestand' || k === 'vorschlag'))) g[k] = false; a.gruppen = g; traf = true; }
  if (W.schnittWort.test(t)) {   // nur mit Schnittwort: „mach aus dem Dach eine Terrasse“ ist kein Schnitt
    if (W.schnittZu.test(t) && !/auf\b|open|abre/i.test(t)) { a.schnitt = 'kein'; traf = true; }
    else for (const [k, re] of W.schnitt) if (re.test(t) && m.schnitte[k]) { a.schnitt = k; traf = true; break; }
  }
  for (const [k, re] of W.kamera) if (re.test(t)) { a.kamera = k; traf = true; break; }
  for (const [k, re] of W.blick) if (re.test(t) && m.blicke[k]) { a.blick = k; traf = true; break; }
  return traf ? a : null;
}
// Freier Text: erst hier deuten, sonst Forma Cloud fragen
async function sagen(text) {
  text = (text || '').trim(); if (!text) return;
  const T = SAGT[sprache()]; let a = deuten(text);
  if (!a) {
    melde(T.denkt);
    try {
      const r = await fetch(CLOUD, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text, modell: aktiv.name, lang: sprache() }) });
      const j = await r.json(); if (j.aktionen && Object.keys(j.aktionen).length) { a = j.aktionen; a.antwort = j.antwort; }
      else if (j.antwort) { melde(j.antwort); return; }   // nichts zu tun, aber eine Erklärung (zum Beispiel: Umbauen kann nur die App)
    } catch (e) { console.warn('Cloud nicht erreichbar', e); }
  }
  if (!a) { melde(T.unklar); return; }
  const gesagt = tun(a); melde(a.antwort || gesagt || T.unklar);
}

wrap.addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b || !gestartet) return;
  if (b.dataset.modell) { aktiviere(b.dataset.modell); melde(''); }
  else if (b.dataset.aktion) { try { melde(tun(JSON.parse(b.dataset.aktion))); } catch (err) { console.error(err); } }
});
frage?.addEventListener('submit', e => { e.preventDefault(); if (!gestartet) start(); const i = frage.querySelector('input'); sagen(i.value); i.value = ''; });

// Erst laden, wenn der Abschnitt ins Bild kommt; nur rendern, solange er sichtbar ist
new IntersectionObserver(es => { for (const e of es) { sichtbar = e.isIntersecting; if (sichtbar) start(); } }, { rootMargin: '200px' }).observe(wrap);
