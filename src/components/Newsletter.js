"use client";

import { useState } from "react";
import ParallaxScene from "@/components/parallax/ParallaxScene";
import BallArt from "@/components/art/BallArt";
import PaddleArt from "@/components/art/PaddleArt";
import { ArrowIcon } from "@/components/ui/Icons";
import { Accent } from "@/components/ui/Heading";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (event) => {
    event.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  };

  return (
    <section id="newsletter" className="mx-auto w-full max-w-350 px-5 pb-16 sm:px-8 lg:pb-24 lg:pb-32">
      <ParallaxScene
        pointer
        className="grain relative isolate overflow-hidden rounded-[2rem] bg-volt px-6 py-20 text-ink sm:px-14 lg:py-28"
      >
        {/* depth layers inside the block */}
        <div
          data-speed="-1.2"
          data-speed-x="-1.4"
          className="pointer-events-none absolute inset-x-0 top-6 select-none opacity-[0.12]"
        >
          <p className="whitespace-nowrap text-center text-[clamp(4rem,15vw,12rem)] font-black leading-none tracking-tighter">
            JOIN THE CLUB
          </p>
        </div>

        <div
          data-speed="2.4"
          data-rotate="12"
          data-mouse="40"
          className="pointer-events-none absolute -right-10 -top-12 w-40 opacity-90 sm:w-56"
        >
          <PaddleArt
            id="cta-paddle"
            face="#0d0f13"
            edge="#0a0c0f"
            grip="#14171d"
            texture="grit"
            className="w-full rotate-[24deg]"
          />
        </div>

        <div
          data-speed="3.2"
          data-mouse="-56"
          className="pointer-events-none absolute -bottom-8 left-[6%] w-24 opacity-80 sm:w-32"
        >
          <div className="float-slow">
            <BallArt id="cta-ball" color="#0d0f13" className="w-full" />
          </div>
        </div>

        <div className="relative mx-auto max-w-2xl text-center">
          <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-ink/60">
            Season 04 early access
          </span>
          <h2 className="mt-5 text-[clamp(2.2rem,5.2vw,4rem)] font-semibold leading-[0.98] tracking-[-0.04em]">
            Get the drop before the <Accent>courts</Accent> do.
          </h2>
          <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-ink/70">
            New releases, restocks and a ₹500 credit on your first order. One
            email a week, never more.
          </p>

          {submitted ? (
            <p className="mx-auto mt-10 inline-flex items-center gap-3 rounded-full bg-paper px-7 py-4 text-sm font-medium text-volt-deep">
              You are on the list. Check your inbox for the ₹500 credit.
            </p>
          ) : (
            <form
              onSubmit={onSubmit}
              className="mx-auto mt-10 flex w-full max-w-md flex-col gap-3 sm:flex-row"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                className="h-14 flex-1 rounded-full border border-ink/20 bg-ink/5 px-6 text-sm text-ink outline-none transition-colors placeholder:text-ink/45 focus:border-ink focus:bg-ink/10"
              />
              <button
                type="submit"
                className="group inline-flex h-14 items-center justify-center gap-2.5 rounded-full bg-paper px-8 text-sm font-semibold text-volt-deep transition-transform duration-400 hover:-translate-y-0.5"
              >
                Sign up
                <ArrowIcon className="size-4 transition-transform duration-400 group-hover:translate-x-1.5" />
              </button>
            </form>
          )}

          <p className="mt-5 text-xs text-ink/65">
            No spam. Unsubscribe in one click.
          </p>
        </div>
      </ParallaxScene>
    </section>
  );
}
