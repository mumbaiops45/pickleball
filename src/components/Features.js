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

export default function Features() {
  return (
    <section className="section bg-paper">
      <div className="shell">
        <SectionHeading
          eyebrow="Why buy from the maker"
          title={
            <>
              No middle link between <Accent>the mold and your court</Accent>.
            </>
          }
          copy="We press the balls ourselves, so the specification, the quality check and the price all answer to the same people."
        />

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = ICONS[feature.icon];
            return (
              <Reveal
                key={feature.title}
                delay={index * 60}
                className="flex flex-col rounded-2xl border border-line bg-surface p-7"
              >
                <span className="grid size-11 place-items-center rounded-xl bg-volt text-ink">
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
