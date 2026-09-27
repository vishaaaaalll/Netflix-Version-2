import { useEffect, useRef } from 'react';

const SKIN = '#ffd9b8';
const SKIN_D = '#f0bd93';

/* ------------------------------------------------------------------ */
/*  Rigged SVG characters. Each limb lives in an outer <g> translated  */
/*  to its joint; the inner <g data-rig="..."> gets rotate() each      */
/*  frame around that joint.                                           */
/* ------------------------------------------------------------------ */

function VishalSvg() {
  return (
    <svg viewBox="0 0 120 170" width="100%" height="100%" aria-hidden="true">
      {/* legs */}
      <g transform="translate(47,126)"><g data-rig="legL">
        <rect x="-7.5" y="0" width="15" height="32" rx="7" fill="#6d7178" />
        <ellipse cx="0" cy="36" rx="9" ry="5.5" fill="#2b2b31" />
      </g></g>
      <g transform="translate(73,126)"><g data-rig="legR">
        <rect x="-7.5" y="0" width="15" height="32" rx="7" fill="#6d7178" />
        <ellipse cx="0" cy="36" rx="9" ry="5.5" fill="#2b2b31" />
      </g></g>
      {/* torso: blazer */}
      <rect x="30" y="86" width="60" height="48" rx="15" fill="#23232b" />
      <polygon points="52,88 68,88 60,112" fill="#f5f2ec" />
      <polygon points="52,88 43,97 52,109" fill="#2f2f3a" />
      <polygon points="68,88 77,97 68,109" fill="#2f2f3a" />
      <circle cx="60" cy="118" r="1.7" fill="#0f0f13" />
      <circle cx="60" cy="126" r="1.7" fill="#0f0f13" />
      <rect x="70" y="102" width="3.6" height="12" rx="1.8" fill="#d9a441" />
      <rect x="34" y="118" width="12" height="3" rx="1.5" fill="#17171d" />
      <rect x="74" y="118" width="12" height="3" rx="1.5" fill="#17171d" />
      {/* arms */}
      <g transform="translate(33,94)"><g data-rig="armL">
        <rect x="-6.5" y="0" width="13" height="36" rx="6.5" fill="#23232b" />
        <circle cx="0" cy="40" r="6.5" fill={SKIN} />
      </g></g>
      <g transform="translate(87,94)"><g data-rig="armR">
        <rect x="-6.5" y="0" width="13" height="36" rx="6.5" fill="#23232b" />
        <circle cx="0" cy="40" r="6.5" fill={SKIN} />
      </g></g>
      {/* neck + head */}
      <rect x="54" y="76" width="12" height="14" rx="5" fill={SKIN_D} />
      <g data-rig="head">
        <circle cx="27" cy="52" r="6" fill={SKIN} />
        <circle cx="93" cy="52" r="6" fill={SKIN} />
        <circle cx="60" cy="50" r="33" fill={SKIN} />
        <path d="M28,54 C26,24 44,14 60,14 C76,14 94,24 92,54 C88,44 86,38 82,36 C84,42 80,40 76,34 C70,28 64,30 60,28 C48,26 38,34 36,44 C32,44 30,48 28,54 Z" fill="#1e1c1c" />
        <path d="M32,58 Q60,94 88,58" stroke="#c99b72" strokeWidth="3" fill="none" opacity="0.8" strokeLinecap="round" />
        <path d="M48,84 Q60,90 72,84" stroke="#c99b72" strokeWidth="2.4" fill="none" opacity="0.7" strokeLinecap="round" />
        <g data-rig="eyes">
          <circle cx="47" cy="51" r="4.2" fill="#2b1d16" />
          <circle cx="73" cy="51" r="4.2" fill="#2b1d16" />
          <circle cx="48.5" cy="49.5" r="1.4" fill="#fff" />
          <circle cx="74.5" cy="49.5" r="1.4" fill="#fff" />
        </g>
        <circle cx="47" cy="50" r="10.5" stroke="#3a3a3a" strokeWidth="2.5" fill="rgba(255,255,255,0.07)" />
        <circle cx="73" cy="50" r="10.5" stroke="#3a3a3a" strokeWidth="2.5" fill="rgba(255,255,255,0.07)" />
        <path d="M57,50 Q60,46 63,50" stroke="#3a3a3a" strokeWidth="2.5" fill="none" />
        <path d="M37,50 L28,48 M83,50 L92,48" stroke="#3a3a3a" strokeWidth="2.5" />
        <path d="M40,36 Q47,33 54,36" stroke="#1e1c1c" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M66,36 Q73,33 80,36" stroke="#1e1c1c" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M50,68 Q60,75 70,68" stroke="#8a4b3c" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </g>
    </svg>
  );
}

