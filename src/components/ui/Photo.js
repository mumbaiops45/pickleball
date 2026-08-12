import Image from "next/image";

/**
 * `next/image` wrapper for the photographic slots.
 *
 * Fills its parent, so the parent must be positioned and have a definite size.
 * `sizes` is required for fill images or Next serves the largest candidate to
 * every viewport.
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
    <div className={`relative overflow-hidden ${className}`}>
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
