"use client";

import { useState } from "react";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { PlusIcon } from "@/components/ui/Icons";
import { Accent } from "@/components/ui/Heading";
import { faqs } from "@/lib/data";

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="section bg-surface">
      <div className="shell grid grid-cols-1 gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <Reveal>
          <span className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-volt-deep">
            <span aria-hidden="true" className="h-px w-7 bg-volt-deep/40" />
            Questions
          </span>
          <h2 className="text-[clamp(1.9rem,3.8vw,3rem)] font-semibold leading-[1.06] tracking-[-0.035em]">
            Before you <Accent>check out</Accent>.
          </h2>
          <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-mist">
            The six things people email us about most. If yours is not here, a
            human answers the contact form inside a working day.
          </p>
          {/* This used to point at /shop, which is not where you go with a
              question. */}
          <Link
            href="/contact"
            className="mt-8 inline-flex h-12 items-center rounded-full border border-line-strong px-6 text-sm font-medium text-ink transition-colors duration-200 hover:border-volt-deep hover:text-volt-deep"
          >
            Contact support
          </Link>
        </Reveal>

        <Reveal delay={80}>
          <ul className="flex flex-col border-t border-line">
            {faqs.map((faq, index) => {
              const expanded = open === index;
              return (
                <li key={faq.question} className="border-b border-line">
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(expanded ? -1 : index)}
                      aria-expanded={expanded}
                      className="group flex w-full items-start justify-between gap-6 py-5 text-left"
                    >
                      <span
                        className={`text-[15px] font-medium transition-colors duration-200 ${
                          expanded
                            ? "text-volt-deep"
                            : "text-ink group-hover:text-volt-deep"
                        }`}
                      >
                        {faq.question}
                      </span>
                      <span
                        className={`mt-0.5 grid size-7 shrink-0 place-items-center rounded-full border transition-all duration-300 ${
                          expanded
                            ? "rotate-45 border-volt-deep bg-volt-deep text-paper"
                            : "border-line-strong text-mist group-hover:border-volt-deep"
                        }`}
                      >
                        <PlusIcon className="size-3.5" />
                      </span>
                    </button>
                  </h3>
                  {/* grid-rows trick animates to auto height without JS measurement */}
                  <div
                    className={`grid transition-all duration-400 ease-[cubic-bezier(.16,1,.3,1)] ${
                      expanded
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-xl pb-6 pr-12 text-sm leading-relaxed text-mist">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
