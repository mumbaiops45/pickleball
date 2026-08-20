import PageHero from "@/components/ui/PageHero";
import ContactDetails from "@/components/contact/ContactDetails";
import ContactForm from "@/components/contact/ContactForm";
import { contact } from "@/lib/data";

export const metadata = {
  title: "Contact us",
  description: `Talk to PADDLEHAUS — call ${contact.phone}, write to ${contact.email}, or send an enquiry and we will answer inside a working day.`,
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="We answer in a day"
        title="Contact us"
        titleAccent="us"
        copy="Whether it is an order that has not moved, a paddle you are not sure about or kit for a whole club — one of us reads every message."
        crumbs={[{ label: "Contact" }]}
      />

      <section className="mx-auto grid w-full max-w-350 grid-cols-1 gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[1fr_400px] lg:gap-14 lg:py-16">
        <div className="min-w-0">
          <ContactForm />
        </div>

        <aside className="min-w-0 lg:sticky lg:top-32 lg:self-start">
          <ContactDetails />
        </aside>
      </section>
    </>
  );
}
