import Link from "next/link";
import Image from "next/image";
import { ArrowIcon, ShieldIcon } from "@/components/ui/Icons";
import { brand } from "@/lib/data";

import courtPhoto from "../../public/hero/hero-court.jpg";

/**
 * The homepage hero.
 *
 * It used to be a two-slide `<HeroBanner>` carrying no text at all — the
 * artwork was expected to carry its own headline, so the site opened on a
 * stock court photograph with no h1, no proposition and nothing to click.
 * Slide two was worse: `images8.png` is a three-up contact sheet of AI
 * renders, white gutters and all, being served whole as a banner.
 *
 * So the carousel is gone. A single photograph, a real h1, one primary action
 * and the four facts a buyer actually checks. A rotating hero is a liability
 * on a catalogue this size anyway: with one product line there is no second
 * message to rotate to, and the auto-advance only moved the proposition out
 * from under the reader.
 */

/** The claims that answer "is this the real thing?" before anything is read. */
const PROOF = [
  { label: "AIPA approved", note: "Tournament sanctioned" },
  { label: "40-hole rotomold", note: "One piece, no seam" },
  { label: "Free shipping", note: "On orders over ₹2,499" },
  { label: "30-day play test", note: "Return it if it is not right" },
];

export default function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden bg-forest-deep">
      <Image
        src={courtPhoto}
        alt=""
        aria-hidden="true"
        priority
        placeholder="blur"
        sizes="100vw"
        className="absolute inset-0 -z-20 size-full object-cover object-[68%_center]"
      />

      {/* Two scrims rather than one, and both released early. The horizontal
          pass darkens the left third the copy sits in and is fully clear by
          55% — the scrim is deep green, so carrying it across the frame turns
          the blue court and the sky green and the photograph stops being a
          photograph. The vertical pass is only a short fade at each edge: one
          to seat the navbar pill, one to close into the section below. */}
      <div className="absolute inset-0 -z-10 bg-linear-to-r from-forest-deep/92 from-5% via-forest-deep/45 via-40% to-transparent to-62% sm:via-forest-deep/35" />
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-forest-deep/45 from-0% via-transparent via-25% to-transparent" />
      {/* Below sm the copy runs the full width of the screen and the ball
          fills the frame behind it, so the horizontal scrim above — which
          clears by 62% — leaves the right-hand proof column sitting on lit
          yellow. A flat pass covers the whole frame on a phone and is dropped
          the moment the copy is back in its own column. */}
      <div className="absolute inset-0 -z-10 bg-forest-deep/45 sm:hidden" />

      <div className="shell flex min-h-136 flex-col justify-center pt-32 pb-14 sm:min-h-[38rem] lg:min-h-168 lg:pt-36 lg:pb-18">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-volt/35 bg-forest-deep/60 py-1.5 pl-2.5 pr-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-volt backdrop-blur-sm">
            <ShieldIcon className="size-4" />
            {brand.tagline}
          </span>

          <h1 className="mt-6 text-[clamp(2.15rem,4.6vw,3.5rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-paper">
            Tournament pickleballs,
            <br className="hidden sm:block" />{" "}
            <span className="text-volt">molded in one piece.</span>
          </h1>

          <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-paper/75 sm:text-base">
            40-hole rotomolded balls pressed from imported resin — no seam to
            split, no wobble in a crosswind, and a tube that plays the same from
            the first ball to the last. Designed in India, played in{" "}
            {brand.exportMarkets.join(", ")}.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/shop?category=Balls"
              className="group inline-flex h-14 items-center justify-center gap-2.5 rounded-full bg-volt px-8 text-sm font-semibold tracking-tight text-ink transition-colors duration-300 hover:bg-paper"
            >
              Shop pickleballs
              <ArrowIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-14 items-center justify-center gap-2.5 rounded-full border border-paper/40 px-8 text-sm font-medium text-paper transition-colors duration-300 hover:border-paper hover:bg-paper/10"
            >
              Bulk and club orders
            </Link>
          </div>
        </div>

        {/* The proof row is inside the hero rather than in a band under it, so
            the first screen carries the claim and its evidence together. */}
        {/* max-w-3xl, not 4xl: the fourth column ran under the ball, and
            white 12px type on a lit yellow sphere is not readable at any
            weight. The row now stops short of the subject. */}
        <ul className="mt-14 grid max-w-3xl grid-cols-2 gap-x-6 gap-y-7 border-t border-paper/15 pt-8 lg:grid-cols-4">
          {PROOF.map((item) => (
            <li key={item.label}>
              <p className="text-sm font-semibold tracking-tight text-paper">
                {item.label}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-paper/65">
                {item.note}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
