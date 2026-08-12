import PaddleArt from "@/components/art/PaddleArt";
import BallArt from "@/components/art/BallArt";
import {
  BagArt,
  CapArt,
  GripArt,
  ShoeArt,
  ShortsArt,
  TeeArt,
} from "@/components/art/GearArt";

/**
 * Renders whichever silhouette a product uses. `color` overrides the catalogue
 * colour, which is how selecting a colourway on the product page repaints the
 * art without needing a second asset.
 */
export default function ProductArt({ product, color, id, className = "" }) {
  const { art } = product;
  const tint = color ?? art.color ?? art.face;
  const key = id ?? product.id;

  switch (art.kind) {
    case "paddle":
      return (
        <PaddleArt
          id={`art-${key}`}
          face={tint}
          texture={art.texture}
          className={className}
        />
      );
    case "ball":
      return <BallArt id={`art-${key}`} color={tint} className={className} />;
    case "tee":
      return <TeeArt color={tint} accent={art.accent} className={className} />;
    case "shorts":
      return <ShortsArt color={tint} accent={art.accent} className={className} />;
    case "cap":
      return <CapArt color={tint} className={className} />;
    case "grip":
      return <GripArt color={tint} accent={art.accent} className={className} />;
    case "bag":
      return <BagArt color={tint} accent={art.accent} className={className} />;
    case "shoe":
      return <ShoeArt color={tint} className={className} />;
    default:
      return null;
  }
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
