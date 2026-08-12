import Reveal from "@/components/ui/Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  copy,
  align = "start",
  action,
}) {
  const alignment =
    align === "center" ? "items-center text-center" : "items-start";

  return (
    <div
      className={`flex flex-col gap-8 md:flex-row md:items-end ${
        align === "center" ? "md:flex-col" : "md:justify-between"
      }`}
    >
      <Reveal className={`flex max-w-2xl flex-col ${alignment}`}>
        {eyebrow ? (
          <span className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.22em] text-volt-deep">
            <span className="h-px w-8 bg-volt-deep/40" />
            {eyebrow}
          </span>
        ) : null}
        <h2 className="mt-5 text-[clamp(2.1rem,4.6vw,3.6rem)] font-semibold leading-[1.02] tracking-[-0.035em]">
          {title}
        </h2>
        {copy ? (
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-mist">
            {copy}
          </p>
        ) : null}
      </Reveal>

      {action ? (
        <Reveal delay={120} className="shrink-0">
          {action}
        </Reveal>
      ) : null}
    </div>
  );
}
