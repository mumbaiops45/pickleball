import Link from "next/link";
import Image from "next/image";
import { certification } from "@/lib/data";

/**
 * The contents list for the report, shown beside every page of it.
 *
 * Two shapes rather than one. On desktop it is a sticky sidebar, so the eight
 * pages stay reachable while a long table scrolls past. On a phone that same
 * markup would be a full screen of links standing between the reader and the
 * page they asked for, so it collapses to a horizontally scrolling strip of
 * numbered chips — the current page marked, the rest a thumb-swipe away.
 */
export default function ReportNav({ current }) {
  return (
    <aside className="lg:sticky lg:top-32 lg:self-start">
      <div className="flex items-center gap-4">
        {certification.marks.map((mark) => (
          <Image
            key={mark.id}
            src={mark.src}
            alt={mark.alt}
            width={80}
            height={80}
            className="size-10 w-auto object-contain lg:size-11"
          />
        ))}
      </div>

      <p className="mt-4 text-[11px] font-medium uppercase tracking-[0.2em] text-volt-deep lg:mt-5">
        AIPA test report
      </p>
      <p className="mt-1.5 hidden text-[12px] leading-relaxed text-mist lg:block">
        {certification.standard}
      </p>

      {/* -mx-5 lets the strip bleed to the screen edge inside the page's px-5,
          so a chip is never half-hidden under the gutter as it scrolls */}
      <ol className="-mx-5 mt-4 flex snap-x snap-mandatory gap-2 overflow-x-auto px-5 pb-1 lg:mx-0 lg:mt-6 lg:flex-col lg:gap-0 lg:overflow-visible lg:border-t lg:border-line lg:px-0 lg:pb-0">
        {certification.pages.map((entry) => {
          const active = entry.slug === current;

          return (
            <li
              key={entry.slug}
              className="shrink-0 snap-start lg:w-full lg:shrink lg:border-b lg:border-line"
            >
              <Link
                href={`/certification/${entry.slug}`}
                aria-current={active ? "page" : undefined}
                className={`flex items-center gap-2 rounded-full border px-3.5 py-2 text-[13px] leading-snug transition-colors lg:gap-3 lg:rounded-none lg:border-0 lg:px-0 lg:py-3 ${
                  active
                    ? "border-volt-deep bg-volt text-ink lg:bg-transparent lg:font-medium lg:text-volt-deep"
                    : "border-line text-mist hover:text-ink"
                }`}
              >
                <span
                  className={`font-mono text-[11px] ${
                    active ? "text-ink/60 lg:text-line-strong" : "text-line-strong"
                  }`}
                >
                  {entry.page}
                </span>
                {/* the full title is a mouthful on a chip — desktop only */}
                <span className="hidden lg:inline">{entry.title}</span>
                <span className="whitespace-nowrap lg:hidden">
                  {entry.titleAccent}
                </span>
              </Link>
            </li>
          );
        })}
      </ol>

      <Link
        href="/certification"
        className="mt-5 inline-flex text-[13px] text-mist underline-offset-4 transition-colors hover:text-volt-deep hover:underline lg:mt-6"
      >
        All pages at a glance
      </Link>
    </aside>
  );
}
