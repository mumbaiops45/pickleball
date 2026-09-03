import Image from "next/image";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import {
  CheckIcon,
  BallIcon,
  RotateIcon,
  ServeIcon,
  TargetIcon,
  TrophyIcon,
  UsersIcon,
} from "@/components/ui/Icons";
import { pickleminton } from "@/lib/data";

/** Keyed by the `icon` on each rule group, mirroring the printed sheet. */
const RULE_ICONS = {
  target: TargetIcon,
  users: UsersIcon,
  serve: ServeIcon,
  rotate: RotateIcon,
  ball: BallIcon,
  trophy: TrophyIcon,
};

export const metadata = {
  title: "PickleMinton setup and rules",
  description:
    "PickleMinton setup instructions and rules — playing area, serving, service rotation and scoring.",
};

/** The supplied wordmark, or its two-tone name if the file is ever missing. */
function Wordmark() {
  const { logo, name, nameParts } = pickleminton;

  if (logo) {
    return (
      <Image
        src={logo}
        alt={name}
        width={520}
        height={150}
        className="h-10 w-auto object-contain lg:h-12"
      />
    );
  }

  return (
    <span className="text-2xl font-extrabold uppercase tracking-tight lg:text-3xl">
      <span className="text-flame">{nameParts[0]}</span>
      <span className="text-volt-deep">{nameParts[1]}</span>
    </span>
  );
}

/**
 * One setup step: the panel cut from the sheet, then the sheet's own wording.
 *
 * The well is 3:1 because that is roughly what the panels are; a 4:3 well left
 * two thirds of every card empty under the picture. The number sits inside the
 * well the way it does on the sheet — hung across the join between picture and
 * copy on a negative margin it rendered as a half circle sliced along that
 * edge, and a badge that has to escape its own box to look right is the wrong
 * badge.
 */
