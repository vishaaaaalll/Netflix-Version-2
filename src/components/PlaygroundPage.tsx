import { useEffect, useRef, useState } from 'react';
import { Flame, Hand, Heart, MousePointerClick, Move, RotateCcw, Trophy, Volume2, VolumeX } from 'lucide-react';
import VishalPlayAvatar, { type PlayFace, type Pimple } from './VishalPlayAvatar';

type Mode = 'beat' | 'pimple' | 'grab' | 'soothe';

const rand = (a: number, b: number) => a + Math.random() * (b - a);
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
const SLAP_WORDS = ['POW!', 'THWACK!', 'SMACK!', 'BONK!', 'WHAM!'];

interface Burst { id: number; x: number; y: number; word: string; color: string }
interface Particle {
  x: number; y: number; vx: number; vy: number;
  life: number; max: number; size: number; rot: number; vr: number;
  kind: 'goo' | 'heart' | 'star' | 'puff' | 'hand' | 'spark';
  color: string; ch: string; el: HTMLDivElement; grav: number;
}

/* ---------------- tiny synth sfx (WebAudio, no assets) ---------------- */
let actx: AudioContext | null = null;
let muted = false;
function ac(): AudioContext | null {
  try {
    if (!actx) actx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    if (actx.state === 'suspended') void actx.resume();
    return actx;
  } catch { return null; }
}
function tone(f0: number, f1: number, dur: number, type: OscillatorType = 'sine', gain = 0.2, delay = 0) {
  if (muted) return;
  const c = ac(); if (!c) return;
  const t = c.currentTime + delay;
  const o = c.createOscillator(), g = c.createGain();
  o.type = type; o.frequency.setValueAtTime(f0, t); o.frequency.exponentialRampToValueAtTime(Math.max(30, f1), t + dur);
  g.gain.setValueAtTime(gain, t); g.gain.exponentialRampToValueAtTime(0.001, t + dur);
  o.connect(g).connect(c.destination); o.start(t); o.stop(t + dur + 0.02);
}
function noiseBurst(dur: number, freq: number, type: BiquadFilterType = 'bandpass', gain = 0.3) {
  if (muted) return;
  const c = ac(); if (!c) return;
  const t = c.currentTime;
  const len = Math.floor(c.sampleRate * dur);
  const buf = c.createBuffer(1, len, c.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len);
  const src = c.createBufferSource(); src.buffer = buf;
  const f = c.createBiquadFilter(); f.type = type; f.frequency.value = freq;
  const g = c.createGain(); g.gain.setValueAtTime(gain, t); g.gain.exponentialRampToValueAtTime(0.001, t + dur);
  src.connect(f).connect(g).connect(c.destination); src.start(t);
}
const sfx = {
  slap() { noiseBurst(0.12, 1700, 'bandpass', 0.35); tone(190, 85, 0.1, 'triangle', 0.25); },
  pop() { tone(560, 170, 0.12, 'sine', 0.32); noiseBurst(0.06, 2600, 'highpass', 0.15); },
  boing() { tone(130, 540, 0.22, 'sine', 0.22); },
  thud() { noiseBurst(0.18, 280, 'lowpass', 0.4); tone(95, 45, 0.16, 'sine', 0.3); },
  chime() { tone(660, 660, 0.12, 'sine', 0.14); tone(880, 880, 0.16, 'sine', 0.14, 0.09); },
  roar() { tone(120, 42, 0.7, 'sawtooth', 0.22); noiseBurst(0.6, 350, 'lowpass', 0.25); },
  yay() { tone(523, 523, 0.1, 'sine', 0.16); tone(659, 659, 0.1, 'sine', 0.16, 0.1); tone(784, 784, 0.18, 'sine', 0.16, 0.2); },
};

const HINTS: Record<Mode, string> = {
  beat: 'Tap Vishal to slap him. Chain quick slaps for COMBO. Fill his anger meter… then extract it!',
  pimple: 'Pimples keep popping up on his face. Tap them to pop. Clear them all for a bonus!',
  grab: 'Grab him, drag him around, and FLING him! Hard wall hits make him dizzy.',
  soothe: 'Pet him gently to cool his anger down. He forgives you… eventually.',
};

