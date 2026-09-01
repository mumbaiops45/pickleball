import HeroBanner from "@/components/HeroBanner";

import bannerPickleball1 from "../../public/Banner2.png";
import bannerPickleball2 from "../../public/Banner3.png";
import bannerPickleball3 from "../../public/Banner5.png";

const slides = [
  {
    id: "pickleball-performance",
    image: bannerPickleball1,
    alt: "Premium Paddlehaus pickleball on a professional court.",
    href: "/shop?category=Balls",
    cta: "Shop pickleballs",
    title: "Premium pickleballs",
  },
  {
    id: "pickleball-bounce",
    image: bannerPickleball2,
    alt: "Paddlehaus pickleball highlighting consistent bounce.",
    href: "/shop?category=Balls",
    cta: "Shop pickleballs",
    title: "Engineered for real game",
  },
  {
    id: "pickleball-game",
    image: bannerPickleball3,
    alt: "Paddlehaus pickleballs highlighting performance and durability.",
    href: "/shop?category=Balls",
    cta: "Shop pickleballs",
    title: "Performance you can feel",
  },
];

export default function Hero() {
  return (
    <section
      id="top"
      className="relative isolate w-full overflow-hidden"
    >
      <div className="w-full pt-27">
        <HeroBanner slides={slides} />
      </div>
    </section>
  );
}