import ContactForm from "@/components/contact/ContactForm";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { Accent } from "@/components/ui/Heading";
import {
  ClockIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
} from "@/components/ui/Icons";
import { contact } from "@/lib/data";

/**
 * The enquiry form, on the home page.
 *
 * Every route into it before this went to /contact — the hero's second button,
 * the FAQ's "Contact support", the club-pricing link on the court band — so a
 * bulk buyer who wanted a quote had to leave the page they were being sold on
 * to ask for one. The form itself is the one already built for /contact,
 * rendered with its own heading suppressed because this section supplies it.
 *
 * The details column is not decoration: a club or a school placing a case
 * order usually rings rather than types, and the number has to be next to the
 * form rather than only in the footer.
 */
const DETAILS = [
  {
    icon: PhoneIcon,
    label: "Call us",
    value: contact.phone,
    href: `tel:${contact.phone.replace(/\s/g, "")}`,
    note: contact.phoneAlt,
    noteHref: `tel:${contact.phoneAlt.replace(/\s/g, "")}`,
  },
  {
    icon: MailIcon,
    label: "Email",
    value: contact.email,
    href: `mailto:${contact.email}`,
  },
  {
    icon: PinIcon,
    label: "Where we are",
    value: contact.addressLines.join(", "),
  },
  {
    icon: ClockIcon,
    label: "Open",
    value: contact.hours,
  },
];

export default function HomeContact() {
  return (
    <section id="contact" className="section bg-paper">
      <div className="shell">
        <SectionHeading
          align="center"
          eyebrow="Get in touch"
          title={
            <>
              Talk to a person, <Accent>not a ticket queue</Accent>.
            </>
          }
          copy="Case quantities for a club, a spec sheet for a tournament, or a question about an order already on its way — one of us reads it and answers inside a working day."
        />

        <div className="mt-9 grid grid-cols-1 items-stretch gap-8 lg:mt-12 lg:grid-cols-12 lg:gap-12">
          {/* ------------------------------------------------- the details */}
          <Reveal variant="left" className="lg:col-span-4">
            {/* h-full and a flex-1 row: left to their natural height the four
                rows ended 200px above the foot of the form beside them, so the
                two columns of one section closed on different lines. */}
            <ul className="flex h-full flex-col gap-px overflow-hidden rounded-2xl border border-line bg-line">
              {DETAILS.map((row) => {
                const Icon = row.icon;
                return (
                  <li
                    key={row.label}
                    className="flex flex-1 items-start gap-4 bg-surface px-6 py-5"
                  >
                    <span className="mt-0.5 grid size-10 shrink-0 place-items-center rounded-xl bg-paper text-volt-deep">
                      <Icon className="size-4.5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-mist">
                        {row.label}
                      </span>
                      {row.href ? (
                        <a
                          href={row.href}
                          className="mt-1 block wrap-break-word text-sm font-medium text-ink transition-colors hover:text-volt-deep"
                        >
                          {row.value}
                        </a>
                      ) : (
                        <span className="mt-1 block text-sm leading-relaxed text-ink">
                          {row.value}
                        </span>
                      )}
                      {row.note ? (
                        <a
                          href={row.noteHref}
                          className="mt-1 block text-sm text-mist transition-colors hover:text-volt-deep"
                        >
                          {row.note}
                        </a>
                      ) : null}
                    </span>
                  </li>
                );
              })}
            </ul>
          </Reveal>

          {/* ---------------------------------------------------- the form */}
          <Reveal variant="right" delay={80} className="lg:col-span-8">
            <ContactForm
              title={null}
              className="rounded-2xl border border-line bg-surface p-6 sm:p-8"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
