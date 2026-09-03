import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import {
  ArrowIcon,
  HomeIcon,
  SchoolIcon,
  ShieldIcon,
  SunIcon,
  TrophyIcon,
} from "@/components/ui/Icons";
import { Accent } from "@/components/ui/Heading";
import { perfectFor } from "@/lib/data";

/* band-rally.jpg put the ball dead centre of the frame, directly behind the
   intro copy, and scaled it to fill the band — so the one thing the eye went
   to on this section was a blurred sphere behind a paragraph. This crop is an
   empty court at sunrise with its subject off to the right, which is what a
   background needs to be. */
import courtPhoto from "../../public/hero/band-line.jpg";

const ICONS = {
  home: HomeIcon,
  sun: SunIcon,
  school: SchoolIcon,
  shield: ShieldIcon,
  trophy: TrophyIcon,
};

/**
 * "Perfect for" — the five audiences off the back of the client's brochure.
 *
 * This is the page's one full-bleed break. Between the hero and the footer
 * every section was a light band with a rule top and bottom, so eight of them
 * read as one undifferentiated column of content with no place for the eye to
 * rest. A photograph carrying five short labels is the pause, and it is also
 * the only section on the page whose content is genuinely a list rather than
 * an argument — cards would have been mostly padding.
 */
export default function PerfectFor() {
  return (
    <section className="relative isolate overflow-hidden bg-forest-deep">
      <Image
        src={courtPhoto}
        alt=""
        aria-hidden="true"
        placeholder="blur"
        sizes="100vw"
        className="absolute inset-0 -z-20 size-full object-cover object-[30%_center]"
      />
      <div className="absolute inset-0 -z-10 bg-forest-deep/84" />

      <div className="shell section-tight">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-volt">
            <span aria-hidden="true" className="h-px w-7 bg-volt/50" />
            Perfect for
            <span aria-hidden="true" className="h-px w-7 bg-volt/50" />
          </span>
          <h2 className="mt-5 text-[clamp(1.65rem,3vw,2.4rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-paper">
            Built for the courts that <Accent dark>run all week</Accent>.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-paper/75">
            {perfectFor.intro}
          </p>
        </Reveal>

        <ul className="mx-auto mt-10 grid max-w-5xl grid-cols-2 gap-y-9 sm:flex sm:items-start sm:justify-between sm:gap-4">
          {perfectFor.audiences.map((audience, index) => {
            const Icon = ICONS[audience.icon];

            return (
              <li
                key={audience.label}
                // the rules only appear from sm up, where the row is actually a
                // row; on a phone it wraps to two columns and they would fall
                // in the wrong places
                className={`flex flex-col items-center gap-3.5 px-2 text-center sm:flex-1 ${
                  index > 0 ? "sm:border-l sm:border-paper/15" : ""
                }`}
              >
                <span className="grid size-12 place-items-center rounded-full border border-paper/20 bg-paper/10 text-volt backdrop-blur-sm">
                  <Icon className="size-5" />
                </span>
                <span className="max-w-28 text-sm font-medium leading-snug text-paper">
                  {audience.label}
                </span>
              </li>
            );
          })}
        </ul>

        <Reveal delay={80} className="mt-11 flex justify-center">
          <Link
            href="/contact"
            className="group inline-flex h-12 items-center gap-2.5 rounded-full border border-paper/40 px-7 text-sm font-medium text-paper transition-colors duration-200 hover:border-volt hover:text-volt"
          >
            Ask about club and academy pricing
            <ArrowIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
