import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import heroEmblemImg from '../assets/aitech-hero-emblem.png';

const DEFAULT_PATHS = [
  'M10,138 L58,16 C61,9 69,9 72,16 L88,58 L62,70 L34,138 Z',
  'M46,88 L72,76 L112,138 H86 L74,114 H56 Z',
  'M120,44 H146 C150,44 154,48 154,52 V138 H120 Z',
  'M130,8 H146 V24 H130 Z',
];

const FORMS = ['MARK', 'FLOW', 'FIELD', 'BUILD', 'CONNECT'];

function parseSvgPath(d, boxHeight = 148) {
  const shape = new THREE.Shape();
  const tokens = d.match(/[a-zA-Z]|-?\d*\.?\d+(?:e-?\d+)?/g) || [];
  let i = 0;
  let curX = 0;
  let curY = 0;
  let cmd = '';
  const nextNum = () => parseFloat(tokens[i++]);
  const flipY = (y) => boxHeight - y;

  while (i < tokens.length) {
    if (/[a-zA-Z]/.test(tokens[i])) {
      cmd = tokens[i++];
    }
    const isRel = cmd === cmd.toLowerCase();
    switch (cmd.toUpperCase()) {
      case 'M': {
        const x = nextNum(),
          y = nextNum();
        curX = isRel ? curX + x : x;
        curY = isRel ? curY + y : y;
        shape.moveTo(curX, flipY(curY));
        cmd = isRel ? 'l' : 'L';
        break;
      }
      case 'L': {
        const x = nextNum(),
          y = nextNum();
        curX = isRel ? curX + x : x;
        curY = isRel ? curY + y : y;
        shape.lineTo(curX, flipY(curY));
        break;
      }
      case 'H': {
        const x = nextNum();
        curX = isRel ? curX + x : x;
        shape.lineTo(curX, flipY(curY));
        break;
      }
      case 'V': {
        const y = nextNum();
        curY = isRel ? curY + y : y;
        shape.lineTo(curX, flipY(curY));
        break;
      }
      case 'C': {
        const t = [nextNum(), nextNum(), nextNum(), nextNum(), nextNum(), nextNum()];
        const pts = isRel ? t.map((v, idx) => v + (idx % 2 ? curY : curX)) : t;
        shape.bezierCurveTo(pts[0], flipY(pts[1]), pts[2], flipY(pts[3]), pts[4], flipY(pts[5]));
        curX = pts[4];
        curY = pts[5];
        break;
      }
      case 'Z': {
        shape.closePath();
        break;
      }
      default:
        i++;
    }
  }
  return shape;
}

function createAtlasTexture(paths, logoSize = 148) {
  const canvas = document.createElement('canvas');
  canvas.width = 480;
  canvas.height = 96;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#ffffff';

  const drawSlot = (slotIdx, w, h, fn) => {
    const scale = (96 * 0.78) / Math.max(w, h);
    ctx.save();
    ctx.translate(slotIdx * 96 + (96 - w * scale) / 2, (96 - h * scale) / 2);
    ctx.scale(scale, scale);
    fn();
    ctx.restore();
  };

  // Slot 0: square
  drawSlot(0, 30, 30, () => ctx.fillRect(0, 0, 30, 30));
  // Slot 1: circle
  drawSlot(1, 30, 30, () => {
    ctx.beginPath();
    ctx.arc(15, 15, 15, 0, Math.PI * 2);
    ctx.fill();
  });
  // Slot 2: plus
  drawSlot(2, 30, 30, () => {
    ctx.fillRect(11, 0, 8, 30);
    ctx.fillRect(0, 11, 30, 8);
  });
  // Slot 3: ring
  drawSlot(3, 30, 30, () => {
    ctx.beginPath();
    ctx.arc(15, 15, 15, 0, Math.PI * 2);
    ctx.arc(15, 15, 9, 0, Math.PI * 2, true);
    ctx.fill();
  });
  // Slot 4: SVG logo icon
  drawSlot(4, logoSize, logoSize, () => {
    paths.forEach((p) => ctx.fill(new Path2D(p)));
  });

  return canvas;
}

