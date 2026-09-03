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
  // no side content → centre the text so the banner does not read as
  // half-empty
  const centered = !children;

  return (
    <ParallaxScene
      as="section"
      pointer
      className="grain relative isolate overflow-hidden border-b border-line pt-24 pb-8 lg:pt-32 lg:pb-12"
    >
      {/* A colour band, not a white one — green off the logo bleeding to a hint
          of the swoosh cyan, with a ball-yellow sun top-right and a cyan wash
          bottom-left. */}
      <div className="absolute inset-0 -z-30 bg-linear-to-br from-surface-2 via-surface to-[#e6f4ff]" />
      <div
        data-speed="-1.4"
        data-speed-x="1.2"
        className="pointer-events-none absolute -right-16 -top-28 -z-30 size-120 rounded-full bg-volt/45 blur-[120px]"
      />
      <div className="pointer-events-none absolute -left-24 -bottom-24 -z-30 size-80 rounded-full bg-sky/25 blur-[120px]" />

      {/* Ball motifs on the right — dropped when the text is centred, where they
          would crowd it. */}
      {!centered ? (
        <>
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
        </>
      ) : null}

      <div className="mx-auto w-full max-w-350 px-5 sm:px-8">
        {crumbs.length ? (
          <nav aria-label="Breadcrumb">
            <ol
              className={`flex flex-wrap items-center gap-2 text-xs text-mist ${
                centered ? "justify-center" : ""
              }`}
            >
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

        <div
          data-speed="0.5"
          className={
            centered
              ? "mt-6 flex flex-col items-center text-center"
              : "mt-7 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
          }
        >
          <div className={centered ? "flex flex-col items-center" : "max-w-2xl"}>
            {eyebrow ? (
              <span className="inline-flex items-center rounded-full bg-volt px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink">
                {eyebrow}
              </span>
            ) : null}
            <h1 className="mt-5 text-[clamp(2.4rem,5.4vw,4rem)] font-semibold leading-[0.98] tracking-[-0.04em]">
              <TwoTone text={title} accent={titleAccent} />
            </h1>
            {copy ? (
              <p
                className={`mt-4 max-w-xl text-[15px] leading-relaxed text-mist ${
                  centered ? "mx-auto" : ""
                }`}
              >
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