function SetupStep({ step, index }) {
  const badge = (
    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-volt font-mono text-sm font-semibold text-ink shadow-[0_4px_10px_-4px_rgba(30,61,20,.5)]">
      {index + 1}
    </span>
  );

  return (
    <Reveal
      as="li"
      delay={index * 40}
      className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-paper"
    >
      {step.image ? (
        <div className="relative aspect-3/1 w-full overflow-hidden bg-surface">
          <Image
            src={step.image}
            alt={step.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-contain p-3"
          />
          <span className="absolute left-3 top-3">{badge}</span>
        </div>
      ) : null}

      <div className="flex flex-1 items-start gap-4 p-5">
        {step.image ? null : badge}
        <p className="text-sm leading-relaxed text-ink">{step.text}</p>
      </div>
    </Reveal>
  );
}

/**
 * The printed insert, on the web.
 *
 * One page rather than a section with sub-pages, deliberately: whoever reads
 * this is standing next to a half-built net with the box open, on a phone.
 * One scroll and two anchors beat a two-level navigation. It is also the short
 * URL that prints on the carry bag, so it has to work cold.
 *
 * Everything on it comes off the two supplied sheets — the nine steps and
 * their panels, the tips, the playing area, the six rule groups and the
 * closing claims. Nothing is written around them.
 */
export default function PickleMintonPage() {
  const { tagline, playingArea, setup, setupTips, rules, claims } = pickleminton;

  return (
    <>
      <PageHero
        eyebrow="Instruction guide"
        title="Setup instructions and rules."
        titleAccent="and rules"
        crumbs={[{ label: "PickleMinton" }]}
      >
        {/* The hero paints a large ball behind this slot, so the wordmark gets
            its own surface rather than sitting on the artwork. */}
        <span className="shrink-0 rounded-2xl border border-line bg-paper/90 px-6 py-4 shadow-[0_18px_40px_-30px_rgba(30,61,20,.5)] backdrop-blur">
          <Wordmark />
        </span>
      </PageHero>

      {/* The two anchors, close enough to the top that a phone reaches them
          without a scroll — this page is read standing up. */}
      <nav aria-label="On this page" className="border-b border-line bg-surface">
        <div className="mx-auto flex w-full max-w-350 gap-2 px-5 py-4 sm:px-8">
          <a
            href="#setup"
            className="inline-flex h-10 items-center rounded-full border border-line-strong px-5 text-sm font-medium text-ink transition-colors hover:border-volt-deep hover:text-volt-deep"
          >
            Setup
          </a>
          <a
            href="#rules"
            className="inline-flex h-10 items-center rounded-full border border-line-strong px-5 text-sm font-medium text-ink transition-colors hover:border-volt-deep hover:text-volt-deep"
          >
            Rules
          </a>
        </div>
      </nav>

      {/* ---------------------------------------------------------- setup */}

      <section
        id="setup"
        className="w-full scroll-mt-28 border-b border-line bg-surface py-12 lg:py-16"
      >
        <div className="mx-auto w-full max-w-350 px-5 sm:px-8">
          <Reveal>
            <h2 className="text-[clamp(1.6rem,3vw,2.2rem)] font-semibold leading-[1.08] tracking-[-0.03em]">
              Setup instructions
            </h2>
          </Reveal>

          {/* three across, like the printed sheet */}
          <ol className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {setup.map((step, index) => (
              <SetupStep key={step.text} step={step} index={index} />
            ))}
          </ol>

          <Reveal className="mt-8 rounded-2xl border border-volt-deep/30 bg-volt/10 p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-volt-deep">
              Tips
            </p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {setupTips.map((tip) => (
                <li key={tip} className="flex items-start gap-2.5 text-sm text-ink">
                  <CheckIcon className="mt-0.5 size-4 shrink-0 text-volt-deep" />
                  {tip}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ----------------------------------------------------------- rules */}

      <section id="rules" className="w-full scroll-mt-28 py-12 lg:py-16">
        <div className="mx-auto w-full max-w-350 px-5 sm:px-8">
          <Reveal className="flex flex-wrap items-center justify-between gap-6">
            <h2 className="text-[clamp(1.6rem,3vw,2.2rem)] font-semibold leading-[1.08] tracking-[-0.03em]">
              Rules
            </h2>
            <span className="inline-flex flex-wrap items-baseline gap-x-4 gap-y-1 rounded-2xl border border-line bg-surface px-6 py-4">
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-mist">
                {playingArea.label}
              </span>
              <span className="text-2xl font-semibold tracking-tight text-ink">
                {playingArea.imperial}
              </span>
              <span className="text-sm text-mist">({playingArea.metric})</span>
            </span>
          </Reveal>

          {/* Icon tile beside the copy, the way the sheet sets it out: a dark
              tile carrying the mark, the heading and its points to the right.
              The sheet runs green on black; volt on forest is this palette's
              version of the same pairing and clears 8:1. */}
          <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-2">
            {rules.map((rule, index) => {
              const Icon = RULE_ICONS[rule.icon];

              return (
                <Reveal
                  as="div"
                  key={rule.id}
                  delay={index * 50}
                  className="flex h-full gap-5 rounded-2xl border border-line bg-paper p-5 sm:p-6"
                >
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-forest text-volt sm:size-14">
                    <Icon className="size-6 sm:size-7" />
                  </span>

                  <div className="min-w-0 flex-1">
                    <h3 className="text-[13px] font-semibold uppercase tracking-[0.14em] text-volt-deep">
                      {rule.title}
                    </h3>
                    <ul className="mt-3 flex flex-col gap-2.5">
                      {rule.points.map((point) => (
                        <li
                          key={point}
                          className="flex items-start gap-3 text-sm leading-relaxed text-mist"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-2 size-1.5 shrink-0 rounded-full bg-volt-deep"
                          />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- claims */}

      <section className="w-full border-t border-line bg-forest py-10 text-paper">
        <div className="mx-auto flex w-full max-w-350 flex-col gap-6 px-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-lg font-semibold tracking-tight">{tagline}</p>
          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            {claims.map((claim) => (
              <li
                key={claim}
                className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-paper/70"
              >
                <CheckIcon className="size-4 text-volt" />
                {claim}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
