// @ts-nocheck
/* Port verbatim de script1 (showroom 3D + interacción + intro + Lenis + GSAP + video handlers).
   Fase 1 de migración: fidelidad 1:1 sobre el código original. TODO: typing progresivo. */
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import SplitType from 'split-type';
// (Port) vanilla-tilt es CJS con `module.exports = VanillaTilt` (sin export nombrado):
// el import nominal resuelve a `undefined` en runtime y rompería el efecto tilt silenciosamente.
import VanillaTilt from 'vanilla-tilt';

let _disposed = false;
let _rafId = 0;
const _winListeners = [];
const _docListeners = [];
const _observers = [];

function _onWindow(type, fn, opts) { window.addEventListener(type, fn, opts); _winListeners.push([type, fn, opts]); }
function _onDocument(type, fn, opts) { document.addEventListener(type, fn, opts); _docListeners.push([type, fn, opts]); }

export interface ShowroomActions { finishIntroCurtain: () => void; setInteractionMode: (mode: string) => void; scrollToExperience: () => void; switch3DCamera: (mode: string, el?: HTMLElement | null) => void; selectFabricPreset: (key: string, el?: HTMLElement | null) => void; triggerFabricWave: () => void; zoomToMicroFiber: () => void; togglePlayVideo: (id: number) => void; toggleAudioVideo: (id: number) => void; toggleFullscreenVideo: (id: number) => void; }
export interface ShowroomHandle { dispose(): void; actions: ShowroomActions; }

