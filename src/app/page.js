import Hero from "@/components/Hero";
import TickerBar from "@/components/TickerBar";
import BrandStrip from "@/components/BrandStrip";
import CategoryGrid from "@/components/CategoryGrid";
import FeaturedProducts from "@/components/FeaturedProducts";
import PaddleFinder from "@/components/PaddleFinder";
import TechShowcase from "@/components/TechShowcase";
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
      {/* <BrandStrip /> */}
      <CategoryGrid />
      <FeaturedProducts catalogue={catalogue} />
      <PaddleFinder />
      <TechShowcase />
      <BundleDeal />
      <Features />
      <Testimonials />
      <Faq />
      <Newsletter />
      <FloatingActions />
    </>
  );
}
