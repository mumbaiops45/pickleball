import Image from "next/image";
import Link from "next/link";
import { brand } from "@/lib/data";

import lockup from "../../../public/logo/logo-lockup.png";
import mark from "../../../public/logo/logo-mark.png";

/**
 * The brand mark, straight from the artwork the client supplied.
 *
 * `public/logo/logo.jpeg` is a JPEG on a white ground with a lot of margin, so
 * two PNGs are derived from it and committed alongside: `logo-lockup.png` is
 * the whole wordmark trimmed to its ink with the outer white flooded to
 * transparent, and `logo-mark.png` is the ball alone, clipped to its circle.
 * Flooding in from the border rather than keying every white pixel is what
 * keeps the paddle silhouette inside "BA" and the holes in the ball white
 * instead of punching them through — which matters, because the lockup sits on
 * the deep green footer as well as on paper.
 *
 * Both are imported statically so next/image gets their intrinsic size and
 * reserves the box before the file lands.
 */

/** The square ball, for favicons, avatars and tight spaces. */
const MARK_SIZE = {
  sm: "size-7",
  md: "size-9",
  lg: "size-12",
};

/** The lockup is 2.05:1, so it is sized by height and left to find its width. */
const LOCKUP_SIZE = {
  sm: "h-7",
  md: "h-11",
  lg: "h-14",
};

export function LogoMark({ size = "md", className = "" }) {
  return (
    <Image
      src={mark}
      alt=""
      aria-hidden="true"
      className={`${MARK_SIZE[size]} shrink-0 object-contain ${className}`}
      sizes="48px"
    />
  );
}

/**
 * Full lockup. `href={null}` renders it as plain content rather than a link,
 * for places that are already inside a link.
 *
 * `showName` is what it always was — false drops back to the ball on its own —
 * but the name is now part of the artwork rather than type beside it, so there
 * is no wordmark span to style any more.
 */
export default function Logo({
  size = "md",
  href = "/",
  showName = true,
  tagline,
  onClick,
  className = "",
}) {
  const content = showName ? (
    <Image
      src={lockup}
      alt={brand.name}
      priority
      className={`${LOCKUP_SIZE[size]} w-auto object-contain`}
      sizes="240px"
    />
  ) : (
    <LogoMark size={size} />
  );

  const inner = tagline ? (
    <span className="flex flex-col gap-1.5">
      {content}
      <span className="text-[10px] uppercase tracking-[0.18em] text-mist">
        {tagline}
      </span>
    </span>
  ) : (
    content
  );

  if (href === null) {
    return (
      <span className={`group flex items-center gap-2.5 ${className}`}>
        {inner}
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
      {inner}
    </Link>
  );
}
