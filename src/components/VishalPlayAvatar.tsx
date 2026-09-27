export type PlayFace = 'normal' | 'hurt' | 'dizzy' | 'angry' | 'happy' | 'worried';

export interface Pimple { id: number; x: number; y: number; r: number }

const SKIN = '#ffd9b8';
const SKIN_D = '#f0bd93';

function Eyes({ face }: { face: PlayFace }) {
  switch (face) {
    case 'hurt':
      return (
        <g stroke="#2b1d16" strokeWidth="2.6" strokeLinecap="round">
          <path d="M41,46 L51,51 L41,56" fill="none" />
          <path d="M79,46 L69,51 L79,56" fill="none" />
        </g>
      );
    case 'dizzy':
      return (
        <g stroke="#2b1d16" strokeWidth="2.6" strokeLinecap="round">
          <path d="M42,46 L52,56 M52,46 L42,56" />
          <path d="M68,46 L78,56 M78,46 L68,56" />
        </g>
      );
    case 'happy':
      return (
        <g stroke="#2b1d16" strokeWidth="2.8" strokeLinecap="round" fill="none">
          <path d="M41,53 Q47,45 53,53" />
          <path d="M67,53 Q73,45 79,53" />
        </g>
      );
    case 'angry':
      return (
        <g>
          <circle cx="47" cy="52" r="3.6" fill="#2b1d16" />
          <circle cx="73" cy="52" r="3.6" fill="#2b1d16" />
          <circle cx="48.2" cy="50.8" r="1.2" fill="#fff" />
          <circle cx="74.2" cy="50.8" r="1.2" fill="#fff" />
        </g>
      );
    default:
      return (
        <g>
          <circle cx="47" cy="51" r="4.2" fill="#2b1d16" />
          <circle cx="73" cy="51" r="4.2" fill="#2b1d16" />
          <circle cx="48.5" cy="49.5" r="1.4" fill="#fff" />
          <circle cx="74.5" cy="49.5" r="1.4" fill="#fff" />
        </g>
      );
  }
}

function Brows({ face }: { face: PlayFace }) {
  if (face === 'angry')
    return (
      <g stroke="#1e1c1c" strokeWidth="3.6" strokeLinecap="round">
        <path d="M38,37 L54,44" />
        <path d="M82,37 L66,44" />
      </g>
    );
  if (face === 'worried')
    return (
      <g stroke="#1e1c1c" strokeWidth="2.4" strokeLinecap="round" fill="none">
        <path d="M40,38 Q47,34 54,37" />
        <path d="M66,37 Q73,34 80,38" />
      </g>
    );
  if (face === 'happy')
    return (
      <g stroke="#1e1c1c" strokeWidth="2.4" strokeLinecap="round" fill="none">
        <path d="M40,35 Q47,32 54,35" />
        <path d="M66,35 Q73,32 80,35" />
      </g>
    );
  return (
    <g stroke="#1e1c1c" strokeWidth="2.5" strokeLinecap="round" fill="none">
      <path d="M40,36 Q47,33 54,36" />
      <path d="M66,36 Q73,33 80,36" />
    </g>
  );
}

function Mouth({ face }: { face: PlayFace }) {
  switch (face) {
    case 'hurt':
      return <path d="M48,68 L54,63 L60,68 L66,63 L72,68" stroke="#8a4b3c" strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />;
    case 'dizzy':
      return <ellipse cx="60" cy="70" rx="4" ry="5.5" fill="#6e3a34" />;
    case 'angry':
      return <path d="M50,73 Q60,65 70,73" stroke="#8a4b3c" strokeWidth="2.8" fill="none" strokeLinecap="round" />;
    case 'happy':
      return <path d="M47,65 Q60,81 73,65 Q60,71 47,65 Z" fill="#a34f4a" />;
    case 'worried':
      return <ellipse cx="60" cy="70" rx="3.4" ry="4.4" fill="#6e3a34" />;
    default:
      return <path d="M50,68 Q60,75 70,68" stroke="#8a4b3c" strokeWidth="2.5" fill="none" strokeLinecap="round" />;
  }
}

