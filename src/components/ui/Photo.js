import Image from "next/image";

/**
 * `next/image` wrapper for the photographic slots.
 *
 * Fills its parent, so the parent must be positioned and have a definite size.
 * `sizes` is required for fill images or Next serves the largest candidate to
 * every viewport.
 *
 * The wrapper owns its own `position`, so `className` must not pass a competing
 * position utility — Tailwind emits them in one layer at equal specificity, so
 * the stylesheet order decides the winner, not the order you list the classes.
 */
export default function Photo({
  src,
  alt,
  sizes = "100vw",
  priority = false,
  className = "",
  imgClassName = "object-cover",
}) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={imgClassName}
      />
    </div>
  );
}
