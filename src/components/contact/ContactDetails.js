import Reveal from "@/components/ui/Reveal";
import {
  ArrowUpRightIcon,
  ClockIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
} from "@/components/ui/Icons";
import { contact } from "@/lib/data";

const card =
  "rounded-3xl border border-line bg-paper p-6 shadow-[0_1px_2px_rgba(15,17,21,.04)] transition-colors duration-500 hover:border-line-strong";

const heading = "text-[11px] font-semibold uppercase tracking-[0.16em] text-mist";

function Icon({ children }) {
  return (
    <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-volt text-ink">
      {children}
    </span>
  );
}

/** The three blocks a shopper actually looks for: where, how, and when. */
export default function ContactDetails() {
  const dial = `tel:${contact.phone.replace(/\s/g, "")}`;
  const directions = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    contact.mapQuery ?? contact.addressLines.join(", "),
  )}`;

  return (
    <div className="flex flex-col gap-4">
      <Reveal className={card}>
        <div className="flex items-start gap-4">
          <Icon>
            <PinIcon className="size-5" />
          </Icon>
          <div className="min-w-0">
            <p className={heading}>Visit us</p>
            <address className="mt-2.5 text-[15px] not-italic leading-relaxed text-ink">
              {contact.addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
            <a
              href={directions}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-sm text-volt-deep underline-offset-4 hover:underline"
            >
              Get directions
              <ArrowUpRightIcon className="size-3.5" />
            </a>
          </div>
        </div>
      </Reveal>

      <Reveal delay={80} className={card}>
        <div className="flex items-start gap-4">
          <Icon>
            <PhoneIcon className="size-5" />
          </Icon>
          <div className="min-w-0">
            <p className={heading}>Let&rsquo;s talk</p>
            <dl className="mt-2.5 flex flex-col gap-2.5 text-[15px]">
              <div className="flex flex-wrap items-baseline gap-x-2">
                <dt className="text-mist">Phone</dt>
                <dd className="min-w-0">
                  <a
                    href={dial}
                    className="break-words text-ink transition-colors hover:text-volt-deep"
                  >
                    {contact.phone}
                  </a>
                </dd>
              </div>
              <div className="flex flex-wrap items-baseline gap-x-2">
                <dt className="text-mist">Email</dt>
                <dd className="min-w-0">
                  <a
                    href={`mailto:${contact.email}`}
                    className="inline-flex items-center gap-1.5 break-all text-ink transition-colors hover:text-volt-deep"
                  >
                    <MailIcon className="size-3.5 shrink-0 text-volt-deep" />
                    {contact.email}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </Reveal>

      <Reveal delay={160} className={card}>
        <div className="flex items-start gap-4">
          <Icon>
            <ClockIcon className="size-5" />
          </Icon>
          <div className="min-w-0">
            <p className={heading}>Hours of operation</p>
            <p className="mt-2.5 text-[15px] leading-relaxed text-ink">
              {contact.hours}
            </p>
            <p className="mt-1 text-sm text-mist">Closed on Sundays.</p>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
