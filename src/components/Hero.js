import Link from "next/link";
import ParallaxScene from "@/components/parallax/ParallaxScene";
import PaddleArt from "@/components/art/PaddleArt";
import BallArt from "@/components/art/BallArt";
import { CourtArt } from "@/components/art/GearArt";
import { ArrowIcon, StarIcon } from "@/components/ui/Icons";
import Logo from "@/components/ui/Logo";
import { stats } from "@/lib/data";

export default function Hero() {
  return (
    <ParallaxScene
      as="section"
      id="top"
      pointer
      className="grain relative isolate flex min-h-[100svh] items-center overflow-hidden pt-27"
    >
      {/* ---------------------------------------------------------- layer 0 */}
      <div className="absolute inset-0 -z-30 bg-[radial-gradient(125%_95%_at_50%_-15%,#f4ffd6_0%,#fbfaf6_45%,#ffffff_75%)]" />

      <div
        data-speed="-0.9"
        className="absolute -left-[18%] top-[-10%] -z-30 h-[70vh] w-[70vh] rounded-full bg-volt/45 blur-[120px]"
      />
      <div
        data-speed="-1.6"
        data-speed-x="0.6"
        className="absolute -right-[14%] bottom-[-18%] -z-30 h-[62vh] w-[62vh] rounded-full bg-clay/10 blur-[130px]"
      />

      {/* court diagram, drifting slowly behind everything */}
      <div
        data-speed="-2.2"
        data-mouse="-14"
        className="pointer-events-none absolute -right-[6%] top-[-14%] -z-20 hidden h-[130%] opacity-[0.14] md:block"
      >
        <CourtArt className="h-full w-auto" stroke="#4e6b00" />
      </div>

      {/* ---------------------------------------------------------- layer 1 */}
      {/* Oversized wordmark, anchored to the bottom edge and clipped by the
          section. It used to sit at 36% and collide with the headline, which
          made both hard to read. */}
      <div
        data-speed="1.4"
        data-speed-x="-1.1"
        className="pointer-events-none absolute inset-x-0 bottom-[-2.5%] -z-10 select-none"
      >
        <p className="text-stroke whitespace-nowrap text-center text-[clamp(5rem,17vw,17rem)] font-black leading-none tracking-tighter">
          PICKLEBALL
        </p>
      </div>

      {/* ---------------------------------------------------------- layer 2 */}
      {/* solid lime stage so the paddle has something to sit against instead
          of floating on bare white */}
      <div
        data-speed="1.9"
        data-mouse="22"
        className="pointer-events-none absolute right-[2%] top-[12%] -z-20 hidden h-[34vw] max-h-125 w-[34vw] max-w-125 rounded-full bg-volt md:right-[7%] md:block"
      />
      <div
        data-speed="2.6"
        data-rotate="-10"
        data-mouse="46"
        className="pointer-events-none absolute right-[3%] top-[16%] -z-10 w-[38vw] max-w-105 min-w-55 md:right-[8%]"
      >
        <div className="rotate-[14deg] drop-shadow-[0_50px_90px_rgba(15,17,21,.12)]">
          <PaddleArt id="hero-paddle" face="#d4ff3f" texture="carbon" className="w-full" />
        </div>
      </div>

      <div
        data-speed="1.7"
        data-rotate="14"
        data-mouse="-30"
        className="pointer-events-none absolute right-[26%] top-[46%] -z-20 hidden w-[26vw] max-w-75 opacity-55 lg:block"
      >
        {/* a pale second paddle for depth — light enough to stay behind the copy */}
        <div className="-rotate-[26deg] blur-[2px]">
          <PaddleArt
            id="hero-paddle-2"
            face="#e7e6de"
            edge="#c9c8bf"
            grip="#b6b5ab"
            texture="honeycomb"
            className="w-full"
          />
        </div>
      </div>

      {/* ---------------------------------------------------------- layer 3 */}
      <div
        data-speed="3.4"
        data-mouse="70"
        className="pointer-events-none absolute left-[6%] top-[24%] w-16 sm:w-24"
      >
        <div className="float-slow">
          <BallArt id="hero-ball-1" color="#d4ff3f" className="w-full drop-shadow-[0_20px_40px_rgba(15,17,21,.1)]" />
        </div>
      </div>
      <div
        data-speed="2.1"
        data-mouse="-52"
        className="pointer-events-none absolute bottom-[16%] left-[38%] w-10 opacity-90 sm:w-14"
      >
        <div className="float-slower">
          <BallArt id="hero-ball-2" color="#ff5c2b" className="w-full" />
        </div>
      </div>
      <div
        data-speed="4.2"
        data-mouse="90"
        className="pointer-events-none absolute right-[12%] bottom-[10%] hidden w-12 opacity-70 md:block"
      >
        <div className="float-slow">
          <BallArt id="hero-ball-3" color="#f5f3ed" className="w-full" />
        </div>
      </div>

      {/* ---------------------------------------------------------- layer 4 */}
      <div className="relative mx-auto w-full max-w-350 px-5 py-10 sm:px-8 lg:py-20">
        <div data-speed="0.6" className="max-w-2xl">
          {/* <span className="inline-flex items-center gap-2.5 rounded-full border border-line bg-paper py-1.5 pl-2 pr-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink shadow-[0_1px_2px_rgba(15,17,21,.05)]">
            <span className="rounded-full bg-ink px-2.5 py-0.5 text-volt">New</span>
            Season 04 · Raw carbon drop
          </span> */}

          {/* brand lockup in place of the old promo pill */}
          {/* <Logo href={null} size="md" tagline="Season 04 · Raw carbon drop" /> */}

          <h1 className="mt-7 text-[clamp(2.9rem,7.4vw,6.2rem)] font-semibold leading-[0.92] tracking-[-0.04em]">
            Own the
            <span className="relative ml-4 inline-block text-volt-deep">
              kitchen
              <svg
                viewBox="0 0 300 14"
                className="absolute -bottom-2 left-0 w-full text-volt-deep/50"
                aria-hidden="true"
              >
                <path
                  d="M2 9C60 3 150 2 298 6"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </span>
            <br />
            line.
          </h1>

          <p className="mt-8 max-w-lg text-[17px] leading-relaxed text-mist">
            Thermoformed paddles, true-flight balls and court apparel built with
            touring pros and tested on public courts every single week.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/shop?category=Paddles"
              className="group inline-flex h-14 items-center justify-center gap-3 rounded-full bg-volt px-8 text-sm font-semibold tracking-wide text-ink transition-all duration-400 hover:-translate-y-1 hover:shadow-[0_18px_40px_-12px_rgba(78,107,0,.28)]"
            >
              Shop paddles
              <ArrowIcon className="size-4 transition-transform duration-400 group-hover:translate-x-1.5" />
            </Link>
            <a
              href="#tech"
              className="inline-flex h-14 items-center justify-center rounded-full border border-line-strong bg-surface/60 px-8 text-sm font-medium text-ink backdrop-blur transition-colors duration-300 hover:border-ink/40 hover:bg-surface-2"
            >
              Find my paddle
            </a>
          </div>

          <div className="mt-12 flex items-center gap-5">
            <div className="flex -space-x-2.5">
              {["MV", "DR", "PN", "JK"].map((initials, index) => (
                <span
                  key={initials}
                  className="grid size-9 place-items-center rounded-full border-2 border-paper text-[11px] font-semibold text-ink shadow-[0_2px_8px_rgba(15,17,21,.14)]"
                  style={{
                    background: ["#d4ff3f", "#ff5c2b", "#7dd3fc", "#f5f3ed"][index],
                  }}
                >
                  {initials}
                </span>
              ))}
            </div>
            <div>
              <span className="flex gap-0.5 text-volt-deep">
                {Array.from({ length: 5 }, (_, i) => (
                  <StarIcon key={i} className="size-3.5" />
                ))}
              </span>
              <p className="mt-1 text-xs text-mist">
                4.9 average from 12,480 verified players
              </p>
            </div>
          </div>
        </div>

        {/* stat strip */}
        <dl
          data-speed="1.1"
          className="mt-12 grid max-w-3xl grid-cols-2 gap-px lg:mt-16 overflow-hidden rounded-2xl bg-paper/20 shadow-[0_20px_50px_-30px_rgba(15,17,21,.5)] sm:grid-cols-4"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="bg-ink px-5 py-5">
              <dt className="font-mono text-2xl font-semibold text-volt">
                {stat.value}
              </dt>
              <dd className="mt-1 text-[11px] uppercase tracking-[0.14em] text-paper/70">
                {stat.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* scroll cue */}
      <div className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center">
        <div className="flex h-11 w-6 justify-center rounded-full border border-line pt-2">
          <span className="scroll-hint size-1.5 rounded-full bg-volt" />
        </div>
      </div>
    </ParallaxScene>
  );
}
