import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import { Accent } from "@/components/ui/Heading";
import { contact } from "@/lib/data";

export const metadata = {
  title: "Privacy policy",
  description:
    "What PADDLEHAUS collects when you shop, why we hold it, who we share it with, and how to have it corrected or erased.",
};

const UPDATED = "19 August 2026";

const TOC = [
  { id: "what-we-collect", title: "What we collect" },
  { id: "why", title: "Why we hold it" },
  { id: "location", title: "Your location" },
  { id: "payments", title: "Payments" },
  { id: "browser-storage", title: "What we keep in your browser" },
  { id: "sharing", title: "Who else sees it" },
  { id: "retention", title: "How long we keep it" },
  { id: "rights", title: "Your rights" },
  { id: "security", title: "How it is protected" },
  { id: "children", title: "Children" },
  { id: "changes", title: "Changes to this policy" },
  { id: "contact", title: "Contact and grievances" },
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

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow={`Last updated ${UPDATED}`}
        title="Privacy policy"
        titleAccent="Privacy"
        copy="What we collect when you shop with us, why we hold it, and how to have it corrected or erased. Written to match what the site actually does."
        crumbs={[{ label: "Privacy policy" }]}
      />

      <div className="mx-auto w-full max-w-3xl px-5 py-12 sm:px-8 lg:py-16">
        {/* on this page */}
        <nav aria-label="On this page" className="rounded-3xl border border-line bg-surface p-6">
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
          This policy covers {" "}
          <span className="text-ink">paddlehaus.in</span> and the account,
          checkout and delivery services behind it. We collect what an order
          needs and little else: there are no advertising trackers, no
          analytics scripts and no third-party cookies on this site.
        </p>

        <div className="mt-10 flex flex-col gap-10">
          <Section id="what-we-collect" title="What we collect">
            <p>Only what you give us, and only where it is needed:</p>
            <List
              items={[
                {
                  term: "Your account",
                  copy: "name, email address, mobile number and a password. The password is hashed before it is stored — nobody here can read it.",
                },
                {
                  term: "Delivery addresses",
                  copy: "recipient name and phone, street, landmark, city, state, pincode and country, plus whether you labelled it home, work or other.",
                },
                {
                  term: "Orders",
                  copy: "what you bought, quantities, the options you picked, amounts, the payment method and the order's status.",
                },
                {
                  term: "Cart and wishlist",
                  copy: "the products you are considering, with the colourway and size chosen.",
                },
                {
                  term: "Support messages",
                  copy: "anything you write to us by email, kept with your account so the next reply has the thread.",
                },
                {
                  term: "Server logs",
                  copy: "ordinary request records — IP address, time, page — which our hosting keeps briefly to keep the site running and to spot abuse.",
                },
              ]}
            />
            <p>
              We do not ask for anything we cannot justify at checkout, and we
              never collect card numbers — see{" "}
              <a href="#payments" className="text-volt-deep underline-offset-4 hover:underline">
                payments
              </a>
              .
            </p>
          </Section>

          <Section id="why" title="Why we hold it">
            <p>
              To take an order and get it to you: your address and phone go on
              the shipping label, your email carries the confirmation, and the
              order record is what a return or warranty claim is checked
              against. We also keep invoices because tax law requires it.
            </p>
            <p>
              We do not sell your data, and we do not use it to build an
              advertising profile of you.
            </p>
          </Section>

          <Section id="location" title="Your location">
            <p>
              The address form has a{" "}
              <span className="text-ink">use my current location</span> button.
              It only ever runs when you press it, and your browser asks your
              permission first — declining costs you nothing but the typing.
            </p>
            <p>
              When you do press it, your coordinates go to our own server, which
              asks OpenStreetMap&apos;s Nominatim service what address sits at
              that spot and hands the answer back to fill the form. Your
              coordinates are not saved and are not attached to your account:
              the only thing stored is the address text you keep, after you have
              checked it.
            </p>
          </Section>

          <Section id="payments" title="Payments">
            <p>
              Card, UPI, netbanking and wallet payments are handled by our
              payment gateway on its own systems. Card numbers, UPI PINs and
              netbanking credentials are never sent to us and never touch our
              servers — we receive only the gateway&apos;s reference for the
              transaction and whether it succeeded.
            </p>
            <p>
              Cash on delivery involves no payment data at all; the courier
              collects, and we record that the order was paid.
            </p>
          </Section>

          <Section id="browser-storage" title="What we keep in your browser">
            <p>
              We use your browser&apos;s local storage — not tracking cookies —
              for three things: the sign-in token that keeps you logged in, your
              cart, and your wishlist. That is what lets a bag survive a
              refresh before you have signed in.
            </p>
            <p>
              Clearing your browser data signs you out and empties a
              signed-out cart. Nothing in there identifies you to anyone else,
              and none of it is readable by another site.
            </p>
          </Section>

          <Section id="sharing" title="Who else sees it">
            <List
              items={[
                {
                  term: "Delivery partners",
                  copy: "the recipient name, address and phone on the label, so they can hand the parcel over.",
                },
                {
                  term: "Our payment gateway",
                  copy: "the order amount and reference, so it can take the payment and settle it to us.",
                },
                {
                  term: "OpenStreetMap (Nominatim)",
                  copy: "the coordinates you share, and only in the moment you press the location button.",
                },
                {
                  term: "Our hosting and database providers",
                  copy: "who store the data on our instructions and may not use it for anything of their own.",
                },
                {
                  term: "Authorities",
                  copy: "where a law, court order or tax assessment obliges us to produce records.",
                },
              ]}
            />
            <p>
              That is the whole list. We do not share your details with
              advertisers, data brokers or marketplaces.
            </p>
          </Section>

          <Section id="retention" title="How long we keep it">
            <p>
              Account details, saved addresses, cart and wishlist stay for as
              long as you have an account. Ask us to close it and they go.
            </p>
            <p>
              Order and invoice records outlive the account, because Indian tax
              and company law requires us to keep them for a set number of years
              after the financial year they belong to. Those records are kept
              for that purpose alone.
            </p>
          </Section>

          <Section id="rights" title="Your rights">
            <p>
              Under India&apos;s Digital Personal Data Protection Act, 2023 you
              can ask us to:
            </p>
            <List
              items={[
                {
                  term: "Show you what we hold",
                  copy: "a copy of your data and a summary of how it has been processed.",
                },
                {
                  term: "Correct it",
                  copy: "fix anything inaccurate, incomplete or out of date. Addresses and account details are also editable yourself at any time.",
                },
                {
                  term: "Erase it",
                  copy: "delete your account and the data attached to it, apart from records we are legally required to retain.",
                },
                {
                  term: "Withdraw consent",
                  copy: "stop a use you had agreed to, as easily as you agreed to it.",
                },
                {
                  term: "Nominate someone",
                  copy: "name a person to exercise these rights for you if you cannot.",
                },
              ]}
            />
            <p>
              Write to us and we will act on it. If our answer does not satisfy
              you, you may take the matter to the Data Protection Board of
              India.
            </p>
          </Section>

          <Section id="security" title="How it is protected">
            <p>
              The site is served over HTTPS, passwords are hashed rather than
              stored, and account routes are reachable only with a valid
              sign-in token. Access to the order database is limited to the
              people who need it to fulfil and support orders.
            </p>
            <p>
              No system is perfect. If we ever discover a breach affecting your
              data, we will tell you and the Data Protection Board as the law
              requires.
            </p>
          </Section>

          <Section id="children" title="Children">
            <p>
              This shop is meant for adults. We do not knowingly collect data
              from anyone under 18, and a child&apos;s account may only be
              opened by a parent or guardian, who is the one placing the order.
              Tell us if you believe a child has given us their details and we
              will remove them.
            </p>
          </Section>

          <Section id="changes" title="Changes to this policy">
            <p>
              When what we do changes, this page changes with it and the date at
              the top moves. If a change materially affects how your data is
              used, we will say so by email rather than leave you to notice.
            </p>
          </Section>

          <Section id="contact" title="Contact and grievances">
            <p>
              Questions, corrections and erasure requests all go to the same
              place, and we aim to answer within a few working days.
            </p>
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
          <Link href="/shop" className="text-volt-deep underline-offset-4 hover:underline">
            the shop
          </Link>
          .
        </p>
      </div>
    </>
  );
}
