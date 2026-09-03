import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  BoltIcon,
  PackageIcon,
  SchoolIcon,
  ShieldIcon,
} from "@/components/ui/Icons";
import { Accent } from "@/components/ui/Heading";
import { features } from "@/lib/data";

const ICONS = {
  bolt: BoltIcon,
  shield: ShieldIcon,
  school: SchoolIcon,
  package: PackageIcon,
};

/** One brand colour per card — yellow, cyan, orange, green off the logo. */
const ACCENTS = [
  { tile: "bg-volt text-ink", bar: "bg-volt" },
  { tile: "bg-sky text-paper", bar: "bg-sky" },
  { tile: "bg-clay text-paper", bar: "bg-clay" },
  { tile: "bg-volt-deep text-paper", bar: "bg-volt-deep" },
];

export default function Features() {
  return (
    <section className="section bg-surface">
      <div className="shell">
        <SectionHeading
          align="center"
          eyebrow="Why buy from the maker"
          title={
            <>
              No middle link between <Accent>the mold and your court</Accent>.
            </>
          }
          copy="We press the balls ourselves, so the specification, the quality check and the price all answer to the same people."
        />

        <div className="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = ICONS[feature.icon];
            const accent = ACCENTS[index % ACCENTS.length];
            return (
              <Reveal
                key={feature.title}
                delay={index * 60}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-paper p-7 transition-all duration-300 hover:-translate-y-1 hover:border-volt-deep hover:shadow-[0_22px_45px_-28px_rgba(30,61,20,.6)]"
              >
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 top-0 h-1 ${accent.bar}`}
                />

                <span
                  className={`grid size-11 place-items-center rounded-xl transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105 ${accent.tile}`}
                >
                  <Icon className="size-5" />
                </span>

                <h3 className="mt-6 text-base font-semibold leading-snug tracking-tight">
                  {feature.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-mist">
                  {feature.copy}
                </p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
