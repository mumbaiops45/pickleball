import Image from "next/image";


/**
 * The shot a product falls back to when it carries no `image` of its own.
 *
 * `-white` rather than the original: the studio backdrop on the source file
 * is a warm cream, and the five catalogue shots that DO set `image` are cut
 * out on pure white. The grid therefore mixed two backgrounds side by side,
 * each reading as a tinted rectangle inside its tile. The backdrop on this
 * copy is neutralised to white so every ball on the site sits on one ground.
 * See the note in ProductCard on why the tile behind it is white too.
 */
const KIND_PHOTOS = {
  ball: "/photos/pickleball-balls-white.png",
};

/**
 * Real pixel dimensions per source. next/image reserves the layout box from
 * these before the file loads, so declaring one ratio for every shot makes a
 * caller that sizes by height (`h-full w-auto`) compute its width against a
 * shape the photo does not have — object-contain then letterboxes the product
 * inside a slab of its own backdrop. The generic kind fallbacks below are 4:5;
 * every catalogue shot in /photos/products is square.
 */
const PHOTO_DIMENSIONS = {
  "/photos/pickleball-balls-white.png": [1122, 1402],
};

// /photos/products/* and the API's /media/products/* are shot on the same
// square template. An unknown source guesses square, which only ever
// letterboxes under object-contain rather than cropping.
const CATALOGUE_SHOT = [1254, 1254];

/** Resolves the single shot that represents a product across the site. */
export function productPhoto(product) {
  return product.image ?? KIND_PHOTOS[product.art?.kind] ?? null;
}

/**
 * Renders real catalogue photography. Its dimensions deliberately remain
 * controlled by the parent, so existing hover and page animations are intact.
 */
export default function ProductArt({
  product,
  className = "",
  sizes = "(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 20vw",
  fill = false,
}) {
  const src = productPhoto(product);

  if (!src) return null;

  // `fill` is for a box that already has a definite size of its own: the photo
  // is inset to it and contained, so it never depends on a percentage height
  // resolving or on the declared ratio matching the file.
  if (fill) {
    return (
      <Image
        src={src}
        alt={product.name}
        fill
        sizes={sizes}
        className={`${className} object-contain`}
      />
    );
  }

  const [width, height] = PHOTO_DIMENSIONS[src] ?? CATALOGUE_SHOT;

  return (
    <Image
      src={src}
      alt={product.name}
      width={width}
      height={height}
      sizes={sizes}
      className={`${className} object-contain`}
    />
  );
}

/**
 * Per-kind sizing, keyed on art.kind. Both are fixed
 * heights: a percentage needs a definite parent to resolve against, so boxes
 * that own their size use `fill` above instead.
 */
export const ART_THUMB = {
  ball: "h-9",
};

export const ART_MINI = {
  ball: "h-6",
};