let burstId = 0;
let pimpleId = 0;

export default function PlaygroundPage() {
  const stageRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const partsRef = useRef<HTMLDivElement>(null);

  const [mode, setMode] = useState<Mode>('beat');
  const [anger, setAnger] = useState(0);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [pimples, setPimples] = useState<Pimple[]>([]);
  const [face, setFace] = useState<PlayFace>('normal');
  const [bruise, setBruise] = useState(0);
  const [furious, setFurious] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [bursts, setBursts] = useState<Burst[]>([]);
  const [high, setHigh] = useState(() => { try { return Number(localStorage.getItem('vishal-play-high') || 0); } catch { return 0; } });

  const modeRef = useRef<Mode>('beat');
  const angerRef = useRef(0);
  const scoreRef = useRef(0);
  const comboRef = useRef(0);
  const bruiseRef = useRef(0);
  const pimplesRef = useRef<Pimple[]>([]);
  const faceRef = useRef<PlayFace>('normal');
  const furiousRef = useRef(false);
  const S = useRef({
    x: 0, y: 0, vx: 0, vy: 0, rot: 0, vrot: 0,
    sw: 0, sh: 0, asize: 200,
    grabbed: false, px: 0, py: 0, pvx: 0, pvy: 0, plast: 0,
    squashT: 0, hurtT: 0, dizzyT: 0, happyT: 0, comboT: 0, pimpleT: 2.5,
    petT: 0, furiousT: 0, armL: 0, armR: 0, t: 0,
  });
  const parts = useRef<Particle[]>([]);

  /* ---------- helpers (stable via refs) ---------- */
  const setFaceIf = (f: PlayFace) => {
    if (faceRef.current !== f) { faceRef.current = f; setFace(f); }
  };
  const addScore = (n: number) => {
    scoreRef.current += n; setScore(scoreRef.current);
    if (scoreRef.current > high) {
      setHigh(scoreRef.current);
      try { localStorage.setItem('vishal-play-high', String(scoreRef.current)); } catch { /* noop */ }
    }
  };
  const spawnBurst = (x: number, y: number, word: string, color = '#ffd23f') => {
    const id = ++burstId;
    setBursts(b => [...b.slice(-7), { id, x, y, word, color }]);
    window.setTimeout(() => setBursts(b => b.filter(i => i.id !== id)), 800);
  };
  const spawnParticle = (
    kind: Particle['kind'], x: number, y: number,
    opts: Partial<Pick<Particle, 'vx' | 'vy' | 'life' | 'size' | 'color' | 'ch' | 'grav'>> = {},
  ) => {
    const box = partsRef.current; if (!box) return;
    if (parts.current.length > 140) return;
    const el = document.createElement('div');
    el.className = `particle p-${kind}`;
    const size = opts.size ?? rand(6, 12);
    if (kind === 'goo' || kind === 'spark') {
      el.style.width = el.style.height = `${size}px`;
      el.style.background = opts.color ?? '#8ee36a';
      el.style.borderRadius = kind === 'goo' ? '50%' : '2px';
    } else if (kind === 'puff') {
      el.style.width = el.style.height = `${size}px`;
      el.style.background = `radial-gradient(circle, ${opts.color ?? '#ff6b4a'} 0%, transparent 70%)`;
    } else {
      el.textContent = opts.ch ?? '💗';
      el.style.fontSize = `${size * 1.6}px`;
    }
    box.appendChild(el);
    parts.current.push({
      x, y, vx: opts.vx ?? rand(-160, 160), vy: opts.vy ?? rand(-260, -40),
      life: 0, max: opts.life ?? rand(0.7, 1.3), size,
      rot: rand(0, 360), vr: rand(-260, 260),
      kind, color: opts.color ?? '', ch: opts.ch ?? '', el,
      grav: opts.grav ?? (kind === 'heart' ? -60 : kind === 'puff' ? -120 : 700),
    });
  };
  const burstParts = (kind: Particle['kind'], x: number, y: number, n: number, colors?: string[], chs?: string[]) => {
    for (let i = 0; i < n; i++) {
      const o: { color?: string; ch?: string } = {};
      if (colors) o.color = colors[(Math.random() * colors.length) | 0];
      if (chs) o.ch = chs[(Math.random() * chs.length) | 0];
      spawnParticle(kind, x + rand(-14, 14), y + rand(-14, 14), o);
    }
  };

  const addAnger = (n: number) => {
    if (furiousRef.current) return;
    angerRef.current = clamp(angerRef.current + n, 0, 100);
    setAnger(Math.round(angerRef.current));
    if (angerRef.current >= 100) triggerFurious();
  };
  const calm = (n: number) => {
    angerRef.current = clamp(angerRef.current - n, 0, 100);
    setAnger(Math.round(angerRef.current));
  };

  const triggerFurious = () => {
    if (furiousRef.current) return;
    furiousRef.current = true; setFurious(true);
    S.current.furiousT = 1.6;
    sfx.roar();
    stageRef.current?.classList.add('play-shake');
  };
  const releaseAnger = (bonus: number) => {
    const s = S.current;
    addScore(bonus);
    spawnBurst(s.x, s.y - s.asize * 0.7, 'ANGER EXTRACTED!', '#ff5a3c');
    burstParts('puff', s.x, s.y, 22, ['#ff6b4a', '#ff3b30', '#ffb03a']);
    burstParts('star', s.x, s.y - 40, 10, undefined, ['💥', '💫', '⭐']);
    burstParts('spark', s.x, s.y, 14, ['#ffd23f', '#ff9f1c']);
    sfx.yay();
    angerRef.current = 0; setAnger(0);
    s.dizzyT = 2.4; s.hurtT = 0;
    furiousRef.current = false; setFurious(false);
    stageRef.current?.classList.remove('play-shake');
  };

  /* ---------- main loop ---------- */
  useEffect(() => {
    const stage = stageRef.current!;
    const wrap = wrapRef.current!;
    const s = S.current;
    let raf = 0;

    const measure = () => {
      const r = stage.getBoundingClientRect();
      s.sw = r.width; s.sh = r.height;
      s.asize = clamp(Math.min(s.sw * 0.44, 215), 128, 215);
      wrap.style.width = `${s.asize}px`;
      wrap.style.height = `${s.asize * 1.7 / 1.2}px`;
      if (!s.x && !s.y) { s.x = s.sw / 2; s.y = s.sh * 0.56; }
      s.x = clamp(s.x, 40, s.sw - 40); s.y = clamp(s.y, 60, s.sh - 40);
    };
    measure();
    window.addEventListener('resize', measure);

    const rigOf = (n: string) => innerRef.current?.querySelector<SVGGElement>(`[data-rig="${n}"]`);

    const avatarHit = (px: number, py: number) => Math.hypot(px - s.x, py - s.y) < s.asize * 0.62;
    const toLocal = (px: number, py: number) => {
      const sc = s.asize / 120, h = s.asize * 1.7 / 1.2;
      return { x: (px - (s.x - s.asize / 2)) / sc, y: (py - (s.y - h / 2)) / sc };
    };

    const doSlap = (px: number, py: number) => {
      const now = performance.now();
      comboRef.current = now - s.comboT < 1100 ? comboRef.current + 1 : 1;
      s.comboT = now; setCombo(comboRef.current);
      const cb = comboRef.current;
      addAnger(9 + Math.min(cb, 12));
      addScore(10 * cb);
      bruiseRef.current = Math.min(1, bruiseRef.current + 0.12); setBruise(bruiseRef.current);
      s.hurtT = 0.5; s.squashT = 0.2;
      const dx = s.x - px, dy = s.y - py, d = Math.hypot(dx, dy) || 1;
      s.vx += (dx / d) * 320 + rand(-60, 60); s.vy += (dy / d) * 200 - 120;
      s.vrot += rand(-7, 7);
      spawnBurst(px, py - 30, SLAP_WORDS[(Math.random() * SLAP_WORDS.length) | 0]);
      spawnParticle('hand', px, py, { ch: '👋', size: 26, vx: (dx / d) * 500, vy: (dy / d) * 300, life: 0.32, grav: 0 });
      burstParts('spark', px, py, 6, ['#ffd23f', '#fff3a3']);
      if (cb >= 3) spawnBurst(s.x, s.y - s.asize * 0.75, `x${cb} COMBO!`, '#7cf7ff');
      sfx.slap();
    };

    const doPop = (px: number, py: number) => {
      const l = toLocal(px, py);
      const hit = pimplesRef.current.find(p => Math.hypot(p.x - l.x, p.y - l.y) < p.r + 13);
      if (!hit) { sfx.pop(); return; }
      pimplesRef.current = pimplesRef.current.filter(p => p.id !== hit.id);
      setPimples([...pimplesRef.current]);
      const sc = s.asize / 120;
      const gx = s.x - s.asize / 2 + hit.x * sc, gy = s.y - (s.asize * 1.7 / 1.2) / 2 + hit.y * sc;
      burstParts('goo', gx, gy, 9, ['#8ee36a', '#d7f75b', '#a3e635']);
      spawnBurst(gx, gy - 24, 'POP!', '#b8f35a');
      addScore(50); s.happyT = 1.1; sfx.pop();
      if (pimplesRef.current.length === 0) {
        addScore(150);
        spawnBurst(s.x, s.y - s.asize * 0.75, 'ALL CLEAR! +150', '#b8f35a');
        sfx.yay();
      }
    };

    const doPet = (px: number, py: number) => {
      if (s.petT > 0 || furiousRef.current) return;
      s.petT = 0.14; s.happyT = 1.2;
      calm(6); addScore(3);
      burstParts('heart', px + rand(-20, 20), py - 40, 2, undefined, ['💗', '💖', '💕']);
    };

    const onDown = (e: PointerEvent) => {
      ac();
      const r = stage.getBoundingClientRect();
      const px = e.clientX - r.left, py = e.clientY - r.top;
      const now = performance.now();
      s.px = px; s.py = py; s.plast = now; s.pvx = 0; s.pvy = 0;
      const m = modeRef.current;
      if (m === 'grab') {
        if (avatarHit(px, py)) {
          s.grabbed = true;
          stage.setPointerCapture(e.pointerId);
          s.vx = 0; s.vy = 0;
        }
      } else if (m === 'beat') {
        if (avatarHit(px, py)) doSlap(px, py);
      } else if (m === 'pimple') {
        doPop(px, py);
      } else if (m === 'soothe') {
        if (avatarHit(px, py)) doPet(px, py);
      }
    };
    const onMove = (e: PointerEvent) => {
      const r = stage.getBoundingClientRect();
      const px = e.clientX - r.left, py = e.clientY - r.top;
      const now = performance.now();
      const dtm = Math.max(1, now - s.plast) / 1000;
      s.pvx = (px - s.px) / dtm; s.pvy = (py - s.py) / dtm;
      s.px = px; s.py = py; s.plast = now;
      if (modeRef.current === 'soothe' && avatarHit(px, py) && Math.hypot(s.pvx, s.pvy) > 120) doPet(px, py);
      if (s.grabbed && e.pressure === 0 && e.pointerType === 'mouse') { /* keep grabbed until up */ }
    };
    const onUp = () => {
      if (s.grabbed) {
        s.grabbed = false;
        s.vx = clamp(s.pvx * 1.25, -950, 950);
        s.vy = clamp(s.pvy * 1.25, -950, 950);
        if (Math.hypot(s.vx, s.vy) > 500) sfx.boing();
      }
    };

    stage.addEventListener('pointerdown', onDown);
    stage.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);

    const setLimb = (n: string, deg: number) => rigOf(n)?.setAttribute('transform', `rotate(${deg.toFixed(1)})`);

    let last = performance.now();
    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.033);
      last = now; s.t += dt;
      const m = modeRef.current;
      const R = s.asize * 0.5;

      /* timers */
      s.hurtT = Math.max(0, s.hurtT - dt);
      s.dizzyT = Math.max(0, s.dizzyT - dt);
      s.happyT = Math.max(0, s.happyT - dt);
      s.petT = Math.max(0, s.petT - dt);
      s.squashT = Math.max(0, s.squashT - dt);

      /* furious sequence */
      if (furiousRef.current) {
        s.furiousT -= dt;
        s.x += rand(-7, 7); s.y += rand(-7, 7);
        if (Math.random() < dt * 14) burstParts('puff', s.x + rand(-50, 50), s.y - 70, 1, ['#ff6b4a', '#ffb03a']);
        if (s.furiousT <= 0) releaseAnger(500);
      }

      /* pimple spawner */
      if (m === 'pimple' && !furiousRef.current) {
        s.pimpleT -= dt;
        if (s.pimpleT <= 0 && pimplesRef.current.length < 6) {
          s.pimpleT = rand(1.6, 2.6);
          for (let tries = 0; tries < 12; tries++) {
            const zx = [[44, 76, 24, 36], [36, 48, 56, 68], [72, 84, 56, 68], [52, 68, 76, 84]][(Math.random() * 4) | 0];
            const x = rand(zx[0], zx[1]), y = rand(zx[2], zx[3]);
            if (Math.hypot(x - 60, y - 50) < 26 && !pimplesRef.current.some(p => Math.hypot(p.x - x, p.y - y) < 12)) {
              const p = { id: ++pimpleId, x, y, r: rand(4.5, 7) };
              pimplesRef.current = [...pimplesRef.current, p];
              setPimples(pimplesRef.current);
              break;
            }
          }
        }
      }

      /* physics */
      const anchored = m !== 'grab';
      if (s.grabbed) {
        const k = 170, c = 14;
        s.vx += ((s.px - s.x) * k - s.vx * c) * dt;
        s.vy += ((s.py - s.y) * k - s.vy * c) * dt;
      } else if (anchored) {
        const tx = s.sw / 2, ty = s.sh * 0.56;
        const k = 30, c = 7;
        s.vx += ((tx - s.x) * k - s.vx * c) * dt;
        s.vy += ((ty - s.y) * k - s.vy * c) * dt;
      } else {
        s.vy += 1500 * dt;
        s.vx *= Math.exp(-0.12 * dt);
      }
      if (!furiousRef.current) {
        s.x += s.vx * dt; s.y += s.vy * dt;
      }
      s.rot += s.vrot * dt;
      s.vrot *= Math.exp(-3 * dt);
      if (!s.grabbed) {
        const rk = 26, rc = 6;
        s.vrot += ((-s.rot * rk) - s.vrot * rc) * dt;
      }

      /* walls (stage bounds) */
      const hitWall = (nx: number, ny: number, px: number, py: number) => {
        s.x = px; s.y = py;
        const sp = Math.hypot(s.vx, s.vy);
        if (nx !== 0 && Math.sign(s.vx) === -nx) {
          if (sp > 420 && m === 'grab') { s.dizzyT = 1.5; s.squashT = 0.22; burstParts('star', s.x, s.y - 70, 6, undefined, ['💫', '⭐']); spawnBurst(s.x, s.y - 90, 'BOING!', '#7cf7ff'); sfx.thud(); }
          else if (sp > 200) s.squashT = 0.18;
          s.vx = -s.vx * 0.72; s.vrot += rand(-4, 4);
        }
        if (ny !== 0 && Math.sign(s.vy) === -ny) {
          if (sp > 420 && m === 'grab') { s.dizzyT = 1.5; s.squashT = 0.22; burstParts('star', s.x, s.y - 70, 6, undefined, ['💫', '⭐']); spawnBurst(s.x, s.y - 90, 'BOING!', '#7cf7ff'); sfx.thud(); }
          else if (sp > 200) s.squashT = 0.18;
          s.vy = -s.vy * 0.72; s.vrot += rand(-4, 4);
        }
      };
      if (s.x < R) hitWall(1, 0, R, s.y);
      else if (s.x > s.sw - R) hitWall(-1, 0, s.sw - R, s.y);
      if (s.y < R * 1.2) hitWall(0, 1, s.x, R * 1.2);
      else if (s.y > s.sh - R * 0.9) hitWall(0, -1, s.x, s.sh - R * 0.9);

      /* limbs */
      const t = s.t;
      const flailing = s.grabbed || Math.hypot(s.vx, s.vy) > 560;
      let aL: number, aR: number, lL: number, lR: number;
      if (s.dizzyT > 0) {
        aL = 10 + Math.sin(t * 3) * 5; aR = -10 - Math.sin(t * 3) * 5;
        lL = Math.sin(t * 3) * 7; lR = -Math.sin(t * 3) * 7;
      } else if (flailing) {
        aL = -150 + Math.sin(t * 16) * 38; aR = 150 - Math.sin(t * 16) * 38;
        lL = Math.sin(t * 14) * 26; lR = -Math.sin(t * 14) * 26;
      } else if (s.hurtT > 0) {
        aL = -120; aR = 120; lL = -10; lR = 10;
      } else {
        aL = Math.sin(t * 2.2) * 6; aR = -Math.sin(t * 2.2 + 1) * 6;
        lL = Math.sin(t * 2.2) * 4; lR = -Math.sin(t * 2.2) * 4;
      }
      const lk = Math.min(1, dt * 12);
      s.armL += (aL - s.armL) * lk; s.armR += (aR - s.armR) * lk;
      setLimb('armL', s.armL); setLimb('armR', s.armR);
      setLimb('legL', lL); setLimb('legR', lR);
      const headTilt = furiousRef.current ? rand(-9, 9) : clamp(s.vx * 0.02, -10, 10) + (s.dizzyT > 0 ? Math.sin(t * 5) * 8 : 0);
      rigOf('head')?.setAttribute('transform', `rotate(${headTilt.toFixed(1)} 60 52)`);

      /* face */
      const f: PlayFace =
        furiousRef.current ? 'angry'
        : s.dizzyT > 0 ? 'dizzy'
        : s.hurtT > 0 ? 'hurt'
        : s.grabbed ? 'worried'
        : s.happyT > 0 ? 'happy'
        : angerRef.current > 70 ? 'angry'
        : angerRef.current > 40 ? 'worried' : 'normal';
      setFaceIf(f);

      /* render wrapper */
      const k = s.squashT > 0 ? Math.sin((s.squashT / 0.22) * Math.PI) : 0;
      const sx = 1 + 0.16 * k, sy = 1 - 0.22 * k;
      const h = s.asize * 1.7 / 1.2;
      wrap.style.transform =
        `translate3d(${(s.x - s.asize / 2).toFixed(1)}px, ${(s.y - h / 2).toFixed(1)}px, 0) rotate(${s.rot.toFixed(1)}deg) scale(${sx.toFixed(3)}, ${sy.toFixed(3)})`;

      /* particles */
      const ps = parts.current;
      for (let i = ps.length - 1; i >= 0; i--) {
        const p = ps[i];
        p.life += dt;
        if (p.life >= p.max) { p.el.remove(); ps.splice(i, 1); continue; }
        p.vy += p.grav * dt;
        p.x += p.vx * dt; p.y += p.vy * dt; p.rot += p.vr * dt;
        const kk = p.life / p.max;
        const grow = p.kind === 'puff' ? 1 + kk * 1.6 : 1 - kk * 0.2;
        p.el.style.transform = `translate3d(${(p.x - p.size / 2).toFixed(1)}px, ${(p.y - p.size / 2).toFixed(1)}px, 0) rotate(${p.rot.toFixed(0)}deg) scale(${grow.toFixed(2)})`;
        p.el.style.opacity = `${(kk < 0.65 ? 1 : 1 - (kk - 0.65) / 0.35).toFixed(2)}`;
      }

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', measure);
      stage.removeEventListener('pointerdown', onDown);
      stage.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      parts.current.forEach(p => p.el.remove());
      parts.current = [];
      stage.classList.remove('play-shake');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* keep mode ref in sync + reset per-mode state */
  const switchMode = (m: Mode) => {
    setMode(m); modeRef.current = m;
    const s = S.current;
    s.grabbed = false; s.vx = 0; s.vy = 0; s.vrot = 0;
    s.dizzyT = 0; s.hurtT = 0;
    if (m !== 'pimple') { pimplesRef.current = []; setPimples([]); }
    setCombo(0); comboRef.current = 0;
  };
  const toggleMute = () => {
    muted = !muted; setIsMuted(muted);
  };
  const resetAll = () => {
    const s = S.current;
    angerRef.current = 0; setAnger(0);
    bruiseRef.current = 0; setBruise(0);
    scoreRef.current = 0; setScore(0);
    comboRef.current = 0; setCombo(0);
    pimplesRef.current = []; setPimples([]);
    s.vx = s.vy = 0; s.vrot = 0; s.dizzyT = 0; s.hurtT = 0;
    furiousRef.current = false; setFurious(false);
    stageRef.current?.classList.remove('play-shake');
  };

  const modes: Array<{ id: Mode; label: string; icon: React.ReactNode }> = [
    { id: 'beat', label: 'Beat him', icon: <Hand size={16} /> },
    { id: 'pimple', label: 'Pop pimples', icon: <MousePointerClick size={16} /> },
    { id: 'grab', label: 'Grab & throw', icon: <Move size={16} /> },
    { id: 'soothe', label: 'Soothe him', icon: <Heart size={16} /> },
  ];
  const cursor = mode === 'grab' ? 'grab' : mode === 'pimple' ? 'crosshair' : 'pointer';

  return (
    <div className="play-page">
      <div className="play-head">
        <div>
          <p className="eyebrow">Playground</p>
          <h1>Poke <span>Vishal</span></h1>
          <p className="play-sub">He volunteered for this. Probably.</p>
        </div>
        <div className="play-stats">
          <div className="stat"><Trophy size={15} /><span>{score}</span><em>score</em></div>
          <div className="stat"><Flame size={15} /><span>{high}</span><em>best</em></div>
          {combo >= 2 && <div className="stat combo-stat"><span>x{combo}</span><em>combo</em></div>}
        </div>
      </div>

      <div className="play-toolbar">
        <div className="mode-tabs" role="tablist">
          {modes.map(m => (
            <button key={m.id} role="tab" aria-selected={mode === m.id}
              className={`mode-btn ${mode === m.id ? 'active' : ''}`}
              onClick={() => switchMode(m.id)}>
              {m.icon}<span>{m.label}</span>
            </button>
          ))}
        </div>
        <div className="anger-wrap" title="Anger meter">
          <Flame size={16} className={anger >= 70 ? 'anger-hot' : ''} />
          <div className="anger-bar"><div className="anger-fill" style={{ width: `${anger}%` }} /></div>
          <span className="anger-num">{anger}%</span>
        </div>
        <div className="play-actions">
          {anger >= 50 && !furious && (
            <button className="extract-btn" onClick={() => { S.current.furiousT = 0.7; triggerFurious(); }}>
              💢 Extract anger <b>+{Math.round(angerRef.current * 5) + 500}</b>
            </button>
          )}
          <button className="icon-btn" onClick={toggleMute} aria-label={isMuted ? 'Unmute' : 'Mute'}>
            {isMuted ? <VolumeX size={17} /> : <Volume2 size={17} />}
          </button>
          <button className="icon-btn" onClick={resetAll} aria-label="Reset"><RotateCcw size={16} /></button>
        </div>
      </div>

      <div ref={stageRef} className="play-stage" style={{ cursor }}>
        <div ref={wrapRef} className="play-avatar-wrap">
          <VishalPlayAvatar face={face} anger={anger} pimples={pimples} bruise={bruise} rootRef={innerRef} />
        </div>
        <div ref={partsRef} className="play-particles" />
        <div className="play-bursts">
          {bursts.map(b => (
            <div key={b.id} className="comic-burst" style={{ left: b.x, top: b.y, ['--burst-color' as string]: b.color }}>
              {b.word}
            </div>
          ))}
        </div>
        {furious && <div className="furious-banner">HE'S FURIOUS!</div>}
      </div>
      <p className="play-hint">{HINTS[mode]}</p>
    </div>
  );
}
