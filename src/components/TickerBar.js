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

export default function TickerBar() {
  return (
    <section className="relative z-10 overflow-hidden py-6">
      <div className="rotate-[-1.6deg]">
        <div className="border-y border-volt-deep/30 bg-volt py-3.5 text-ink">
          <Row items={announcements} duration="38s" />
        </div>
      </div>

      <div className="mt-3 rotate-[1.2deg]">
        <div className="border-y border-line bg-surface py-3.5 text-mist">
          <Row items={announcements} direction="reverse" duration="46s" />
        </div>
      </div>
    </section>
  );
}
