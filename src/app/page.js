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