function AnushaSvg() {
  return (
    <svg viewBox="0 0 120 170" width="100%" height="100%" aria-hidden="true">
      {/* back hair */}
      <path d="M60,6 C34,6 24,28 26,56 C27,80 21,110 28,144 C42,152 78,152 92,144 C99,110 93,80 94,56 C96,28 86,6 60,6 Z" fill="#231e1d" />
      <path d="M38,60 C36,90 34,116 38,138 M82,60 C84,90 86,116 82,138" stroke="#38302e" strokeWidth="3" fill="none" opacity="0.7" strokeLinecap="round" />
      {/* legs */}
      <g transform="translate(47,126)"><g data-rig="legL">
        <rect x="-9.5" y="0" width="19" height="32" rx="8" fill="#d9c6a5" />
        <ellipse cx="0" cy="36" rx="9" ry="5.5" fill="#2b2b31" />
      </g></g>
      <g transform="translate(73,126)"><g data-rig="legR">
        <rect x="-9.5" y="0" width="19" height="32" rx="8" fill="#d9c6a5" />
        <ellipse cx="0" cy="36" rx="9" ry="5.5" fill="#2b2b31" />
      </g></g>
      {/* torso: ribbed top */}
      <rect x="31" y="86" width="58" height="48" rx="15" fill="#1e1e24" />
      {[42, 52, 62, 72, 82].map(x => (
        <line key={x} x1={x} y1="94" x2={x} y2="128" stroke="#2e2e38" strokeWidth="1.6" />
      ))}
      <circle cx="50" cy="90" r="3.6" fill="#f5f2ec" />
      <circle cx="60" cy="90" r="3.6" fill="#f5f2ec" />
      <circle cx="70" cy="90" r="3.6" fill="#f5f2ec" />
      {/* bag */}
      <path d="M86,90 C92,98 94,106 94,114" stroke="#cbb894" strokeWidth="3" fill="none" />
      <rect x="83" y="112" width="22" height="27" rx="8" fill="#e8dcc3" />
      <line x1="83" y1="121" x2="105" y2="121" stroke="#d3c5a6" strokeWidth="2" />
      {/* arms */}
      <g transform="translate(33,94)"><g data-rig="armL">
        <rect x="-6.5" y="0" width="13" height="36" rx="6.5" fill="#1e1e24" />
        <circle cx="0" cy="40" r="6.5" fill={SKIN} />
      </g></g>
      <g transform="translate(87,94)"><g data-rig="armR">
        <rect x="-6.5" y="0" width="13" height="36" rx="6.5" fill="#1e1e24" />
        <circle cx="0" cy="40" r="6.5" fill={SKIN} />
      </g></g>
      {/* neck + head */}
      <rect x="54" y="76" width="12" height="14" rx="5" fill={SKIN_D} />
      <g data-rig="head">
        <circle cx="28" cy="54" r="5.5" fill={SKIN} />
        <circle cx="92" cy="54" r="5.5" fill={SKIN} />
        <circle cx="60" cy="50" r="32" fill={SKIN} />
        <circle cx="28" cy="62" r="3.4" stroke="#d9a441" strokeWidth="2" fill="none" />
        <circle cx="92" cy="62" r="3.4" stroke="#d9a441" strokeWidth="2" fill="none" />
        <path d="M30,30 C24,50 26,74 34,92 C30,70 32,50 38,36 Z" fill="#231e1d" />
        <path d="M90,30 C96,50 94,74 86,92 C90,70 88,50 82,36 Z" fill="#231e1d" />
        <path d="M30,44 C36,26 48,20 60,20 C72,20 84,26 90,44 C80,34 70,32 60,32 C50,32 40,34 30,44 Z" fill="#231e1d" />
        <ellipse cx="40" cy="60" rx="5" ry="3" fill="#ff9d9d" opacity="0.55" />
        <ellipse cx="80" cy="60" rx="5" ry="3" fill="#ff9d9d" opacity="0.55" />
        <g data-rig="eyes">
          <circle cx="48" cy="52" r="5" fill="#2b1d16" />
          <circle cx="72" cy="52" r="5" fill="#2b1d16" />
          <circle cx="49.8" cy="50" r="1.7" fill="#fff" />
          <circle cx="73.8" cy="50" r="1.7" fill="#fff" />
        </g>
        <path d="M41,38 Q48,35 55,38" stroke="#231e1d" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M65,38 Q72,35 79,38" stroke="#231e1d" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M50,65 Q60,78 70,65 Q60,70 50,65 Z" fill="#a34f4a" />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Physics + animation                                                */
/* ------------------------------------------------------------------ */

const HEART_CHARS = ['💗', '💖', '💕', '💘'];
const rand = (a: number, b: number) => a + Math.random() * (b - a);
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

interface Body {
  x: number; y: number; vx: number; vy: number;
  r: number; size: number; phase: number;
  walkPhase: number; armL: number; armR: number;
  blinkT: number; closeT: number; squashT: number;
  hopT: number; danceT: number; boingT: number; hopsLeft: number;
}

interface Rig {
  legL: SVGGElement; legR: SVGGElement;
  armL: SVGGElement; armR: SVGGElement;
  head: SVGGElement; eyes: SVGGElement;
}

interface Heart {
  x: number; y: number; vx: number; vy: number;
  life: number; max: number; size: number; rot: number; vr: number;
  el: HTMLDivElement;
}

type Mode = 'play' | 'hug' | 'read';

const rigFor = (root: HTMLElement): Rig => {
  const q = (n: string) => root.querySelector<SVGGElement>(`[data-rig="${n}"]`)!;
  return { legL: q('legL'), legR: q('legR'), armL: q('armL'), armR: q('armR'), head: q('head'), eyes: q('eyes') };
};

export default function CoupleAvatars() {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let W = window.innerWidth;
    let H = window.innerHeight;
    const size = W < 640 ? 84 : 116;
    const sizeH = size * (170 / 120);

    const mkBody = (x: number, y: number): Body => ({
      x, y, vx: rand(-90, 90), vy: rand(-60, 60),
      r: size * 0.34, size, phase: rand(0, Math.PI * 2),
      walkPhase: rand(0, 6), armL: 0, armR: 0,
      blinkT: rand(1, 4), closeT: 0, squashT: 0,
      hopT: 0, danceT: rand(8, 15), boingT: rand(4, 9), hopsLeft: 0,
    });
    const A = mkBody(W * 0.28, H * 0.55);
    const B = mkBody(W * 0.72, H * 0.5);
    A.vx = 70; B.vx = -70;

    const rootA = layer.querySelector<HTMLElement>('.couple-avatar-a')!;
    const rootB = layer.querySelector<HTMLElement>('.couple-avatar-b')!;
    const rigA = rigFor(rootA);
    const rigB = rigFor(rootB);
    for (const r of [rootA, rootB]) {
      (r as HTMLElement).style.width = `${size}px`;
      (r as HTMLElement).style.height = `${sizeH}px`;
    }

    const heartsBox = layer.querySelector<HTMLDivElement>('.couple-hearts')!;
    const bubble = layer.querySelector<HTMLDivElement>('.couple-bubble')!;

    let hearts: Heart[] = [];
    let mode: Mode = 'play';
    let modeT = rand(10, 16);
    let readCooldown = rand(14, 22);
    let hugCooldown = 0;
    let heartTick = 0;
    let t = 0;
    let lastY = window.scrollY;
    let raf = 0;

    const spawnHeart = (x: number, y: number, big = false) => {
      if (hearts.length > 42) return;
      const el = document.createElement('div');
      el.className = 'couple-heart';
      el.textContent = HEART_CHARS[(Math.random() * HEART_CHARS.length) | 0];
      const s = big ? rand(20, 30) : rand(12, 20);
      el.style.fontSize = `${s}px`;
      heartsBox.appendChild(el);
      hearts.push({
        x, y, vx: rand(-70, 70), vy: rand(-150, -60),
        life: 0, max: rand(1.1, 1.7), size: s,
        rot: rand(-30, 30), vr: rand(-90, 90), el,
      });
    };
    const burst = (x: number, y: number, n: number, big = false) => {
      for (let i = 0; i < n; i++) spawnHeart(x + rand(-24, 24), y + rand(-24, 24), big);
    };

    const onResize = () => {
      W = window.innerWidth; H = window.innerHeight;
      for (const b of [A, B]) {
        b.x = clamp(b.x, b.r, W - b.r);
        b.y = clamp(b.y, b.r, H - b.r);
      }
    };

    const onScroll = () => {
      const y = window.scrollY;
      const dy = y - lastY;
      lastY = y;
      if (!dy) return;
      const kick = clamp(-dy * 0.35, -430, 430);
      for (const b of [A, B]) {
        b.vy += kick * rand(0.8, 1.2);
        b.vx += rand(-50, 50);
        const sp = Math.hypot(b.vx, b.vy);
        if (sp > 560) { b.vx *= 560 / sp; b.vy *= 560 / sp; }
      }
    };

    const wallBounce = (b: Body) => {
      const rest = 0.9;
      const hit = (v: number) => { if (Math.abs(v) > 220) { b.squashT = 0.22; return true; } return false; };
      if (b.x < b.r) { b.x = b.r; if (b.vx < 0) { if (hit(b.vx)) burst(b.r + 10, b.y, 2); b.vx = -b.vx * rest; } }
      else if (b.x > W - b.r) { b.x = W - b.r; if (b.vx > 0) { if (hit(b.vx)) burst(W - b.r - 10, b.y, 2); b.vx = -b.vx * rest; } }
      if (b.y < b.r) { b.y = b.r; if (b.vy < 0) { if (hit(b.vy)) burst(b.x, b.r + 10, 3); b.vy = -b.vy * rest; } }
      else if (b.y > H - b.r) { b.y = H - b.r; if (b.vy > 0) { if (hit(b.vy)) burst(b.x, H - b.r - 10, 3); b.vy = -b.vy * rest; } }
    };

    const collideBodies = () => {
      const dx = B.x - A.x, dy = B.y - A.y;
      const dist = Math.hypot(dx, dy) || 0.001;
      const minD = A.r + B.r;
      if (dist >= minD) return;
      const nx = dx / dist, ny = dy / dist;
      const overlap = (minD - dist) / 2;
      A.x -= nx * overlap; A.y -= ny * overlap;
      B.x += nx * overlap; B.y += ny * overlap;
      const rvx = B.vx - A.vx, rvy = B.vy - A.vy;
      const closing = -(rvx * nx + rvy * ny);
      if (closing > 0) {
        const j = closing * 0.92;
        A.vx -= j * nx; A.vy -= j * ny;
        B.vx += j * nx; B.vy += j * ny;
        if (closing > 200 && mode === 'play' && hugCooldown <= 0) {
          mode = 'hug'; modeT = 2.4; hugCooldown = 6;
          A.squashT = B.squashT = 0.22;
          burst((A.x + B.x) / 2, (A.y + B.y) / 2 - 30, 10, true);
        } else if (closing > 120) {
          burst((A.x + B.x) / 2, (A.y + B.y) / 2, 3);
        }
      }
    };

    const step = (dt: number) => {
      t += dt;
      modeT -= dt; hugCooldown -= dt; readCooldown -= dt;

      if (mode === 'play' && modeT <= 0) {
        if (readCooldown <= 0) { mode = 'read'; modeT = 6.5; readCooldown = rand(20, 30); }
        else modeT = rand(8, 14);
      } else if (mode === 'hug' && modeT <= 0) {
        mode = 'play'; modeT = rand(10, 16);
        const dx = B.x - A.x, dy = B.y - A.y, d = Math.hypot(dx, dy) || 1;
        A.vx -= (dx / d) * 130; A.vy -= (dy / d) * 60;
        B.vx += (dx / d) * 130; B.vy += (dy / d) * 60;
      } else if (mode === 'read' && modeT <= 0) {
        mode = 'play'; modeT = rand(10, 16);
        A.vx += rand(-120, 120); B.vx += rand(-120, 120);
        A.vy += rand(-80, 80); B.vy += rand(-80, 80);
      }

      if (mode === 'hug') {
        const dx = B.x - A.x, dy = B.y - A.y;
        const d = Math.hypot(dx, dy) || 1;
        const rest = (A.r + B.r) * 0.82;
        const pull = (d - rest) * 60;
        const nx = dx / d, ny = dy / d;
        A.vx += nx * pull * dt; A.vy += ny * pull * dt;
        B.vx -= nx * pull * dt; B.vy -= ny * pull * dt;
        heartTick -= dt;
        if (heartTick <= 0) {
          heartTick = 0.14;
          spawnHeart((A.x + B.x) / 2 + rand(-30, 30), (A.y + B.y) / 2 - 40, Math.random() < 0.4);
        }
      } else if (mode === 'read') {
        const ax1 = W * 0.40, ax2 = W * 0.60, ay = H * 0.40;
        const pairs: Array<[Body, number]> = [[A, ax1], [B, ax2]];
        for (const [b, ax] of pairs) {
          b.vx += (ax - b.x) * 3.2 * dt;
          b.vy += (ay - b.y) * 3.2 * dt;
        }
        if (Math.random() < dt * 0.8) spawnHeart((A.x + B.x) / 2 + rand(-40, 40), (A.y + B.y) / 2 - 50);
      }

      for (const b of [A, B]) {
        if (mode === 'play') {
          b.danceT -= dt;
          if (b.danceT <= 0) { b.danceT = rand(9, 16); b.hopsLeft = 3; b.hopT = 0; }
          if (b.hopsLeft > 0) {
            b.hopT -= dt;
            if (b.hopT <= 0) {
              b.hopT = 0.28; b.hopsLeft--;
              b.vy = -Math.min(300, Math.max(180, -b.vy + 260));
              b.vx += rand(-60, 60);
            }
          }
          b.boingT -= dt;
          if (b.boingT <= 0) {
            b.boingT = rand(5, 10);
            const ang = rand(0, Math.PI * 2), sp = rand(130, 210);
            b.vx += Math.cos(ang) * sp; b.vy += Math.sin(ang) * sp;
          }
        }
        const drag = Math.exp(-0.22 * dt);
        b.vx *= drag; b.vy *= drag;
        b.vy += (H * 0.5 - b.y) * 0.12 * dt;
        b.x += b.vx * dt; b.y += b.vy * dt;
        wallBounce(b);
      }
      collideBodies();

      for (let i = hearts.length - 1; i >= 0; i--) {
        const h = hearts[i];
        h.life += dt;
        if (h.life >= h.max) { h.el.remove(); hearts.splice(i, 1); continue; }
        h.vy -= 55 * dt;
        h.vx *= Math.exp(-0.6 * dt);
        h.x += h.vx * dt; h.y += h.vy * dt;
        h.rot += h.vr * dt;
        const k = h.life / h.max;
        h.el.style.transform = `translate3d(${h.x - h.size / 2}px, ${h.y - h.size / 2}px, 0) rotate(${h.rot}deg) scale(${1 - k * 0.25})`;
        h.el.style.opacity = `${k < 0.7 ? 1 : 1 - (k - 0.7) / 0.3}`;
      }
    };

    /* Animate one rig: walk-cycle legs, swinging / posing arms, head bob + blink */
    const animateRig = (b: Body, rig: Rig, partner: Body, dt: number) => {
      const speed = Math.hypot(b.vx, b.vy);
      b.walkPhase += dt * (3 + speed * 0.045);
      const swing = Math.sin(b.walkPhase) * clamp(5 + speed * 0.055, 5, 30);

      let legL = swing, legR = -swing;
      let armLT: number, armRT: number;
      const idleL = Math.sin(t * 2.1 + b.phase) * 4;
      const idleR = Math.sin(t * 2.1 + b.phase + 1) * 4;

      if (mode === 'hug' || mode === 'read') {
        legL = Math.sin(t * 2 + b.phase) * 3;
        legR = -legL;
      }
      if (mode === 'hug') {
        const reach = clamp((partner.x - b.x) * 0.2, -62, 62);
        armLT = reach; armRT = reach * 0.8;
      } else if (mode === 'read') {
        armLT = 34 + idleL * 0.3; armRT = -34 + idleR * 0.3;
      } else if (b.hopsLeft > 0) {
        armLT = -140; armRT = 140;   // arms up while hopping!
        legL = -18; legR = 18;
      } else {
        armLT = -swing * 0.7 + idleL;
        armRT = swing * 0.7 + idleR;
      }

      const k = Math.min(1, dt * 10);
      b.armL += (armLT - b.armL) * k;
      b.armR += (armRT - b.armR) * k;
      rig.legL.setAttribute('transform', `rotate(${legL.toFixed(2)})`);
      rig.legR.setAttribute('transform', `rotate(${legR.toFixed(2)})`);
      rig.armL.setAttribute('transform', `rotate(${b.armL.toFixed(2)})`);
      rig.armR.setAttribute('transform', `rotate(${b.armR.toFixed(2)})`);

      // head bob + tilt + blink
      const bob = Math.sin(b.walkPhase * 2) * 1.8;
      let tiltT = clamp(b.vx * 0.02, -9, 9);
      if (mode === 'hug' || mode === 'read') tiltT += clamp((partner.x - b.x) * 0.03, -8, 8);
      rig.head.setAttribute('transform', `translate(0 ${bob.toFixed(2)}) rotate(${tiltT.toFixed(2)} 60 52)`);
      b.blinkT -= dt;
      if (b.blinkT <= 0) { b.blinkT = rand(2.2, 5); b.closeT = 0.13; }
      b.closeT -= dt;
      const eyeS = b.closeT > 0 ? 0.12 : 1;
      rig.eyes.setAttribute('transform', `translate(60 52) scale(1 ${eyeS}) translate(-60 -52)`);
    };

    const render = () => {
      const pairs: Array<[Body, Rig, HTMLElement, Body]> = [
        [A, rigA, rootA, B],
        [B, rigB, rootB, A],
      ];
      for (const [b, , root] of pairs) {
        b.squashT = Math.max(0, b.squashT - 1 / 60);
        const k = b.squashT > 0 ? Math.sin((b.squashT / 0.22) * Math.PI) : 0;
        const sx = 1 + 0.16 * k, sy = 1 - 0.2 * k;
        const bobAll = Math.abs(Math.sin(b.walkPhase)) * 2.5;
        root.style.transform =
          `translate3d(${(b.x - b.size / 2).toFixed(1)}px, ${(b.y - sizeH / 2 + bobAll).toFixed(1)}px, 0) scale(${sx.toFixed(3)}, ${sy.toFixed(3)})`;
      }
      if (mode === 'read' || mode === 'hug') {
        const mx = (A.x + B.x) / 2, my = (A.y + B.y) / 2;
        bubble.textContent = mode === 'read' ? '📖' : '🤗';
        bubble.style.opacity = '1';
        bubble.style.transform =
          `translate3d(${(mx - 22).toFixed(1)}px, ${(my - sizeH / 2 - 58 + Math.sin(t * 2.5) * 4).toFixed(1)}px, 0)`;
      } else {
        bubble.style.opacity = '0';
      }
    };

    let last = performance.now();
    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.033);
      last = now;
      step(dt);
      animateRig(A, rigA, B, dt);
      animateRig(B, rigB, A, dt);
      render();
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    window.addEventListener('resize', onResize);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onScroll);
      hearts.forEach(h => h.el.remove());
    };
  }, []);

  return (
    <div ref={layerRef} className="couple-layer" aria-hidden="true">
      <div className="couple-avatar couple-avatar-a"><VishalSvg /></div>
      <div className="couple-avatar couple-avatar-b"><AnushaSvg /></div>
      <div className="couple-hearts" />
      <div className="couple-bubble">📖</div>
    </div>
  );
}
