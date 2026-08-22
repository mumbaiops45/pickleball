import ParallaxScene from "@/components/parallax/ParallaxScene";
import Reveal from "@/components/ui/Reveal";
import { brand, milestones } from "@/lib/data";
import { Accent } from "@/components/ui/Heading";

export default function AboutTimeline() {
  return (
    <ParallaxScene
      as="section"
      className="relative isolate w-full overflow-hidden border-y border-line bg-surface py-14 lg:py-20"
    >
      <div
        data-speed="-1"
        data-speed-x="0.8"
        className="pointer-events-none absolute -right-24 top-0 -z-10 size-96 rounded-full bg-volt/35 blur-[130px]"
      />

      <div className="mx-auto w-full max-w-350 px-5 sm:px-8">
        <Reveal>
          <h2 className="max-w-2xl text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.04] tracking-[-0.035em]">
            Four years, four courts, <Accent>sixteen products</Accent>.
          </h2>
        </Reveal>

        <ol className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {milestones.map((milestone, index) => (
            <Reveal
              as="li"
              key={milestone.year}
              delay={index * 90}
              className="group relative bg-paper p-7 transition-colors duration-500 hover:bg-surface"
            >
              <span className="font-mono text-3xl font-semibold text-volt-deep">
                {milestone.year}
              </span>
              <span className="mt-5 block h-px w-full bg-line">
                <span className="block h-px w-0 bg-volt-deep transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:w-full" />
              </span>
              <h3 className="mt-5 text-base font-semibold tracking-tight">
                {milestone.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-mist">
                {milestone.copy}
              </p>
            </Reveal>
          ))}
        </ol>

        {/* Closes the timeline: the four dates run out at Season 04, and this
            is the line that says where they are heading. */}
        <Reveal delay={400} className="mt-10 flex items-center gap-5">
          <span className="h-px flex-1 bg-line" />
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-volt-deep">
            {brand.taglines.reach}
          </p>
          <span className="h-px flex-1 bg-line" />
        </Reveal>
      </div>
    </ParallaxScene>
  );
}
