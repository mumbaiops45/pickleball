import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import ReportBody from "@/components/certification/ReportBody";
import ReportNav from "@/components/certification/ReportNav";
import { ArrowIcon } from "@/components/ui/Icons";
import { certification, findCertificationPage } from "@/lib/data";

/** All eight pages are known at build time, so all eight prerender. */
export function generateStaticParams() {
  return certification.pages.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const entry = findCertificationPage(slug);
  if (!entry) return {};

  return {
    title: `${entry.title} · AIPA test report`,
    description: `Page ${entry.page} of ${certification.pages.length} of the AIPA equipment test report for the Pickleball Pro, measured by Brainwave SportsTech.`,
  };
}

export default async function CertificationPage({ params }) {
  const { slug } = await params;
  const entry = findCertificationPage(slug);
  if (!entry) notFound();

  const index = certification.pages.indexOf(entry);
  const previous = certification.pages[index - 1] ?? null;
  const next = certification.pages[index + 1] ?? null;

  return (
    <>
      <PageHero
        eyebrow={`Page ${entry.page} of ${certification.pages.length}`}
        title={entry.title}
        titleAccent={entry.titleAccent}
        copy={`${certification.documentTitle} · order ${certification.order[0].value}, measured by ${certification.lab.name} against the ${certification.standard}.`}
        crumbs={[
          { label: "About", href: "/about" },
          { label: "Test report", href: "/certification" },
          { label: entry.title },
        ]}
      />

      <section className="w-full py-12 lg:py-16">
        <div className="mx-auto grid w-full max-w-350 grid-cols-1 gap-12 px-5 sm:px-8 lg:grid-cols-[16rem_1fr] lg:gap-16">
          {/* every page of the report, always in reach */}
          <ReportNav current={entry.slug} />

          <div>
            <Reveal>
              <ReportBody entry={entry} />
            </Reveal>

            {/* ------------------------------------------------ prev / next */}
            <nav
              aria-label="Report pages"
              className="mt-14 grid grid-cols-1 gap-3 border-t border-line pt-8 sm:grid-cols-2"
            >
              {previous ? (
                <Link
                  href={`/certification/${previous.slug}`}
                  className="group rounded-2xl border border-line p-5 transition-colors hover:border-volt-deep"
                >
                  <span className="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-mist">
                    <ArrowIcon className="size-3.5 rotate-180" />
                    Page {previous.page}
                  </span>
                  <span className="mt-1.5 block text-[15px] font-medium text-ink transition-colors group-hover:text-volt-deep">
                    {previous.title}
                  </span>
                </Link>
              ) : (
                <span />
              )}

              {next ? (
                <Link
                  href={`/certification/${next.slug}`}
                  className="group rounded-2xl border border-line p-5 text-right transition-colors hover:border-volt-deep sm:col-start-2"
                >
                  <span className="flex items-center justify-end gap-2 text-[11px] uppercase tracking-[0.16em] text-mist">
                    Page {next.page}
                    <ArrowIcon className="size-3.5" />
                  </span>
                  <span className="mt-1.5 block text-[15px] font-medium text-ink transition-colors group-hover:text-volt-deep">
                    {next.title}
                  </span>
                </Link>
              ) : null}
            </nav>
          </div>
        </div>
      </section>
    </>
  );
}
