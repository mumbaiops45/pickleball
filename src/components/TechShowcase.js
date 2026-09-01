import ParallaxScene from "@/components/parallax/ParallaxScene";
import Reveal from "@/components/ui/Reveal";
import PaddleArt from "@/components/art/PaddleArt";
import BallArt from "@/components/art/BallArt";
import { LAYER_ART } from "@/components/art/LayerArt";
import { brand, paddleLayers, paddleSpecs } from "@/lib/data";
import { Accent } from "@/components/ui/Heading";


export default function TechShowcase() {
  return (
    <ParallaxScene
      as="section"
      id="tech"
      pointer
      className="grain relative isolate overflow-hidden bg-paper py-12 lg:py-20"
    >
      {/* plane 1 - light */}
      <div
        data-speed="-1.4"
        className="pointer-events-none absolute left-1/2 top-0 -z-30 -ml-70 h-140 w-140 rounded-full bg-volt/45 blur-[140px]"
      />

      <div className="relative mx-auto grid w-full max-w-350 grid-cols-1 items-center gap-16 px-5 sm:px-8 lg:grid-cols-12">

        {/* copy */}
        <div className="lg:col-span-5">
          <Reveal>
            <span className="flex items-center text-[11px] font-medium uppercase tracking-[0.22em] text-volt-deep">
              The technology
            </span>
            <h2 className="mt-5 text-[clamp(2.1rem,4.6vw,3.6rem)] font-semibold leading-[1.02] tracking-[-0.035em]">
              Every gram is <Accent>deliberate</Accent>.
            </h2>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-mist">
              We press each face at 240&deg;C, fill the perimeter walls with
              closed-cell foam and hand-balance the finished paddle to a swing
              weight window of &plusmn;3. That is why the sweet spot does not
              fall off at the edge.
            </p>

            {/* the claim the paragraph above has just earned */}
            <p className="mt-7 text-[11px] font-semibold uppercase tracking-[0.2em] text-volt-deep">
              {brand.taglines.performance}
            </p>
          </Reveal>

          <dl className="mt-10 flex flex-col">
            {paddleSpecs.map((spec, index) => (
              <Reveal
                key={spec.label}
                delay={index * 90}
                className="group flex flex-col gap-1 border-t border-line py-5 last:border-b sm:flex-row sm:gap-6"
              >
                <dt className="shrink-0 text-[11px] uppercase tracking-[0.16em] text-mist sm:w-32">
                  {spec.label}
                </dt>
                <dd>
                  <p className="font-mono text-sm text-ink transition-colors duration-300 group-hover:text-volt-deep">
                    {spec.value}
                  </p>
                  <p className="mt-1 text-[13px] leading-relaxed text-mist">
                    {spec.note}
                  </p>
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>

        {/* paddle stage */}
        <div className="relative flex min-h-90 items-center justify-center lg:col-span-7 lg:min-h-125">
          <div
            data-speed="-0.7"
            data-rotate="6"
            className="absolute inset-0 -z-10 grid place-items-center"
          >
            <div className="spin-slow size-100 rounded-full border border-dashed border-line" />
          </div>

          <div
            data-speed="1.9"
            data-rotate="-6"
            data-mouse="34"
            className="relative w-[62%] max-w-100 min-w-52"
          >
            <PaddleArt
              id="tech-paddle"
              face="#d4ff3f"
              texture="honeycomb"
              className="w-full drop-shadow-[0_60px_80px_rgba(15,17,21,.13)]"
            />
          </div>

          {/* exploded callouts */}
          <span
            data-speed="2.9"
            data-mouse="60"
            className="absolute left-[4%] top-[16%] hidden items-center gap-3 sm:flex"
          >
            <span className="rounded-full border border-line-strong bg-paper/85 px-4 py-2 font-mono text-[11px] tracking-wide text-ink shadow-[0_8px_24px_-12px_rgba(15,17,21,.25)] backdrop-blur">
              Peel-ply grit face
            </span>
            <span className="h-px w-12 bg-linear-to-r from-line to-volt-deep" />
          </span>

          <span
            data-speed="3.6"
            data-mouse="-48"
            className="absolute right-[2%] top-[46%] hidden items-center gap-3 sm:flex"
          >
            <span className="h-px w-12 bg-linear-to-l from-line to-volt-deep" />
            <span className="rounded-full border border-line-strong bg-paper/85 px-4 py-2 font-mono text-[11px] tracking-wide text-ink shadow-[0_8px_24px_-12px_rgba(15,17,21,.25)] backdrop-blur">
              Foam-injected walls
            </span>
          </span>

          <span
            data-speed="2.2"
            data-mouse="52"
            className="absolute bottom-[12%] left-[14%] hidden items-center gap-3 sm:flex"
          >
            <span className="rounded-full border border-line-strong bg-paper/85 px-4 py-2 font-mono text-[11px] tracking-wide text-ink shadow-[0_8px_24px_-12px_rgba(15,17,21,.25)] backdrop-blur">
              Unibody handle
            </span>
            <span className="h-px w-12 bg-linear-to-r from-line to-volt-deep" />
          </span>

          <div
            data-speed="4.4"
            data-mouse="80"
            className="absolute -left-2 bottom-[26%] w-14 sm:w-20"
          >
            <div className="float-slower">
              <BallArt id="tech-ball" color="#ff5c2b" className="w-full" />
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------- the build, layer by layer */}
      <div className="relative mx-auto mt-16 w-full max-w-350 px-5 sm:px-8 lg:mt-24">
        <Reveal className="border-t border-line pt-10 text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-volt-deep">
            The build
          </p>
          <h3 className="mt-4 text-[clamp(1.6rem,3vw,2.4rem)] font-semibold leading-[1.06] tracking-[-0.035em]">
            Five layers, <Accent>outside in</Accent>.
          </h3>
          <p className="mx-auto mt-4 max-w-xl text-[14px] leading-relaxed text-mist">
            A paddle is a laminate. What separates ours is what happens between
            the face you can see and the core you cannot.
          </p>
        </Reveal>

        {/* Cards rather than table rows. The old layout put a three-word title
            in a 15rem column and its sentence 448px away, so every row read as
            two stranded fragments across a very wide container. A card binds
            each layer's icon, name and explanation into one block.

            The face spans two columns, which both gives the outermost layer
            the emphasis "outside in" implies and fills the grid exactly:
            2 cols -> [01][01] / [02][03] / [04][05]
            3 cols -> [01][01][02] / [03][04][05]
            No orphan cell at either width. */}
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {paddleLayers.map((layer, index) => {
            const Art = LAYER_ART[layer.art];
            const lead = index === 0;

            return (
              <li
                key={layer.id}
                className={`flex flex-col rounded-3xl border border-line p-6 ${
                  lead ? "bg-surface sm:col-span-2" : "bg-paper"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <span
                    className={`grid shrink-0 place-items-center rounded-2xl ${
                      lead
                        ? "size-16 bg-volt text-ink"
                        : "size-14 bg-surface text-volt-deep"
                    }`}
                  >
                    {Art ? <Art className={lead ? "size-9" : "size-8"} /> : null}
                  </span>
                  <span className="font-mono text-[11px] tracking-[0.2em] text-line-strong">
                    {layer.index}
                  </span>
                </div>

                <p
                  className={`mt-6 font-semibold tracking-tight ${
                    lead ? "text-xl" : "text-[16px]"
                  }`}
                >
                  {layer.title}
                </p>
                <p className="mt-2 max-w-prose text-[13px] leading-relaxed text-mist">
                  {layer.copy}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </ParallaxScene>
  );
}
