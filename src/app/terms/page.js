import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import { Accent } from "@/components/ui/Heading";
import { contact } from "@/lib/data";

export const metadata = {
  title: "Terms and conditions",
  description:
    "The terms you agree to when you buy from PADDLEHAUS — pricing, delivery, the 30-day play test, the warranty and how disputes are handled.",
};

/** Shown in the hero and at the foot. Update it whenever the copy changes. */
const UPDATED = "19 August 2026";

/* Kept in step with the numbers the checkout actually applies:
   FREE_SHIPPING_THRESHOLD and SHIPPING_FLAT in CartProvider, GST_RATE and
   MAX_PER_LINE alongside them. Change these together or the page lies. */
const FREE_SHIPPING_OVER = "₹2,499";
const FLAT_SHIPPING = "₹99";
const MAX_PER_LINE = 20;
const GST_RATE = "18%";
const PLAY_TEST_DAYS = 30;

const TOC = [
  { id: "who-we-are", title: "Who you are buying from" },
  { id: "account", title: "Your account" },
  { id: "orders", title: "Placing an order" },
  { id: "prices", title: "Prices and tax" },
  { id: "payment", title: "Payment" },
  { id: "delivery", title: "Delivery" },
  { id: "play-test", title: "The 30-day play test" },
  { id: "warranty", title: "Warranty" },
  { id: "cancellation", title: "Cancelling an order" },
  { id: "conduct", title: "Using the site" },
  { id: "content", title: "Our content" },
  { id: "liability", title: "Liability" },
  { id: "law", title: "Governing law" },
  { id: "contact", title: "Contact" },
];

function Section({ id, title, children }) {
  return (
    <section id={id} className="scroll-mt-32 border-t border-line pt-10">
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      <div className="mt-4 flex flex-col gap-4 text-[15px] leading-relaxed text-mist">
        {children}
      </div>
    </section>
  );
}

