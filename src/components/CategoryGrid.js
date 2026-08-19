import Link from "next/link";
import Image from "next/image";
import ParallaxScene from "@/components/parallax/ParallaxScene";
import Reveal from "@/components/ui/Reveal";
import CardRail from "@/components/ui/CardRail";
import { ArrowUpRightIcon } from "@/components/ui/Icons";
import { categories } from "@/lib/data";
import { Accent } from "@/components/ui/Heading";



function CategoryArt({ kind, accent, id }) {
  const imageProps = {
    alt: `${kind} product`,
    fill: true,
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

// per-card drift so the row breathes as the section travels the viewport
// instead of moving as one rigid block. Read by useParallax via data-speed.
const CARD_DRIFT = [0.9, 0.4, 1.1, 0.5, 0.8];

function CategoryCard({ category, index }) {
  return (
    <Reveal
      delay={index * 80}
      // a scroll-snap card at every width: five of these are wider than the
      // container, which is what keeps the rail's arrows live on desktop
      className="w-[78vw] max-w-84 shrink-0 snap-start sm:w-[46vw] lg:w-80"
    >
      {/* the parallax layer sits inside Reveal — useParallax writes inline
          transforms, which would otherwise clobber the reveal transition */}
      <div data-speed={CARD_DRIFT[index % CARD_DRIFT.length]} className="h-full">
        <Link
          href={`/shop?category=${category.filter}`}
          aria-label={`Shop ${category.name}`}
          className="group block h-full [perspective:1200px]"
          style={{ backgroundColor: category.tint }}
        >
          <div className="relative h-full min-h-116 [transform-style:preserve-3d] transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:[transform:rotateY(180deg)] group-focus-visible:[transform:rotateY(180deg)] motion-reduce:transition-none motion-reduce:group-hover:transform-none motion-reduce:group-focus-visible:transform-none">
            <div className="absolute inset-0 flex flex-col overflow-hidden border border-line p-5 shadow-[0_1px_2px_rgba(15,17,21,.04)] transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:border-line-strong group-hover:shadow-[0_26px_50px_-26px_rgba(15,17,21,.32)] [-webkit-backface-visibility:hidden] [backface-visibility:hidden]">
              <div className="flex items-start justify-between gap-3">
                <span className="rounded-full bg-paper/85 px-3.5 py-1.5 text-[13px] font-semibold tracking-tight text-ink shadow-[0_1px_2px_rgba(15,17,21,.06)]">
                  {category.name}
                </span>
                <span className="font-mono text-[11px] tracking-[0.2em] text-ink/40">
                  {category.index}
                </span>
              </div>

              {/* The art is the hero of the tile, so it gets a fixed box
                  rather than whatever height the copy leaves over — every
                  category then reads at the same size, however tall or wide
                  the shot behind it happens to be. */}
              <div className="relative mt-4 grid h-56 place-items-center sm:h-64">
                <span className="absolute inset-x-6 bottom-8 -z-0 h-8 rounded-[50%] bg-ink/10 blur-xl transition-all duration-700 group-hover:bottom-6 group-hover:opacity-70" />
                <div className="relative flex h-full w-full items-center justify-center transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:-translate-y-2 group-hover:scale-105 group-hover:rotate-3">
                  {/* the art drifts a touch further than its tile, so the product
                      reads as floating in front of the card as you scroll past */}
                  <div
                    data-speed="0.35"
                    data-zoom="0.05"
                    className="relative size-full"
                  >
                    <CategoryArt
                      kind={category.kind}
                      accent={category.accent}
                      id={category.id}
                    />
                  </div>
                </div>
              </div>

              {/* mt-auto pins the copy and its footer to the bottom, so the
                  art box keeps its height on the shortest blurb */}
              <p className="mt-auto pt-5 text-[13px] leading-relaxed text-ink/65">
                {category.blurb}
              </p>

              <div className="mt-4 flex items-center justify-between border-t border-ink/10 pt-4">
                <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-ink/70">
                  {category.count} products
                </span>
                <span className="grid size-8 place-items-center rounded-full bg-ink text-paper transition-transform duration-400 group-hover:rotate-45">
                  <ArrowUpRightIcon className="size-4" />
                </span>
              </div>
            </div>

            <div className="absolute inset-0 flex flex-col justify-between overflow-hidden border border-ink/15 bg-ink p-6 text-paper shadow-[0_26px_50px_-26px_rgba(15,17,21,.38)] [-webkit-backface-visibility:hidden] [backface-visibility:hidden] [transform:rotateY(180deg)]">
              <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-volt">
                Explore category
              </span>
              <div>
                <h3 className="text-3xl font-semibold tracking-[-0.04em]">
                  {category.name}
                </h3>
                <p className="mt-3 max-w-52 text-sm leading-relaxed text-paper/70">
                  {category.blurb}
                </p>
              </div>
              <div className="flex items-center justify-between border-t border-paper/20 pt-4">
                <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-paper/75">
                  Shop {category.count} products
                </span>
                <span className="grid size-9 place-items-center rounded-full bg-volt text-ink">
                  <ArrowUpRightIcon className="size-4" />
                </span>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </Reveal>
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

      {/* a slider at every width — swipe on touch, arrows from sm up */}
      <CardRail
        label="Shop by category"
        className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:px-8 lg:mx-auto lg:w-full lg:max-w-350"
      >
        {categories.map((category, index) => (
          <CategoryCard key={category.id} category={category} index={index} />
        ))}
      </CardRail>

      <p className="mt-5 px-5 text-center text-[11px] uppercase tracking-[0.16em] text-mist sm:px-8 sm:hidden">
        Swipe for more
      </p>
    </ParallaxScene>
  );
}
