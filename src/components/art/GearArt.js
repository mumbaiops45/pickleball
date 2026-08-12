/** Apparel, bag and shoe silhouettes used by product cards and category tiles. */

/* Light colourways would disappear against the white product panels, so every
   silhouette carries a faint dark outline. */
const OUTLINE = { stroke: "#0f1115", strokeOpacity: 0.22, strokeWidth: 2.5 };

export function TeeArt({ color = "#f5f3ed", accent = "#d4ff3f", className = "" }) {
  return (
    <svg viewBox="0 0 240 240" fill="none" className={className} aria-hidden="true">
      <path
        d="M84 34 L60 46 L28 74 L52 104 L70 90 V208 a6 6 0 0 0 6 6 h88 a6 6 0 0 0 6-6 V90 l18 14 24-30 -32-28 -24-12 h-24 a20 20 0 0 1-32 0 Z"
        fill={color}
        {...OUTLINE}
      />
      <path
        d="M84 34 a36 36 0 0 0 72 0"
        stroke="#000"
        strokeOpacity="0.25"
        strokeWidth="3"
        fill="none"
      />
      <rect x="98" y="118" width="44" height="44" rx="8" fill={accent} />
      <path d="M120 130 l12 20 -12 8 -12-8 Z" fill="#0d0f13" fillOpacity="0.75" />
      <path
        d="M70 208 h100"
        stroke="#000"
        strokeOpacity="0.18"
        strokeWidth="4"
      />
    </svg>
  );
}

export function BagArt({ color = "#14171d", accent = "#d4ff3f", className = "" }) {
  return (
    <svg viewBox="0 0 240 240" fill="none" className={className} aria-hidden="true">
      <path
        d="M60 66 h120 a34 34 0 0 1 34 34 v62 a34 34 0 0 1-34 34 H60 a34 34 0 0 1-34-34 v-62 a34 34 0 0 1 34-34 Z"
        fill={color}
        {...OUTLINE}
      />
      <path
        d="M92 66 v-10 a16 16 0 0 1 16-16 h24 a16 16 0 0 1 16 16 v10"
        stroke={accent}
        strokeWidth="7"
        strokeLinecap="round"
        fill="none"
      />
      <rect x="26" y="118" width="188" height="18" fill="#000" fillOpacity="0.3" />
      <rect x="140" y="92" width="58" height="44" rx="10" fill="#000" fillOpacity="0.35" />
      <rect x="52" y="150" width="70" height="12" rx="6" fill={accent} fillOpacity="0.85" />
      <circle cx="176" cy="168" r="10" fill={accent} fillOpacity="0.5" />
    </svg>
  );
}

export function ShoeArt({ color = "#f5f3ed", accent = "#ff5c2b", className = "" }) {
  return (
    <svg viewBox="0 0 240 240" fill="none" className={className} aria-hidden="true">
      <path
        d="M30 168 c0-26 8-40 18-58 l16-28 h34 l10 24 44 20 c26 10 52 14 74 22 12 4 16 12 16 22 v10 a10 10 0 0 1-10 10 H42 a12 12 0 0 1-12-12 Z"
        fill={color}
        {...OUTLINE}
      />
      <path
        d="M30 176 h212 v14 a10 10 0 0 1-10 10 H42 a12 12 0 0 1-12-12 Z"
        fill={accent}
      />
      <path
        d="M76 96 l30 16 M92 76 l32 18 M62 120 l34 16"
        stroke="#000"
        strokeOpacity="0.28"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path d="M152 138 l40 14" stroke={accent} strokeWidth="8" strokeLinecap="round" />
    </svg>
  );
}

export function ShortsArt({ color = "#2a2f38", accent = "#d4ff3f", className = "" }) {
  return (
    <svg viewBox="0 0 240 240" fill="none" className={className} aria-hidden="true">
      <path
        d="M54 44 h132 l10 76 -6 84 h-52 l-14-84 -14 84 H58 l-6-84 Z"
        fill={color}
        {...OUTLINE}
      />
      <path d="M54 44 h132 l2 16 H52 Z" fill="#000" fillOpacity="0.3" />
      <path d="M120 120 v84" stroke="#000" strokeOpacity="0.35" strokeWidth="4" />
      <rect x="150" y="96" width="34" height="46" rx="8" fill="#000" fillOpacity="0.25" />
      <path d="M62 52 h40" stroke={accent} strokeWidth="6" strokeLinecap="round" />
    </svg>
  );
}

export function CapArt({ color = "#d4ff3f", accent = "#0d0f13", className = "" }) {
  return (
    <svg viewBox="0 0 240 240" fill="none" className={className} aria-hidden="true">
      <path
        d="M40 150 c0-52 36-88 80-88 s80 36 80 88 z"
        fill={color}
        {...OUTLINE}
      />
      <path
        d="M36 150 h150 c22 0 34 10 34 22 H36 a10 10 0 0 1-10-10 v-2 a10 10 0 0 1 10-10 Z"
        fill={color}
        {...OUTLINE}
      />
      <path d="M36 150 h184" stroke="#000" strokeOpacity="0.28" strokeWidth="4" />
      <path
        d="M120 62 v88 M88 70 c-10 22-14 50-14 80 M152 70 c10 22 14 50 14 80"
        stroke="#000"
        strokeOpacity="0.2"
        strokeWidth="3"
      />
      <path d="M108 96 l16 26 -16 10 -16-10 Z" fill={accent} fillOpacity="0.8" />
      <circle cx="120" cy="62" r="7" fill={accent} fillOpacity="0.8" />
    </svg>
  );
}

export function GripArt({ color = "#2a2f38", accent = "#d4ff3f", className = "" }) {
  return (
    <svg viewBox="0 0 240 240" fill="none" className={className} aria-hidden="true">
      <path d="M68 66 v108 a52 20 0 0 0 104 0 V66 Z" fill={color} {...OUTLINE} />
      <ellipse cx="120" cy="66" rx="52" ry="20" fill={color} {...OUTLINE} />
      <ellipse cx="120" cy="66" rx="52" ry="20" fill="#fff" fillOpacity="0.08" />
      <ellipse cx="120" cy="66" rx="22" ry="8" fill="#000" fillOpacity="0.45" />
      {[92, 116, 140, 164].map((y) => (
        <path
          key={y}
          d={`M69 ${y} a52 20 0 0 0 102 0`}
          stroke="#000"
          strokeOpacity="0.3"
          strokeWidth="3"
          fill="none"
        />
      ))}
      <path
        d="M172 96 a52 20 0 0 1-104 0"
        stroke={accent}
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Faint court diagram — used as a section backdrop layer. */
export function CourtArt({ className = "", stroke = "#0f1115" }) {
  return (
    <svg viewBox="0 0 440 800" fill="none" className={className} aria-hidden="true">
      <g stroke={stroke} strokeWidth="2" opacity="0.5">
        <rect x="20" y="20" width="400" height="760" />
        <path d="M20 400 H420" strokeDasharray="10 12" />
        <path d="M20 260 H420 M20 540 H420" />
        <path d="M220 20 V260 M220 540 V780" />
      </g>
    </svg>
  );
}
