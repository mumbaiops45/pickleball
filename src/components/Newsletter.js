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
    <section
      id="newsletter"
      className="mx-auto w-full max-w-350 px-5 pb-16 sm:px-8 lg:pb-24"
    >
      <ParallaxScene
        pointer
        className="grain relative isolate overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#0b0d0f] text-white"
      >
        {/* =====================================================
            SUBTLE BACKGROUND LIGHT
        ====================================================== */}

        <div className="pointer-events-none absolute -right-40 -top-40 size-[500px] rounded-full bg-[#c8ff24]/[0.055] blur-[120px]" />

        <div className="pointer-events-none absolute -bottom-48 -left-40 size-[420px] rounded-full bg-white/[0.025] blur-[100px]" />

        {/* =====================================================
            VERY SUBTLE GRID
        ====================================================== */}

        <div
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />

        {/* =====================================================
            PADDLE
        ====================================================== */}

        <div
          data-speed="1.8"
          data-rotate="7"
          data-mouse="25"
          className="pointer-events-none absolute -right-12 -top-16 hidden w-60 opacity-45 sm:block lg:w-72"
        >
          <PaddleArt
            id="newsletter-paddle"
            face="#15191d"
            edge="#080a0c"
            grip="#101316"
            texture="carbon"
            className="w-full rotate-[17deg] drop-shadow-[0_30px_45px_rgba(0,0,0,.65)]"
          />
        </div>

        {/* =====================================================
            BALL
        ====================================================== */}

        <div
          data-speed="2.5"
          data-mouse="-25"
          className="pointer-events-none absolute bottom-14 right-[31%] hidden w-10 opacity-60 sm:block"
        >
          <div className="float-slow">
            <BallArt
              id="newsletter-ball"
              color="#c8ff24"
              className="w-full"
            />
          </div>
        </div>

        {/* =====================================================
            MAIN CONTENT
        ====================================================== */}

        <div className="relative z-10 grid min-h-[400px] grid-cols-1 items-center gap-12 px-7 py-12 sm:px-12 sm:py-16 lg:grid-cols-[1.15fr_.85fr] lg:gap-20 lg:px-20 lg:py-20">
          {/* =================================================
              LEFT
          ================================================== */}

          <div className="max-w-xl">
            {/* Eyebrow */}

            <div className="flex items-center gap-3">
              <span className="h-px w-7 bg-[#c8ff24]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#c8ff24]">
                PaddleHaus Journal
              </span>
            </div>

            {/* Heading */}

            <h2 className="mt-6 text-[clamp(2.5rem,5vw,4.6rem)] font-semibold leading-[0.96] tracking-[-0.055em]">
              Stay ahead of
              <br />
              the <Accent>game.</Accent>
            </h2>

            {/* Description */}

            <p className="mt-6 max-w-md text-sm leading-7 text-white/50 sm:text-[15px]">
              Get early access to new equipment, limited
              collections, expert tips and exclusive
              member offers.
            </p>

            {/* Benefits */}

            <div className="mt-7 flex flex-wrap gap-x-7 gap-y-3">
              <span className="flex items-center gap-2 text-xs text-white/50">
                <span className="size-1.5 rounded-full bg-[#c8ff24]" />
                Early access
              </span>

              <span className="flex items-center gap-2 text-xs text-white/50">
                <span className="size-1.5 rounded-full bg-[#c8ff24]" />
                Member offers
              </span>

              <span className="flex items-center gap-2 text-xs text-white/50">
                <span className="size-1.5 rounded-full bg-[#c8ff24]" />
                Product updates
              </span>
            </div>
          </div>

          {/* =================================================
              RIGHT - PREMIUM FORM
          ================================================== */}

          <div className="relative">
            <div className="rounded-2xl border border-white/[0.09] bg-white/[0.035] p-6 shadow-[0_25px_80px_rgba(0,0,0,.25)] backdrop-blur-xl sm:p-7">
              {!submitted ? (
                <>
                  {/* Card header */}

                  <div className="flex items-start justify-between gap-5">
                    <div>
                      <p className="text-[15px] font-semibold text-white">
                        Join the community
                      </p>

                      <p className="mt-1.5 text-xs leading-5 text-white/40">
                        One thoughtful email a week.
                        Nothing unnecessary.
                      </p>
                    </div>

                    {/* Number */}

                    <span className="text-[10px] font-medium tracking-[0.2em] text-white/20">
                      01
                    </span>
                  </div>

                  {/* Divider */}

                  <div className="my-6 h-px bg-white/[0.08]" />

                  {/* Form */}

                  <form onSubmit={onSubmit}>
                    <label
                      htmlFor="newsletter-email"
                      className="mb-2.5 block text-[11px] font-medium uppercase tracking-[0.12em] text-white/40"
                    >
                      Email address
                    </label>

                    <input
                      id="newsletter-email"
                      type="email"
                      required
                      value={email}
                      onChange={(event) =>
                        setEmail(event.target.value)
                      }
                      placeholder="you@example.com"
                      className="h-13 w-full rounded-xl border border-white/[0.1] bg-black/20 px-4 text-sm text-white outline-none transition-all duration-300 placeholder:text-white/20 focus:border-[#c8ff24]/50 focus:bg-black/30"
                    />

                    <button
                      type="submit"
                      className="group mt-3 flex h-13 w-full items-center justify-center gap-2.5 rounded-xl bg-[#c8ff24] text-sm font-semibold text-[#0b0d0f] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(200,255,36,.12)] active:translate-y-0"
                    >
                      Subscribe

                      <ArrowIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                    </button>
                  </form>

                  {/* Offer */}

                  <div className="mt-5 flex items-center gap-3">
                    <div className="grid size-8 shrink-0 place-items-center rounded-full border border-[#c8ff24]/20 bg-[#c8ff24]/[0.06]">
                      <span className="text-xs font-semibold text-[#c8ff24]">
                        ₹
                      </span>
                    </div>

                    <p className="text-[11px] leading-5 text-white/35">
                      New members receive{" "}
                      <span className="text-white/65">
                        ₹500 off
                      </span>{" "}
                      their first order.
                    </p>
                  </div>
                </>
              ) : (
                /* =================================================
                   SUCCESS
                ================================================== */

                <div className="flex min-h-[255px] flex-col items-center justify-center text-center">
                  <div className="grid size-12 place-items-center rounded-full border border-[#c8ff24]/20 bg-[#c8ff24]/10">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="size-5 text-[#c8ff24]"
                    >
                      <path
                        d="M5 12.5L9.5 17L19 7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  <h3 className="mt-5 text-lg font-semibold">
                    Welcome to PaddleHaus.
                  </h3>

                  <p className="mt-2 max-w-xs text-xs leading-5 text-white/40">
                    You're officially on the list. Your
                    member benefits are on their way.
                  </p>
                </div>
              )}
            </div>

            {/* Privacy */}

            <p className="mt-3 text-center text-[10px] text-white/25">
              Your privacy matters. Unsubscribe anytime.
            </p>
          </div>
        </div>

        {/* =====================================================
            BOTTOM ACCENT
        ====================================================== */}

        <div className="pointer-events-none absolute inset-x-12 bottom-0 h-px bg-gradient-to-r from-transparent via-[#c8ff24]/30 to-transparent" />
      </ParallaxScene>
    </section>
  );
}