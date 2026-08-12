import Link from "next/link";
import { brand } from "@/lib/data";

const MARK_SIZE = {
  sm: "size-7",
  md: "size-9",
  lg: "size-12",
};

const GLYPH_SIZE = {
  sm: "size-4",
  md: "size-5",
  lg: "size-7",
};

const NAME_SIZE = {
  sm: "text-[12px] tracking-[0.22em]",
  md: "text-[15px] tracking-[0.24em]",
  lg: "text-[19px] tracking-[0.26em]",
};

/** The paddle glyph on its own — favicons, avatars, tight spaces. */
export function LogoMark({ size = "md", tone = "volt", className = "" }) {
  const tones = {
    volt: "bg-volt text-ink",
    ink: "bg-ink text-volt",
    outline: "border border-line-strong bg-paper text-ink",
  };

  return (
    <span
      className={`grid ${MARK_SIZE[size]} shrink-0 place-items-center rounded-lg ${tones[tone]} ${className}`}
    >
      <svg viewBox="0 0 24 24" className={GLYPH_SIZE[size]} aria-hidden="true">
        <path d="M12 3 19 13 12 17 5 13Z" fill="currentColor" />
        <rect x="10.6" y="16" width="2.8" height="6" rx="1.4" fill="currentColor" />
      </svg>
    </span>
  );
}

/**
 * Full lockup: mark + name. `href={null}` renders it as plain content rather
 * than a link, for places that are already inside a link.
 */
export default function Logo({
  size = "md",
  tone = "volt",
  href = "/",
  showName = true,
  tagline,
  onClick,
  className = "",
}) {
  const content = (
    <>
      <LogoMark
        size={size}
        tone={tone}
        className="transition-transform duration-500 group-hover:rotate-[18deg]"
      />
      {showName ? (
        <span className="flex flex-col leading-none">
          <span className={`font-semibold text-ink ${NAME_SIZE[size]}`}>
            {brand.name}
          </span>
          {tagline ? (
            <span className="mt-1 text-[10px] uppercase tracking-[0.18em] text-mist">
              {tagline}
            </span>
          ) : null}
        </span>
      ) : null}
    </>
  );

  if (href === null) {
    return (
      <span className={`group flex items-center gap-2.5 ${className}`}>
        {content}
      </span>
    );
  }

  return (
    <Link
      href={href}
      onClick={onClick}
      aria-label={brand.name}
      className={`group flex items-center gap-2.5 ${className}`}
    >
      {content}
    </Link>
  );
}
