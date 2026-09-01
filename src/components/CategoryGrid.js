import Link from "next/link";
import Image from "next/image";
import ParallaxScene from "@/components/parallax/ParallaxScene";
import Reveal from "@/components/ui/Reveal";
import CardRail from "@/components/ui/CardRail";
import { ArrowUpRightIcon } from "@/components/ui/Icons";
import { categories } from "@/lib/data";
import { Accent } from "@/components/ui/Heading";



function CategoryArt({ kind }) {
  const imageProps = {
    alt: `${kind} product`,
    fill: true,
    // the art box is the card minus its p-4 gutters, so the candidate widths
    // track CategoryCard's own w-[62vw] / sm:w-[38vw] / lg:w-60 steps
    sizes: "(min-width: 1024px) 208px, (min-width: 640px) 38vw, 62vw",
    className: "object-contain",
  };

  switch (kind) {
    case "paddle":
      return (
        <Image
          src="/photos/paddle-product.png"
          {...imageProps}
          alt="Pickleball paddle"
        />
      );
    case "ball":
      return (
        <Image
          src="/photos/pickleball-balls.png"
          {...imageProps}
          alt="Pickleball balls"
        />
      );
    case "tee":
      return (
        <Image
          src="/photos/court-apparel.png"
          {...imageProps}
          alt="Court apparel and tees"
        />
      );
    case "bag":
      return (
        <Image
          src="/photos/bags.jpg"
          {...imageProps}
          alt="Pickleball gear and bag"
        />
      );
    case "shoe":
      return (
        <Image
          src="/photos/shoes.jpg"
          {...imageProps}
          alt="Court shoes from Asics, Babolat and Mizuno"
        />
      );
    default:
      return null;
  }
}

// The client asked for a restrained showcase: the tiles are sized to read as a
// quiet index of the catalogue, and nothing here moves — no reveal, no
// parallax drift, no flip, no hover transform. Hover only firms the border.
function CategoryCard({ category }) {
  return (
    <Link
      href={`/shop?category=${category.filter}`}
      aria-label={`Shop ${category.name}`}
      className="group flex w-[62vw] max-w-64 shrink-0 snap-start flex-col border border-line p-4 shadow-[0_1px_2px_rgba(15,17,21,.04)] hover:border-line-strong sm:w-[38vw] lg:w-60"
      style={{ backgroundColor: category.tint }}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="rounded-full bg-paper/85 px-3 py-1 text-xs font-semibold tracking-tight text-ink shadow-[0_1px_2px_rgba(15,17,21,.06)]">
          {category.name}
        </span>
        <span className="font-mono text-[10px] tracking-[0.2em] text-ink/40">
          {category.index}
        </span>
      </div>

      {/* The art gets a fixed box rather than whatever height the copy leaves
          over — every category then reads at the same size, however tall or
          wide the shot behind it happens to be. */}
      <div className="relative mt-3 h-32 sm:h-36">
        <CategoryArt kind={category.kind} />
      </div>

      {/* mt-auto pins the copy and its footer to the bottom, so the art box
          keeps its height on the shortest blurb */}
      <p className="mt-auto pt-4 text-xs leading-relaxed text-ink/65">
        {category.blurb}
      </p>

      <div className="mt-3 flex items-center justify-between border-t border-ink/10 pt-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink/70">
          {category.count} products
        </span>
        <span className="grid size-7 place-items-center rounded-full bg-forest text-paper">
          <ArrowUpRightIcon className="size-3.5" />
        </span>
      </div>
    </Link>
  );
}

export default function CategoryGrid() {
  return (
    <ParallaxScene
      as="section"
      id="gear"
      className="relative overflow-hidden py-14 lg:py-24"
    >
      <div
        data-speed="-1.2"
        data-speed-x="0.6"
        className="pointer-events-none absolute left-[6%] top-0 -z-10 size-105 rounded-full bg-volt/35 blur-[120px]"
      />

      <div className="mx-auto w-full max-w-350 px-5 sm:px-8">
        <div
          data-speed="0.45"
          className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <Reveal className="max-w-2xl">
            <h2 className="text-[clamp(2.1rem,4.6vw,3.6rem)] font-semibold leading-[1.02] tracking-[-0.035em]">
              Everything between the <Accent>baseline</Accent> and the{" "}
              <Accent>kitchen</Accent>.
            </h2>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-mist">
              Five categories, one obsession — gear that holds up to four
              sessions a week without going soft.
            </p>
          </Reveal>

          <Reveal delay={120} className="shrink-0">
            <Link
              href="/shop"
              className="inline-flex h-12 items-center gap-2.5 rounded-full border border-line-strong px-6 text-sm font-medium text-ink transition-colors hover:border-volt-deep hover:text-volt-deep"
            >
              Browse all gear
              <ArrowUpRightIcon className="size-4" />
            </Link>
          </Reveal>
        </div>
      </div>

      {/* the five tiles fit once the viewport clears 1360px, so CardRail retires
          its arrows there on its own and the rail stays a swipe affordance
          below that. Centring any earlier would strand the first tile in
          unreachable left overflow. */}
      <CardRail
        label="Shop by category"
        className="no-scrollbar mt-10 flex snap-x snap-mandatory items-stretch gap-4 overflow-x-auto px-5 pb-2 sm:px-8 lg:mx-auto lg:w-full lg:max-w-350 min-[1360px]:justify-center"
      >
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </CardRail>

      <p className="mt-5 px-5 text-center text-[11px] uppercase tracking-[0.16em] text-mist sm:px-8 sm:hidden">
        Swipe for more
      </p>
    </ParallaxScene>
  );
}
