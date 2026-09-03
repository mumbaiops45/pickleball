import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { TwoTone } from "@/components/ui/Heading";
import { ballCraft, brand } from "@/lib/data";

import ballsPhoto from "../../public/hero/balls-trio.jpg";

/**
 * How the ball line is made.
 *
 * Rebuilt from three columns to two. The middle column used to be a "stage":
 * a dashed ring spinning on a 26s loop behind a drawn SVG ball bobbing on a
 * float animation, both riding a parallax offset and a mouse tracker. It cost
 * four moving layers to say nothing the copy either side of it was not already
 * saying, and it pushed the actual evidence — the specs and the build steps —
 * into two narrow gutters.
 *
 * The client's own product photography sits there now instead, which is both
 * still and true.
 */
export default function BallCraft() {
  return (
    <section id="balls" className="section bg-surface-2">
      <div className="shell">
        {/* Heading left, body right, on one row. Run down the page instead,
            a max-w-2xl heading with a max-w-xl paragraph under it left the
            right half of a 1400px section empty for 300px of scroll. */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end lg:gap-16">
          <Reveal className="lg:col-span-6">
            <span className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-volt-deep">
              <span aria-hidden="true" className="h-px w-7 bg-volt-deep/40" />
              {ballCraft.eyebrow}
            </span>
            <h2 className="text-[clamp(1.9rem,3.8vw,3rem)] font-semibold leading-[1.06] tracking-[-0.035em]">
              <TwoTone text={ballCraft.title} accent={ballCraft.titleAccent} />
            </h2>
          </Reveal>

          <Reveal delay={80} className="lg:col-span-5 lg:col-start-8">
            <p className="text-[15px] leading-relaxed text-mist">
              {ballCraft.body}
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-16">
          {/* ------------------------------------------------- the artwork */}
          <Reveal className="lg:col-span-5">
            <div className="overflow-hidden rounded-2xl border border-line bg-paper p-6 sm:p-10">
              <Image
                src={ballsPhoto}
                alt={`${brand.name} rotomolded pickleballs`}
                placeholder="blur"
                sizes="(max-width: 1024px) 90vw, 40vw"
                className="h-auto w-full object-contain"
              />
            </div>

            {/* the numbers a buyer checks before a claim convinces them */}
            <dl className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4 lg:grid-cols-2">
              {ballCraft.specs.map((spec) => (
                <div key={spec.label} className="bg-paper px-5 py-5">
                  <dt className="text-[11px] uppercase tracking-[0.14em] text-mist">
                    {spec.label}
                  </dt>
                  <dd className="mt-1.5 text-2xl font-semibold tracking-tight text-ink">
                    {spec.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          {/* ----------------------------------------------- the build list */}
          <div className="lg:col-span-6 lg:col-start-7">
            <ol className="flex flex-col border-t border-line">
              {ballCraft.points.map((point, index) => (
                <Reveal
                  as="li"
                  key={point.index}
                  delay={index * 60}
                  className="flex gap-6 border-b border-line py-6"
                >
                  <span className="pt-0.5 text-[11px] font-semibold tracking-[0.18em] text-volt-deep">
                    {point.index}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-base font-semibold tracking-tight">
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
