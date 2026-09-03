import PageHero from "@/components/ui/PageHero";
import ContactDetails from "@/components/contact/ContactDetails";
import ContactForm from "@/components/contact/ContactForm";
import Reveal from "@/components/ui/Reveal";
import { contact } from "@/lib/data";

export const metadata = {
  title: "Contact us",
  description: `Talk to PICKLEBALL — call ${contact.phone}, write to ${contact.email}, or send an enquiry and we will answer inside a working day.`,
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="We answer in a day"
        title="Contact us"
        titleAccent="us"
        copy="Whether it is an order that has not moved, a ball you are not sure about or kit for a whole club — one of us reads every message."
        crumbs={[{ label: "Contact" }]}
      />

      <section className="section bg-surface">
        <div className="shell grid grid-cols-1 gap-10 lg:grid-cols-[1fr_400px] lg:gap-14">
          <Reveal variant="left" className="min-w-0">
            <ContactForm className="rounded-2xl border border-line bg-paper p-6 shadow-[0_1px_2px_rgba(15,17,21,.04)] sm:p-8" />
          </Reveal>

          <Reveal
            as="aside"
            variant="right"
            delay={80}
            className="min-w-0 lg:sticky lg:top-32 lg:self-start"
          >
            <ContactDetails />
          </Reveal>
        </div>
      </section>
    </>
  );
}
