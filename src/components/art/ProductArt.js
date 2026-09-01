import Image from "next/image";


const KIND_PHOTOS = {
  paddle: "/photos/paddle-product.png",
  ball: "/photos/pickleball-balls.png",
  tee: "/photos/court-apparel.png",
  shorts: "/photos/court-apparel.png",
  cap: "/photos/court-apparel.png",
  grip: "/photos/paddle-product.png",
  bag: "/photos/bags.jpg",
  shoe: "/photos/shoes.jpg",
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
  "/photos/paddle-product.png": [1122, 1402],
  "/photos/pickleball-balls.png": [1122, 1402],
  "/photos/court-apparel.png": [1122, 1402],
  "/photos/bags.jpg": [1580, 1975],
  "/photos/shoes.jpg": [1000, 1000],
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
 * Per-kind sizing so a ball does not render as tall as a paddle. Both are fixed
 * heights: a percentage needs a definite parent to resolve against, so boxes
 * that own their size use `fill` above instead.
 */
export const ART_THUMB = {
  paddle: "h-14",
  ball: "h-9",
  tee: "h-12",
  shorts: "h-12",
  cap: "h-10",
  grip: "h-11",
  bag: "h-11",
  shoe: "h-10",
};

export const ART_MINI = {
  paddle: "h-9",
  ball: "h-6",
  tee: "h-8",
  shorts: "h-8",
  cap: "h-7",
  grip: "h-7",
  bag: "h-7",
  shoe: "h-6",
};
