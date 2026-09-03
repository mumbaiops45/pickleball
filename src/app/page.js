import Hero from "@/components/Hero";
import TickerBar from "@/components/TickerBar";
import FeaturedProducts from "@/components/FeaturedProducts";
import BallCraft from "@/components/BallCraft";
import Features from "@/components/Features";
import PerfectFor from "@/components/PerfectFor";
import BrandStrip from "@/components/BrandStrip";
import BundleDeal from "@/components/BundleDeal";
import Testimonials from "@/components/Testimonials";
import Faq from "@/components/Faq";
import HomeContact from "@/components/HomeContact";
import Newsletter from "@/components/Newsletter";
import { loadCatalogue } from "@/lib/services/products";
import { products as seededBalls } from "@/lib/data";

// the featured grid shows live products, so the page is read per request
export const dynamic = "force-dynamic";


export default async function Home() {
  // The homepage sells the ball line whether or not the admin API is answering.
  // The /shop route stays strictly live — an empty admin is an empty shop — but
  // a homepage with no products in the grid is the "too simple" complaint, so
  // this section falls back to the seeded ball catalogue when nothing is live.
  const live = await loadCatalogue();
  const catalogue = live.length ? live : seededBalls;

  return (
    <>
      <Hero />
      <TickerBar />
      <FeaturedProducts catalogue={catalogue} />
      <BallCraft />
      <Features />
      <PerfectFor />
      <BrandStrip />
      <BundleDeal catalogue={catalogue} />
      <Testimonials />
      <Faq />
      <HomeContact />
      <Newsletter />
    </>
  );
}
