import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/FeaturedProducts";
import BallCraft from "@/components/BallCraft";
import Features from "@/components/Features";
import PerfectFor from "@/components/PerfectFor";
import BundleDeal from "@/components/BundleDeal";
import Testimonials from "@/components/Testimonials";
import Faq from "@/components/Faq";
import HomeContact from "@/components/HomeContact";
import Newsletter from "@/components/Newsletter";
import FloatingActions from "@/components/ui/FloatingActions";
import { loadCatalogue } from "@/lib/services/products";

// the featured grid shows live products, so the page is read per request
export const dynamic = "force-dynamic";

/**
 * Section order and, just as importantly, section *ground*.
 *
 * Six of the eight sections here used to be `bg-surface` with a rule top and
 * bottom, so the page below the banner read as one long undifferentiated
 * column — nothing announced a new idea, and nothing gave the eye a rest. The
 * order now alternates surface and paper, and two full-bleed dark blocks (the
 * hero and the court band in the middle) split the page into three acts:
 * what we sell, how it is made, and who buys it.
 *
 *   Hero              dark      photograph
 *   FeaturedProducts  surface   the catalogue, first
 *   BallCraft         surface-2 how it is made
 *   Features          paper     why buy from the maker
 *   PerfectFor        dark      photograph — the break
 *   BundleDeal        surface   the one offer
 *   Testimonials      paper     proof
 *   Faq               surface   objections
 *   HomeContact       paper     the enquiry form, on the page doing the selling
 *   Newsletter        surface   the one ask, on a dark panel into the footer
 *
 * No two neighbours share a ground, and no section carries a rule top and
 * bottom any more — the change of tone is what separates them.
 *
 * The rotated two-tone marquee that used to sit under the banner is gone. It
 * scrolled eight slogans past on two counter-rotating tracks at -1.6° and
 * +1.2°, which is a decoration a template uses to look busy — and every claim
 * on it now sits in the hero's proof row, still, where it can be read.
 */
export default async function Home() {
  const catalogue = await loadCatalogue();

  return (
    <>
      <Hero />
      <FeaturedProducts catalogue={catalogue} />
      <BallCraft />
      <Features />
      <PerfectFor />
      <BundleDeal catalogue={catalogue} />
      <Testimonials />
      <Faq />
      <HomeContact />
      <Newsletter />
      <FloatingActions />
    </>
  );
}
