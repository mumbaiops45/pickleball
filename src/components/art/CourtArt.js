/**
 * The court diagram, drawn rather than photographed so it can sit behind a
 * section at any size without a raster edge.
 *
 * It is what is left of GearArt, which also held a tee, shorts, a cap, a bag,
 * a shoe and an overgrip for the lines the store used to carry. The store
 * sells pickleballs only, so those went with the products; the ball artwork
 * itself lives in BallArt.
 */
export function CourtArt({ className = "", stroke = "#1e3d14" }) {
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
