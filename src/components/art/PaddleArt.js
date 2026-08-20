
export default function PaddleArt({
  face = "#d4ff3f",
  edge = "#0d0f13",
  grip = "#1b1f26",
  texture = "carbon",
  id = "paddle",
  className = "",
}) {
  const faceId = `${id}-face`;
  const textureId = `${id}-texture`;
  const shineId = `${id}-shine`;

  return (
    <svg
      viewBox="0 0 200 330"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={faceId} x1="30" y1="0" x2="180" y2="240">
          <stop offset="0%" stopColor={face} />
          <stop offset="55%" stopColor={face} />
          <stop offset="100%" stopColor="#000" stopOpacity="0.35" />
        </linearGradient>

        <linearGradient id={shineId} x1="0" y1="0" x2="120" y2="200">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.4" />
          <stop offset="45%" stopColor="#fff" stopOpacity="0.04" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </linearGradient>

        {texture === "carbon" && (
          <pattern
            id={textureId}
            width="9"
            height="9"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <rect width="9" height="9" fill="transparent" />
            <rect width="4.5" height="9" fill="#000" opacity="0.16" />
          </pattern>
        )}

        {texture === "honeycomb" && (
          <pattern
            id={textureId}
            width="20"
            height="17.4"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M10 0 L20 5 L20 13 L10 18 L0 13 L0 5 Z"
              fill="none"
              stroke="#000"
              strokeOpacity="0.18"
              strokeWidth="1.4"
            />
          </pattern>
        )}

        {texture === "grit" && (
          <pattern
            id={textureId}
            width="6"
            height="6"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1.5" cy="1.5" r="0.9" fill="#000" opacity="0.2" />
            <circle cx="4.5" cy="4.5" r="0.9" fill="#000" opacity="0.14" />
          </pattern>
        )}
      </defs>

      {/* handle */}
      <rect x="83" y="228" width="34" height="94" rx="15" fill={grip} />
      {[244, 258, 272, 286, 300].map((y) => (
        <path
          key={y}
          d={`M84 ${y} L116 ${y - 7}`}
          stroke="#000"
          strokeOpacity="0.45"
          strokeWidth="3"
          strokeLinecap="round"
        />
      ))}
      <rect
        x="83"
        y="228"
        width="34"
        height="94"
        rx="15"
        stroke="#fff"
        strokeOpacity="0.08"
      />
      <rect x="86" y="312" width="28" height="9" rx="4" fill={face} opacity="0.9" />

      {/* throat */}
      <path d="M88 208 H112 V244 H88 Z" fill={edge} />

      {/* body */}
      <rect x="16" y="8" width="168" height="228" rx="34" fill={edge} />
      <rect
        x="24"
        y="16"
        width="152"
        height="212"
        rx="28"
        fill={`url(#${faceId})`}
      />
      <rect
        x="24"
        y="16"
        width="152"
        height="212"
        rx="28"
        fill={`url(#${textureId})`}
      />
      <rect
        x="24"
        y="16"
        width="152"
        height="212"
        rx="28"
        fill={`url(#${shineId})`}
      />

      {/* face branding */}
      <path
        d="M100 96 L124 140 L100 156 L76 140 Z"
        fill="#000"
        fillOpacity="0.5"
      />
      <path
        d="M100 108 L114 138 L100 147 L86 138 Z"
        fill={face}
        fillOpacity="0.9"
      />

      {/* edge guard highlight */}
      <rect
        x="16.75"
        y="8.75"
        width="166.5"
        height="226.5"
        rx="33.25"
        stroke="#fff"
        strokeOpacity="0.1"
        strokeWidth="1.5"
      />
    </svg>
  );
}
