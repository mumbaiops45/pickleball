import Image from "next/image";
import { CheckIcon, MailIcon, PhoneIcon, PinIcon } from "@/components/ui/Icons";
import { certification } from "@/lib/data";
import { Accent } from "@/components/ui/Heading";

const { authorisation, conditioning, lab, tests } = certification;

/* --------------------------------------------------------------- fragments */

/**
 * Section label. The report uses a brown caption bar over every block; that
 * reads as a photocopy against this site's palette, so the same job is done
 * with the rule-and-eyebrow the rest of the pages use.
 */
function Eyebrow({ children }) {
  return (
    <p className="flex items-center text-[11px] font-medium uppercase tracking-[0.22em] text-volt-deep">
      {children}
    </p>
  );
}

/** One headline figure. Three of these carry the result of a test. */
function Stat({ label, value, tone = "ink" }) {
  const colour =
    tone === "pass"
      ? "text-volt-deep"
      : tone === "warn"
        ? "text-clay"
        : "text-ink";

  return (
    <div className="rounded-3xl border border-line bg-surface px-6 py-5">
      <p className="text-[11px] uppercase tracking-[0.16em] text-mist">
        {label}
      </p>
      <p className={`mt-2 font-mono text-[clamp(1.1rem,2vw,1.5rem)] leading-tight tracking-tight ${colour}`}>
        {value}
      </p>
    </div>
  );
}

function Gallery({ items, columns = "sm:grid-cols-3" }) {
  return (
    <div className={`grid grid-cols-2 gap-3 ${columns}`}>
      {items.map((photo) => (
        <figure
          key={photo.src}
          className="group overflow-hidden rounded-2xl border border-line bg-surface transition-all duration-500 hover:border-line-strong hover:shadow-[0_18px_36px_-24px_rgba(15,17,21,.3)]"
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            width={900}
            height={800}
            sizes="(min-width: 640px) 28vw, 45vw"
            className="aspect-4/3 w-full object-contain transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.03]"
          />
        </figure>
      ))}
    </div>
  );
}

/** The laboratory's Remarks line, quoted rather than restated. */
function Remark({ children }) {
  return (
    <figure className="mt-10 border-l-2 border-volt-deep bg-surface py-5 pl-6 pr-5">
      <figcaption className="text-[11px] font-semibold uppercase tracking-[0.18em] text-volt-deep">
        Laboratory remarks
      </figcaption>
      <blockquote className="mt-2.5 max-w-3xl text-[15px] leading-relaxed text-ink">
        {children}
      </blockquote>
    </figure>
  );
}

/* ------------------------------------------------------------ page bodies */

