import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import Typewriter from "@/components/ui/Typewriter";
import { ArrowIcon, ChevronDownIcon, ShieldIcon } from "@/components/ui/Icons";
import { brand } from "@/lib/data";

import courtPhoto from "../../public/hero/hero-court.jpg";

/**
 * The homepage hero.
 *
 * A single photograph, a real h1, one primary action and the four facts a
 * buyer actually checks — staged rather than flat. The court photo sits on a
 * ScrollSmoother parallax layer (`data-speed`), the copy arrives on a reveal,
 * and the headline's closing phrase is typed and re-typed.
 *
 * The dark ground is forest-deep, not black, and the scrims are kept light so
 * the bright court photo carries the frame.
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
    <section
      id="top"
      className="relative isolate flex min-h-152 flex-col justify-center overflow-hidden bg-forest-deep pb-16 pt-32 sm:min-h-160 lg:min-h-[86svh] lg:pb-20 lg:pt-40"
    >
      {/* the photograph, drifting slower than the scroll. `clamp()` keeps it at
          its native position while the hero is above the fold. Over-scaled so
          the parallax offset never pulls an edge into frame. */}
      <div
        data-sm-speed="clamp(0.82)"
        className="absolute inset-0 -z-20 overflow-hidden"
      >
        <Image
          src={courtPhoto}
          alt=""
          aria-hidden="true"
          priority
          placeholder="blur"
          sizes="100vw"
          className="size-full scale-125 object-cover object-[68%_center]"
        />
      </div>

      {/* Two scrims, kept light — the court photo is bright and should carry the
          frame. The horizontal pass only covers the left third the white
          headline sits on and is clear by ~64%; the vertical pass just seats
          the navbar pill and closes softly into the section below. */}
      <div className="absolute inset-0 -z-10 bg-linear-to-r from-forest-deep/88 from-0% via-forest-deep/38 via-38% to-transparent to-64% sm:via-forest-deep/28" />
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-forest-deep/35 via-transparent via-24% to-forest-deep/45" />
      <div className="absolute inset-0 -z-10 bg-forest-deep/30 sm:hidden" />

      <div className="shell grid items-center gap-12 lg:grid-cols-12">
        <div className="min-w-0 lg:col-span-7 xl:col-span-6">
          <Reveal>
            <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-volt/35 bg-forest-deep/50 py-1.5 pl-2.5 pr-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-volt backdrop-blur-sm">
              <ShieldIcon className="size-4 shrink-0" />
              {brand.tagline}
            </span>
          </Reveal>

          <Reveal delay={60}>
            <h1 className="mt-7 text-[clamp(2.6rem,6.4vw,4.75rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-paper">
              Tournament pickleballs,
              <br className="hidden sm:block" />{" "}
              <Typewriter
                className="text-volt"
                words={[
                  "molded in one piece.",
                  "built for a crosswind.",
                  "weight-matched by hand.",
                  "sanctioned for tournaments.",
                ]}
              />
            </h1>
          </Reveal>

          <Reveal delay={120}>
            <p className="mt-7 max-w-xl text-[15px] leading-relaxed text-paper/75 sm:text-base">
              40-hole rotomolded balls pressed from imported resin — no seam to
              split, no wobble in a crosswind, and a tube that plays the same
              from the first ball to the last. Designed in India, played in{" "}
              {brand.exportMarkets.join(", ")}.
            </p>
          </Reveal>

          <Reveal delay={180}>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/shop?category=Balls"
                className="group inline-flex h-14 items-center justify-center gap-2.5 rounded-full bg-volt px-8 text-sm font-semibold tracking-tight text-ink transition-colors duration-300 hover:bg-paper"
              >
                Shop pickleballs
                <ArrowIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-14 items-center justify-center gap-2.5 rounded-full border border-paper/40 px-8 text-sm font-medium text-paper backdrop-blur-sm transition-colors duration-300 hover:border-paper hover:bg-paper/10"
              >
                Bulk and club orders
              </Link>
            </div>
          </Reveal>

          <Reveal delay={240}>
            <ul className="mt-14 grid max-w-2xl grid-cols-2 gap-x-6 gap-y-7 border-t border-paper/15 pt-8 lg:grid-cols-4">
              {PROOF.map((item) => (
                <li key={item.label}>
                  <p className="text-sm font-semibold tracking-tight text-paper">
                    {item.label}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-paper/60">
                    {item.note}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* A glass card floating over the artwork, lagging the scroll a touch.
            Hidden where the copy already runs the full width. */}
        <div className="hidden lg:col-span-5 lg:block xl:col-span-6">
          <div
            data-sm-lag="0.12"
            className="ml-auto w-fit rounded-3xl border border-paper/15 bg-forest-deep/40 p-7 backdrop-blur-md"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-volt">
              Lab-tested spec
            </p>
            <dl className="mt-5 grid grid-cols-2 gap-x-10 gap-y-6">
              {[
                ["40", "hole outdoor pattern"],
                ["74mm", "regulation diameter"],
                ["26.5g", "tournament weight"],
                ["3yr", "AIPA authorisation"],
              ].map(([value, label]) => (
                <div key={label}>
                  <dd className="text-3xl font-semibold tracking-tight text-paper">
                    {value}
                  </dd>
                  <dt className="mt-1 text-[11px] uppercase tracking-[0.14em] text-paper/55">
                    {label}
                  </dt>
                </div>
              ))}
            </dl>
            <Link
              href="/certification"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-volt transition-colors hover:text-paper"
            >
              Read the test report
              <ArrowIcon className="size-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* scroll cue */}
      <div className="pointer-events-none absolute inset-x-0 bottom-6 hidden justify-center lg:flex">
        <span className="scroll-hint grid size-9 place-items-center rounded-full border border-paper/25 text-paper/70">
          <ChevronDownIcon className="size-4" />
        </span>
      </div>
    </section>
  );
}
