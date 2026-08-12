import ParallaxScene from "@/components/parallax/ParallaxScene";
import Reveal from "@/components/ui/Reveal";
import { CourtArt } from "@/components/art/GearArt";
import {
  BoltIcon,
  RepeatIcon,
  ShieldIcon,
  TruckIcon,
} from "@/components/ui/Icons";
import { features } from "@/lib/data";

const ICONS = {
  bolt: BoltIcon,
  shield: ShieldIcon,
  truck: TruckIcon,
  repeat: RepeatIcon,
};

export default function Features() {
  return (
    <ParallaxScene
      as="section"
      className="relative isolate w-full overflow-hidden border-y border-line bg-surface py-14 lg:py-24"
    >
      <div className="mx-auto w-full max-w-350 px-5 sm:px-8">
      {/* court blueprint drifting behind the cards */}
      <div
        data-speed="-1.8"
        data-speed-x="0.7"
        className="pointer-events-none absolute -left-24 top-10 -z-10 hidden h-[120%] opacity-[0.07] lg:block"
      >
        <CourtArt className="h-full w-auto" stroke="#4e6b00" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => {
          const Icon = ICONS[feature.icon];
          return (
            <Reveal
              key={feature.title}
              delay={index * 90}
              className="group relative overflow-hidden rounded-3xl border border-line bg-paper p-7 shadow-[0_1px_2px_rgba(15,17,21,.04)] transition-all duration-500 hover:-translate-y-1 hover:border-line-strong hover:shadow-[0_20px_40px_-24px_rgba(15,17,21,.25)]"
            >
              <span className="absolute -right-8 -top-8 size-28 rounded-full bg-volt/40 blur-2xl opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

              <span className="grid size-12 place-items-center rounded-2xl bg-volt text-ink transition-transform duration-500 group-hover:-translate-y-1">
                <Icon className="size-5" />
              </span>

              <h3 className="mt-6 text-lg font-semibold tracking-tight">
                {feature.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-mist">
                {feature.copy}
              </p>

              <span className="mt-6 block font-mono text-[11px] text-line-strong">
                0{index + 1}
              </span>
            </Reveal>
          );
        })}
      </div>
      </div>
    </ParallaxScene>
  );
}
