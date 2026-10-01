import { useEffect, useRef, useState } from 'react';
import { Heart, Sparkles } from 'lucide-react';

const BASE = import.meta.env.BASE_URL;
const BG = '#e41613';
const LOOK_KEY = 'ournetflix-anusha-look';

/** 8 compass frames in clockwise order starting east; index = round(angle/45) mod 8 */
const DIR_FRAMES = ['right', 'down-right', 'down', 'down-left', 'left', 'up-left', 'up', 'up-right'];
const ALL_FRAMES = ['center', ...DIR_FRAMES];

const LOOKS = [
  { id: 'classic', name: 'Classic', tag: 'the original' },
  { id: 'festive', name: 'Festive', tag: 'navratri nights' },
  { id: 'rose', name: 'Rose Day', tag: 'café date' },
];

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

/** Shortest-path angular lerp, angles in radians. */
function lerpAngle(a: number, b: number, t: number): number {
  let d = (b - a) % (Math.PI * 2);
  if (d > Math.PI) d -= Math.PI * 2;
  if (d < -Math.PI) d += Math.PI * 2;
  return a + d * t;
}

export default function AnushaHeroPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const frameCache = useRef(new Map<string, HTMLImageElement>());
  const [look, setLook] = useState(() => {
    try {
      const saved = localStorage.getItem(LOOK_KEY);
      return LOOKS.some((l) => l.id === saved) ? (saved as string) : 'classic';
    } catch {
      return 'classic';
    }
  });
  const [ready, setReady] = useState(false);
  const [hintVisible, setHintVisible] = useState(true);
  const lookRef = useRef(look);
  lookRef.current = look;

  const pickLook = (id: string) => {
    setLook(id);
    try { localStorage.setItem(LOOK_KEY, id); } catch { /* private mode */ }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    let raf = 0;
    let destroyed = false;
    let shown = '__none__';

    const key = (frame: string) => `${lookRef.current}/${frame}`;
    const frameImg = (frame: string) => frameCache.current.get(key(frame));

    // Tracked pointer + smoothed values
    const pointer = { x: window.innerWidth / 2, y: window.innerHeight * 0.4, active: false };
    let smoothAngle = 0;
    let angleInit = false;
    const dot = { x: pointer.x, y: pointer.y };
    const ring = { x: pointer.x, y: pointer.y };
    let ringHover = false;

    const drawFrame = (frame: string) => {
      if (shown === key(frame)) return;
      const img = frameImg(frame);
      if (!img) return;
      shown = key(frame);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const cw = canvas.clientWidth;
      const ch = canvas.clientHeight;
      if (cw === 0 || ch === 0) return;
      if (canvas.width !== Math.round(cw * dpr) || canvas.height !== Math.round(ch * dpr)) {
        canvas.width = Math.round(cw * dpr);
        canvas.height = Math.round(ch * dpr);
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // cover-fit, character stays centered
      const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
      const dw = img.naturalWidth * scale;
      const dh = img.naturalHeight * scale;
      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, cw, ch);
      ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
    };

    const onMove = (x: number, y: number) => {
      pointer.x = x;
      pointer.y = y;
      pointer.active = true;
    };
    const onMouseMove = (e: MouseEvent) => onMove(e.clientX, e.clientY);
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) onMove(t.clientX, t.clientY);
    };
    const onOver = (e: MouseEvent) => {
      ringHover = !!(e.target as HTMLElement).closest?.('button, a');
    };

    const tick = () => {
      if (destroyed) return;
      raf = requestAnimationFrame(tick);

      // --- character frame selection ---
      const cw = canvas.clientWidth;
      const ch = canvas.clientHeight;
      if (cw > 0 && ch > 0 && !reduced) {
        const cx = cw / 2;
        const cy = ch / 2;
        const dx = pointer.x - cx;
        const dy = pointer.y - cy;
        const dist = Math.hypot(dx, dy);
        const dead = Math.min(cw, ch) * 0.12;
        if (dist < dead) {
          drawFrame('center');
          angleInit = false;
        } else {
          const target = Math.atan2(dy, dx);
          smoothAngle = angleInit ? lerpAngle(smoothAngle, target, 0.26) : target;
          angleInit = true;
          let idx = Math.round(smoothAngle / (Math.PI / 4)) % 8;
          if (idx < 0) idx += 8;
          drawFrame(DIR_FRAMES[idx]);
        }
      }

      // --- custom cursor ---
      if (finePointer && !reduced) {
        dot.x = pointer.x;
        dot.y = pointer.y;
        ring.x += (pointer.x - ring.x) * 0.16;
        ring.y += (pointer.y - ring.y) * 0.16;
        if (dotRef.current) {
          dotRef.current.style.transform = `translate3d(${dot.x}px, ${dot.y}px, 0) translate(-50%, -50%)`;
          dotRef.current.style.opacity = pointer.active ? '1' : '0';
        }
        if (ringRef.current) {
          const s = ringHover ? 1.7 : 1;
          ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%) scale(${s})`;
          ringRef.current.style.opacity = pointer.active ? '1' : '0';
        }
      }
    };

    const onResize = () => { shown = '__none__'; };

    // Preload this look's 9 frames (cached across switches), then start.
    setReady(false);
    const needed = ALL_FRAMES.filter((f) => !frameCache.current.has(`${lookRef.current}/${f}`));
    Promise.all(
      needed.map((f) =>
        loadImage(`${BASE}images/anusha-hero/${lookRef.current}/${f}.webp`).then((img) =>
          frameCache.current.set(`${lookRef.current}/${f}`, img)
        )
      )
    )
      .then(() => {
        if (destroyed) return;
        setReady(true);
        shown = '__none__';
        drawFrame('center');
        raf = requestAnimationFrame(tick);
      })
      .catch(() => {
        if (!destroyed) setReady(true);
      });

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchstart', onTouch, { passive: true });
    window.addEventListener('touchmove', onTouch, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      destroyed = true;
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchstart', onTouch);
      window.removeEventListener('touchmove', onTouch);
      window.removeEventListener('mouseover', onOver);
      window.removeEventListener('resize', onResize);
    };
  }, [look]);

  useEffect(() => {
    const t = window.setTimeout(() => setHintVisible(false), 7000);
    return () => window.clearTimeout(t);
  }, []);

  const activeLook = LOOKS.find((l) => l.id === look) ?? LOOKS[0];

  return (
    <section className="ah-hero" aria-label="Anusha — interactive portrait">
      <canvas ref={canvasRef} className="ah-canvas" aria-hidden="true" />

      {/* floating hearts */}
      <div className="ah-hearts" aria-hidden="true">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <Heart key={i} className={`ah-heart ah-heart-${i}`} fill="currentColor" />
        ))}
      </div>

      {/* custom cursor */}
      <div ref={dotRef} className="ah-cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="ah-cursor-ring" aria-hidden="true" />

      {/* look switcher */}
      <div className="ah-looks" role="group" aria-label="Choose her look">
        <span className="ah-looks-label"><Sparkles size={13} /> her looks</span>
        {LOOKS.map((l) => (
          <button
            key={l.id}
            className={`ah-look ${l.id === look ? 'active' : ''}`}
            onClick={() => pickLook(l.id)}
            aria-pressed={l.id === look}
            title={`${l.name} — ${l.tag}`}
          >
            <img src={`${BASE}images/anusha-hero/${l.id}/center.webp`} alt={l.name} />
            <span>{l.name}</span>
          </button>
        ))}
      </div>

      {/* copy */}
      <div className="ah-copy">
        <p className="ah-eyebrow"><Sparkles size={14} /> Hi, I&rsquo;m</p>
        <h1 className="ah-name">Anusha</h1>
        <p className="ah-bio">
          The main character of my favourite story. Four years of us — and she&rsquo;s
          still the best thing on every screen. Move your cursor… she&rsquo;s watching you.
        </p>
      </div>

      {hintVisible && ready && (
        <div className="ah-hint" aria-hidden="true">
          <Heart size={13} fill="currentColor" /> move your cursor — she follows it
        </div>
      )}
      {!ready && <div className="ah-loading">{activeLook.name}… getting her ready…</div>}
    </section>
  );
}
