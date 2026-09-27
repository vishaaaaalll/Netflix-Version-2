import { useEffect, useRef } from 'react';

const BASE = import.meta.env.BASE_URL;
const VISHAL_IMG = `${BASE}images/avatars/vishal-chibi.png`;
const ANUSHA_IMG = `${BASE}images/avatars/anusha-chibi.png`;
const HEART_CHARS = ['💗', '💖', '💕', '💘'];

interface Body {
  x: number; y: number; vx: number; vy: number;
  r: number; size: number; phase: number; tilt: number;
  hopT: number; danceT: number; boingT: number; hopsLeft: number;
}

interface Heart {
  x: number; y: number; vx: number; vy: number;
  life: number; max: number; size: number; rot: number; vr: number; ch: string;
  el: HTMLDivElement;
}

type Mode = 'play' | 'hug' | 'read';

const rand = (a: number, b: number) => a + Math.random() * (b - a);
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

/**
 * CoupleAvatars — a tiny physics playground that lives behind the Home and
 * Story pages. Vishal & Anusha's chibi avatars bounce around inside the
 * viewport, ricochet off the window edges (scrolling "hits" them against the
 * top/bottom), hug with a burst of hearts when they bump into each other,
 * and every so often drift together to "read" the story with you.
 */
export default function CoupleAvatars() {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let W = window.innerWidth;
    let H = window.innerHeight;
    const size = W < 640 ? 84 : 116;

    const mkBody = (x: number, y: number): Body => ({
      x, y, vx: rand(-90, 90), vy: rand(-60, 60),
      r: size * 0.34, size, phase: rand(0, Math.PI * 2), tilt: 0,
      hopT: 0, danceT: rand(8, 15), boingT: rand(4, 9), hopsLeft: 0,
    });
    const A = mkBody(W * 0.28, H * 0.55); // Vishal
    const B = mkBody(W * 0.72, H * 0.5);  // Anusha
    A.vx = 70; B.vx = -70;

    const imgA = layer.querySelector<HTMLImageElement>('.couple-avatar-a')!;
    const imgB = layer.querySelector<HTMLImageElement>('.couple-avatar-b')!;
    const heartsBox = layer.querySelector<HTMLDivElement>('.couple-hearts')!;
    const bubble = layer.querySelector<HTMLDivElement>('.couple-bubble')!;
    imgA.style.width = imgA.style.height = `${size}px`;
    imgB.style.width = imgB.style.height = `${size}px`;

    let hearts: Heart[] = [];
    let mode: Mode = 'play';
    let modeT = rand(10, 16);       // time left in current mode
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
      const ch = HEART_CHARS[(Math.random() * HEART_CHARS.length) | 0];
      el.textContent = ch;
      const s = big ? rand(20, 30) : rand(12, 20);
      el.style.fontSize = `${s}px`;
      heartsBox.appendChild(el);
      hearts.push({
        x, y, vx: rand(-70, 70), vy: rand(-150, -60),
        life: 0, max: rand(1.1, 1.7), size: s,
        rot: rand(-30, 30), vr: rand(-90, 90), ch, el,
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

    // Scrolling "hits" them against the window: the viewport walls slam into
    // the avatars, so they bounce off the top/bottom instead of leaving.
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
      if (b.x < b.r) { b.x = b.r; if (b.vx < 0) { if (b.vx < -260) burst(b.r + 10, b.y, 2); b.vx = -b.vx * rest; } }
      else if (b.x > W - b.r) { b.x = W - b.r; if (b.vx > 0) { if (b.vx > 260) burst(W - b.r - 10, b.y, 2); b.vx = -b.vx * rest; } }
      if (b.y < b.r) { b.y = b.r; if (b.vy < 0) { if (b.vy < -260) burst(b.x, b.r + 10, 3); b.vy = -b.vy * rest; } }
      else if (b.y > H - b.r) { b.y = H - b.r; if (b.vy > 0) { if (b.vy > 260) burst(b.x, H - b.r - 10, 3); b.vy = -b.vy * rest; } }
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
        if (readCooldown <= 0) {
          mode = 'read'; modeT = 6.5; readCooldown = rand(20, 30);
        } else {
          modeT = rand(8, 14);
        }
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

      // --- per-mode behaviour ---
      if (mode === 'hug') {
        const dx = B.x - A.x, dy = B.y - A.y;
        const d = Math.hypot(dx, dy) || 1;
        const rest = (A.r + B.r) * 0.82;
        const pull = (d - rest) * 6;
        const nx = dx / d, ny = dy / d;
        A.vx += nx * pull * dt * 10; A.vy += ny * pull * dt * 10;
        B.vx -= nx * pull * dt * 10; B.vy -= ny * pull * dt * 10;
        heartTick -= dt;
        if (heartTick <= 0) { heartTick = 0.14; spawnHeart((A.x + B.x) / 2 + rand(-30, 30), (A.y + B.y) / 2 - 40, Math.random() < 0.4); }
      } else if (mode === 'read') {
        const ax1 = W * 0.40, ax2 = W * 0.60, ay = H * 0.40;
        for (const [b, ax] of [[A, ax1], [B, ax2]] as const) {
          b.vx += (ax - b.x) * 3.2 * dt;
          b.vy += (ay - b.y) * 3.2 * dt;
        }
        if (Math.random() < dt * 0.8) spawnHeart((A.x + B.x) / 2 + rand(-40, 40), (A.y + B.y) / 2 - 50);
      }

      // --- playful life: hops, boings ---
      for (const b of [A, B]) {
        if (mode === 'play') {
          b.danceT -= dt;
          if (b.danceT <= 0) { b.danceT = rand(9, 16); b.hopsLeft = 3; b.hopT = 0; }
          if (b.hopsLeft > 0) {
            b.hopT -= dt;
            if (b.hopT <= 0) { b.hopT = 0.28; b.hopsLeft--; b.vy = -Math.min(300, Math.max(180, -b.vy + 260)); b.vx += rand(-60, 60); }
          }
          b.boingT -= dt;
          if (b.boingT <= 0) {
            b.boingT = rand(5, 10);
            const ang = rand(0, Math.PI * 2), sp = rand(130, 210);
            b.vx += Math.cos(ang) * sp; b.vy += Math.sin(ang) * sp;
          }
        }
        // gentle air drag
        const drag = Math.exp(-0.22 * dt);
        b.vx *= drag; b.vy *= drag;
        // soft pull toward vertical middle so they don't camp in corners
        b.vy += (H * 0.5 - b.y) * 0.12 * dt;
        b.x += b.vx * dt; b.y += b.vy * dt;
        wallBounce(b);
      }
      collideBodies();

      // --- hearts ---
      for (let i = hearts.length - 1; i >= 0; i--) {
        const h = hearts[i];
        h.life += dt;
        if (h.life >= h.max) { h.el.remove(); hearts.splice(i, 1); continue; }
        h.vy -= 55 * dt;                 // hearts float upward
        h.vx *= Math.exp(-0.6 * dt);
        h.x += h.vx * dt; h.y += h.vy * dt;
        h.rot += h.vr * dt;
        const k = h.life / h.max;
        h.el.style.transform = `translate3d(${h.x - h.size / 2}px, ${h.y - h.size / 2}px, 0) rotate(${h.rot}deg) scale(${1 - k * 0.25})`;
        h.el.style.opacity = `${k < 0.7 ? 1 : 1 - (k - 0.7) / 0.3}`;
      }
    };

    const renderBody = (b: Body, el: HTMLImageElement, partner: Body) => {
      const bob = Math.sin(t * 2.3 + b.phase) * 6;
      let tiltTarget = clamp(b.vx * 0.035, -15, 15);
      if (mode === 'hug' || mode === 'read') {
        const lean = clamp((partner.x - b.x) * 0.02, -10, 10);
        tiltTarget = tiltTarget * 0.4 + lean;
      }
      b.tilt += (tiltTarget - b.tilt) * 0.12;
      el.style.transform =
        `translate3d(${b.x - b.size / 2}px, ${b.y - b.size / 2 + bob}px, 0) rotate(${b.tilt}deg)`;
    };

    const render = () => {
      renderBody(A, imgA, B);
      renderBody(B, imgB, A);
      if (mode === 'read' || mode === 'hug') {
        const mx = (A.x + B.x) / 2, my = (A.y + B.y) / 2;
        bubble.textContent = mode === 'read' ? '📖' : '🤗';
        bubble.style.opacity = '1';
        bubble.style.transform = `translate3d(${mx - 22}px, ${my - A.size / 2 - 58 + Math.sin(t * 2.5) * 4}px, 0) scale(1)`;
      } else {
        bubble.style.opacity = '0';
        bubble.style.transform += '';
      }
    };

    let last = performance.now();
    const frame = (now: number) => {
      let dt = (now - last) / 1000;
      last = now;
      step(Math.min(dt, 0.033));
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
      <img className="couple-avatar couple-avatar-a" src={VISHAL_IMG} alt="" draggable={false} />
      <img className="couple-avatar couple-avatar-b" src={ANUSHA_IMG} alt="" draggable={false} />
      <div className="couple-hearts" />
      <div className="couple-bubble">📖</div>
    </div>
  );
}
