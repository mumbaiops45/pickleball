const HOLE_RINGS = [
  { radius: 0, count: 1 },
  { radius: 22, count: 6, offset: 0 },
  { radius: 40, count: 10, offset: 0.3 },
];

/** Regulation 40-hole outdoor ball, drawn rather than photographed. */
export default function BallArt({ color = "#fecd06", id = "ball", className = "" }) {
  const bodyId = `${id}-body`;

  return (
    <svg viewBox="0 0 120 120" fill="none" className={className} aria-hidden="true">
      <defs>
        <radialGradient id={bodyId} cx="36%" cy="30%" r="78%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="38%" stopColor={color} />
          <stop offset="100%" stopColor="#000" stopOpacity="0.55" />
        </radialGradient>
      </defs>

      <circle cx="60" cy="60" r="52" fill={color} />
      <circle cx="60" cy="60" r="52" fill={`url(#${bodyId})`} />

      {HOLE_RINGS.flatMap(({ radius, count, offset = 0 }) =>
        Array.from({ length: count }, (_, index) => {
          const angle = ((index + offset) / count) * Math.PI * 2;
          const cx = 60 + Math.cos(angle) * radius;
          const cy = 60 + Math.sin(angle) * radius;
          // holes near the silhouette edge read smaller
          const r = 5 - (radius / 52) * 1.6;
          return (
            <circle
              key={`${radius}-${index}`}
              cx={cx}
              cy={cy}
              r={r}
              fill="#05060a"
              fillOpacity="0.62"
            />
          );
        }),
      )}

      {/* keeps pale colourways readable on the white product panels */}
      <circle
        cx="60"
        cy="60"
        r="51"
        stroke="#1e3d14"
        strokeOpacity="0.22"
        strokeWidth="2"
      />
    </svg>
  );
}
