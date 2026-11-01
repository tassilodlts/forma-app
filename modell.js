// Forma · Website: das Vancouver-Modell zum Anfassen (three.js). Lädt erst, wenn der Abschnitt sichtbar wird.
// Gruppen als GLB aus tools/web_glb.mjs (Farben je Punkt, flache Normalen hier gerechnet), Bäume als Instanzen aus baeume.json.
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const wrap = document.querySelector('#modell'); if (!wrap) throw new Error('kein #modell');
const canvas = wrap.querySelector('canvas'), status = wrap.querySelector('.m-status'), knoepfe = wrap.querySelectorAll('[data-gruppe]'), ansichten = wrap.querySelectorAll('[data-ansicht]');
const BASIS = 'modell/';
const GRUPPEN = { tragwerk: 'tragwerk.glb', gebaeude: 'gebaeude.glb', stadt: 'stadt.glb', pflanzen: 'pflanzen.glb' };
const AKZENT = 0x00b4c8;

let renderer, scene, camera, controls, gruppen = {}, baeume = null, gestartet = false, laeuft = false;

function start() {
  if (gestartet) return; gestartet = true;
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2)); renderer.outputColorSpace = THREE.SRGBColorSpace;
  scene = new THREE.Scene(); scene.background = new THREE.Color(0xffffff);
  camera = new THREE.PerspectiveCamera(38, 1, 1, 6000);
  controls = new OrbitControls(camera, canvas); controls.enableDamping = true; controls.dampingFactor = 0.08; controls.maxPolarAngle = Math.PI / 2 - 0.02; controls.minDistance = 30; controls.maxDistance = 2500; controls.target.set(0, 90, 0);
  controls.touches = { ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_PAN };
  scene.add(new THREE.HemisphereLight(0xffffff, 0xb0b0b0, 1.1));
  const sonne = new THREE.DirectionalLight(0xffffff, 1.6); sonne.position.set(300, 500, 200); scene.add(sonne);
  const boden = new THREE.Mesh(new THREE.CircleGeometry(1400, 96), new THREE.MeshBasicMaterial({ color: 0xf2f2f2 })); boden.rotation.x = -Math.PI / 2; boden.position.y = -0.3; scene.add(boden);
  ansicht('stadt');
  groesse(); addEventListener('resize', groesse);
  for (const k of Object.keys(GRUPPEN)) if (knopfAn(k)) lade(k);
  ladeBaeume();
  schleife();
}
function groesse() { const w = canvas.clientWidth, h = canvas.clientHeight; renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); }
function schleife() { requestAnimationFrame(schleife); if (!sichtbar) return; controls.update(); renderer.render(scene, camera); }
const knopfAn = k => [...knoepfe].find(b => b.dataset.gruppe === k)?.classList.contains('on');
function melde(t) { if (status) status.textContent = t || ''; }

async function lade(k) {
  if (gruppen[k]) { gruppen[k].visible = true; return; }
  gruppen[k] = new THREE.Group(); gruppen[k].visible = true; scene.add(gruppen[k]);
  melde('lädt …');
  try {
    const g = await new GLTFLoader().loadAsync(BASIS + GRUPPEN[k]);
    g.scene.traverse(o => {
      if (!o.isMesh) return;
      const geo = o.geometry.toNonIndexed(); geo.computeVertexNormals(); o.geometry.dispose(); o.geometry = geo;   // flache Normalen: Kanten bleiben scharf
      const glas = o.material.name === 'glas';
      o.material = new THREE.MeshLambertMaterial({ vertexColors: true, transparent: glas, opacity: glas ? 0.35 : 1, side: THREE.DoubleSide, depthWrite: !glas });
      o.frustumCulled = false;
    });
    gruppen[k].add(g.scene); melde('');
  } catch (e) { melde('Modell konnte nicht geladen werden.'); console.error(e); }
}
async function ladeBaeume() {
  try {
    const B = await (await fetch(BASIS + 'baeume.json')).json(); if (!B.length) return;
    const krone = new THREE.IcosahedronGeometry(1, 1), stamm = new THREE.CylinderGeometry(0.12, 0.16, 1, 6);
    const mk = new THREE.MeshLambertMaterial({ color: 0x6f8f55 }), ms = new THREE.MeshLambertMaterial({ color: 0x6b5340 });
    const K = new THREE.InstancedMesh(krone, mk, B.length), S = new THREE.InstancedMesh(stamm, ms, B.length), M = new THREE.Matrix4(), q = new THREE.Quaternion(), p = new THREE.Vector3(), sc = new THREE.Vector3();
    B.forEach(([x, y, z, r, h], i) => {
      const rk = Math.max(0.8, Math.min(r, h * 0.45)), hk = Math.max(1.2, h * 0.6);
      M.compose(p.set(x, y + h - hk / 2, z), q, sc.set(rk, hk / 2, rk)); K.setMatrixAt(i, M);
      M.compose(p.set(x, y + (h - hk) / 2 + 0.2, z), q, sc.set(1, Math.max(0.5, h - hk + 0.4), 1)); S.setMatrixAt(i, M);
    });
    baeume = new THREE.Group(); baeume.add(K, S); baeume.visible = knopfAn('pflanzen'); scene.add(baeume);
  } catch (e) { console.error(e); }
}
function zeige(k, an) { if (k === 'pflanzen' && baeume) baeume.visible = an; if (gruppen[k]) gruppen[k].visible = an; else if (an) lade(k); }

// Feste Blickpunkte
function ansicht(n) {
  const Z = { stadt: [[520, 380, 620], [0, 110, 0]], turm: [[260, 160, 300], [0, 150, 0]], sockel: [[150, 70, 190], [0, 20, 0]], oben: [[1, 900, 1], [0, 0, 0]] }[n] || [[520, 380, 620], [0, 110, 0]];
  camera.position.set(...Z[0]); controls.target.set(...Z[1]); controls.update();
}

for (const b of knoepfe) b.addEventListener('click', () => { b.classList.toggle('on'); zeige(b.dataset.gruppe, b.classList.contains('on')); });
for (const b of ansichten) b.addEventListener('click', () => { if (!gestartet) start(); ansicht(b.dataset.ansicht); });

// Erst laden, wenn der Abschnitt ins Bild kommt; nur rendern, solange er sichtbar ist
let sichtbar = false;
new IntersectionObserver(es => { for (const e of es) { sichtbar = e.isIntersecting; if (sichtbar) start(); } }, { rootMargin: '200px' }).observe(wrap);
