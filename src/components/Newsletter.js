"use client";

import { useState } from "react";
import Reveal from "@/components/ui/Reveal";
import { ArrowIcon, CheckIcon } from "@/components/ui/Icons";
import { brand } from "@/lib/data";

/** What the list actually gets you — stated plainly, in the order it matters. */
const PERKS = [
  "New ball runs go to the list 48 hours before the shop",
  "What the fitting bench learned this month, and who each build suits",
  "₹500 off your first order, in the confirmation email",
];

/**
 * The one sign-up on the page.
 *
 * The footer used to open with a second, near-identical band — same headline
 * register, same "Join the list" button — immediately under this one, so the
 * page closed by asking twice. That band is gone; this is the ask, and the
 * footer link now points here.
 */
export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (event) => {
    event.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  };

  return (
    <section id="newsletter" className="section bg-surface">
      <div className="shell">
        <div className="overflow-hidden rounded-2xl bg-forest px-6 py-12 text-paper sm:px-12 lg:py-16">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
            {/* ----------------------------------------------------- copy */}
            <Reveal>
              <span className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-volt">
                <span aria-hidden="true" className="h-px w-7 bg-volt/50" />
                The drop list
              </span>

              <h2 className="mt-5 text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-[1.06] tracking-[-0.035em] text-paper">
                One email a month. Only when we have something{" "}
                <span className="text-volt">worth sending</span>.
              </h2>

              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-paper/70">
                No countdown timers, no daily &ldquo;last chance&rdquo;. Just the
                ball runs going out next and an honest read on who they suit.
              </p>

              <ul className="mt-8 flex flex-col gap-3.5">
                {PERKS.map((perk) => (
                  <li
                    key={perk}
                    className="flex gap-3 text-sm leading-relaxed text-paper/75"
                  >
                    <CheckIcon className="mt-0.5 size-4 shrink-0 text-volt" />
                    {perk}
                  </li>
                ))}
              </ul>

              <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.2em] text-volt">
                {brand.taglines.passion}
              </p>
            </Reveal>

            {/* ----------------------------------------------------- form */}
            <Reveal delay={80}>
              <div
                aria-live="polite"
                className="rounded-2xl border border-paper/15 bg-paper/5 p-6 sm:p-8"
              >
                {submitted ? (
                  <div className="flex flex-col items-start gap-4 py-4">
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
                      className="block text-[11px] font-medium uppercase tracking-[0.14em] text-paper/50"
                    >
                      Email address
                    </label>

                    <div className="mt-3 flex flex-col gap-3">
                      <input
                        id="newsletter-email"
                        type="email"
                        required
                        autoComplete="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="you@example.com"
                        className="h-13 w-full min-w-0 rounded-full border border-paper/25 bg-forest-deep px-5 text-sm text-paper outline-none transition-colors placeholder:text-paper/35 focus:border-volt"
                      />
                      <button
                        type="submit"
                        className="group inline-flex h-13 items-center justify-center gap-2.5 rounded-full bg-volt px-8 text-sm font-semibold text-ink transition-colors duration-200 hover:bg-paper"
                      >
                        Join the list
                        <ArrowIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </button>
                    </div>

                    <p className="mt-6 border-t border-paper/15 pt-5 text-xs leading-relaxed text-paper/50">
                      One email a month, unsubscribe from any of them. We never
                      pass your address on.
                    </p>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