/** Page 1 — Order and Sample Description, the laboratory, the disclaimer. */
function OrderBody() {
  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
      <div>
        <Eyebrow>Order and sample description</Eyebrow>

        <dl className="mt-6 rounded-3xl border border-line bg-surface px-6">
          {certification.order.map((row) => (
            <div
              key={row.label}
              className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 border-b border-line py-3.5 last:border-b-0"
            >
              <dt className="text-[12px] uppercase tracking-[0.14em] text-mist">
                {row.label}
              </dt>
              <dd className="text-right text-[14px] font-medium text-ink">
                {row.value}

                {/* the customer block runs to three lines in the report; the
                    number and address are made dialable rather than flat text */}
                {row.phone ? (
                  <a
                    href={`tel:${row.phone.replace(/\s/g, "")}`}
                    className="mt-0.5 block text-[13px] font-normal text-mist transition-colors hover:text-volt-deep"
                  >
                    Mobile No. {row.phone}
                  </a>
                ) : null}

                {row.email ? (
                  <a
                    href={`mailto:${row.email}`}
                    className="block text-[13px] font-normal text-mist transition-colors hover:text-volt-deep"
                  >
                    {row.email}
                  </a>
                ) : null}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div>
        <div className="flex items-center gap-5">
          {certification.marks.map((mark) => (
            <Image
              key={mark.id}
              src={mark.src}
              alt={mark.alt}
              width={112}
              height={112}
              className="size-16 w-auto object-contain"
            />
          ))}
        </div>

        <p className="mt-6 text-[17px] font-semibold tracking-tight text-ink">
          {lab.name}
        </p>
        <p className="mt-1 text-[13px] leading-relaxed text-mist">{lab.role}</p>

        <address className="mt-6 flex flex-col gap-3.5 text-[13px] not-italic">
          <span className="flex gap-3 text-mist">
            <PinIcon className="mt-0.5 size-4 shrink-0 text-volt-deep" />
            <span>
              {lab.addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </span>
          </span>
          <a
            href={`tel:${lab.phone.replace(/\s/g, "")}`}
            className="flex items-center gap-3 text-mist transition-colors hover:text-volt-deep"
          >
            <PhoneIcon className="size-4 shrink-0 text-volt-deep" />
            {lab.phone}
          </a>
          <a
            href={`mailto:${lab.email}`}
            className="flex items-center gap-3 text-mist transition-colors hover:text-volt-deep"
          >
            <MailIcon className="size-4 shrink-0 text-volt-deep" />
            {lab.email}
          </a>
          <a
            href={lab.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-volt-deep underline-offset-4 hover:underline"
          >
            {lab.website}
          </a>
        </address>

        <p className="mt-8 rounded-3xl border border-line bg-surface p-6 text-[12px] leading-relaxed text-mist">
          <span className="font-semibold text-ink">Disclaimer. </span>
          {certification.disclaimer}
        </p>
      </div>
    </div>
  );
}

/** Pages 2 to 6 — the result, then every reading, then the photographs. */
function TestBody({ id }) {
  const test = tests.find((entry) => entry.id === id);
  if (!test) return null;

  // page 3 is a go / no-go check: no series, no average, no range
  const isGauge = Boolean(test.gauges);

  return (
    <div>
      {/* the result, before the working */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {isGauge ? (
          <>
            {test.gauges.map((row) => (
              <Stat key={row.gauge} label={row.gauge} value={row.result} tone="pass" />
            ))}
            <Stat label="Pass (Y / N)" value={test.pass} tone="pass" />
          </>
        ) : (
          <>
            <Stat label={test.average.code} value={test.average.value} tone="pass" />
            <Stat label="Compliance range" value={test.compliance} />
            <Stat
              label="Pass (Y / N)"
              value={test.pass}
              tone={test.passed ? "pass" : "warn"}
            />
          </>
        )}
      </div>

      {/* Every reading the lab recorded, as tiles rather than a long bordered
          table — fifteen table rows on a phone is a scroll, fifteen tiles is a
          glance, and the figures are unchanged either way. */}
      {test.rows ? (
        <div className="mt-12">
          <Eyebrow>
            {test.columns[1]} · {test.rows.length} readings
          </Eyebrow>

          {/* Two alternating tones down the series. Fifteen identical tiles
              blur into one block; banding them makes it possible to track a
              row across the grid and to spot a reading that sits apart. */}
          <ol className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
            {test.rows.map((row, index) => (
              <li
                key={row.code}
                className={`rounded-2xl border px-4 py-3.5 transition-colors duration-300 hover:border-volt-deep ${
                  index % 2 === 0
                    ? "border-line bg-paper"
                    : "border-line-strong/35 bg-surface"
                }`}
              >
                <span className="block font-mono text-[11px] uppercase tracking-[0.14em] text-line-strong">
                  {row.code}
                </span>
                <span className="mt-1 block font-mono text-[15px] text-ink">
                  {row.value}
                </span>
              </li>
            ))}

            <li className="rounded-2xl border border-volt-deep bg-volt px-4 py-3.5">
              <span className="block font-mono text-[11px] uppercase tracking-[0.14em] text-ink/60">
                {test.average.code}
              </span>
              <span className="mt-1 block font-mono text-[15px] font-semibold text-ink">
                {test.average.value}
              </span>
            </li>
          </ol>
        </div>
      ) : null}

      {/* photographs */}
      <div className="mt-12">
        <Eyebrow>{test.photoCaption}</Eyebrow>
        <div className="mt-5">
          <Gallery
            items={test.photos}
            columns={test.photos.length > 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"}
          />
        </div>

        {test.charts ? (
          <div className="mt-8">
            <Eyebrow>Load versus displacement</Eyebrow>
            <div className="mt-5">
              <Gallery items={test.charts} columns="sm:grid-cols-2" />
            </div>
          </div>
        ) : null}
      </div>

      <Remark>{test.remark}</Remark>
    </div>
  );
}

/** Page 7 — conditioning, the chamber, and the instruments. */
function ConditioningBody() {
  return (
    <div>
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div>
          <Eyebrow>{conditioning.title}</Eyebrow>

          <dl className="mt-6 flex flex-col gap-3">
            {conditioning.rows.map((row) => (
              <div
                key={row.label}
                className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 rounded-3xl border border-line bg-surface px-6 py-4"
              >
                <dt className="text-[13px] font-medium text-ink">{row.label}</dt>
                <dd className="flex items-baseline gap-4">
                  <span className="font-mono text-[15px] text-volt-deep">
                    {row.actual}
                  </span>
                  <span className="font-mono text-[12px] text-mist">
                    of {row.required}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div>
          <Eyebrow>Stability chamber</Eyebrow>
          <div className="mt-5">
            <Gallery items={conditioning.photos} columns="sm:grid-cols-2" />
          </div>
        </div>
      </div>

      <div className="mt-14">
        <Eyebrow>Instruments used for testing</Eyebrow>

        {/* the table scrolls inside its own box rather than the page */}
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-140 text-left">
            <thead>
              <tr className="border-y border-line text-[11px] uppercase tracking-[0.16em] text-mist">
                {certification.instrumentColumns.map((column) => (
                  <th key={column} scope="col" className="py-3.5 pr-6 font-medium">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {certification.instruments.map((item) => (
                <tr
                  key={item.name}
                  className="border-b border-line transition-colors hover:bg-surface"
                >
                  <td className="py-3.5 pr-6 text-[14px] font-medium text-ink">
                    {item.name}
                  </td>
                  <td className="py-3.5 pr-6 font-mono text-[13px] text-mist">
                    {item.model}
                  </td>
                  <td className="py-3.5 pr-6 text-[13px] text-mist">{item.make}</td>
                  <td className="py-3.5 font-mono text-[13px] text-ink">
                    {item.calibrated}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <ul className="mt-6 flex flex-col gap-1.5">
          {certification.footnotes.map((note) => (
            <li key={note} className="text-[12px] text-mist">
              * {note}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** Page 8 — the certificate. */
function CertificateBody() {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="grain relative isolate overflow-hidden rounded-4xl border border-volt-deep/25 bg-[radial-gradient(120%_120%_at_50%_-20%,#f4ffd6_0%,#fbfaf6_60%,#ffffff_100%)] px-6 py-12 text-center sm:px-14 sm:py-16">
        <span className="pointer-events-none absolute -right-20 -top-24 -z-10 size-72 rounded-full bg-volt/40 blur-[120px]" />

        <div className="flex items-center justify-center gap-7">
          {certification.marks.map((mark) => (
            <Image
              key={mark.id}
              src={mark.src}
              alt={mark.alt}
              width={128}
              height={128}
              className="size-18 w-auto object-contain sm:size-22"
            />
          ))}
        </div>

        <h2 className="mt-9 text-[clamp(1.6rem,3.4vw,2.4rem)] font-semibold leading-tight tracking-[-0.035em]">
          <Accent>{authorisation.title}</Accent>
        </h2>

        <p className="mt-7 text-[13px] uppercase tracking-[0.2em] text-mist">
          {authorisation.lead}
        </p>

        {/* Model, manufacturer and the term of the authorisation carry the
            emphasis the certificate gives them. */}
        <p className="mx-auto mt-5 max-w-2xl text-[clamp(0.95rem,1.6vw,1.1rem)] leading-relaxed text-ink">
          {authorisation.bodyParts.map((part, index) =>
            part.strong ? (
              <strong
                key={index}
                className="font-semibold text-volt-deep"
              >
                {part.text}
              </strong>
            ) : (
              <span key={index}>{part.text}</span>
            ),
          )}
        </p>

        <div className="mx-auto mt-10 grid max-w-md grid-cols-2 gap-px overflow-hidden rounded-3xl border border-volt-deep/25 bg-volt-deep/20">
          <div className="bg-paper px-5 py-4">
            <p className="text-[11px] uppercase tracking-[0.16em] text-mist">
              Place
            </p>
            <p className="mt-1 text-[14px] font-medium text-ink">
              {authorisation.place}
            </p>
          </div>
          <div className="bg-paper px-5 py-4">
            <p className="text-[11px] uppercase tracking-[0.16em] text-mist">
              Date
            </p>
            <p className="mt-1 text-[14px] font-medium text-ink">
              {authorisation.date}
            </p>
          </div>
        </div>

        {/* Signed off as the report signs off: the Brainwave line is a script
            face in the document, the AIPA line a scan. Each is reproduced in
            kind rather than both being flattened to one treatment. */}
        <div className="mt-12 grid grid-cols-1 gap-10 border-t border-volt-deep/20 pt-9 text-left sm:grid-cols-2">
          {authorisation.signatories.map((person) => (
            <div key={person.name}>
              <p className="text-[11px] uppercase tracking-[0.16em] text-mist">
                {person.heading.replace(/:$/, "")}
              </p>
              <p className="mt-2 flex items-center gap-2 text-[15px] font-semibold text-ink">
                <CheckIcon className="size-4 shrink-0 text-volt-deep" />
                {person.name}
              </p>
              <p className="mt-1 text-[12px] text-mist">{person.role}</p>

              <div className="mt-4 flex h-16 items-end">
                <Image
                  src={person.signatureImage}
                  alt={person.signatureAlt}
                  width={1132}
                  height={391}
                  // each render carries a white card behind it; multiply drops
                  // the ink onto the certificate ground without a hard edge
                  className="h-14 w-auto object-contain mix-blend-multiply"
                />
              </div>

              <span className="mt-2 block h-px w-full max-w-56 bg-line-strong/50" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const BODIES = {
  order: OrderBody,
  conditioning: ConditioningBody,
  certificate: CertificateBody,
};

/**
 * Renders one page of the AIPA report.
 *
 * Server-only by design — nothing here holds state, so keeping it out of the
 * client bundle costs nothing and saves shipping five tables and twenty-six
 * photographs worth of markup twice.
 */
export default function ReportBody({ entry }) {
  const Body = BODIES[entry.body];
  return Body ? <Body /> : <TestBody id={entry.id} />;
}
