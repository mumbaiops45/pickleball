import ParallaxScene from "@/components/parallax/ParallaxScene";
import Reveal from "@/components/ui/Reveal";
import { team } from "@/lib/data";
import { Accent } from "@/components/ui/Heading";

const AVATAR_TINTS = ["#eefcc4", "#ffe6d5", "#e2eeff", "#dcf2e4"];

function initialsOf(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("");
}

export default function AboutTeam() {
  return (
    <ParallaxScene
      as="section"
      id="team"
      className="relative isolate w-full overflow-hidden border-y border-line bg-surface py-14 lg:py-20"
    >
      <div className="mx-auto w-full max-w-350 px-5 sm:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal className="max-w-xl">
            <span className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.22em] text-volt-deep">
              <span className="h-px w-8 bg-volt-deep/40" />
              The team
            </span>
            <h2 className="mt-5 text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.04] tracking-[-0.035em]">
              Nine people. <Accent>All of them play</Accent>.
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="max-w-xs text-sm leading-relaxed text-mist">
              Nobody here designs a paddle they would not put in their own bag
              on Saturday morning.
            </p>
          </Reveal>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member, index) => (
            <Reveal
              as="li"
              key={member.name}
              delay={index * 80}
              className="group rounded-3xl border border-line bg-paper p-7 shadow-[0_1px_2px_rgba(15,17,21,.04)] transition-all duration-500 hover:-translate-y-1 hover:border-line-strong hover:shadow-[0_20px_40px_-24px_rgba(15,17,21,.25)]"
            >
              <span
                className="grid size-16 place-items-center rounded-2xl text-lg font-semibold text-ink transition-transform duration-500 group-hover:-rotate-6"
                style={{ backgroundColor: AVATAR_TINTS[index % AVATAR_TINTS.length] }}
              >
                {initialsOf(member.name)}
              </span>
              <h3 className="mt-5 text-base font-semibold tracking-tight">
                {member.name}
              </h3>
              <p className="mt-1 text-sm text-volt-deep">{member.role}</p>
              <p className="mt-3 border-t border-line pt-3 text-[13px] leading-relaxed text-mist">
                {member.note}
              </p>
            </Reveal>
          ))}
        </ul>
      </div>
    </ParallaxScene>
  );
}
