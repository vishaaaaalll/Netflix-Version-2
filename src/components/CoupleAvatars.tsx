import { useEffect, useRef } from 'react';

const VISHAL_SRC = `${import.meta.env.BASE_URL}images/avatars/vishal.png`;
const ANUSHA_SRC = `${import.meta.env.BASE_URL}images/avatars/anusha.png`;
/* measured aspect ratios (w / h) of the cut-out PNGs */
const V_AR = 238 / 640;
const A_AR = 254 / 640;

const HEART_CHARS = ['💗', '💖', '💕', '💘'];
const rand = (a: number, b: number) => a + Math.random() * (b - a);
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

interface Body {
  x: number; y: number; vx: number; vy: number;
  w: number; h: number; phase: number;
  face: number; // smoothed -1 | 1, faces travel direction
  squashT: number; hopT: number; hopsLeft: number;
  danceT: number; boingT: number;
}

interface Heart {
  x: number; y: number; vx: number; vy: number;
  life: number; max: number; size: number; rot: number; vr: number;
  el: HTMLDivElement;
}

type Mode = 'play' | 'hug' | 'read';

/* ------------------------------------------------------------------ */
/*  Floating illustrated couple. Viewport-fixed: the layer is          */
/*  position:fixed, physics run in viewport coordinates, and bounce    */
/*  bounds use each character's full rendered size so they never get   */
/*  clipped by screen edges and never scroll away with the page.       */
/* ------------------------------------------------------------------ */

export default function CoupleAvatars() {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let W = window.innerWidth;
    let H = window.innerHeight;
    const hV = W < 640 ? 92 : 124;
    const hA = W < 640 ? 84 : 112;

    const mkBody = (x: number, y: number, h: number, ar: number): Body => ({
      x, y, vx: rand(-90, 90), vy: rand(-60, 60),
      w: h * ar, h, phase: rand(0, Math.PI * 2),
      face: 1, squashT: 0, hopT: 0, hopsLeft: 0,
      danceT: rand(8, 15), boingT: rand(4, 9),
    });
    const A = mkBody(W * 0.28, H * 0.55, hV, V_AR);
    const B = mkBody(W * 0.72, H * 0.5, hA, A_AR);
    A.vx = 70; B.vx = -70;

    const rootA = layer.querySelector<HTMLElement>('.couple-avatar-a')!;
    const rootB = layer.querySelector<HTMLElement>('.couple-avatar-b')!;
    rootA.style.width = `${A.w}px`; rootA.style.height = `${A.h}px`;
    rootB.style.width = `${B.w}px`; rootB.style.height = `${B.h}px`;

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

    const keepInside = (b: Body) => {
      b.x = clamp(b.x, b.w / 2, W - b.w / 2);
      b.y = clamp(b.y, b.h / 2, H - b.h / 2);
    };
    const onResize = () => {
      W = window.innerWidth; H = window.innerHeight;
      keepInside(A); keepInside(B);
    };

    const onScroll = () => {
      const y = window.scrollY;
      const dy = y - lastY;
      lastY = y;
      if (!dy) return;
      /* gentle nudge so they react to scrolling, but they stay viewport-fixed */
      const kick = clamp(-dy * 0.25, -260, 260);
      for (const b of [A, B]) {
        b.vy += kick * rand(0.8, 1.2);
        b.vx += rand(-30, 30);
        const sp = Math.hypot(b.vx, b.vy);
        if (sp > 520) { b.vx *= 520 / sp; b.vy *= 520 / sp; }
      }
    };

    const wallBounce = (b: Body) => {
      const rest = 0.92;
      const hw = b.w / 2, hh = b.h / 2;
      const hard = (v: number) => {
        if (Math.abs(v) > 220) { b.squashT = 0.22; return true; }
        return false;
      };
      if (b.x < hw) { b.x = hw; if (b.vx < 0) { if (hard(b.vx)) burst(hw + 6, b.y, 2); b.vx = -b.vx * rest; } }
      else if (b.x > W - hw) { b.x = W - hw; if (b.vx > 0) { if (hard(b.vx)) burst(W - hw - 6, b.y, 2); b.vx = -b.vx * rest; } }
      if (b.y < hh) { b.y = hh; if (b.vy < 0) { if (hard(b.vy)) burst(b.x, hh + 6, 3); b.vy = -b.vy * rest; } }
      else if (b.y > H - hh) { b.y = H - hh; if (b.vy > 0) { if (hard(b.vy)) burst(b.x, H - hh - 6, 3); b.vy = -b.vy * rest; } }
    };

    const collideBodies = () => {
      const dx = B.x - A.x, dy = B.y - A.y;
      const dist = Math.hypot(dx, dy) || 0.001;
      const minD = (A.w + B.w) * 0.36;
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
        const rest = (A.w + B.w) * 0.3;
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
        /* face travel direction, with a dead-zone so they don't flicker */
        const target = b.vx >= 12 ? 1 : b.vx <= -12 ? -1 : (b.face >= 0 ? 1 : -1);
        b.face += (target - b.face) * Math.min(1, dt * 6);
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

    const render = (dt: number) => {
      void dt;
      for (const [b, root] of [[A, rootA], [B, rootB]] as Array<[Body, HTMLElement]>) {
        b.squashT = Math.max(0, b.squashT - 1 / 60);
        const k = b.squashT > 0 ? Math.sin((b.squashT / 0.22) * Math.PI) : 0;
        const bob = Math.sin(t * 2.2 + b.phase) * 5;
        const tilt = clamp(b.vx * 0.018, -8, 8);
        const flip = b.face < 0 ? -1 : 1;
        const sx = (1 + 0.14 * k) * flip;
        const sy = 1 - 0.18 * k;
        root.style.transform =
          `translate3d(${(b.x - b.w / 2).toFixed(1)}px, ${(b.y - b.h / 2 + bob).toFixed(1)}px, 0)` +
          ` rotate(${tilt.toFixed(2)}deg) scale(${sx.toFixed(3)}, ${sy.toFixed(3)})`;
      }
      if (mode === 'read' || mode === 'hug') {
        const mx = (A.x + B.x) / 2, my = (A.y + B.y) / 2;
        bubble.textContent = mode === 'read' ? '📖' : '🤗';
        bubble.style.opacity = '1';
        bubble.style.transform =
          `translate3d(${(mx - 22).toFixed(1)}px, ${(my - Math.max(A.h, B.h) / 2 - 58 + Math.sin(t * 2.5) * 4).toFixed(1)}px, 0)`;
      } else {
        bubble.style.opacity = '0';
      }
    };

    let last = performance.now();
    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.033);
      last = now;
      step(dt);
      render(dt);
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
      <div className="couple-avatar couple-avatar-a">
        <img src={VISHAL_SRC} alt="" draggable={false} />
      </div>
      <div className="couple-avatar couple-avatar-b">
        <img src={ANUSHA_SRC} alt="" draggable={false} />
      </div>
      <div className="couple-hearts" />
      <div className="couple-bubble">📖</div>
    </div>
  );
}
