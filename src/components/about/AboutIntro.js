import ParallaxScene from "@/components/parallax/ParallaxScene";
import Reveal from "@/components/ui/Reveal";
import BallArt from "@/components/art/BallArt";
import Photo from "@/components/ui/Photo";
import { TwoTone } from "@/components/ui/Heading";
import { aboutIntro, photos, stats } from "@/lib/data";

export default function AboutIntro() {
  return (
    <ParallaxScene
      as="section"
      id="story"
      pointer
      className="relative isolate overflow-hidden py-14 lg:py-20"
    >
      <div
        data-speed="-1.2"
        className="pointer-events-none absolute -left-24 top-10 -z-10 size-96 rounded-full bg-volt/35 blur-[130px]"
      />

      <div className="mx-auto grid w-full max-w-350 grid-cols-1 gap-14 px-5 sm:px-8 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
        <div>
          <Reveal>
            <span className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.22em] text-volt-deep">
              <span className="h-px w-8 bg-volt-deep/40" />
              {aboutIntro.eyebrow}
            </span>
            <h2 className="mt-5 text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.04] tracking-[-0.035em]">
              <TwoTone text={aboutIntro.title} accent={aboutIntro.titleAccent} />
            </h2>
          </Reveal>

          <div className="mt-7 flex flex-col gap-5">
            {aboutIntro.body.map((paragraph, index) => (
              <Reveal key={paragraph.slice(0, 24)} delay={index * 90}>
                <p className="max-w-xl text-[15px] leading-relaxed text-mist">
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>

          <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-line sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-paper px-5 py-5">
                <dt className="font-mono text-2xl font-semibold text-ink">
                  {stat.value}
                </dt>
                <dd className="mt-1 text-[11px] uppercase tracking-[0.14em] text-mist">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* court still-life — a real photograph rather than vector art */}
        <Reveal variant="zoom" className="relative">
          <div className="relative isolate aspect-[4/5] overflow-hidden rounded-3xl border border-line">
            <Photo
              src={photos.courtStill.src}
              alt={photos.courtStill.alt}
              sizes="(max-width: 1024px) 100vw, 45vw"
            />

            {/* scrim so the caption stays legible over any crop */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-ink/75 to-transparent" />

            <div
              data-speed="2.4"
              data-mouse="-40"
              className="absolute bottom-[16%] right-[10%] w-16"
            >
              <div className="float-slow">
                <BallArt id="about-ball" color="#d4ff3f" className="w-full drop-shadow-[0_10px_24px_rgba(0,0,0,.45)]" />
              </div>
            </div>

            <span className="absolute bottom-5 left-6 font-mono text-[11px] text-paper">
              Saturday open play · Koramangala
            </span>
          </div>
        </Reveal>
      </div>
    </ParallaxScene>
  );
}
