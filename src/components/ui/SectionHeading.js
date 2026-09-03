import Reveal from "@/components/ui/Reveal";

/**
 * The one section header on the site.
 *
 * Every homepage section used to roll its own: some called this component,
 * some hand-wrote the same `<h2 className="mt-5 …">` inline, and the ones that
 * did carried the `mt-5` meant to clear an eyebrow whether or not they had an
 * eyebrow above it — so half the headings sat 20px lower than the other half
 * for no reason. Spacing belongs to the element that needs it, so the eyebrow
 * owns the gap under it and the heading owns none.
 *
 * `dark` swaps the palette for the sections that sit on forest.
 */
export default function SectionHeading({
  eyebrow,
  title,
  copy,
  align = "start",
  dark = false,
  action,
}) {
  const centered = align === "center";

  return (
    <div
      className={
        centered
          ? "flex flex-col items-center gap-6 text-center"
          : "flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
      }
    >
      <Reveal
        className={`flex max-w-2xl flex-col ${centered ? "items-center" : "items-start"}`}
      >
        {eyebrow ? (
          <span
            className={`mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] ${
              dark ? "text-volt" : "text-volt-deep"
            }`}
          >
            {/* a short rule rather than a filled chip — the eyebrow is a label
                for the heading, not a badge competing with it */}
            <span
              aria-hidden="true"
              className={`h-px w-7 ${dark ? "bg-volt/50" : "bg-volt-deep/40"}`}
            />
            {eyebrow}
          </span>
        ) : null}

        <h2
          className={`text-[clamp(1.9rem,3.8vw,3rem)] font-semibold leading-[1.06] tracking-[-0.035em] ${
            dark ? "text-paper" : "text-ink"
          }`}
        >
          {title}
        </h2>

        {copy ? (
          <p
            className={`mt-5 max-w-xl text-[15px] leading-relaxed ${
              dark ? "text-paper/70" : "text-mist"
            }`}
          >
            {copy}
          </p>
        ) : null}
      </Reveal>

      {action ? (
        <Reveal delay={100} className="shrink-0">
          {action}
        </Reveal>
      ) : null}
    </div>
  );
}
