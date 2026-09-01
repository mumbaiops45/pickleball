import Hero from "@/components/Hero";
import TickerBar from "@/components/TickerBar";
import CategoryGrid from "@/components/CategoryGrid";
import FeaturedProducts from "@/components/FeaturedProducts";
import PaddleFinder from "@/components/PaddleFinder";
import BallCraft from "@/components/BallCraft";
import BundleDeal from "@/components/BundleDeal";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import Faq from "@/components/Faq";
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
      <TickerBar />
      <CategoryGrid />
      <FeaturedProducts catalogue={catalogue} />
      <PaddleFinder catalogue={catalogue} />
      {/* TechShowcase ("The technology — Every gram is deliberate") was the
          paddle build story: a drawn paddle on a spinning dial plus five
          laminate layers. It read as a bat, and BallCraft below already tells
          the same manufacturing story for the pickleball line the store leads
          with. The component file is kept — re-add it here to restore it. */}
      <BallCraft />
      <BundleDeal />
      <Features />
      <Testimonials />
      <Faq />
      <Newsletter />
      <FloatingActions />
    </>
  );
}