function List({ items }) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((item) => (
        <li key={item.term} className="flex gap-3">
          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-volt-deep" />
          <span>
            <span className="font-medium text-ink">{item.term}</span> —{" "}
            {item.copy}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow={`Last updated ${UPDATED}`}
        title="Terms and conditions"
        titleAccent="and conditions"
        copy="What you agree to when you buy from us, and what we owe you in return. Plain terms, and the same ones our checkout actually applies."
        crumbs={[{ label: "Terms" }]}
      />

      <div className="mx-auto w-full max-w-3xl px-5 py-12 sm:px-8 lg:py-16">
        <nav
          aria-label="On this page"
          className="rounded-3xl border border-line bg-surface p-6"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-mist">
            On this page
          </p>
          <ul className="mt-4 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
            {TOC.map((entry) => (
              <li key={entry.id}>
                <a
                  href={`#${entry.id}`}
                  className="text-sm text-ink underline-offset-4 transition-colors hover:text-volt-deep hover:underline"
                >
                  {entry.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <p className="mt-10 text-[15px] leading-relaxed text-mist">
          Placing an order means you accept these terms. They sit alongside our{" "}
          <Link
            href="/privacy-policy"
            className="text-volt-deep underline-offset-4 hover:underline"
          >
            privacy policy
          </Link>
          , which covers what we do with your details.
        </p>

        <div className="mt-10 flex flex-col gap-10">
          <Section id="who-we-are" title="Who you are buying from">
            <p>
              PADDLEHAUS sells pickleball paddles, balls, footwear, apparel and
              accessories in India, from {contact.addressLines.join(", ")}. In
              these terms, &ldquo;we&rdquo; is PADDLEHAUS and &ldquo;you&rdquo;
              is the person placing the order.
            </p>
          </Section>

          <Section id="account" title="Your account">
            <p>
              You can browse without an account, but ordering needs one. Keep
              your password to yourself: anything done through your account is
              treated as done by you, so tell us straight away if you think
              someone else has got into it.
            </p>
            <p>
              Give us details that are true and current — a wrong phone number
              or pincode is the most common reason a parcel does not arrive. You
              can close your account whenever you like.
            </p>
          </Section>

          <Section id="orders" title="Placing an order">
            <p>
              An order is an offer to buy. It is accepted when we confirm
              dispatch, not when the payment goes through — until then we may
              decline it and refund you in full. The reasons we would:
            </p>
            <List
              items={[
                {
                  term: "Stock",
                  copy: "the item sold out between your order and our picking it.",
                },
                {
                  term: "Pricing errors",
                  copy: "a price was listed so far below its real value that the mistake was obvious. We will tell you and refund rather than quietly ship nothing.",
                },
                {
                  term: "Delivery area",
                  copy: "our couriers do not serve the pincode.",
                },
                {
                  term: "Resale in bulk",
                  copy: `orders that look like stock-buying for resale. The cart allows up to ${MAX_PER_LINE} of one item per line for this reason.`,
                },
              ]}
            />
          </Section>

          <Section id="prices" title="Prices and tax">
            <p>
              Prices are in Indian rupees and include {GST_RATE} GST — the tax
              shown at checkout is the portion already inside the price, not an
              amount added on top. A tax invoice goes out with the order.
            </p>
            <p>
              Struck-through prices are our own earlier or list price for that
              product, not another seller&apos;s. Prices can change at any time;
              the one that applies to you is the one shown when you order.
            </p>
          </Section>

          <Section id="payment" title="Payment">
            <p>
              Pay online by UPI, card, netbanking or wallet, or pay the courier
              in cash on delivery. Online payments are handled by our payment
              gateway on its own systems — we never see or store your card or
              UPI credentials.
            </p>
            <p>
              If an online payment does not complete, the order stays with us as
              unpaid and nothing ships until it settles. Refunds go back the way
              you paid, usually within five to seven working days of us
              approving them; cash-on-delivery refunds go to a bank account you
              give us.
            </p>
          </Section>

          <Section id="delivery" title="Delivery">
            <p>
              Shipping is free on orders over {FREE_SHIPPING_OVER} and{" "}
              {FLAT_SHIPPING} below that. Orders placed before 2pm IST are
              dispatched the same working day where stock allows.
            </p>
            <p>
              Delivery dates are estimates, not promises: once a parcel is with
              the courier its progress is theirs. Risk in the goods passes to
              you on delivery. If a parcel arrives damaged, photograph it before
              opening and tell us within 48 hours so we can claim against the
              courier.
            </p>
          </Section>

          <Section id="play-test" title={`The ${PLAY_TEST_DAYS}-day play test`}>
            <p>
              Play with it. Indoors, outdoors, in a tournament — it does not
              matter. If a product does not suit your game within{" "}
              {PLAY_TEST_DAYS} days of delivery, tell us and we will email a
              prepaid return label and refund the full amount once it reaches
              us.
            </p>
            <p>
              Grit wear from real play does not void this. What does: a product
              returned without its packaging, deliberate damage, and items that
              cannot be resold or re-donated for hygiene reasons — socks,
              innerwear and grips that have been unsealed. Footwear needs to
              come back with its box.
            </p>
          </Section>

          <Section id="warranty" title="Warranty">
            <p>
              Edge-guard failure and core delamination on our own paddles are
              covered for the life of the paddle. Send a photo and we ship a
              replacement without asking for the old paddle back first.
            </p>
            <p>
              The warranty covers manufacturing faults, not ordinary wear,
              stringing of the face from court grit, damage from a dropped or
              thrown paddle, or a paddle that has been modified. Products from
              other brands carry that brand&apos;s own warranty, which we will
              help you claim.
            </p>
          </Section>

          <Section id="cancellation" title="Cancelling an order">
            <p>
              You can cancel before dispatch for a full refund — write to us and
              we will stop it if it has not left. After dispatch, treat it as a
              return under the play test above.
            </p>
          </Section>

          <Section id="conduct" title="Using the site">
            <p>
              Use the site to shop, not to scrape it, break it, or resell what
              it shows. Automated bulk access, attempts to reach another
              shopper&apos;s account or order, and anything designed to disrupt
              the service are not allowed and may end your account.
            </p>
          </Section>

          <Section id="content" title="Our content">
            <p>
              The PADDLEHAUS name, the product photography, the copy and the
              site design belong to us. Read them, share a link, quote a line —
              but do not republish them as your own or use our name on your own
              products.
            </p>
          </Section>

          <Section id="liability" title="Liability">
            <p>
              We stand behind what we sell: if a product is faulty or not as
              described, you get a repair, replacement or refund. Nothing in
              these terms limits your rights under the Consumer Protection Act,
              2019, or our liability for death or personal injury caused by our
              negligence, or for fraud.
            </p>
            <p>
              Beyond that, our liability for any order is limited to what you
              paid for it, and we are not liable for indirect losses — missed
              matches, lost earnings, or a tournament you could not enter.
              Pickleball carries the ordinary risk of a sport played at speed;
              equipment we sell does not change that.
            </p>
          </Section>

          <Section id="law" title="Governing law">
            <p>
              These terms are governed by the laws of India, and the courts at
              Bengaluru, Karnataka have jurisdiction over any dispute. Please
              write to us first — almost everything is settled faster over email
              than anywhere else.
            </p>
            <p>
              If any part of these terms turns out to be unenforceable, the rest
              still stands. We may update these terms; the date at the top moves
              when we do, and the version in force is the one published when you
              order.
            </p>
          </Section>

          <Section id="contact" title="Contact">
            <div className="rounded-3xl border border-line bg-surface p-6 text-sm text-ink">
              <p className="font-semibold">PADDLEHAUS</p>
              <p className="mt-2 text-mist">
                {contact.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
              <p className="mt-3">
                <a
                  href={`mailto:${contact.email}`}
                  className="text-volt-deep underline-offset-4 hover:underline"
                >
                  {contact.email}
                </a>
              </p>
              <p className="mt-1 text-mist">{contact.phone}</p>
              <p className="mt-1 text-xs text-mist">{contact.hours}</p>
            </div>
          </Section>
        </div>

        <p className="mt-12 border-t border-line pt-8 text-center text-xs text-mist">
          Last updated {UPDATED}. <Accent>Back to</Accent>{" "}
          <Link
            href="/shop"
            className="text-volt-deep underline-offset-4 hover:underline"
          >
            the shop
          </Link>
          .
        </p>
      </div>
    </>
  );
}
