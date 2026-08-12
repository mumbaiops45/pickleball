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

export default function Home() {
  return (
    <>
      <Hero />
      <TickerBar />
      {/* <BrandStrip /> */}
      <CategoryGrid />
      <FeaturedProducts />
      <PaddleFinder />
      <TechShowcase />
      <BundleDeal />
      <Features />
      <Testimonials />
      <Faq />
      <Newsletter />
    </>
  );
}
