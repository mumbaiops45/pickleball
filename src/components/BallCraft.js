import ParallaxScene from "@/components/parallax/ParallaxScene";
import Reveal from "@/components/ui/Reveal";
import BallArt from "@/components/art/BallArt";
import { Accent, TwoTone } from "@/components/ui/Heading";
import { ballCraft, brand } from "@/lib/data";

/**
 * The balls answer to <TechShowcase />.
 *
 * That section explains the paddle laminate and never mentions the ball, so a
 * visitor had no way to learn how the ball line is actually made. Same visual
 * grammar — drawn artwork on one side, a numbered build list on the other —
 * deliberately, so the two read as one story rather than two treatments.
 */
export default function BallCraft() {
  return (
    <ParallaxScene
      as="section"
      id="balls"
      className="relative isolate overflow-hidden border-y border-line bg-surface py-14 lg:py-24"
    >
      {/* ghost type on the same drift as the tech section above it */}
      <div
        data-speed="0.9"
        data-speed-x="-2.2"
        className="pointer-events-none absolute inset-x-0 top-[6%] -z-20 select-none"
      >
        <p className="text-stroke whitespace-nowrap text-center text-[clamp(3rem,11vw,10rem)] font-black leading-none tracking-tighter">
          ROTOMOLDED &middot; ROTOMOLDED
        </p>
      </div>

      <div className="mx-auto grid w-full max-w-350 grid-cols-1 items-start gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-20">
        {/* --------------------------------------------------------- copy */}
        <div className="lg:col-span-5">
          <Reveal>
            <span className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.22em] text-volt-deep">
              <span className="h-px w-8 bg-volt-deep/40" />
              {ballCraft.eyebrow}
            </span>
            <h2 className="mt-5 text-[clamp(2rem,4.4vw,3.4rem)] font-semibold leading-[1.04] tracking-[-0.035em]">
              <TwoTone text={ballCraft.title} accent={ballCraft.titleAccent} />
            </h2>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-mist">
              {ballCraft.body}
            </p>
          </Reveal>

          {/* the numbers a buyer checks before a claim convinces them */}
          <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-4 lg:grid-cols-2">
            {ballCraft.specs.map((spec, index) => (
              <Reveal
                key={spec.label}
                delay={index * 80}
                className="bg-paper px-5 py-6"
              >
                <dt className="text-[11px] uppercase tracking-[0.16em] text-mist">
                  {spec.label}
                </dt>
                <dd className="mt-2 font-mono text-2xl tracking-tight text-ink">
                  {spec.value}
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>

        {/* -------------------------------------------------------- stage */}
        <div className="relative flex min-h-70 items-center justify-center lg:col-span-3 lg:min-h-100">
          <div
            data-speed="-0.8"
            data-rotate="8"
            className="absolute inset-0 -z-10 grid place-items-center"
          >
            <div className="spin-slow size-72 rounded-full border border-dashed border-line" />
          </div>

          <div data-speed="1.7" data-mouse="30" className="w-[58%] max-w-64">
            <div className="float-slower">
              <BallArt
                id="craft-ball"
                color="#d4ff3f"
                className="w-full drop-shadow-[0_50px_70px_rgba(15,17,21,.16)]"
              />
            </div>
          </div>
        </div>

        {/* -------------------------------------------------- the build */}
        <ol className="flex flex-col lg:col-span-4">
          {ballCraft.points.map((point, index) => (
            <Reveal
              as="li"
              key={point.index}
              delay={index * 70}
              className="group border-t border-line py-5 first:border-t-0 first:pt-0 lg:first:border-t lg:first:pt-5"
            >
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-[11px] tracking-[0.2em] text-line-strong transition-colors duration-500 group-hover:text-volt-deep">
                  {point.index}
                </span>
                <h3 className="text-[15px] font-semibold tracking-tight">
                  {point.title}
                </h3>
              </div>
              <p className="mt-2 pl-9 text-[13px] leading-relaxed text-mist">
                {point.copy}
              </p>
            </Reveal>
          ))}

          <Reveal
            delay={320}
            className="mt-6 border-t border-line pt-6 text-[11px] font-semibold uppercase tracking-[0.2em]"
          >
            <Accent>{brand.taglines.manufacturing}</Accent>
          </Reveal>
        </ol>
      </div>
    </ParallaxScene>
  );
}