export default function VishalPlayAvatar({
  face, anger, pimples, bruise, rootRef,
}: {
  face: PlayFace;
  anger: number; // 0..100
  pimples: Pimple[];
  bruise: number; // 0..1
  rootRef: { current: HTMLDivElement | null };
}) {
  const red = Math.min(0.55, (anger / 100) * 0.55);
  const steamy = anger > 72;
  return (
    <div ref={rootRef} className="play-avatar" style={{ width: '100%', height: '100%' }}>
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
        {/* torso */}
        <rect x="30" y="86" width="60" height="48" rx="15" fill="#23232b" />
        <polygon points="52,88 68,88 60,112" fill="#f5f2ec" />
        <polygon points="52,88 43,97 52,109" fill="#2f2f3a" />
        <polygon points="68,88 77,97 68,109" fill="#2f2f3a" />
        <circle cx="60" cy="118" r="1.7" fill="#0f0f13" />
        <circle cx="60" cy="126" r="1.7" fill="#0f0f13" />
        <rect x="70" y="102" width="3.6" height="12" rx="1.8" fill="#d9a441" />
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
          {/* anger redness */}
          {red > 0.02 && <circle cx="60" cy="50" r="33" fill="#ff3b30" opacity={red} />}
          {/* bruises */}
          {bruise > 0.03 && (
            <g>
              <ellipse cx="76" cy="59" rx="7" ry="5" fill="#5b4a68" opacity={bruise * 0.65} />
              <ellipse cx="40" cy="64" rx="6" ry="4.5" fill="#7a5f8a" opacity={bruise * 0.5} />
            </g>
          )}
          {/* pimples */}
          {pimples.map(p => (
            <g key={p.id} className="pimple" data-pimple={p.id}>
              <circle cx={p.x} cy={p.y} r={p.r} fill="#e5484d" />
              <circle cx={p.x} cy={p.y} r={p.r * 0.55} fill="#ff8589" />
              <circle cx={p.x - p.r * 0.25} cy={p.y - p.r * 0.25} r={p.r * 0.28} fill="#fff" opacity="0.9" />
            </g>
          ))}
          <path d="M28,54 C26,24 44,14 60,14 C76,14 94,24 92,54 C88,44 86,38 82,36 C84,42 80,40 76,34 C70,28 64,30 60,28 C48,26 38,34 36,44 C32,44 30,48 28,54 Z" fill="#1e1c1c" />
          <path d="M32,58 Q60,94 88,58" stroke="#c99b72" strokeWidth="3" fill="none" opacity="0.8" strokeLinecap="round" />
          <Eyes face={face} />
          <circle cx="47" cy="50" r="10.5" stroke="#3a3a3a" strokeWidth="2.5" fill="rgba(255,255,255,0.07)" />
          <circle cx="73" cy="50" r="10.5" stroke="#3a3a3a" strokeWidth="2.5" fill="rgba(255,255,255,0.07)" />
          <path d="M57,50 Q60,46 63,50" stroke="#3a3a3a" strokeWidth="2.5" fill="none" />
          <path d="M37,50 L28,48 M83,50 L92,48" stroke="#3a3a3a" strokeWidth="2.5" />
          <Brows face={face} />
          <Mouth face={face} />
          {/* steam when furious */}
          {steamy && (
            <g className="steam" opacity={0.35 + (anger - 72) / 28 * 0.6}>
              <path d="M42,10 c-7,-8 7,-13 0,-21 c-6,-7 5,-12 1,-19" stroke="#fff" strokeWidth="4" fill="none" strokeLinecap="round" />
              <path d="M76,12 c-7,-8 7,-13 0,-21 c-6,-7 5,-12 1,-19" stroke="#fff" strokeWidth="4" fill="none" strokeLinecap="round" />
            </g>
          )}
        </g>
      </svg>
    </div>
  );
}
