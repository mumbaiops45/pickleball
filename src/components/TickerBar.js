import ParallaxScene from "@/components/parallax/ParallaxScene";
import { announcements } from "@/lib/data";

function Row({ items, direction, duration }) {
  // duplicated once so the -50% keyframe loops seamlessly
  const loop = [...items, ...items];

  return (
    <div
      className="marquee-track"
      data-direction={direction}
      style={{ "--marquee-duration": duration }}
    >
      {loop.map((item, index) => (
        <span
          key={`${item}-${index}`}
          className="flex shrink-0 items-center gap-8 whitespace-nowrap px-8 text-sm font-medium uppercase tracking-[0.16em]"
        >
          {item}
          <span className="size-1.5 rounded-full bg-current opacity-40" />
        </span>
      ))}
    </div>
  );
}

/**
 * Two counter-rotated ticker rails. Each rail loops on its own, and the whole
 * band is pushed along the x-axis by scroll position for a layered read.
 */
export default function TickerBar() {
  return (
    <ParallaxScene as="section" className="relative z-10 overflow-hidden py-6">
      <div data-speed-x="1.4" className="rotate-[-1.6deg]">
        <div className="border-y border-volt-deep/30 bg-volt py-3.5 text-ink">
          <Row items={announcements} duration="38s" />
        </div>
      </div>

      <div data-speed-x="-1.9" className="mt-3 rotate-[1.2deg]">
        <div className="border-y border-line bg-surface py-3.5 text-mist">
          <Row items={announcements} direction="reverse" duration="46s" />
        </div>
      </div>
    </ParallaxScene>
  );
}
