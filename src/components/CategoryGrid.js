import Link from "next/link";
import ParallaxScene from "@/components/parallax/ParallaxScene";
import Reveal from "@/components/ui/Reveal";
import PaddleArt from "@/components/art/PaddleArt";
import BallArt from "@/components/art/BallArt";
import { BagArt, ShoeArt, TeeArt } from "@/components/art/GearArt";
import { ArrowUpRightIcon } from "@/components/ui/Icons";
import { categories } from "@/lib/data";
import { Accent } from "@/components/ui/Heading";

/** Per-kind heights so a ball is not scaled up to paddle size. */
const ART_SIZE = {
  paddle: "h-[86%]",
  ball: "h-[52%]",
  tee: "h-[70%]",
  bag: "h-[62%]",
  shoe: "h-[56%]",
};

function CategoryArt({ kind, accent, id }) {
  const className = `${ART_SIZE[kind]} w-auto`;

  switch (kind) {
    case "paddle":
      return (
        <PaddleArt id={`cat-${id}`} face={accent} texture="carbon" className={className} />
      );
    case "ball":
      return <BallArt id={`cat-${id}`} color={accent} className={className} />;
    case "tee":
      return <TeeArt color="#f5f3ed" accent={accent} className={className} />;
    case "bag":
      return <BagArt accent={accent} className={className} />;
    case "shoe":
      return <ShoeArt accent={accent} className={className} />;
    default:
      return null;
  }
}

function CategoryCard({ category, index }) {
  return (
    <Reveal
      delay={index * 80}
      // a scroll-snap card on mobile, an equal grid cell from lg up
      className="w-[74vw] max-w-80 shrink-0 snap-start sm:w-[46vw] lg:w-auto lg:max-w-none"
    >
      <Link
        href={`/shop?category=${category.filter}`}
        aria-label={`Shop ${category.name}`}
        className="group flex h-full min-h-95 flex-col overflow-hidden rounded-3xl border border-line p-5 shadow-[0_1px_2px_rgba(15,17,21,.04)] transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)] hover:-translate-y-1.5 hover:border-line-strong hover:shadow-[0_26px_50px_-26px_rgba(15,17,21,.32)]"
        style={{ backgroundColor: category.tint }}
      >
        <div className="flex items-start justify-between gap-3">
          <span className="rounded-full bg-paper/85 px-3.5 py-1.5 text-[13px] font-semibold tracking-tight text-ink shadow-[0_1px_2px_rgba(15,17,21,.06)]">
            {category.name}
          </span>
          <span className="font-mono text-[11px] tracking-[0.2em] text-ink/40">
            {category.index}
          </span>
        </div>

        {/* the art is the hero of the tile */}
        <div className="relative grid flex-1 place-items-center py-6">
          <span className="absolute inset-x-6 bottom-8 -z-0 h-8 rounded-[50%] bg-ink/10 blur-xl transition-all duration-700 group-hover:bottom-6 group-hover:opacity-70" />
          <div className="relative flex h-full w-full items-center justify-center transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:-translate-y-2 group-hover:scale-105 group-hover:rotate-3">
            <CategoryArt
              kind={category.kind}
              accent={category.accent}
              id={category.id}
            />
          </div>
        </div>

        <p className="text-[13px] leading-relaxed text-ink/65">
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
      </Link>
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
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
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

      {/* swipeable rail on small screens, five equal columns from lg */}
      <div className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:px-8 lg:mx-auto lg:grid lg:w-full lg:max-w-350 lg:grid-cols-5 lg:overflow-visible">
        {categories.map((category, index) => (
          <CategoryCard key={category.id} category={category} index={index} />
        ))}
      </div>

      <p className="mt-5 px-5 text-center text-[11px] uppercase tracking-[0.16em] text-mist sm:px-8 lg:hidden">
        Swipe for more
      </p>
    </ParallaxScene>
  );
}
