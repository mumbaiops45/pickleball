import ParallaxScene from "@/components/parallax/ParallaxScene";
import Logo from "@/components/ui/Logo";
import { partners } from "@/lib/data";

/** Credibility row — our lockup beside the bodies that certify the gear. */
export default function BrandStrip() {
  return (
    <ParallaxScene
      as="section"
      className="border-b border-line bg-paper py-10"
    >
      <div className="mx-auto flex w-full max-w-350 flex-col gap-8 px-5 sm:px-8 lg:flex-row lg:items-center lg:gap-14">
        <div
          data-speed="0.4"
          className="flex shrink-0 items-center gap-4 lg:border-r lg:border-line lg:pr-14"
        >
          <Logo href={null} size="md" tagline="Bengaluru" />
        </div>

        <div data-speed="-0.4" className="min-w-0 flex-1">
          <p className="text-[10px] uppercase tracking-[0.2em] text-mist">
            Approved, played and stocked by
          </p>
          <ul className="mt-4 flex flex-wrap items-center gap-x-10 gap-y-5">
            {partners.map((partner) => (
              <li key={partner.name} className="group">
                <p className="font-mono text-[13px] font-semibold tracking-[0.12em] text-ink transition-colors group-hover:text-volt-deep">
                  {partner.name}
                </p>
                <p className="mt-0.5 text-[11px] text-mist">{partner.note}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </ParallaxScene>
  );
}
