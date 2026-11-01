// Forma · Website: Modelle zum Anfassen (three.js, Draco-GLB aus tools/web_glb.mjs und tools/web_obj_glb.mjs).
// Ein Renderer, mehrere Modelle als Reiter. Gruppen ein und aus, Zustände (1913 / 2026), Schnitte (Geschoss: alles darüber fällt weg;
// längs, quer) als Schnittebenen, immer frei drehbar, in Perspektive oder Axonometrie; Blickpunkte stellen nur die Kamera.
// Rückseiten geschlossener Körper werden dunkel gezeichnet, so wirkt die Schnittfläche gefüllt. Lädt erst, wenn der Abschnitt sichtbar wird.
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const wrap = document.querySelector('#modell'); if (!wrap) throw new Error('kein #modell');
const canvas = wrap.querySelector('canvas'), status = wrap.querySelector('.m-status'), fehler = wrap.querySelector('.m-fehler');
const DRACO = 'https://cdn.jsdelivr.net/npm/three@0.170.0/examples/jsm/libs/draco/';
const FOV = 38;

// Koordinaten: X nach Osten, Y nach oben, Z nach Süden (Norden ist -Z). Schnittebene [nx, ny, nz, c]: sichtbar bleibt, was n·p + c >= 0 erfüllt.
const MODELLE = {
  muenchen: {
    basis: 'modell/muenchen/', dateien: { bestand: 'bestand.glb', vorschlag: 'vorschlag.glb', einrichtung: 'einrichtung.glb', umgebung: 'umgebung.glb', baeume: 'baeume.glb' },
    zustaende: { 1913: { bestand: true, vorschlag: false, einrichtung: false }, 2026: { bestand: false, vorschlag: true, einrichtung: true } }, zustand: '2026',
    nah: 0.5, fern: 600, nahst: 2, fernst: 150, start: 'strasse',
    blicke: { strasse: { pos: [21, 11, 24], ziel: [1, 3, 0] }, garten: { pos: [-16, 9, -23], ziel: [0, 3, 0] }, oben: { pos: [0.01, 58, 0], ziel: [0, 0, 0] } },
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

let renderer, scene, camera, controls, sichtbar = false, gestartet = false, aktiv = null, axo = false;
const loader = new GLTFLoader(), draco = new DRACOLoader(); draco.setDecoderPath(DRACO); loader.setDRACOLoader(draco);
const SCHNITT = new THREE.MeshBasicMaterial({ color: 0x1c1c1c, side: THREE.BackSide });
const leisten = () => wrap.querySelectorAll('[data-leiste]');
const leiste = () => wrap.querySelector(`[data-leiste="${aktiv.name}"]`);
const markiere = (attr, wert) => { for (const b of leiste().querySelectorAll(`[${attr}]`)) b.classList.toggle('on', b.getAttribute(attr) === wert); };

function start() {
  if (gestartet) return; gestartet = true;
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2)); renderer.outputColorSpace = THREE.SRGBColorSpace;
  scene = new THREE.Scene(); scene.background = new THREE.Color(0xffffff);
  scene.add(new THREE.HemisphereLight(0xffffff, 0xb8b8b8, 1.15));
  const sonne = new THREE.DirectionalLight(0xffffff, 1.5); sonne.position.set(300, 500, 200); scene.add(sonne);
  const s2 = new THREE.DirectionalLight(0xffffff, 0.5); s2.position.set(-200, 300, -400); scene.add(s2);
  for (const [name, m] of Object.entries(MODELLE)) {
    m.name = name; m.wurzel = new THREE.Group(); m.wurzel.visible = false; m.gruppen = {}; m.schnittflaechen = []; m.schnitt = null; scene.add(m.wurzel);
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

// Modell wechseln: Reiter, Leiste, Wurzel, Kamera, Schnitt
function aktiviere(name) {
  const m = MODELLE[name]; if (!m) return;
  if (aktiv) aktiv.wurzel.visible = false;
  aktiv = m; m.wurzel.visible = true;
  for (const b of wrap.querySelectorAll('.m-reiter button')) b.classList.toggle('on', b.dataset.modell === name);
  for (const l of leisten()) l.hidden = l.dataset.leiste !== name;
  if (m.zustaende && !m.zustandGesetzt) { m.zustandGesetzt = true; zustand(m.zustand); }
  blick(m.start); schnitt(m.schnitt || 'kein'); markiere('data-kamera', axo ? 'axo' : 'persp');
  for (const k of Object.keys(m.dateien)) if (sollSichtbar(k)) lade(k);
  if (m.baeume) ladeBaeume(m);
}
// Sichtbar ist eine Gruppe, wenn ihr Schalter an ist; Gruppen des Zustands folgen dem Zustand
function sollSichtbar(k) {
  const m = aktiv; if (m.zustaende) { const z = m.zustaende[m.zustand]; if (k in z && !z[k]) return false; }
  const b = leiste().querySelector(`[data-gruppe="${k}"]`); return b ? b.classList.contains('on') : true;
}
function zustand(z) { const m = aktiv; m.zustand = z; markiere('data-zustand', z); for (const k of Object.keys(m.dateien)) zeige(k); }
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
    g.add(d.scene); g.visible = sollSichtbar(k); melde('');
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
    m.baumNetz.visible = sollSichtbar(m.baeume.gruppe);
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
function blick(name) { const b = aktiv.blicke[name]; if (!b) return; kamera(b.pos, b.ziel); markiere('data-blick', name); }
function projektion(art) {
  axo = art === 'axo'; markiere('data-kamera', art);
  const pos = camera.position.toArray(), ziel = controls.target.toArray();
  kamera(pos, ziel);
}
// Schnitt: Geschoss (alles darüber fällt weg), längs, quer oder keiner
function schnitt(name) {
  const m = aktiv, s = m.schnitte[name]; m.schnitt = s ? name : null; markiere('data-schnitt', s ? name : 'kein');
  renderer.clippingPlanes = s ? [new THREE.Plane(new THREE.Vector3(s[0], s[1], s[2]), s[3])] : [];
  for (const mm of Object.values(MODELLE)) for (const f of mm.schnittflaechen || []) f.visible = !!s;
}

wrap.addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b || !gestartet) return;
  if (b.dataset.modell) aktiviere(b.dataset.modell);
  else if (b.dataset.zustand) zustand(b.dataset.zustand);
  else if (b.dataset.gruppe) { b.classList.toggle('on'); zeige(b.dataset.gruppe); }
  else if (b.dataset.blick) blick(b.dataset.blick);
  else if (b.dataset.schnitt) schnitt(b.dataset.schnitt);
  else if (b.dataset.kamera) projektion(b.dataset.kamera);
});

// Erst laden, wenn der Abschnitt ins Bild kommt; nur rendern, solange er sichtbar ist
new IntersectionObserver(es => { for (const e of es) { sichtbar = e.isIntersecting; if (sichtbar) start(); } }, { rootMargin: '200px' }).observe(wrap);
