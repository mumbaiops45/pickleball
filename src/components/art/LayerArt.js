

const BASE = {
  viewBox: "0 0 64 64",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": "true",
};

/** Peel-ply grit face — a panel whose surface is stippled, not coated. */
export function GritFaceArt({ className = "" }) {
  const grit = [
    [18, 20], [27, 17], [37, 21], [46, 18],
    [21, 29], [31, 27], [41, 30], [49, 27],
    [17, 39], [27, 37], [37, 40], [46, 37],
    [22, 48], [32, 46], [42, 49],
  ];

  return (
    <svg {...BASE} className={className}>
      <rect x="8" y="8" width="48" height="48" rx="12" />
      {grit.map(([cx, cy]) => (
        <circle
          key={`${cx}-${cy}`}
          cx={cx}
          cy={cy}
          r="1.6"
          fill="currentColor"
          stroke="none"
          opacity={(cx + cy) % 3 === 0 ? 0.45 : 0.85}
        />
      ))}
    </svg>
  );
}

/** Raw T700 carbon — a basket weave, alternating warp and weft by cell. */
export function CarbonWeaveArt({ className = "" }) {
  const cells = [
    { x: 10, y: 10, vertical: false },
    { x: 34, y: 10, vertical: true },
    { x: 10, y: 34, vertical: true },
    { x: 34, y: 34, vertical: false },
  ];

  return (
    <svg {...BASE} className={className}>
      <rect x="7" y="7" width="50" height="50" rx="10" opacity="0.55" />
      {cells.map((cell) => (
        <g key={`${cell.x}-${cell.y}`} strokeWidth="3">
          {[0, 7, 14].map((offset) =>
            cell.vertical ? (
              <path
                key={offset}
                d={`M${cell.x + 3 + offset} ${cell.y + 3} V${cell.y + 17}`}
              />
            ) : (
              <path
                key={offset}
                d={`M${cell.x + 3} ${cell.y + 3 + offset} H${cell.x + 17}`}
              />
            ),
          )}
        </g>
      ))}
    </svg>
  );
}

/** Foam-injected walls — closed-cell foam packed into the perimeter channel. */
export function FoamWallArt({ className = "" }) {
  const bubbles = [
    [14, 20, 3], [14, 32, 2.2], [14, 44, 3],
    [50, 20, 3], [50, 32, 2.2], [50, 44, 3],
    [24, 13, 2.4], [40, 13, 2.4],
    [24, 51, 2.4], [40, 51, 2.4],
  ];

  return (
    <svg {...BASE} className={className}>
      <rect x="6" y="6" width="52" height="52" rx="14" />
      <rect x="22" y="22" width="20" height="20" rx="6" opacity="0.5" />
      {bubbles.map(([cx, cy, r]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} strokeWidth="1.6" />
      ))}
    </svg>
  );
}

/** 16mm polymer core — the honeycomb cell structure itself. */
export function HoneycombArt({ className = "" }) {
  const r = 9;
  const dx = Math.sqrt(3) * r;
  const centres = [
    [32, 32],
    [32 - dx, 32], [32 + dx, 32],
    [32 - dx / 2, 32 - 1.5 * r], [32 + dx / 2, 32 - 1.5 * r],
    [32 - dx / 2, 32 + 1.5 * r], [32 + dx / 2, 32 + 1.5 * r],
  ];

  const hex = (cx, cy) =>
    [
      [cx, cy - r],
      [cx + dx / 2, cy - r / 2],
      [cx + dx / 2, cy + r / 2],
      [cx, cy + r],
      [cx - dx / 2, cy + r / 2],
      [cx - dx / 2, cy - r / 2],
    ]
      .map(([x, y], index) => `${index ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`)
      .join(" ") + " Z";

  return (
    <svg {...BASE} className={className}>
      {centres.map(([cx, cy], index) => (
        <path
          key={`${cx}-${cy}`}
          d={hex(cx, cy)}
          strokeWidth="1.8"
          opacity={index === 0 ? 1 : 0.55}
        />
      ))}
    </svg>
  );
}

/** Unibody handle — face, throat and handle drawn as one unbroken outline. */
export function UnibodyArt({ className = "" }) {
  return (
    <svg {...BASE} className={className}>
      <path d="M18 8 h28 a6 6 0 0 1 6 6 v22 a6 6 0 0 1-6 6 h-8 v14 a4 4 0 0 1-4 4 h-4 a4 4 0 0 1-4-4 V42 h-8 a6 6 0 0 1-6-6 V14 a6 6 0 0 1 6-6 Z" />
      <path d="M26 42 h12" opacity="0.5" strokeDasharray="2 3" />
      <path d="M28 48 h8 M28 53 h8" strokeWidth="1.6" opacity="0.7" />
    </svg>
  );
}

/** Keyed by the `art` field on each entry in `paddleLayers`. */
export const LAYER_ART = {
  grit: GritFaceArt,
  weave: CarbonWeaveArt,
  foam: FoamWallArt,
  honeycomb: HoneycombArt,
  unibody: UnibodyArt,
};
