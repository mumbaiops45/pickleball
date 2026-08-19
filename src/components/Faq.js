"use client";

import { useState } from "react";
import Link from "next/link";
import ParallaxScene from "@/components/parallax/ParallaxScene";
import Reveal from "@/components/ui/Reveal";
import { PlusIcon } from "@/components/ui/Icons";
import { faqs } from "@/lib/data";
import { Accent } from "@/components/ui/Heading";

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <ParallaxScene
      as="section"
      id="faq"
      className="relative isolate w-full overflow-hidden border-y border-line bg-surface py-14 lg:py-24"
    >
      <div
        data-speed="-1"
        data-speed-x="-0.8"
        className="pointer-events-none absolute -right-24 bottom-0 -z-10 size-96 rounded-full bg-volt/35 blur-[130px]"
      />

      <div className="mx-auto grid w-full max-w-350 grid-cols-1 gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <Reveal>
          <h2 className="mt-5 text-[clamp(2.1rem,4.6vw,3.4rem)] font-semibold leading-[1.02] tracking-[-0.035em]">
            Before you <Accent>check out</Accent>.
          </h2>
          <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-mist">
            The six things people email us about most. If yours is not here, a
            human answers the contact form inside a working day.
          </p>
          <Link
            href="/shop"
            className="mt-8 inline-flex h-12 items-center rounded-full border border-line-strong px-6 text-sm font-medium text-ink transition-colors hover:border-volt-deep hover:text-volt-deep"
          >
            Contact support
          </Link>
        </Reveal>

        <Reveal delay={100}>
          <ul className="flex flex-col">
            {faqs.map((faq, index) => {
              const expanded = open === index;
              return (
                <li key={faq.question} className="border-t border-line last:border-b">
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(expanded ? -1 : index)}
                      aria-expanded={expanded}
                      className="group flex w-full items-start justify-between gap-6 py-5 text-left"
                    >
                      <span
                        className={`text-[15px] font-medium transition-colors ${
                          expanded ? "text-volt-deep" : "text-ink group-hover:text-volt-deep"
                        }`}
                      >
                        {faq.question}
                      </span>
                      <span
                        className={`mt-0.5 grid size-7 shrink-0 place-items-center rounded-full border transition-all duration-400 ${
                          expanded
                            ? "rotate-45 border-volt-deep bg-volt text-ink"
                            : "border-line-strong text-mist group-hover:border-volt-deep"
                        }`}
                      >
                        <PlusIcon className="size-3.5" />
                      </span>
                    </button>
                  </h3>
                  {/* grid-rows trick animates to auto height without JS measurement */}
                  <div
                    className={`grid transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)] ${
                      expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
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
    </ParallaxScene>
  );
}