export function initShowroomExperience(): ShowroomHandle {
    // (Port) StrictMode de React monta→desmonta→remonta en dev: re-inicializar el
    // estado del módulo o TODAS las acciones quedan en no-op tras el primer dispose.
    _disposed = false;
    _rafId = 0;
    _winListeners.length = 0;
    _docListeners.length = 0;
    _observers.length = 0;
    document.querySelectorAll('video[autoplay], video[autoPlay]').forEach((v) => { v.muted = true; }); // SSR no renderiza el atributo muted (React); aseguramos autoplay silencioso igual que el markup original

    /*
     * GOLDTEX 3D SHOWROOM ENGINE
     * Three.js Procedural Weave, Depth-of-Field simulation, Real Cloth Ribbons & Roll Cylinders
     */

    const container = document.getElementById('webgl-canvas');
    const curtain = document.getElementById('cinematic-curtain');

    // Escena y Cámara Cinematográfica
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x010907, 0.038); // Atmósfera profunda y elegante

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 15); // Posición inicial lejana para entrada cinemática

    const renderer = (function createRenderer() {
        try {
            const r = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
            r.setSize(window.innerWidth, window.innerHeight);
            r.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            r.toneMapping = THREE.ACESFilmicToneMapping;
            r.toneMappingExposure = 1.25;
            r.shadowMap.enabled = true;
            r.shadowMap.type = THREE.PCFSoftShadowMap;
            container.appendChild(r.domElement);
            return r;
        } catch (err) {
            // Fallback elegante si WebGL no está disponible
            const fb = document.getElementById('webgl-fallback');
            if (fb) fb.style.display = 'block';
            if (container) container.style.display = 'none';
            return null;
        }
    })();

    // ================= GENERADORES DE TEXTURAS DE TEJIDO (WEAVE PROCEDURAL) =================
    function createFabricCanvasTexture(type) {
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = '#808080';
        ctx.fillRect(0, 0, 512, 512);

        if (type === 'weave') {
            // Trama textil cruzada fina (hilos entrelazados)
            const step = 8;
            for (let x = 0; x < 512; x += step) {
                for (let y = 0; y < 512; y += step) {
                    const isEven = ((x / step) + (y / step)) % 2 === 0;
                    ctx.fillStyle = isEven ? '#a0a0a0' : '#606060';
                    ctx.fillRect(x, y, step, step);

                    // Microfibras
                    ctx.fillStyle = isEven ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)';
                    ctx.fillRect(x + 1, y + 1, step - 2, step - 2);
                }
            }
        } else if (type === 'gold-brocade') {
            // Brocado dorado con hilos metálicos y nervaduras
            const step = 16;
            for (let x = 0; x < 512; x += step) {
                for (let y = 0; y < 512; y += step) {
                    ctx.fillStyle = ((x + y) % 32 === 0) ? '#d4af37' : '#8a6e1c';
                    ctx.fillRect(x, y, step, step);
                    ctx.strokeStyle = '#ffeaa7';
                    ctx.lineWidth = 1;
                    ctx.strokeRect(x, y, step, step);
                }
            }
        } else if (type === 'roll-cap') {
            // Círculos concéntricos de tela enrollada en el extremo del cilindro
            ctx.fillStyle = '#1c150b';
            ctx.fillRect(0, 0, 512, 512);
            ctx.strokeStyle = '#c6a34a';
            for (let r = 10; r < 250; r += 7) {
                ctx.beginPath();
                ctx.arc(256, 256, r, 0, Math.PI * 2);
                ctx.lineWidth = 2.5;
                ctx.stroke();
            }
            // Núcleo de cartón industrial
            ctx.fillStyle = '#060a08';
            ctx.beginPath();
            ctx.arc(256, 256, 35, 0, Math.PI * 2);
            ctx.fill();
        }

        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        return texture;
    }

    const textureLoader = new THREE.TextureLoader();
    const botanicalFabricTex = textureLoader.load('/key_visual_2.png');
    botanicalFabricTex.wrapS = THREE.RepeatWrapping;
    botanicalFabricTex.wrapT = THREE.RepeatWrapping;
    botanicalFabricTex.repeat.set(1.5, 1.5);

    const suitFabricTex = textureLoader.load('/key_visual.png');
    suitFabricTex.wrapS = THREE.RepeatWrapping;
    suitFabricTex.wrapT = THREE.RepeatWrapping;
    suitFabricTex.repeat.set(1, 1);

    const weaveBumpTexture = createFabricCanvasTexture('weave');
    weaveBumpTexture.repeat.set(16, 16);

    const goldBumpTexture = createFabricCanvasTexture('gold-brocade');
    goldBumpTexture.repeat.set(12, 12);

    const rollCapTexture = createFabricCanvasTexture('roll-cap');

    // ================= PALETA DE MATERIALES TEXTILES DE ALTA COSTURA =================
    const materials = {
        emeraldSilk: new THREE.MeshStandardMaterial({
            color: 0x003E33,
            roughness: 0.28,
            metalness: 0.18,
            bumpMap: weaveBumpTexture,
            bumpScale: 0.04,
            side: THREE.DoubleSide
        }),
        deepEmeraldVelvet: new THREE.MeshStandardMaterial({
            color: 0x00241E,
            roughness: 0.55,
            metalness: 0.08,
            bumpMap: weaveBumpTexture,
            bumpScale: 0.06,
            side: THREE.DoubleSide
        }),
        gemEmeraldSatin: new THREE.MeshStandardMaterial({
            color: 0x005244,
            map: botanicalFabricTex,
            roughness: 0.35,
            metalness: 0.15,
            bumpMap: weaveBumpTexture,
            bumpScale: 0.04,
            side: THREE.DoubleSide
        }),
        goldFabric: new THREE.MeshStandardMaterial({
            color: 0xE4C33A,
            roughness: 0.32,
            metalness: 0.75,
            bumpMap: goldBumpTexture,
            bumpScale: 0.05,
            side: THREE.DoubleSide
        }),
        goldChampagneSilk: new THREE.MeshStandardMaterial({
            color: 0xF0D66E,
            roughness: 0.25,
            metalness: 0.55,
            bumpMap: weaveBumpTexture,
            bumpScale: 0.03,
            side: THREE.DoubleSide
        }),
        ivoryCrepe: new THREE.MeshStandardMaterial({
            color: 0xFFFFFF,
            roughness: 0.45,
            metalness: 0.05,
            bumpMap: weaveBumpTexture,
            bumpScale: 0.04,
            side: THREE.DoubleSide
        }),
        goldCapMaterial: new THREE.MeshStandardMaterial({
            color: 0xE4C33A,
            roughness: 0.35,
            metalness: 0.65,
            map: rollCapTexture
        }),
        emeraldCapMaterial: new THREE.MeshStandardMaterial({
            color: 0x003E33,
            roughness: 0.45,
            metalness: 0.25,
            map: rollCapTexture
        }),
        pimaCotton: new THREE.MeshStandardMaterial({
            color: 0xE8DFC8,
            roughness: 0.88,
            metalness: 0.02,
            bumpMap: weaveBumpTexture,
            bumpScale: 0.08,
            side: THREE.DoubleSide
        }),
        selvageDenim: new THREE.MeshStandardMaterial({
            color: 0x1A2B4C,
            roughness: 0.72,
            metalness: 0.05,
            bumpMap: weaveBumpTexture,
            bumpScale: 0.12,
            side: THREE.DoubleSide
        })
    };

    // ================= ILUMINACIÓN CINEMATOGRÁFICA DE SHOWROOM =================
    const ambientLight = new THREE.AmbientLight(0x061e16, 1.2);
    scene.add(ambientLight);

    // Luz Dorada Clave (Key Light Lateral)
    const keyGoldLight = new THREE.SpotLight(0xffdf88, 5.5, 40, Math.PI / 4, 0.4, 1.2);
    keyGoldLight.position.set(7, 6, 8);
    keyGoldLight.castShadow = true;
    keyGoldLight.shadow.mapSize.width = 1024;
    keyGoldLight.shadow.mapSize.height = 1024;
    scene.add(keyGoldLight);

    // Rim Light Esmeralda (Luz de Contorno Trasera)
    const emeraldRimLight = new THREE.DirectionalLight(0x0b6b48, 3.2);
    emeraldRimLight.position.set(-8, -4, -5);
    scene.add(emeraldRimLight);

    // Fill Light Champagne Suave
    const fillChampagneLight = new THREE.PointLight(0xe6c96a, 2.5, 25);
    fillChampagneLight.position.set(-4, 3, 5);
    scene.add(fillChampagneLight);

    // Luz de Suelo Profunda
    const floorMoodLight = new THREE.PointLight(0x021a13, 3.0, 18);
    floorMoodLight.position.set(0, -6, 2);
    scene.add(floorMoodLight);

    // ================= CONSTRUCCIÓN DEL SHOWROOM 3D =================
    const showroomGroup = new THREE.Group();
    scene.add(showroomGroup);

    // --- 1. FUNCIÓN PARA CREAR ROLLOS DE TELA REALES (CILINDROS MULTICAPA CON EXTREMOS) ---
    function createFabricRoll(radius, height, bodyMaterial, capMaterial, unrollingCloth = null) {
        const rollGroup = new THREE.Group();

        // Cuerpo del rollo (Cilindro con textura)
        const cylinderGeom = new THREE.CylinderGeometry(radius, radius, height, 48, 1, true);
        const cylinder = new THREE.Mesh(cylinderGeom, bodyMaterial);
        cylinder.castShadow = true;
        cylinder.receiveShadow = true;
        rollGroup.add(cylinder);

        // Tapas extremas texturizadas mostrando los pliegues enrollados concéntricos
        const capGeom = new THREE.CircleGeometry(radius, 36);

        const topCap = new THREE.Mesh(capGeom, capMaterial);
        topCap.rotation.x = -Math.PI / 2;
        topCap.position.y = height / 2;
        rollGroup.add(topCap);

        const bottomCap = new THREE.Mesh(capGeom, capMaterial);
        bottomCap.rotation.x = Math.PI / 2;
        bottomCap.position.y = -height / 2;
        rollGroup.add(bottomCap);

        // Borde metálico dorado en los extremos del cilindro (Lujo)
        const ringGeom = new THREE.TorusGeometry(radius, radius * 0.03, 16, 48);
        const ringMat = materials.goldFabric;
        const topRing = new THREE.Mesh(ringGeom, ringMat);
        topRing.rotation.x = Math.PI / 2;
        topRing.position.y = height / 2;
        rollGroup.add(topRing);

        const bottomRing = new THREE.Mesh(ringGeom, ringMat);
        bottomRing.rotation.x = Math.PI / 2;
        bottomRing.position.y = -height / 2;
        rollGroup.add(bottomRing);

        return rollGroup;
    }

    // --- CREAR DIFERENTES ROLLOS EN DISTINTOS PLANOS DE PROFUNDIDAD ---
    const rolls = [];

    // Rollo 1: Gran Rollo Dorado Escultórico en Primer Plano Derecho (fuera del texto, enmarcando)
    const roll1 = createFabricRoll(0.58, 6.2, materials.goldFabric, materials.goldCapMaterial);
    roll1.position.set(4.8, -0.5, 1.6);
    roll1.rotation.set(0.25, 0.15, 0.2);
    showroomGroup.add(roll1);
    rolls.push({ group: roll1, rotSpeedY: 0.002, rotSpeedX: 0.0008, baseY: -0.8, floatSpeed: 0.7, floatAmp: 0.1 });

    // Rollo 2: Rollo Esmeralda Vertical en Primer Plano Izquierdo
    const roll2 = createFabricRoll(0.52, 6.5, materials.emeraldSilk, materials.emeraldCapMaterial);
    roll2.position.set(-6.0, 0.2, 1.0);
    roll2.rotation.set(-0.2, 0.35, -0.18);
    showroomGroup.add(roll2);
    rolls.push({ group: roll2, rotSpeedY: -0.002, rotSpeedX: 0.001, baseY: 0.2, floatSpeed: 0.85, floatAmp: 0.12 });

    // Rollo 3: Rollo Esmeralda Profundo en Plano Medio Inferior
    const roll3 = createFabricRoll(0.42, 4.8, materials.deepEmeraldVelvet, materials.emeraldCapMaterial);
    roll3.position.set(-3.2, -3.8, -1.8);
    roll3.rotation.set(0.5, -0.4, 0.35);
    showroomGroup.add(roll3);
    rolls.push({ group: roll3, rotSpeedY: 0.0018, rotSpeedX: 0.0015, baseY: -3.8, floatSpeed: 0.6, floatAmp: 0.08 });

    // Rollo 4: Rollo Champagne en Profundidad Superior Derecha
    const roll4 = createFabricRoll(0.38, 4.2, materials.goldChampagneSilk, materials.goldCapMaterial);
    roll4.position.set(4.5, 3.8, -2.8);
    roll4.rotation.set(-0.4, 0.25, -0.35);
    showroomGroup.add(roll4);
    rolls.push({ group: roll4, rotSpeedY: -0.0025, rotSpeedX: -0.0008, baseY: 3.8, floatSpeed: 0.75, floatAmp: 0.1 });

    // Rollo 5: Rollo Marfil en la Atmósfera de Fondo
    const roll5 = createFabricRoll(0.32, 4.0, materials.ivoryCrepe, materials.goldCapMaterial);
    roll5.position.set(-2.5, 3.8, -5.0);
    roll5.rotation.set(0.6, 0.5, 0.15);
    showroomGroup.add(roll5);
    rolls.push({ group: roll5, rotSpeedY: 0.0012, rotSpeedX: 0.0008, baseY: 3.8, floatSpeed: 0.5, floatAmp: 0.06 });

    // --- 2. TELAS FLOTANTES Y DESENROLLADAS (CINTAS ORGÁNICAS CON ONDULACIÓN FÍSICA) ---
    const wavingCloths = [];

    function createWavingCloth(width, height, segX, segY, material, position, rotation, waveProfile) {
        const geom = new THREE.PlaneGeometry(width, height, segX, segY);
        // Aplicar curvatura previa y pliegues físicos de drapeado tipo cortina/manto
        const pos = geom.attributes.position;
        for (let i = 0; i < pos.count; i++) {
            const x = pos.getX(i);
            const y = pos.getY(i);
            // Pliegues naturales de caída en S y curvatura envolvente
            const drapeZ = Math.sin((x / width) * Math.PI * 3.5) * 0.45 + Math.cos((y / height) * Math.PI * 2) * 0.25;
            pos.setZ(i, drapeZ);
        }
        geom.computeVertexNormals();
        const originalPositions = geom.attributes.position.array.slice();

        const mesh = new THREE.Mesh(geom, material);
        mesh.position.copy(position);
        mesh.rotation.copy(rotation);
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        showroomGroup.add(mesh);

        wavingCloths.push({
            mesh: mesh,
            originalPositions: originalPositions,
            waveProfile: waveProfile,
            basePos: position.clone(),
            baseRot: rotation.clone()
        });

        return mesh;
    }

    // Tela Desenrollada 1: Cascada de Seda Esmeralda que nace del rollo izquierdo y fluye hacia abajo
    createWavingCloth(
        4.2, 8.5, 36, 48,
        materials.gemEmeraldSatin,
        new THREE.Vector3(-4.6, -1.0, 0.2),
        new THREE.Euler(-0.25, 0.5, -0.15),
        { freqX: 0.45, freqY: 0.65, speed: 1.1, amp: 0.4, twist: 0.25 }
    );

    // Tela Desenrollada 2: Manto de Oro Hilado curvado en el pedestal inferior
    createWavingCloth(
        8.5, 3.2, 50, 24,
        materials.goldFabric,
        new THREE.Vector3(0.0, -3.8, 0.8),
        new THREE.Euler(0.55, -0.1, 0.05),
        { freqX: 0.6, freqY: 0.35, speed: 1.2, amp: 0.32, twist: 0.15 }
    );

    // Tela Desenrollada 3: Manto de Seda Champagne en el fondo detrás de la escena
    createWavingCloth(
        8.0, 5.5, 40, 32,
        materials.goldChampagneSilk,
        new THREE.Vector3(4.8, 1.2, -5.5),
        new THREE.Euler(-0.35, -0.5, 0.3),
        { freqX: 0.5, freqY: 0.4, speed: 0.85, amp: 0.25, twist: 0.12 }
    );

    // Tela Desenrollada 4: Velo de Marfil sutil flotando en plano superior distante
    createWavingCloth(
        5.5, 5.5, 32, 32,
        materials.ivoryCrepe,
        new THREE.Vector3(-1.8, 3.5, -4.2),
        new THREE.Euler(0.4, 0.2, -0.2),
        { freqX: 0.4, freqY: 0.5, speed: 0.75, amp: 0.22, twist: 0.15 }
    );

    // --- 3. TELAS ENVOLVENTES CURVADAS (SPLINE EXTRUDED RIBBONS - ALTA COSTURA) ---
    function createTextileCurvedRibbon(points, width, material) {
        const curve = new THREE.CatmullRomCurve3(points);
        const tubeGeom = new THREE.TubeGeometry(curve, 70, width, 16, false);
        const mesh = new THREE.Mesh(tubeGeom, material);
        mesh.castShadow = true;
        showroomGroup.add(mesh);
        return { mesh, curve };
    }

    // Hilo/Cinta dorada escultórica que envuelve el espacio en la zona inferior
    const goldRibbonPoints = [
        new THREE.Vector3(-6.5, -3.2, 0.5),
        new THREE.Vector3(-3.5, -2.8, 1.5),
        new THREE.Vector3(0.0, -3.4, 2.0),
        new THREE.Vector3(3.5, -2.6, 1.4),
        new THREE.Vector3(6.2, -3.0, 0.2)
    ];
    const goldSculpturalRibbon = createTextileCurvedRibbon(goldRibbonPoints, 0.12, materials.goldFabric);

    // Segunda cinta esmeralda que danza por encima del marco
    const emeraldRibbonPoints = [
        new THREE.Vector3(-6.8, 3.2, -1.5),
        new THREE.Vector3(-3.2, 3.8, -0.2),
        new THREE.Vector3(0.5, 3.6, 0.5),
        new THREE.Vector3(4.0, 3.7, 1.2),
        new THREE.Vector3(6.8, 2.5, -0.8)
    ];
    const emeraldSculpturalRibbon = createTextileCurvedRibbon(emeraldRibbonPoints, 0.09, materials.gemEmeraldSatin);

    // --- 4. TEXTILE GALAXY: CIENTOS DE FILAMENTOS TEXTILES QUE REACCIONAN AL CURSOR ---
    const filamentCount = 45;
    const filaments = [];
    const filamentGroup = new THREE.Group();
    showroomGroup.add(filamentGroup);

    const filamentMat = new THREE.LineBasicMaterial({
        color: 0xE6C96A,
        transparent: true,
        opacity: 0.38,
        blending: THREE.AdditiveBlending
    });

    for (let f = 0; f < filamentCount; f++) {
        const numPoints = 12;
        const curvePoints = [];
        const originX = (Math.random() - 0.5) * 16;
        const originY = (Math.random() - 0.5) * 12;
        const originZ = (Math.random() - 0.5) * 10;
        const length = 1.8 + Math.random() * 2.2;

        for (let p = 0; p < numPoints; p++) {
            curvePoints.push(new THREE.Vector3(
                originX + (p / numPoints) * length + Math.sin(p * 0.8) * 0.2,
                originY + Math.cos(p * 0.8) * 0.2,
                originZ + (Math.random() - 0.5) * 0.2
            ));
        }

        const spline = new THREE.CatmullRomCurve3(curvePoints);
        const lineGeom = new THREE.BufferGeometry().setFromPoints(spline.getPoints(24));
        const line = new THREE.Line(lineGeom, filamentMat);

        filamentGroup.add(line);
        filaments.push({
            line: line,
            basePoints: curvePoints.map(pt => pt.clone()),
            speed: 0.6 + Math.random() * 0.8,
            phase: Math.random() * Math.PI * 2
        });
    }

    // --- 5. POLVO DE ORO 3D (2,800 PARTÍCULAS INTERACTIVAS EN THREE.JS) ---
    const dustCount = 2800;
    const dustGeom = new THREE.BufferGeometry();
    const dustPositions = new Float32Array(dustCount * 3);
    const dustColors = new Float32Array(dustCount * 3);
    const colGold = new THREE.Color(0xF1B734);
    const colEmerald = new THREE.Color(0x34D399);

    for (let i = 0; i < dustCount; i++) {
        dustPositions[i * 3] = (Math.random() - 0.5) * 36;
        dustPositions[i * 3 + 1] = (Math.random() - 0.5) * 28;
        dustPositions[i * 3 + 2] = (Math.random() - 0.5) * 32;

        const isGold = Math.random() > 0.35;
        const chosenCol = isGold ? colGold : colEmerald;
        dustColors[i * 3] = chosenCol.r;
        dustColors[i * 3 + 1] = chosenCol.g;
        dustColors[i * 3 + 2] = chosenCol.b;
    }

    dustGeom.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
    dustGeom.setAttribute('color', new THREE.BufferAttribute(dustColors, 3));

    const dustMaterial = new THREE.PointsMaterial({
        size: 0.055,
        vertexColors: true,
        transparent: true,
        opacity: 0.78,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });

    const goldDustParticles = new THREE.Points(dustGeom, dustMaterial);
    scene.add(goldDustParticles);

    // ================= SPATIAL TUNNEL CORE: ANILLO TOROIDAL & DOBLE HÉLICE =================
    const spatialTunnelGroup = new THREE.Group();
    scene.add(spatialTunnelGroup);

    // 1. Gran Anillo Toroidal de Cristal Dorado (THREE.TorusGeometry)
    const mainTorusGeom = new THREE.TorusGeometry(3.6, 0.12, 32, 100);
    const mainTorusMat = new THREE.MeshPhysicalMaterial({
        color: 0xF1B734,
        emissive: 0x5a4510,
        emissiveIntensity: 0.35,
        roughness: 0.12,
        metalness: 0.92,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        transparent: true,
        opacity: 0.85
    });
    const mainTorus = new THREE.Mesh(mainTorusGeom, mainTorusMat);
    mainTorus.position.set(0, 0, -2);
    spatialTunnelGroup.add(mainTorus);

    // Anillo concéntrico externo de filigrana dorada
    const outerTorusGeom = new THREE.TorusGeometry(4.3, 0.035, 16, 80);
    const outerTorusMat = new THREE.MeshBasicMaterial({
        color: 0xffea9e,
        wireframe: true,
        transparent: true,
        opacity: 0.4
    });
    const outerTorus = new THREE.Mesh(outerTorusGeom, outerTorusMat);
    outerTorus.position.set(0, 0, -2);
    spatialTunnelGroup.add(outerTorus);

    // 2. Doble Hélice Luminosa (Hebras entrelazadas Oro y Esmeralda)
    const helixLength = 45;
    const helixPointsCount = 180;
    const helixRadius = 2.5;
    const helixPosA: THREE.Vector3[] = [];
    const helixPosB: THREE.Vector3[] = [];

    for (let i = 0; i < helixPointsCount; i++) {
        const t = (i / helixPointsCount) * Math.PI * 8; // 4 vueltas completas
        const z = -28 + (i / helixPointsCount) * helixLength;
        const xA = Math.cos(t) * helixRadius;
        const yA = Math.sin(t) * helixRadius;
        const xB = Math.cos(t + Math.PI) * helixRadius;
        const yB = Math.sin(t + Math.PI) * helixRadius;

        helixPosA.push(new THREE.Vector3(xA, yA, z));
        helixPosB.push(new THREE.Vector3(xB, yB, z));
    }

    const curveA = new THREE.CatmullRomCurve3(helixPosA);
    const curveB = new THREE.CatmullRomCurve3(helixPosB);

    const tubeGeomA = new THREE.TubeGeometry(curveA, 100, 0.038, 8, false);
    const tubeGeomB = new THREE.TubeGeometry(curveB, 100, 0.038, 8, false);

    const tubeMatA = new THREE.MeshBasicMaterial({
        color: 0xF1B734, // Oro
        transparent: true,
        opacity: 0.75
    });
    const tubeMatB = new THREE.MeshBasicMaterial({
        color: 0x10b981, // Verde Esmeralda
        transparent: true,
        opacity: 0.75
    });

    const helixMeshA = new THREE.Mesh(tubeGeomA, tubeMatA);
    const helixMeshB = new THREE.Mesh(tubeGeomB, tubeMatB);
    spatialTunnelGroup.add(helixMeshA);
    spatialTunnelGroup.add(helixMeshB);

    // Hilos transversales (rungs) entre ambas hebras como trama textil
    const rungGroup = new THREE.Group();
    for (let i = 0; i < 36; i++) {
        const u = i / 36;
        const ptA = curveA.getPoint(u);
        const ptB = curveB.getPoint(u);
        const rungGeom = new THREE.BufferGeometry().setFromPoints([ptA, ptB]);
        const rungMat = new THREE.LineBasicMaterial({
            color: 0xfff4c2,
            transparent: true,
            opacity: 0.28
        });
        const rungLine = new THREE.Line(rungGeom, rungMat);
        rungGroup.add(rungLine);
    }
    spatialTunnelGroup.add(rungGroup);

    // ================= INTERACCIÓN DE CÁMARA, MOUSE CON INERCIA Y CONTROL TÁCTIL =================
    let mouseX = 0, mouseY = 0;
    let smoothMouseX = 0, smoothMouseY = 0;
    let scrollProgress = 0;
    let targetScrollProgress = 0;

    // Modos de Interacción Táctil Directa: 'orbit' (arrastrar rollo) o 'touch' (deformar tela)
    let interactionMode = 'orbit';
    let isDragging = false;
    let previousPointerPosition = { x: 0, y: 0 };
    let rollDragRotation = { x: 0, y: 0 };
    let touchDisplacement = { x: 0, y: 0, force: 0 };

    const touchIndicator = document.getElementById('cloth-touch-indicator');

    function setInteractionMode(mode) {
        interactionMode = mode;
        const btnOrbit = document.getElementById('btn-touch-mode');
        const btnTouch = document.getElementById('btn-cloth-touch');
        if (btnOrbit) btnOrbit.classList.toggle('active', mode === 'orbit');
        if (btnTouch) btnTouch.classList.toggle('active', mode === 'touch');

        if (mode === 'orbit') {
            // Dar un impulso visual cinemático inmediato de rotación a los rollos
            rollDragRotation.y += 2.5;
            rollDragRotation.x += 0.8;
            document.body.style.cursor = 'grab';
        } else {
            document.body.style.cursor = 'default';
        }

        if (mode === 'touch' && touchIndicator) {
            touchIndicator.classList.add('active');
        } else if (touchIndicator) {
            touchIndicator.classList.remove('active');
        }
    }

    _onWindow('mousedown', (e) => {
        isDragging = true;
        previousPointerPosition = { x: e.clientX, y: e.clientY };
        if (interactionMode === 'orbit') {
            document.body.style.cursor = 'grabbing';
        }
        if (interactionMode === 'touch' && touchIndicator) {
            touchIndicator.classList.add('active');
            touchDisplacement.force = 1.0;
        }
    });

    _onWindow('mouseup', () => {
        isDragging = false;
        if (interactionMode === 'orbit') {
            document.body.style.cursor = 'grab';
        }
        if (interactionMode !== 'touch' && touchIndicator) {
            touchIndicator.classList.remove('active');
        }
    });

    _onWindow('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;

        if (touchIndicator) {
            touchIndicator.style.left = e.clientX + 'px';
            touchIndicator.style.top = e.clientY + 'px';
        }

        if (isDragging) {
            const deltaX = e.clientX - previousPointerPosition.x;
            const deltaY = e.clientY - previousPointerPosition.y;

            if (interactionMode === 'orbit') {
                // Arrastrar para rotar los rollos de tela en 360 grados con física fluida
                rollDragRotation.y += deltaX * 0.018;
                rollDragRotation.x += deltaY * 0.014;
            } else if (interactionMode === 'touch') {
                // Deformar la superficie textil localmente
                touchDisplacement.x = mouseX;
                touchDisplacement.y = mouseY;
                touchDisplacement.force = 1.4;
            }

            previousPointerPosition = { x: e.clientX, y: e.clientY };
        }
    });

    // Soporte touch móvil y táctil
    _onWindow('touchstart', (e) => {
        if (e.touches.length > 0) {
            isDragging = true;
            previousPointerPosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        }
    }, { passive: true });

    _onWindow('touchend', () => { isDragging = false; });

    _onWindow('touchmove', (e) => {
        if (e.touches.length > 0) {
            const touch = e.touches[0];
            mouseX = (touch.clientX / window.innerWidth - 0.5) * 2;
            mouseY = (touch.clientY / window.innerHeight - 0.5) * 2;

            if (isDragging) {
                const deltaX = touch.clientX - previousPointerPosition.x;
                const deltaY = touch.clientY - previousPointerPosition.y;
                rollDragRotation.y += deltaX * 0.01;
                rollDragRotation.x += deltaY * 0.01;
                previousPointerPosition = { x: touch.clientX, y: touch.clientY };
            }
        }
    }, { passive: true });

    // Scroll listener para recorrido cinemático de cámara
    _onWindow('scroll', () => {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        targetScrollProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    }, { passive: true });

    // Selector interactivo de vista de cámara en el Hero
    let cameraMode = 'overview';
    let cameraModeOffsets = {
        overview: { x: 0, y: 0, z: 7.2, fov: 45 },
        'focus-drape': { x: -2.2, y: -0.5, z: 5.5, fov: 40 },
        'focus-roll': { x: 2.8, y: -0.2, z: 5.0, fov: 38 },
        'micro-fiber': { x: 0, y: -0.3, z: 2.4, fov: 28 }
    };

    function switch3DCamera(mode, clickedEl) {
        cameraMode = mode;
        document.querySelectorAll('.tag-pill').forEach(btn => btn.classList.remove('active'));
        // (Port) el original leía el global implícito `event`; al usar delegación de eventos
        // React pasamos el elemento clickeado explícito (clickedEl) manteniendo fallback.
        const src = clickedEl || event;
        const clickedBtn = (src && src.currentTarget) || src?.target;
        if (clickedBtn) clickedBtn.classList.add('active');
    }

    function scrollToExperience() {
        const targetSection = document.getElementById('experience-configurator');
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Accesibilidad: respetar preferencia de movimiento reducido
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const motionScale = prefersReducedMotion ? 0.15 : 1.0;

    // ================= BUCLE DE ANIMACIÓN CINEMATOGRÁFICA =================
    const clock = new THREE.Clock();
    let pageVisible = true;

    function renderScene() {
        if (_disposed) return;
        _rafId = requestAnimationFrame(renderScene);

        if (!renderer || !pageVisible) return;

        const elapsedTime = clock.getElapsedTime();
        const delta = clock.getDelta();

        // Easing de Mouse (Inercia elegante y flotante)
        smoothMouseX += (mouseX - smoothMouseX) * 0.045;
        smoothMouseY += (mouseY - smoothMouseY) * 0.045;

        // Sincronización de scroll 3D inmediata y fluida con Lenis (sin lag ni retraso elástico)
        scrollProgress += (targetScrollProgress - scrollProgress) * 0.18;

        // Configuración activa de cámara según modo y scroll
        const targetCamConfig = cameraModeOffsets[cameraMode] || cameraModeOffsets.overview;

        // Trayectoria cinematográfica:
        // Al hacer scroll, la cámara avanza a través de los rollos y cambia de ángulo
        const baseCamZ = targetCamConfig.z - (scrollProgress * 5.5);
        const baseCamY = targetCamConfig.y - (scrollProgress * 2.8);
        const baseCamX = targetCamConfig.x + Math.sin(scrollProgress * Math.PI) * 1.5;

        // Parallax 3D suave de cámara reaccionando al cursor
        camera.position.x = baseCamX + (smoothMouseX * 1.1);
        camera.position.y = baseCamY + (-smoothMouseY * 0.85);
        camera.position.z = baseCamZ;

        // La cámara apunta sutilmente al centro del espacio pero se balancea suavemente
        const lookTarget = new THREE.Vector3(
            smoothMouseX * 0.4 + Math.sin(elapsedTime * 0.25) * 0.15,
            smoothMouseY * -0.3 + (scrollProgress * -2.0),
            0
        );
        camera.lookAt(lookTarget);

        // --- ANIMACIÓN DEL NÚCLEO ESPACIAL (ANILLO TOROIDAL & DOBLE HÉLICE) ---
        if (spatialTunnelGroup) {
            mainTorus.rotation.x = elapsedTime * 0.25 + smoothMouseY * 0.35;
            mainTorus.rotation.y = elapsedTime * 0.35 + smoothMouseX * 0.35;
            outerTorus.rotation.x = -elapsedTime * 0.18;
            outerTorus.rotation.y = -elapsedTime * 0.26;
            spatialTunnelGroup.rotation.z = elapsedTime * 0.08;
            // Acompaña el avance de la cámara en el eje Z
            spatialTunnelGroup.position.z = -scrollProgress * 5.8;
        }

        // --- ANIMACIÓN DE ROLLOS DE TELA CON FÍSICA Y ARRASTRE TÁCTIL ---
        rolls.forEach((r, idx) => {
            // Rotación continua base
            r.group.rotation.y += r.rotSpeedY;
            r.group.rotation.x += r.rotSpeedX;

            // Aplicar inercia e influencia táctil directa a los rollos visibles principales
            if (idx === 0) {
                // Rollo 1 (Gran Rollo Dorado)
                r.group.rotation.y += rollDragRotation.y * 0.22;
                r.group.rotation.x += rollDragRotation.x * 0.18;
            } else if (idx === 1) {
                // Rollo 2 (Rollo Esmeralda)
                r.group.rotation.y += rollDragRotation.y * 0.18;
                r.group.rotation.x += rollDragRotation.x * 0.14;
            } else if (idx === 2) {
                // Rollo 3 (Rollo Terciopelo)
                r.group.rotation.y += rollDragRotation.y * 0.12;
            }

            // Amortiguar rotación de arrastre suavemente en el primer elemento
            if (idx === 0) {
                rollDragRotation.y *= 0.92;
                rollDragRotation.x *= 0.92;
            }

            // Levitación suave física
            r.group.position.y = r.baseY + Math.sin(elapsedTime * r.floatSpeed + idx) * r.floatAmp;

            // Respuesta sutil de rotación al mouse (Parallax por capa)
            const depthFactor = (r.group.position.z + 5) / 10;
            r.group.rotation.z += (smoothMouseX * 0.03 * depthFactor - (r.group.rotation.z - r.group.rotation.z)) * 0.02;
        });

        // --- ANIMACIÓN FÍSICA DE TELAS ONDULANTES & DEFORMACIÓN TÁCTIL ---
        wavingCloths.forEach((cloth, cIdx) => {
            const geom = cloth.mesh.geometry;
            const pos = geom.attributes.position;
            const orig = cloth.originalPositions;
            const prof = cloth.waveProfile;
            const offset = cIdx * 2.1;

            for (let i = 0; i < pos.count; i++) {
                const u = orig[i * 3];
                const v = orig[i * 3 + 1];

                // Ondas multidireccionales simulando brisa suave y caída
                const wave1 = Math.sin(elapsedTime * prof.speed + u * prof.freqX + offset) * prof.amp * motionScale;
                const wave2 = Math.cos(elapsedTime * (prof.speed * 0.85) + v * prof.freqY + offset) * (prof.amp * 0.7) * motionScale;
                const windReaction = (smoothMouseX * 0.2) * Math.sin(v * 0.8 + elapsedTime) * motionScale;

                // Deformación física táctil local al pasar el mouse / tocar
                let touchDent = 0;
                if (touchDisplacement.force > 0.01) {
                    const distToTouch = Math.hypot(u - touchDisplacement.x * 2.5, v - touchDisplacement.y * 2.5);
                    if (distToTouch < 2.5) {
                        touchDent = Math.cos(distToTouch * 1.2) * (touchDisplacement.force * 0.45);
                    }
                }

                pos.setZ(i, orig[i * 3 + 2] + wave1 + wave2 + windReaction - touchDent);
            }
            pos.needsUpdate = true;
            geom.computeVertexNormals();

            // Suave balanceo del cuerpo entero de la tela
            cloth.mesh.rotation.y = cloth.baseRot.y + Math.sin(elapsedTime * 0.4 + offset) * 0.05 + (smoothMouseX * 0.08);
            cloth.mesh.rotation.x = cloth.baseRot.x + (smoothMouseY * 0.06);
        });

        // Amortiguar fuerza táctil
        touchDisplacement.force *= 0.95;

        // --- ANIMACIÓN DE CINTAS ESCULTÓRICAS ---
        goldSculpturalRibbon.mesh.rotation.y = Math.sin(elapsedTime * 0.3) * 0.08 + (smoothMouseX * 0.05);
        goldSculpturalRibbon.mesh.position.y = Math.cos(elapsedTime * 0.45) * 0.08;

        emeraldSculpturalRibbon.mesh.rotation.z = Math.cos(elapsedTime * 0.25) * 0.06;
        emeraldSculpturalRibbon.mesh.position.y = Math.sin(elapsedTime * 0.35) * 0.07;

        // --- ANIMACIÓN DE TEXTILE GALAXY (FILAMENTOS QUE ONDULAN Y REACCIONAN AL CURSOR) ---
        filaments.forEach((fil, fIdx) => {
            const geom = fil.line.geometry;
            const pos = geom.attributes.position;
            const count = pos.count;
            for (let k = 0; k < count; k++) {
                const originalX = fil.basePoints[Math.min(k, fil.basePoints.length - 1)].x;
                const originalY = fil.basePoints[Math.min(k, fil.basePoints.length - 1)].y;
                const originalZ = fil.basePoints[Math.min(k, fil.basePoints.length - 1)].z;

                const wave = Math.sin(elapsedTime * fil.speed + k * 0.4 + fil.phase) * 0.18;
                const mouseInfluence = (smoothMouseX * 0.35) * Math.cos(elapsedTime * 0.8 + k);

                pos.setXYZ(k, originalX + wave, originalY + mouseInfluence, originalZ + wave * 0.5);
            }
            pos.needsUpdate = true;
        });

        // --- ANIMACIÓN DE ILUMINACIÓN CINEMATOGRÁFICA ---
        keyGoldLight.position.x = 7 + Math.sin(elapsedTime * 0.35) * 2.0;
        keyGoldLight.position.y = 6 + Math.cos(elapsedTime * 0.4) * 1.5;

        fillChampagneLight.position.x = -4 + Math.cos(elapsedTime * 0.3) * 1.8;
        fillChampagneLight.position.z = 5 + Math.sin(elapsedTime * 0.25) * 1.2;

        // --- ANIMACIÓN DE POLVO DE ORO 3D (INTERACCIÓN CON CURSOR Y SCROLL) ---
        if (typeof goldDustParticles !== 'undefined' && goldDustParticles) {
            goldDustParticles.rotation.y = elapsedTime * 0.035 + (smoothMouseX * 0.15);
            goldDustParticles.rotation.x = Math.sin(elapsedTime * 0.02) * 0.08 + (-smoothMouseY * 0.1);
            goldDustParticles.position.z = -scrollProgress * 4.0;
        }

        renderer.render(scene, camera);
    }

    // ================= SECUENCIA CINEMATOGRÁFICA DE ENTRADA (SHOWREEL INTRO) =================
    let introFinished = false;
    function finishIntroCurtain() {
        if (_disposed) return;
        if (introFinished) return;
        introFinished = true;

        const curtainEl = document.getElementById('cinematic-curtain');
        if (curtainEl) {
            curtainEl.style.opacity = '0';
            curtainEl.style.transform = 'scale(1.04)';
            curtainEl.style.pointerEvents = 'none';
            setTimeout(() => { curtainEl.style.display = 'none'; }, 1100);
        }

        // Reproducir video del Hero sincronizado
        const heroVideo = document.getElementById('hero-bg-video');
        if (heroVideo && heroVideo.paused) {
            heroVideo.play().catch(() => {});
        }

        // Disparar la animación Dolly de la cámara 3D y de la iluminación
        gsap.to(camera.position, {
            z: 7.2,
            duration: 2.8,
            ease: "power3.out"
        });
        gsap.fromTo(keyGoldLight, { intensity: 0.4 }, {
            intensity: 5.5,
            duration: 2.4,
            ease: "power2.out"
        });

        // Aparición dramática y cinematográfica de los textos del Hero
        gsap.to('.hero-pill', {
            opacity: 1,
            y: 0,
            duration: 1.2,
            delay: 0.2,
            ease: "power3.out"
        });

        gsap.to('.hero-title', {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.6,
            delay: 0.4,
            ease: "power4.out"
        });

        gsap.to('.hero-subtitle', {
            opacity: 1,
            y: 0,
            duration: 1.3,
            delay: 0.7,
            ease: "power3.out"
        });

        gsap.to('.hero-viewport-tags', {
            opacity: 1,
            y: 0,
            duration: 1.2,
            delay: 0.9,
            ease: "power3.out"
        });

        gsap.to('.scroll-hint', {
            opacity: 1,
            duration: 1.0,
            delay: 1.2,
            ease: "power2.out"
        });
    }

    const introVid = document.getElementById('intro-brand-video');
    if (introVid) {
        introVid.addEventListener('ended', () => {
            // Pausa de 600ms para admirar el logo final de GOLDTEX antes de abrir el showroom
            setTimeout(finishIntroCurtain, 600);
        });
        introVid.addEventListener('error', finishIntroCurtain);
        // Fallback de seguridad por si el navegador bloquea el autoplay o el video es largo
        setTimeout(finishIntroCurtain, 12000);
    }

    // Control de seguridad del Hero para evitar colisiones de logo
    const heroVid = document.getElementById('hero-bg-video');
    if (heroVid) {
        heroVid.addEventListener('timeupdate', () => {
            if (heroVid.duration && heroVid.currentTime > heroVid.duration - 2.2) {
                if (heroVid.src && heroVid.src.includes('UNIDOS')) {
                    heroVid.currentTime = 0;
                }
            }
        });
    }

    // Iniciar renderizado del Showroom 3D
    renderScene();

    // ================= RESIZE RESPONSIVO =================
    _onWindow('resize', () => {
        const width = window.innerWidth;
        const height = window.innerHeight;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        if (renderer) {
            renderer.setSize(width, height);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        }

        // Optimización responsive: Alejar la cámara ligeramente en pantallas angostas
        if (width < 768) {
            cameraModeOffsets.overview.z = 9.5;
        } else {
            cameraModeOffsets.overview.z = 7.2;
        }
    });

    // Configuración inicial responsive
    if (window.innerWidth < 768) {
        cameraModeOffsets.overview.z = 9.5;
    }

    // ================= CONFIGURADOR 3D EN TIEMPO REAL & CATÁLOGO REAL =================
    /* Las líneas y datos provienen de los documentos de la marca (investigación de
     * mercados y carpeta de campaña). Los precios son referenciales (simulación de
     * focus group) y se confirmar por WhatsApp Business. */
    const fabricPresets = {
        'drill-industrial': {
            name: 'Drill Industrial',
            material: materials.pimaCotton,
            gsm: 'Drill Industrial',
            weight: 'Venta por metros',
            weave: '1.50 m',
            threads: 'Optimiza cortes',
            comp: 'Metros / Fardos',
            origin: 'Cuarto de docena',
            finish: 'S/ 12.50 m',
            stretch: 'Cotiza por WhatsApp',
            bumpScale: 0.08
        },
        'popelina': {
            name: 'Popelina',
            material: materials.ivoryCrepe,
            gsm: 'Popelina',
            weight: 'Venta por metros',
            weave: 'Ligera',
            threads: 'Confección',
            comp: 'Metros / Fardos',
            origin: 'Cuarto de docena',
            finish: 'S/ 8.50 m',
            stretch: 'Cotiza por WhatsApp',
            bumpScale: 0.04
        },
        'tejido-punto': {
            name: 'Tejidos de Punto',
            material: materials.emeraldSilk,
            gsm: 'Tejido de Punto',
            weight: 'Ropa urbana',
            weave: 'Punto',
            threads: 'Elasticidad',
            comp: 'Metros / Fardos',
            origin: 'Deportiva',
            finish: 'Cotiza por WhatsApp',
            stretch: 'Stock inmediato',
            bumpScale: 0.04
        },
        'algodon-poly': {
            name: 'Algodón & Poliéster',
            material: materials.goldFabric,
            gsm: 'Algodón / Poliéster',
            weight: 'Corporativo',
            weave: 'Estampados',
            threads: 'Por metros',
            comp: 'Metros / Fardos',
            origin: 'Reposición constante',
            finish: 'Cotiza por WhatsApp',
            stretch: 'Stock inmediato',
            bumpScale: 0.06
        }
    };

    let currentFabricKey = 'pima-cotton';

    function selectFabricPreset(key, clickedEl) {
        const preset = fabricPresets[key];
        if (!preset) return;
        currentFabricKey = key;

        // Actualizar botones UI
        document.querySelectorAll('.fabric-chip').forEach(chip => chip.classList.remove('active'));
        // (Port) ver nota en switch3DCamera: elemento explícito con fallback al global legacy.
        const srcEl = clickedEl || event;
        const activeChip = (srcEl && srcEl.currentTarget) || srcEl?.target;
        if (activeChip) {
            activeChip.classList.add('active');
        }

        // Aplicar nuevo material físico a los rollos y mantos principales
        if (rolls.length > 0) {
            // Actualizar cuerpo del rollo central
            const centralRollMesh = rolls[0].group.children[0];
            if (centralRollMesh) {
                centralRollMesh.material = preset.material;
            }
        }

        if (wavingCloths.length > 0) {
            wavingCloths[0].mesh.material = preset.material;
        }

        // Actualizar HUD Scanner Holográfico
        updateScannerHUD(preset);

        // Efecto de pulso en la iluminación
        gsap.fromTo(keyGoldLight, { intensity: 2.0 }, { intensity: 5.5, duration: 0.8, ease: "power2.out" });
    }

    function updateScannerHUD(preset) {
        const statusEl = document.getElementById('scanner-status-text');
        if (statusEl) {
            statusEl.textContent = 'IDENTIFICANDO TELA...';
            statusEl.style.color = '#F1B734';
            setTimeout(() => {
                statusEl.textContent = 'TELA IDENTIFICADA: ' + preset.name.toUpperCase();
                statusEl.style.color = '#6ee7b7';
            }, 600);
        }

        const gsmEl = document.getElementById('spec-gsm');
        const weightEl = document.getElementById('spec-weight');
        const weaveEl = document.getElementById('spec-weave');
        const threadsEl = document.getElementById('spec-threads');
        const compEl = document.getElementById('spec-comp');
        const originEl = document.getElementById('spec-origin');
        const finishEl = document.getElementById('spec-finish');
        const stretchEl = document.getElementById('spec-stretch');

        if (gsmEl) gsmEl.textContent = preset.gsm;
        if (weightEl) weightEl.textContent = preset.weight;
        if (weaveEl) weaveEl.textContent = preset.weave;
        if (threadsEl) threadsEl.textContent = preset.threads;
        if (compEl) compEl.textContent = preset.comp;
        if (originEl) originEl.textContent = preset.origin;
        if (finishEl) finishEl.textContent = preset.finish;
        if (stretchEl) stretchEl.textContent = preset.stretch;
    }

    // Simular onda de choque en la tela 3D
    function triggerFabricWave() {
        touchDisplacement.force = 2.4;
        touchDisplacement.x = 0;
        touchDisplacement.y = 0;

        if (wavingCloths.length > 0) {
            const prevSpeed = wavingCloths[0].waveProfile.speed;
            wavingCloths[0].waveProfile.speed = 3.5;
            gsap.to(wavingCloths[0].waveProfile, {
                speed: prevSpeed,
                duration: 1.8,
                ease: "power2.out"
            });
        }
    }

    // Zoom extremo microscópico a la urdimbre del tejido
    function zoomToMicroFiber() {
        switch3DCamera('micro-fiber');
        gsap.to(camera.position, {
            z: 2.2,
            y: -0.2,
            x: 0.1,
            duration: 2.2,
            ease: "power3.inOut"
        });
        setTimeout(() => {
            const statusEl = document.getElementById('scanner-status-text');
            if (statusEl) {
                statusEl.textContent = 'MICROSCOPIO DE URDIMBRE ACTIVO';
                statusEl.style.color = '#ffeaa7';
            }
        }, 800);
    }

    // ================= LENIS SMOOTH SCROLL (CALIBRACIÓN SEDA / AWWWARDS) =================
    const lenis = new Lenis({
        lerp: 0.08,             // Inercia continua y fluida de física real (elimina cualquier frenazo brusco)
        smoothWheel: true,
        wheelMultiplier: 1.0,   // Sensibilidad natural para rueda de ratón y trackpads de Mac
        touchMultiplier: 1.1    // Suavidad táctil continua
    });

    lenis.on('scroll', (e) => {
        ScrollTrigger.update();
        if (typeof targetScrollProgress !== 'undefined' && e.progress !== undefined) {
            targetScrollProgress = e.progress;
        }
    });

    // (Port) Callback capturado para poder removerlo del ticker en dispose
    const lenisTickerCallback = (time) => {
        lenis.raf(time * 1000);
    };
    gsap.ticker.add(lenisTickerCallback);
    gsap.ticker.lagSmoothing(0);

    // ================= SCROLLTRIGGER PARA REVELACIÓN DE TARJETAS =================
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray('.reveal-card').forEach((card) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 45,
            duration: 1.2,
            ease: 'power3.out'
        });
    });
    // (Port) exposición para diagnóstico de integración (no altera la experiencia)
    window.__gtScrollTrigger = ScrollTrigger;
    window.__gtGsapVersion = gsap.version;

    // ================= CONTROLADORES DE VIDEO DE CAMPAÑA =================
    function toggleAudioVideo(id) {
        const video = document.getElementById('spot-video-' + id);
        const audioIcon = document.getElementById('audio-icon-' + id);
        const audioText = document.getElementById('audio-text-' + id);
        if (!video) return;

        video.muted = !video.muted;
        if (video.muted) {
            audioIcon.textContent = '🔇';
            audioText.textContent = 'Silenciado';
        } else {
            audioIcon.textContent = '🔊';
            audioText.textContent = 'Con Audio';
            video.play();
        }
    }

    function togglePlayVideo(id) {
        const video = document.getElementById('spot-video-' + id);
        const playIcon = document.getElementById('play-icon-' + id);
        if (!video) return;

        if (video.paused) {
            video.play();
            playIcon.textContent = '⏸';
        } else {
            video.pause();
            playIcon.textContent = '▶';
        }
    }

    function toggleFullscreenVideo(id) {
        const container = document.getElementById('video-container-' + id);
        const video = document.getElementById('spot-video-' + id);
        if (!container) return;

        if (!document.fullscreenElement) {
            if (container.requestFullscreen) {
                container.requestFullscreen();
            } else if (container.webkitRequestFullscreen) {
                container.webkitRequestFullscreen();
            } else if (video.webkitEnterFullscreen) {
                video.webkitEnterFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    }

    // ================= PAUSA INTELIGENTE DE VIDEOS (rendimiento a 60fps) =================
    const allObservables = [
        document.getElementById('hero-bg-video'),
        document.getElementById('spot-video-1'),
        document.getElementById('spot-video-2'),
        ...document.querySelectorAll('.portal-bg-video')
    ].filter(Boolean);

    if ('IntersectionObserver' in window) {
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const v = entry.target;
                if (entry.isIntersecting) {
                    if (v.muted) v.play().catch(() => {});
                } else {
                    v.pause();
                }
            });
        }, { threshold: 0.12 });
        // (Port) Registrar el observer para desconectarlo en dispose
        _observers.push(videoObserver);
        allObservables.forEach((v) => videoObserver.observe(v));
    }

    // ================= ANIMACIÓN DE PORTALES DE VIDEO CINEMÁTICOS =================
    document.querySelectorAll('.evidencia-video-portal').forEach((portal) => {
        const video = portal.querySelector('.portal-bg-video');
        gsap.fromTo(portal,
            { clipPath: 'inset(10% 5% 10% 5% round 28px)', opacity: 0.85 },
            {
                clipPath: 'inset(0% 0% 0% 0% round 24px)',
                opacity: 1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: portal,
                    start: 'top 88%',
                    end: 'top 40%',
                    scrub: 1.2
                }
            }
        );
        if (video) {
            gsap.to(video, {
                yPercent: 12,
                ease: 'none',
                scrollTrigger: {
                    trigger: portal,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                }
            });
        }
    });

    // ================= DYNAMIC COLOR MORPHING DE AURORA ORBS =================
    const goldOrb = document.querySelector('.aurora-orb.gold');
    const emeraldOrb = document.querySelector('.aurora-orb.emerald');

    if (goldOrb && emeraldOrb) {
        ScrollTrigger.create({
            trigger: '#evidencia-1',
            start: 'top 70%',
            onEnter: () => {
                gsap.to(emeraldOrb, { background: 'radial-gradient(circle, rgba(10, 110, 88, 0.40) 0%, transparent 70%)', duration: 1.6 });
                gsap.to(goldOrb, { background: 'radial-gradient(circle, rgba(241, 183, 52, 0.22) 0%, transparent 70%)', duration: 1.6 });
            }
        });

        ScrollTrigger.create({
            trigger: '#evidencia-2',
            start: 'top 70%',
            onEnter: () => {
                gsap.to(goldOrb, { background: 'radial-gradient(circle, rgba(241, 183, 52, 0.42) 0%, transparent 70%)', duration: 1.6 });
                gsap.to(emeraldOrb, { background: 'radial-gradient(circle, rgba(16, 185, 129, 0.20) 0%, transparent 70%)', duration: 1.6 });
            }
        });

        ScrollTrigger.create({
            trigger: '#evidencia-3',
            start: 'top 70%',
            onEnter: () => {
                gsap.to(goldOrb, { background: 'radial-gradient(circle, rgba(212, 175, 55, 0.38) 0%, transparent 70%)', duration: 1.6 });
                gsap.to(emeraldOrb, { background: 'radial-gradient(circle, rgba(4, 90, 70, 0.38) 0%, transparent 70%)', duration: 1.6 });
            }
        });
    }

    // ================= KINETIC TYPOGRAPHY CON SPLIT-TYPE =================
    // (Port) Instancias SplitType recolectadas para revert() en dispose (React StrictMode remonta)
    const splitInstances = [];
    if (typeof SplitType !== 'undefined') {
        document.querySelectorAll('.section-title-xl').forEach((title) => {
            try {
                const split = new SplitType(title, { types: 'words, chars' });
                splitInstances.push(split);
                gsap.from(split.chars, {
                    scrollTrigger: {
                        trigger: title,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse'
                    },
                    opacity: 0,
                    y: 35,
                    rotateX: -60,
                    stagger: 0.018,
                    duration: 0.8,
                    ease: 'back.out(1.7)'
                });
            } catch (e) {
                console.warn("SplitType skipped for element", e);
            }
        });
    }

    // ================= ANIMACIÓN ESPACIAL EN EL EJE Z (PORTALES HOLOGRÁFICOS) =================
    const portalCards = gsap.utils.toArray('.spatial-portal-card');
    portalCards.forEach((cardEl, idx) => {
        const card = cardEl as HTMLElement;
        const isLeft = card.classList.contains('spatial-portal-left') || (idx % 2 === 0);
        gsap.fromTo(card,
            {
                z: -600,
                scale: 0.74,
                opacity: 0,
                rotateY: isLeft ? 22 : -22,
                rotateX: 6
            },
            {
                z: 0,
                scale: 1,
                opacity: 1,
                rotateY: isLeft ? 10 : -10,
                rotateX: 0,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 88%',
                    end: 'top 40%',
                    scrub: 1
                }
            }
        );
    });

    // ================= SPOTLIGHT CURSOR GLOW + VANILLA TILT EN TARJETAS =================
    const interactiveCards = document.querySelectorAll('.service-card, .reason-card, .media-card, .psych-card, .axis-card, .persona-card, .spatial-portal-card');
    interactiveCards.forEach((card) => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
            card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
        });
    });

    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(interactiveCards, {
            max: 6,
            speed: 400,
            glare: true,
            "max-glare": 0.15,
            scale: 1.02
        });
    }

    // ================= VISIBILIDAD DE PESTAÑA (ahorro de GPU) =================
    _onDocument('visibilitychange', () => {
        pageVisible = !document.hidden;
    });

    // ================= LIMPIEZA (DISPOSE) — infraestructura de port React =================
    function dispose() {
        if (_disposed) return;
        _disposed = true;

        cancelAnimationFrame(_rafId);

        _winListeners.forEach(([t, f, o]) => window.removeEventListener(t, f, o));
        _docListeners.forEach(([t, f, o]) => document.removeEventListener(t, f, o));
        _winListeners.length = 0;
        _docListeners.length = 0;

        // (Port) Desconectar observers registrados (videos: pausa inteligente)
        _observers.forEach((o) => o.disconnect());
        _observers.length = 0;

        // (Port) Remover el callback del ticker que alimenta lenis.raf
        try { gsap.ticker.remove(lenisTickerCallback); } catch (e) { }

        ScrollTrigger.getAll().forEach((t) => t.kill());

        // El módulo asume que este módulo posee todos los tweens GSAP de la app
        try { gsap.globalTimeline.clear(); } catch (e) { }
        // (Port) React StrictMode reutiliza los mismos nodos del DOM entre el mount base
        // y el remount: los from-tweens muertos dejan estilos inline (opacity:0/y:45) que
        // contaminan las tweens nuevas (animarían 0→0). Devolvemos los valores del CSS.
        try { gsap.utils.toArray('.reveal-card').forEach((el) => gsap.set(el, { clearProps: 'all' })); } catch (e) { }

        // (Port) Revertir splits tipográficos para no dejar nodos DOM residuales
        splitInstances.forEach((s) => { try { s.revert(); } catch (e) { } });
        splitInstances.length = 0;

        // (Port) Destruir instancias VanillaTilt (listeners por tarjeta; destroy elimina element.vanillaTilt)
        interactiveCards.forEach((card) => {
            const tilt = card && card.vanillaTilt;
            if (tilt && typeof tilt.destroy === 'function') tilt.destroy();
        });

        if (lenis) lenis.destroy();

        renderer?.dispose();
        renderer?.forceContextLoss?.();
        renderer?.domElement?.remove();

        // Dispose de todas las geometrías y materiales de la escena
        scene?.traverse((o) => {
            o.geometry?.dispose?.();
            const m = o.material;
            if (Array.isArray(m)) m.forEach((mm) => { mm?.map?.dispose?.(); mm?.bumpMap?.dispose?.(); mm?.dispose?.(); });
            else if (m) { m?.map?.dispose?.(); m?.bumpMap?.dispose?.(); m?.dispose?.(); }
        });

        // (Port) Dispose de texturas referenciadas directamente
        botanicalFabricTex?.dispose?.();
        suitFabricTex?.dispose?.();
        weaveBumpTexture?.dispose?.();
        goldBumpTexture?.dispose?.();
        rollCapTexture?.dispose?.();
    }

    return {
        dispose,
        actions: {
            finishIntroCurtain,
            setInteractionMode,
            scrollToExperience,
            switch3DCamera,
            selectFabricPreset,
            triggerFabricWave,
            zoomToMicroFiber,
            togglePlayVideo,
            toggleAudioVideo,
            toggleFullscreenVideo
        }
    };
}
