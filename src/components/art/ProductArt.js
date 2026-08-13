import Image from "next/image";

/**
 * Fallback shots, used only when an entry has no photography of its own — a
 * generic image of the right kind beats an empty tile.
 */
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

/** Resolves the single shot that represents a product across the site. */
export function productPhoto(product) {
  return product.image ?? KIND_PHOTOS[product.art?.kind] ?? null;
}

/**
 * Renders real catalogue photography. Its dimensions deliberately remain
 * controlled by the parent, so existing hover and page animations are intact.
 */
export default function ProductArt({ product, className = "" }) {
  const src = productPhoto(product);

  if (!src) return null;

  return (
    <Image
      src={src}
      alt={product.name}
      width={800}
      height={1000}
      sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 20vw"
      className={`${className} object-contain`}
    />
  );
}

/**
 * Per-kind sizing so a ball does not render as tall as a paddle. ART_HEIGHT is
 * a percentage of a definite-height stage (cards, the product gallery);
 * ART_THUMB and ART_MINI are fixed heights for the small boxes where a
 * percentage has no height to resolve against.
 */
export const ART_HEIGHT = {
  paddle: "h-full",
  ball: "h-[62%]",
  tee: "h-[86%]",
  shorts: "h-[84%]",
  cap: "h-[72%]",
  grip: "h-[80%]",
  bag: "h-[80%]",
  shoe: "h-[76%]",
};

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
