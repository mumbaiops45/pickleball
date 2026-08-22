import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import { ArrowUpRightIcon } from "@/components/ui/Icons";
import { certification } from "@/lib/data";
import { Accent } from "@/components/ui/Heading";

export const metadata = {
  title: "AIPA test report",
  description:
    "The AIPA equipment test report for the Pickleball Pro, order BST-251227-6ZV, as measured by Brainwave SportsTech — weight, diameter, bounce, hardness and compression, with the Certificate of Recognition.",
};

export default function CertificationIndex() {
  const { pages, tests, authorisation, lab } = certification;
  const testById = (id) => tests.find((entry) => entry.id === id);

  return (
    <>
      <PageHero
        eyebrow={certification.documentTitle}
        title="AIPA equipment test report."
        titleAccent="test report"
        copy={`${lab.name} — ${lab.role}. Order ${certification.order[0].value}, model ${certification.order[3].value}, tested to the ${certification.standard}.`}
        crumbs={[{ label: "About", href: "/about" }, { label: "Test report" }]}
      >
        <div className="flex shrink-0 items-center gap-5">
          {certification.marks.map((mark) => (
            <Image
              key={mark.id}
              src={mark.src}
              alt={mark.alt}
              width={112}
              height={112}
              className="size-16 w-auto object-contain lg:size-20"
            />
          ))}
        </div>
      </PageHero>

      <section className="w-full py-14 lg:py-20">
        <div className="mx-auto w-full max-w-350 px-5 sm:px-8">
          <Reveal>
            <span className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.22em] text-volt-deep">
              <span className="h-px w-8 bg-volt-deep/40" />
              Eight pages
            </span>
            <h2 className="mt-5 text-[clamp(1.7rem,3.2vw,2.4rem)] font-semibold leading-[1.06] tracking-[-0.035em]">
              Every page of the report, <Accent>as it was issued</Accent>.
            </h2>
          </Reveal>

          <ol className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {pages.map((entry, index) => {
              const test = testById(entry.id);

              return (
                <Reveal as="li" key={entry.slug} delay={index * 60} className="h-full">
                  <Link
                    href={`/certification/${entry.slug}`}
                    className="group flex h-full flex-col rounded-3xl border border-line bg-surface p-6 transition-all duration-500 hover:-translate-y-1 hover:border-line-strong hover:shadow-[0_20px_40px_-24px_rgba(15,17,21,.25)]"
                  >
                    <span className="flex items-center justify-between">
                      <span className="font-mono text-[11px] tracking-[0.2em] text-line-strong">
                        {entry.page}
                      </span>
                      <ArrowUpRightIcon className="size-4 text-line-strong transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-volt-deep" />
                    </span>

                    <span className="mt-6 block text-[15px] font-semibold leading-snug tracking-tight text-ink transition-colors group-hover:text-volt-deep">
                      {entry.title}
                    </span>

                    {test ? (
                      <span className="mt-auto flex flex-wrap items-center gap-2 pt-6">
                        {test.average ? (
                          <span className="font-mono text-sm text-ink">
                            {test.average.value}
                          </span>
                        ) : null}
                        {/* the verdict wording is the lab's, and a conditional
                            approval is not coloured as a pass */}
                        <span
                          className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${
                            test.passed
                              ? "bg-volt text-ink"
                              : "border border-clay/40 bg-clay/10 text-clay"
                          }`}
                        >
                          {test.pass}
                        </span>
                      </span>
                    ) : null}
                  </Link>
                </Reveal>
              );
            })}
          </ol>

          <Reveal delay={200}>
            <div className="mt-12 rounded-3xl border border-volt-deep/25 bg-volt/12 p-7">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-volt-deep">
                {authorisation.title}
              </p>
              <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-ink">
                {authorisation.body}
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
