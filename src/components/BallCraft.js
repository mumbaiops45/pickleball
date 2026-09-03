import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { TwoTone } from "@/components/ui/Heading";
import { ballCraft, brand } from "@/lib/data";

import ballsPhoto from "../../public/hero/balls-trio.jpg";

/**
 * How the ball line is made.
 *
 * Editorial rather than flat: the client's own product photography drifting on
 * a ScrollSmoother parallax layer, the specs as oversized figures, an outlined
 * ghost word behind the heading, the build steps as a big numbered list.
 *
 * Light ground (the logo's green, tinted right down) — not a dark slab.
 */
export default function BallCraft() {
  return (
    <section
      id="balls"
      className="section relative isolate overflow-hidden bg-surface-2"
    >
      {/* oversized outlined word, held back as texture */}
      {/* <span
        aria-hidden="true"
        className="ghost pointer-events-none absolute -right-4 top-4 z-0 hidden text-[13rem] font-semibold text-volt-deep/15 lg:block"
      >
        ONE PIECE
      </span> */}

      <div className="shell relative">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end lg:gap-16">
          <Reveal variant="left" className="lg:col-span-7">
            <span className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-volt-deep">
              <span aria-hidden="true" className="h-px w-7 bg-volt-deep/40" />
              {ballCraft.eyebrow}
            </span>
            <h2 className="text-[clamp(2rem,4.4vw,3.4rem)] font-semibold leading-[1.03] tracking-[-0.04em] text-ink">
              <TwoTone text={ballCraft.title} accent={ballCraft.titleAccent} />
            </h2>
          </Reveal>

          <Reveal variant="right" delay={80} className="lg:col-span-5">
            <p className="text-[15px] leading-relaxed text-mist">
              {ballCraft.body}
            </p>
          </Reveal>
        </div>

        <div className="mt-9 grid grid-cols-1 gap-10 lg:mt-12 lg:grid-cols-12 lg:gap-16">
          {/* ------------------------------------------------- the artwork */}
          <div className="lg:col-span-5">
            <div data-sm-speed="1.06" data-cursor="zoom">
              <Reveal variant="left">
                <div className="overflow-hidden rounded-3xl border border-line bg-paper p-6 shadow-[0_30px_60px_-45px_rgba(30,61,20,.55)] sm:p-10">
                  <Image
                    src={ballsPhoto}
                    alt={`${brand.name} rotomolded pickleballs`}
                    placeholder="blur"
                    sizes="(max-width: 1024px) 90vw, 40vw"
                    className="h-auto w-full object-contain"
                  />
                </div>
              </Reveal>
            </div>

            {/* the numbers a buyer checks before a claim convinces them */}
            <Reveal delay={80}>
              <dl className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-4 lg:grid-cols-2">
                {ballCraft.specs.map((spec) => (
                  <div key={spec.label} className="bg-paper px-5 py-5">
                    <dt className="text-[11px] uppercase tracking-[0.14em] text-mist">
                      {spec.label}
                    </dt>
                    <dd className="mt-1.5 text-[1.75rem] font-semibold tracking-tight text-ink">
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* ----------------------------------------------- the build list */}
          <div className="lg:col-span-6 lg:col-start-7">
            <ol className="flex flex-col border-t border-line">
              {ballCraft.points.map((point, index) => (
                <Reveal
                  as="li"
                  key={point.index}
                  delay={index * 60}
                  className="group flex gap-6 border-b border-line py-6 transition-colors duration-300 hover:bg-paper/60"
                >
                  <span className="shrink-0 text-2xl font-semibold tracking-tight text-volt-deep">
                    {point.index}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-base font-semibold tracking-tight text-ink">
                      {point.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-mist">
                      {point.copy}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ol>

            <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.2em] text-volt-deep">
              {brand.taglines.manufacturing}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
