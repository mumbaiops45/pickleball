"use client";

import { useState } from "react";
import ParallaxScene from "@/components/parallax/ParallaxScene";
import Reveal from "@/components/ui/Reveal";
import BallArt from "@/components/art/BallArt";
import { ArrowIcon, CheckIcon } from "@/components/ui/Icons";
import { Accent } from "@/components/ui/Heading";
import { brand } from "@/lib/data";

/** What the list actually gets you — stated plainly, in the order it matters. */
const PERKS = [
  {
    title: "The drop, 48 hours early",
    copy: "New paddles go to the list before they reach the shop.",
  },
  {
    title: "Notes from the fitting bench",
    copy: "What our fitters learned this month, and who each build suits.",
  },
  {
    title: "₹500 off your first order",
    copy: "The code lands in the confirmation email.",
  },
];

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (event) => {
    event.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  };

  return (
    <section id="newsletter" className="bg-paper pb-16 lg:pb-24">
      <div className="mx-auto w-full max-w-350 px-5 sm:px-8">
        <ParallaxScene
          pointer
          className="grain relative isolate overflow-hidden rounded-4xl bg-forest px-6 py-14 text-paper sm:px-12 lg:py-16"
        >
          <div
            data-speed="-1.4"
            data-speed-x="1.1"
            className="pointer-events-none absolute -right-20 -top-24 -z-10 size-96 rounded-full bg-volt/20 blur-[120px]"
          />

          <div
            data-speed="2.5"
            data-mouse="-25"
            className="pointer-events-none absolute bottom-16 left-[14%] hidden w-12 opacity-70 lg:block"
          >
            <div className="float-slow">
              <BallArt id="newsletter-ball" color="#d4ff3f" className="w-full" />
            </div>
          </div>

          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
            {/* ------------------------------------------------------- copy */}
            <Reveal>
              <span className="flex items-center text-[11px] font-medium uppercase tracking-[0.22em] text-volt">
                The drop list
              </span>

              <h2 className="mt-5 text-[clamp(2rem,4.4vw,3.2rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-paper">
                One email a month. Only when we have something{" "}
                <Accent dark>worth sending</Accent>.
              </h2>

              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-paper/70">
                No countdown timers, no daily &ldquo;last chance&rdquo;. Just the
                paddles going out next and an honest read on who they suit.
              </p>

              <p className="mt-7 text-[11px] font-semibold uppercase tracking-[0.2em] text-volt">
                {brand.taglines.passion}
              </p>
            </Reveal>

            {/* ------------------------------------------------------- form */}
            <Reveal delay={120}>
              <div
                aria-live="polite"
                className="rounded-3xl border border-paper/15 bg-paper/5 p-6 sm:p-8"
              >
                {submitted ? (
                  <div className="flex flex-col items-start gap-4 py-6">
                    <span className="grid size-11 place-items-center rounded-full bg-volt text-ink">
                      <CheckIcon className="size-5" />
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold tracking-tight text-paper">
                        You&rsquo;re on the list.
                      </h3>
                      <p className="mt-2 max-w-sm text-[13px] leading-relaxed text-paper/60">
                        We sent a confirmation to{" "}
                        <span className="text-paper">{email}</span> — your ₹500
                        code is inside it. The next drop note goes out at the
                        start of the month.
                      </p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={onSubmit}>
                    <label
                      htmlFor="newsletter-email"
                      className="block text-[11px] font-medium uppercase tracking-[0.16em] text-paper/50"
                    >
                      Email address
                    </label>

                    <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                      <input
                        id="newsletter-email"
                        type="email"
                        required
                        autoComplete="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="you@example.com"
                        className="h-14 w-full min-w-0 rounded-full border border-paper/25 bg-forest-deep px-5 text-sm text-paper outline-none transition-colors placeholder:text-paper/30 focus:border-volt sm:flex-1"
                      />
                      <button
                        type="submit"
                        className="group inline-flex h-14 shrink-0 items-center justify-center gap-2.5 rounded-full bg-volt px-8 text-sm font-semibold text-ink transition-transform duration-300 hover:-translate-y-0.5"
                      >
                        Join the list
                        <ArrowIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </button>
                    </div>

                    <p className="mt-5 border-t border-paper/15 pt-5 text-xs leading-relaxed text-paper/50">
                      One email a month, unsubscribe from any of them. We never
                      pass your address on.
                    </p>
                  </form>
                )}
              </div>

              {/* what the address buys, next to the field that asks for it */}
              <ul className="mt-7 flex flex-col">
                {PERKS.map((perk, index) => (
                  <li
                    key={perk.title}
                    className="flex gap-5 border-t border-paper/15 py-3.5 last:border-b"
                  >
                    <span className="font-mono text-[11px] tracking-[0.16em] text-paper/35">
                      0{index + 1}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-medium text-paper/90">
                        {perk.title}
                      </span>
                      <span className="mt-0.5 block text-[13px] leading-relaxed text-paper/50">
                        {perk.copy}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </ParallaxScene>
      </div>
    </section>
  );
}
