import Link from "next/link";
import ParallaxScene from "@/components/parallax/ParallaxScene";
import { TwoTone } from "@/components/ui/Heading";
import BallArt from "@/components/art/BallArt";

/** Compact banner used at the top of every inner route. */
export default function PageHero({
  eyebrow,
  title,
  titleAccent,
  copy,
  crumbs = [],
  children,
}) {
  return (
    <ParallaxScene
      as="section"
      pointer
      className="grain relative isolate overflow-hidden border-b border-line pt-28 pb-10 lg:pt-36 lg:pb-14"
    >
      <div className="absolute inset-0 -z-30 bg-[radial-gradient(95%_130%_at_20%_-45%,#f2ffcf_0%,#fbfaf6_50%,#ffffff_80%)]" />
      <div
        data-speed="-1.4"
        data-speed-x="1.2"
        className="pointer-events-none absolute -right-20 -top-24 -z-30 size-96 rounded-full bg-volt/30 blur-[130px]"
      />
      {/* A tinted disc with a paddle on it, rather than a background pattern.
          The banner reads as product photography instead of decoration. */}
      <div
        data-speed="1.4"
        data-mouse="18"
        className="pointer-events-none absolute -right-16 -top-6 -z-20 hidden size-80 rounded-full bg-volt/70 lg:-right-8 lg:block"
      />
      <div
        data-speed="2.4"
        data-mouse="34"
        className="pointer-events-none absolute -right-4 top-2 -z-10 hidden w-44 lg:right-8 lg:block"
      >
        {/* The banner motif is the ball. A paddle used to sit here at 18deg in
            near-black, which read as a bat rather than pickleball equipment. */}
        <div className="float-slow drop-shadow-[0_26px_40px_rgba(21,46,32,.18)]">
          <BallArt id="page-hero-ball" color="#fecd06" className="w-full" />
        </div>
      </div>
      <div
        data-speed="3.2"
        data-mouse="-42"
        className="pointer-events-none absolute right-56 top-14 -z-10 hidden w-12 lg:right-72 lg:block"
      >
        <div className="float-slower">
          <BallArt id="page-hero-ball-small" color="#f5f3ed" className="w-full" />
        </div>
      </div>

      <div className="mx-auto w-full max-w-350 px-5 sm:px-8">
        {crumbs.length ? (
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-xs text-mist">
              <li>
                <Link href="/" className="transition-colors hover:text-ink">
                  Home
                </Link>
              </li>
              {crumbs.map((crumb) => (
                <li key={crumb.label} className="flex items-center gap-2">
                  <span aria-hidden="true" className="text-line-strong">
                    /
                  </span>
                  {crumb.href ? (
                    <Link
                      href={crumb.href}
                      className="transition-colors hover:text-ink"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-ink">{crumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        <div data-speed="0.5" className="mt-7 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            {eyebrow ? (
              <span className="inline-flex items-center rounded-full bg-volt px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink">
                {eyebrow}
              </span>
            ) : null}
            <h1 className="mt-5 text-[clamp(2.4rem,5.4vw,4rem)] font-semibold leading-[0.98] tracking-[-0.04em]">
              <TwoTone text={title} accent={titleAccent} />
            </h1>
            {copy ? (
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-mist">
                {copy}
              </p>
            ) : null}
          </div>
          {children}
        </div>
      </div>
    </ParallaxScene>
  );
}