const VERTEX_SHADER = `
attribute vec3 t0;
attribute vec3 t1;
attribute vec3 t2;
attribute vec3 t3;
attribute vec3 t4;
attribute vec4 rnd;
attribute vec4 meta;

uniform float uForm;
uniform float uTime;
uniform vec2 uMouse;
uniform float uAspect;
uniform float uPx;
uniform float uSize;
uniform float uAcc[5];
uniform float uMouseForce;
uniform float uDim;
uniform float uGridPx;
uniform float uIntro;
uniform vec2 uMarkC;

varying float vAcc;
varying float vAlpha;
varying float vKind;
varying float vRot;

vec3 o0;

vec3 pick(float i) {
  return i < 0.5 ? o0 : i < 1.5 ? t1 : i < 2.5 ? t2 : i < 3.5 ? t3 : t4;
}

float pickF(float i) {
  int k = int(clamp(i, 0.0, 4.0));
  if (k == 0) return uAcc[0];
  if (k == 1) return uAcc[1];
  if (k == 2) return uAcc[2];
  if (k == 3) return uAcc[3];
  return uAcc[4];
}

void main() {
  // slow orbit of the hero halo around the mark
  vec2 dd = t0.xy - uMarkC;
  float an = uTime * 0.06 * (0.6 + rnd.y * 0.8);
  o0 = vec3(uMarkC + mat2(cos(an), -sin(an), sin(an), cos(an)) * dd, t0.z);

  float ff = clamp(uForm + (rnd.z - 0.5) * 0.45, 0.0, 4.0);
  float i = floor(ff);
  float k = smoothstep(0.0, 1.0, fract(ff));
  if (i >= 4.0) {
    i = 3.0;
    k = 1.0;
  }
  vec3 p = mix(pick(i), pick(i + 1.0), k);

  float markW = 1.0 - smoothstep(0.0, 0.45, uForm);
  float grid = meta.z * markW;
  float ph = rnd.w * 6.2831;
  p += vec3(sin(uTime * 0.35 + ph), cos(uTime * 0.3 + ph * 1.3), sin(uTime * 0.25 + ph * 0.7)) * 0.02 * (1.0 - grid);

  // grid cells assemble from below on load
  p.y -= (1.0 - smoothstep(rnd.w * 0.6, rnd.w * 0.6 + 0.4, uIntro)) * 0.6 * meta.z;
  float w2 = clamp(1.0 - abs(uForm - 2.0), 0.0, 1.0);
  p.y += sin(p.x * 1.4 + uTime * 0.6) * cos(p.z * 1.2 + uTime * 0.4) * 0.22 * w2;

  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  vec4 cl = projectionMatrix * mv;
  vec2 nd = cl.xy / cl.w;
  vec2 d = nd - uMouse;
  d.x *= uAspect;
  float dl = length(d);
  cl.xy += (d / max(dl, 0.0001)) * smoothstep(0.16, 0.0, dl) * 0.045 * uMouseForce * cl.w * (1.0 - grid * 0.7);
  gl_Position = cl;

  float free = uSize * (0.55 + rnd.y * 1.1) * uPx * (9.0 / -mv.z);
  gl_PointSize = mix(free, uGridPx, grid);
  float acc = mix(pickF(i), pickF(i + 1.0), k);
  vAcc = step(rnd.x, acc);
  float idle = clamp(1.0 - abs(uForm - 4.0), 0.0, 1.0);
  float dimW = smoothstep(0.0, 0.8, uForm);
  float heroA = mix(1.0, meta.w, markW);
  vAlpha = (0.5 + rnd.y * 0.5) * mix(1.0, mix(0.3, 1.0, vAcc), idle) * mix(1.0, uDim, dimW) * heroA * mix(1.0, smoothstep(rnd.w * 0.6, rnd.w * 0.6 + 0.4, uIntro), meta.z);
  vKind = mix(meta.x, 0.0, grid);
  vRot = mix(meta.y, 0.0, grid);
}
`;

