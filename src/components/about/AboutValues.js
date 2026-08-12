import ParallaxScene from "@/components/parallax/ParallaxScene";
import Reveal from "@/components/ui/Reveal";
import { CourtArt } from "@/components/art/GearArt";
import { values } from "@/lib/data";
import { Accent } from "@/components/ui/Heading";

export default function AboutValues() {
  return (
    <ParallaxScene
      as="section"
      className="relative isolate overflow-hidden py-14 lg:py-20"
    >
      <div
        data-speed="-1.6"
        data-speed-x="0.6"
        className="pointer-events-none absolute -left-28 top-0 -z-10 hidden h-[110%] opacity-[0.08] lg:block"
      >
        <CourtArt className="h-full w-auto" stroke="#4e6b00" />
      </div>

      <div className="mx-auto grid w-full max-w-350 grid-cols-1 gap-12 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <Reveal>
          <span className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.22em] text-volt-deep">
            <span className="h-px w-8 bg-volt-deep/40" />
            How we build
          </span>
          <h2 className="mt-5 text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.04] tracking-[-0.035em]">
            Four rules we <Accent>do not break</Accent>.
          </h2>
          <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-mist">
            They are the reason some products take a year to reach the shop and
            some never do.
          </p>
        </Reveal>

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {values.map((value, index) => (
            <Reveal
              as="li"
              key={value.title}
              delay={index * 80}
              className="group rounded-3xl border border-line bg-surface p-7 shadow-[0_1px_2px_rgba(15,17,21,.04)] transition-all duration-500 hover:-translate-y-1 hover:border-line-strong hover:shadow-[0_20px_40px_-24px_rgba(15,17,21,.25)]"
            >
              <span className="grid size-10 place-items-center rounded-xl bg-volt font-mono text-sm font-semibold text-ink transition-transform duration-500 group-hover:-translate-y-1">
                0{index + 1}
              </span>
              <h3 className="mt-5 text-base font-semibold tracking-tight">
                {value.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-mist">
                {value.copy}
              </p>
            </Reveal>
          ))}
        </ul>
      </div>
    </ParallaxScene>
  );
}
