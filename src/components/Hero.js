import HeroBanner from "@/components/HeroBanner";
import { brand } from "@/lib/data";
import { ArrowUpRightIcon } from "@/components/ui/Icons";
import bannerElevate from "../../public/Banner.png";
import bannerProV from "../../public/Banner1.png";


const slides = [
  {
    id: "elevate",
    image: bannerElevate,
    alt: "JOOLA Perseus 3S paddle and a volt pickleball resting against the net on a floodlit court, under the headline Engineered to Elevate.",
    href: "/shop?category=Paddles",
    cta: "Shop paddles",
    title: "Engineered to elevate",
  },
  {
    id: "pro-v",
    image: bannerProV,
    alt: "The full JOOLA Pro V paddle line-up — Graf, Agassi, Perseus, Kosmos, Scorpeus and Hyperion — fanned out against a black background under the headline Built for Champions.",
    href: "/shop?category=Paddles",
    cta: "Shop the Pro V line",
    title: "Built for champions",
  },
];

export default function Hero() {
  return (
    <section id="top" className="relative isolate">
      <div className="grain relative bg-[radial-gradient(120%_140%_at_50%_-40%,#f4ffd6_0%,#fbfaf6_55%,#ffffff_100%)] pt-27">
        <div className="mx-auto flex max-w-350 flex-wrap items-center justify-between gap-x-6 gap-y-3 px-5 pb-6 sm:px-8">
          {/* The first line above the banner — the brand's own claim, not a
              feature. Sits here rather than inside the artwork so it stays
              readable when a slide is swapped. */}
          <p className="hidden text-[11px] font-semibold uppercase tracking-[0.18em] text-mist sm:block">
            {brand.identity} &middot; {brand.taglines.origin}
          </p>
          <a
            href="#tech"
            className="group inline-flex items-center gap-2 text-[13px] font-medium text-ink underline-offset-4 hover:underline"
          >
            Find my paddle
            <ArrowUpRightIcon className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>

      <HeroBanner slides={slides} />

     
    </section>
  );
}