const FRAGMENT_SHADER = `
uniform vec3 uShell;
uniform vec3 uPulse;
uniform sampler2D uAtlas;

varying float vAcc;
varying float vAlpha;
varying float vKind;
varying float vRot;

void main() {
  vec2 uv = gl_PointCoord - 0.5;
  float a = vRot * 1.5707963;
  uv = mat2(cos(a), -sin(a), sin(a), cos(a)) * uv + 0.5;
  float m = texture2D(uAtlas, vec2((uv.x + vKind) / 5.0, 1.0 - uv.y)).a;
  if (m < 0.4) discard;
  vec3 col = mix(uShell, uPulse, vAcc);
  gl_FragColor = vec4(col, vAlpha * m);
}
`;

function checkWebGLSupport() {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

export default function Fluxor3D({
  logoPaths = DEFAULT_PATHS,
  logoSize = 148,
  particleCount = 4800,
  shell = '#ede9e8',
  pulse = '#c8ff3d',
  particleSize = 0.85,
  markSize = 0.32,
  markX = 73,
  markY = 49,
  showMark = true,
  stopFlow = 0.09,
  stopField = 0.19,
  stopGpu = 0.37,
  stopIdle = 0.45,
  accentShares = [0.38, 0.45, 0.22, 0.35, 0.05],
  mouseForce = 0.6,
  backgroundDim = 0.55,
  readingDim = 0.12,
  scrollBoost = 1.6,
  clearZone = 55,
  showHud = true,
  isHidden = false,
}) {
  const containerRef = useRef(null);
  const [webglSupported, setWebglSupported] = useState(() => checkWebGLSupport());
  const [hudState, setHudState] = useState({
    form: 0,
    fps: 60,
    chapter: 0,
    wide: true,
  });
  const accentKey = JSON.stringify(accentShares);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !checkWebGLSupport()) {
      setWebglSupported(false);
      return;
    }

    let destroyed = false;
    let animFrameId = 0;
    const isReducedMotion =
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const getW = () => Math.max(1, container.clientWidth || window.innerWidth);
    const getH = () => Math.max(1, container.clientHeight || window.innerHeight);
    const isMobileWidth = getW() < 700;

    // 1. Renderer with try-catch & WebGL Context Loss Handling
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isMobileWidth,
        alpha: true,
        powerPreference: isMobileWidth ? 'low-power' : 'high-performance',
      });
    } catch (err) {
      console.warn('Fluxor3D WebGL initialization failed, falling back to CSS aura:', err);
      setWebglSupported(false);
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobileWidth ? 1.25 : 1.75));
    renderer.setSize(getW(), getH());
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.style.cssText =
      'position:absolute;inset:0;width:100%;height:100%;display:block;pointer-events:none;';
    container.prepend(renderer.domElement);

    const handleContextLost = (e) => {
      e.preventDefault();
      cancelAnimationFrame(animFrameId);
    };
    const handleContextRestored = () => {
      animFrameId = requestAnimationFrame(animate);
    };
    renderer.domElement.addEventListener('webglcontextlost', handleContextLost, false);
    renderer.domElement.addEventListener('webglcontextrestored', handleContextRestored, false);

    // 2. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, getW() / getH(), 0.1, 100);
    camera.position.set(0, 0, 9);

    // 3. 3D Mark (Extruded Logo Emblem)
    // 3. 3D Mark (High-Res Metallic Lime Emblem)
    const markGroup = new THREE.Group();
    scene.add(markGroup);

    const textureLoader = new THREE.TextureLoader();
    const emblemTexture = textureLoader.load(heroEmblemImg);
    emblemTexture.colorSpace = THREE.SRGBColorSpace;
    emblemTexture.generateMipmaps = true;
    emblemTexture.minFilter = THREE.LinearMipmapLinearFilter;

    // Aspect ratio of aitech-hero-emblem.png (916 x 529): 1.73157
    const baseH = 100;
    const baseW = baseH * (916 / 529);
    const planeGeo = new THREE.PlaneGeometry(baseW, baseH);
    // Optical center alignment: align emblem's visual center of mass precisely to (0,0,0)
    planeGeo.translate(-baseW * 0.0655, baseH * 0.0874, 0);

    const emblemMat = new THREE.MeshBasicMaterial({
      map: emblemTexture,
      transparent: true,
      opacity: 1.0,
      depthWrite: false,
      depthTest: false,
      side: THREE.FrontSide,
    });
    const emblemMesh = new THREE.Mesh(planeGeo, emblemMat);
    emblemMesh.renderOrder = 999;
    emblemMesh.position.z = 0.05;
    markGroup.renderOrder = 999;
    markGroup.add(emblemMesh);

    // 4. Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.55));
    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.9);
    dirLight1.position.set(-3, 4, 7);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xffa57f, 1.2);
    dirLight2.position.set(5, -3, -2);
    scene.add(dirLight2);

    // 5. Particles Setup
    const count = Math.max(
      500,
      Math.min(
        20000,
        Math.round(particleCount * (getW() < 700 ? 0.35 : getW() < 1100 ? 0.65 : 1))
      )
    );

    const particleGeo = new THREE.BufferGeometry();
    const rndArray = new Float32Array(count * 4);
    for (let e = 0; e < count; e++) {
      rndArray[e * 4] = Math.random();
      rndArray[e * 4 + 1] = Math.random();
      rndArray[e * 4 + 2] = Math.random();
      rndArray[e * 4 + 3] = Math.random();
    }
    particleGeo.setAttribute('rnd', new THREE.BufferAttribute(rndArray, 4));

    const metaArray = new Float32Array(count * 4);
    for (let e = 0; e < count; e++) {
      const rand = Math.random();
      metaArray[e * 4] = rand < 0.45 ? 0 : rand < 0.78 ? 1 : 2;
      metaArray[e * 4 + 1] = Math.floor(Math.random() * 4);
    }
    const metaAttr = new THREE.BufferAttribute(metaArray, 4);
    particleGeo.setAttribute('meta', metaAttr);

    const atlasCanvas = createAtlasTexture(logoPaths, logoSize);
    const atlasTexture = new THREE.CanvasTexture(atlasCanvas);
    atlasTexture.minFilter = THREE.LinearMipmapLinearFilter;
    atlasTexture.generateMipmaps = true;

    particleGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(count * 3), 3));

    const uniforms = {
      uForm: { value: 0 },
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(9, 9) },
      uAspect: { value: getW() / getH() },
      uPx: { value: renderer.getPixelRatio() },
      uSize: { value: 6.5 * particleSize * (isMobileWidth ? 0.75 : 1) },
      uAcc: {
        value: accentShares.slice(0, 5).concat([0.3, 0.3, 0.3, 0.3, 0.3]).slice(0, 5),
      },
      uShell: { value: new THREE.Color(shell) },
      uPulse: { value: new THREE.Color(pulse) },
      uMouseForce: { value: mouseForce },
      uDim: { value: backgroundDim },
      uAtlas: { value: atlasTexture },
      uGridPx: { value: 6 },
      uMarkC: { value: new THREE.Vector2(0, 0) },
      uIntro: { value: 1.0 },
    };

    const particleMat = new THREE.ShaderMaterial({
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      uniforms,
      transparent: true,
      depthWrite: false,
      depthTest: true,
    });

    const particlePoints = new THREE.Points(particleGeo, particleMat);
    particlePoints.frustumCulled = false;
    particlePoints.renderOrder = 0;
    scene.add(particlePoints);

    let isHidden = false;

    // Layout targets generator
    const updateGeometryTargets = () => {
      const aspect = getW() / getH();
      const viewH = 18 * Math.tan((35 * Math.PI) / 360);
      const viewW = viewH * aspect;
      const isNarrow = aspect < 0.9;
      let s = viewH * markSize;
      let d = (markX / 100 - 0.5) * viewW;
      let f = (0.5 - markY / 100) * viewH;

      isHidden = false;
      if (isNarrow) {
        s = viewH * 0.17;
        d = 0;
        f = -0.20 * viewH;
      }

      markGroup.position.set(d, f, 0);
      markGroup.scale.setScalar((s * 0.76) / 100);
      uniforms.uMarkC.value.set(d, f);

      const p = [0, 1, 2, 3, 4].map(() => new Float32Array(count * 3));
      const randBetween = (min, max) => min + Math.random() * (max - min);

      for (let e = 0; e < count; e++) {
        const randX = rndArray[e * 4];
        const n = e * 3;

        // Target 0: Hero Mark Halo (Authentic circular disk distribution)
        {
          const isInner = e % 2 === 0;
          const rAngle = Math.random() * Math.PI * 2;
          const oRad = s * (isInner ? Math.sqrt(Math.random()) * 1.3 : randBetween(0.7, 1.25));
          p[0][n] = d + Math.cos(rAngle) * oRad * 1.05;
          p[0][n + 1] = f + Math.sin(rAngle) * oRad;
          p[0][n + 2] = isInner ? randBetween(-4.5, -1.8) : randBetween(-3.5, -0.6);

          const inClearZone = !isNarrow && p[0][n] < (clearZone / 100 - 0.5) * viewW;
          metaArray[e * 4 + 2] = 0;
          metaArray[e * 4 + 3] =
            isHidden || inClearZone || Math.random() < (isInner ? (isNarrow ? 0.4 : 0.08) : isNarrow ? 0.72 : 0.5)
              ? 0
              : isInner
              ? isNarrow
                ? 0.4
                : 0.72
              : isNarrow
              ? 0.4
              : 0.6;
        }

        // Target 1: Flow (flowing wave channels)
        const channel = e % 5;
        if (channel < 4) {
          const rand = Math.random();
          const signX = channel < 2 ? -1 : 1;
          const signY = channel % 2 ? 1 : -1;
          const sX = signX * 0.46 * viewW;
          const cY = signY * 0.16 * viewH;
          const lX = signX * 0.09 * viewW;
          const uCurve = rand * rand * (3 - 2 * rand);
          p[1][n] = sX + (lX - sX) * rand;
          p[1][n + 1] = cY * (1 - uCurve) + signY * 0.05 * viewH * uCurve + randBetween(-0.04, 0.04);
          p[1][n + 2] = randBetween(-0.15, 0.15);
        } else {
          const angle = Math.random() * Math.PI * 2;
          const rad = randBetween(0.42, 0.62) * (isNarrow ? 0.7 : 1);
          p[1][n] = Math.cos(angle) * rad;
          p[1][n + 1] = Math.sin(angle) * rad;
          p[1][n + 2] = randBetween(-0.2, 0.2);
        }

        // Target 2: Field (undulating surface plane)
        const c150 = e % 150;
        const l150 = Math.floor(e / 150);
        p[2][n] = (c150 / 149 - 0.5) * viewW * 1.5;
        p[2][n + 1] = -0.32 * viewH;
        p[2][n + 2] = 2.2 - (l150 / Math.max(1, count / 150)) * 9;

        // Target 3: Build (80-unit matrix block)
        const cell = Math.min(79, Math.floor(randX * 80));
        const gridCol = cell % 10;
        const gridRow = Math.floor(cell / 10);
        const cellStep = Math.min(viewH * 0.07, viewW * 0.036);
        const vStep = cellStep * 1.38;
        const startX = isNarrow ? -4.5 * vStep : 0.02 * viewW;
        p[3][n] = startX + gridCol * vStep + randBetween(0.08, 0.92) * cellStep;
        p[3][n + 1] = (3.5 - gridRow) * vStep + randBetween(-0.42, 0.42) * cellStep;
        p[3][n + 2] = randBetween(-0.12, 0.12);

        // Target 4: Connect (dual constellation clusters)
        const sign = Math.random() < 0.5 ? -1 : 1;
        const expRand = Math.random() ** 2.2;
        p[4][n] = sign * (0.5 - expRand * (isNarrow ? 0.18 : 0.26)) * viewW * 1.04;
        p[4][n + 1] = randBetween(-0.55, 0.55) * viewH * (1 - expRand * 0.25);
        p[4][n + 2] = randBetween(-1.2, 0.4);
      }

      p.forEach((targetData, idx) => {
        particleGeo.setAttribute(`t${idx}`, new THREE.BufferAttribute(targetData, 3));
      });
      metaAttr.needsUpdate = true;
    };

    updateGeometryTargets();
    const delayedTimer = window.setTimeout(updateGeometryTargets, 1400);

    // Mouse tracking for parallax and particle repulsion
    const mouse = { x: 9, y: 9, tx: 0, ty: 0 };
    const handlePointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    // Scroll calculation
    const getScrollForm = () => {
      const totalScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const scrollRatio = window.scrollY / totalScroll;
      const stops = [0, stopFlow, stopField, stopGpu, stopIdle];
      if (scrollRatio <= stops[0]) return 0;
      for (let idx = 0; idx < 4; idx++) {
        if (scrollRatio <= stops[idx + 1]) {
          return idx + (scrollRatio - stops[idx]) / Math.max(1e-4, stops[idx + 1] - stops[idx]);
        }
      }
      return 4;
    };

    let currentForm = getScrollForm();
    let lastTime = performance.now();
    let frameCounter = 0;
    let accumulatedTime = 0;
    let lastFpsUpdate = 0;
    let lastScrollPos = window.scrollY;
    let scrollVelocity = 0;
    let currentDim = readingDim;
    const startTime = performance.now();

    const handleResize = () => {
      renderer.setSize(getW(), getH());
      camera.aspect = getW() / getH();
      camera.updateProjectionMatrix();
      uniforms.uAspect.value = getW() / getH();
      updateGeometryTargets();
    };

    let resizeDebounce = 0;
    const resizeObserver =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => {
            window.clearTimeout(resizeDebounce);
            resizeDebounce = window.setTimeout(handleResize, 150);
          })
        : null;
    resizeObserver?.observe(container);

    const animate = (timestamp) => {
      if (destroyed) return;
      const dt = Math.min(0.05, (timestamp - lastTime) / 1000);
      lastTime = timestamp;

      // Scroll form interpolation
      const targetForm = getScrollForm();
      currentForm += (targetForm - currentForm) * Math.min(1, dt * 2.2);
      uniforms.uForm.value = currentForm;
      uniforms.uIntro.value = Math.min(1, uniforms.uIntro.value + dt * 0.7);

      // Scroll speed boost
      const deltaScroll = Math.abs(window.scrollY - lastScrollPos);
      lastScrollPos = window.scrollY;
      scrollVelocity = Math.max(
        scrollVelocity * Math.pow(0.04, dt),
        Math.min(1, deltaScroll / Math.max(1, dt * 2400))
      );
      const targetDim = readingDim + (backgroundDim - readingDim) * Math.min(1, scrollVelocity * scrollBoost);
      currentDim += (targetDim - currentDim) * Math.min(1, dt * (targetDim > currentDim ? 6 : 1.6));
      uniforms.uDim.value = currentDim;
      uniforms.uTime.value = isReducedMotion ? 0 : (timestamp - startTime) / 1000;

      // Mouse smoothing
      const normMouseX = Math.abs(mouse.x) > 1.5 ? 0 : mouse.x;
      const normMouseY = Math.abs(mouse.y) > 1.5 ? 0 : mouse.y;
      mouse.tx += (normMouseX - mouse.tx) * 0.06;
      mouse.ty += (normMouseY - mouse.ty) * 0.06;
      uniforms.uMouse.value.set(mouse.x, mouse.y);

      // Emblem visibility and fade out as user leaves Hero
      const emblemFade = Math.max(0, 1 - currentForm / 0.55);
      markGroup.visible = showMark && !isHidden && emblemFade > 0.005;
      const introProgress = 1 - Math.pow(1 - uniforms.uIntro.value, 3);
      if (markGroup.children[0]) {
        markGroup.children[0].scale.setScalar(
          (0.65 + 0.35 * emblemFade) * (0.86 + 0.14 * introProgress)
        );
      }
      emblemMat.opacity = emblemFade * introProgress;

      // Subtle rotations
      const secTime = (timestamp - startTime) / 1000;
      markGroup.rotation.y = Math.sin(secTime * 0.3) * 0.05 + mouse.tx * 0.12;
      markGroup.rotation.x = mouse.ty * -0.08;
      particlePoints.rotation.y = mouse.tx * 0.06;
      particlePoints.rotation.x = mouse.ty * -0.04;

      renderer.render(scene, camera);

      // FPS and HUD updates
      frameCounter++;
      accumulatedTime += dt;
      if (timestamp - lastFpsUpdate > 500) {
        lastFpsUpdate = timestamp;
        const fps = Math.round(frameCounter / Math.max(0.001, accumulatedTime));
        frameCounter = 0;
        accumulatedTime = 0;
        const activeFormIdx = Math.min(4, Math.round(currentForm));
        const isWide = getW() > 1000;
        setHudState((prev) =>
          prev.form === activeFormIdx && prev.fps === fps && prev.wide === isWide
            ? prev
            : { form: activeFormIdx, fps: Math.min(60, fps), chapter: activeFormIdx, wide: isWide }
        );
      }

      animFrameId = requestAnimationFrame(animate);
    };

    animFrameId = requestAnimationFrame(animate);

    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animFrameId);
      } else {
        lastTime = performance.now();
        animFrameId = requestAnimationFrame(animate);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      destroyed = true;
      cancelAnimationFrame(animFrameId);
      window.clearTimeout(resizeDebounce);
      window.clearTimeout(delayedTimer);
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('visibilitychange', handleVisibility);
      resizeObserver?.disconnect();

      if (planeGeo) planeGeo.dispose();
      if (emblemTexture) emblemTexture.dispose();
      if (emblemMat) emblemMat.dispose();
      if (particleGeo) particleGeo.dispose();
      if (particleMat) particleMat.dispose();
      if (atlasTexture) atlasTexture.dispose();
      if (renderer) {
        renderer.domElement.removeEventListener('webglcontextlost', handleContextLost);
        renderer.domElement.removeEventListener('webglcontextrestored', handleContextRestored);
        renderer.dispose();
        renderer.domElement.remove();
      }
    };
  }, [
    logoPaths,
    logoSize,
    particleCount,
    shell,
    pulse,
    particleSize,
    markSize,
    markX,
    markY,
    showMark,
    stopFlow,
    stopField,
    stopGpu,
    stopIdle,
    accentKey,
    mouseForce,
    backgroundDim,
    readingDim,
    scrollBoost,
    clearZone,
    isHidden,
  ]);

  if (!webglSupported) {
    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          width: '100vw',
          height: '100vh',
          overflow: 'hidden',
          pointerEvents: 'none',
          zIndex: 0,
          background:
            'radial-gradient(ellipse 65% 55% at 75% 40%, rgba(200, 255, 61, 0.08) 0%, transparent 65%)',
        }}
      />
    );
  }

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      {/* Authentic Framer HUD: Bottom Right */}
      {showHud && hudState.wide && (
        <div
          style={{
            position: 'absolute',
            right: 24,
            bottom: 20,
            display: 'flex',
            gap: 18,
            fontFamily: '"Geist Mono", ui-monospace, monospace',
            fontSize: '10px',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'rgba(237, 233, 232, 0.5)',
            zIndex: 99,
            pointerEvents: 'none',
          }}
        >
          <span>
            FORM{' '}
            <b style={{ color: shell, fontWeight: 500 }}>
              {FORMS[hudState.form] || 'MARK'}
            </b>
          </span>
          <span>
            PKTS{' '}
            <b style={{ color: shell, fontWeight: 500 }}>
              {particleCount.toLocaleString('en-US')}
            </b>
          </span>
          <span>
            FPS{' '}
            <b style={{ color: shell, fontWeight: 500 }}>{hudState.fps}</b>
          </span>
        </div>
      )}
    </div>
  );
}
