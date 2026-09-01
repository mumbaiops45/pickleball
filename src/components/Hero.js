import HeroBanner from "@/components/HeroBanner";
import bannerElevate from "../../public/Banner.png";
import bannerProV from "../../public/Banner1.png";


const slides = [
  {
    id: "elevate",
    image: bannerElevate,
    alt: "JOOLA Perseus 3S paddle and a volt pickleball resting against the net on a floodlit court, under the headline Engineered to Elevate.",
    href: "/shop?category=Paddles",
    cta: "Shop paddles",
    title: "Engineered to elevate",
  },
  {
    id: "pro-v",
    image: bannerProV,
    alt: "The full JOOLA Pro V paddle line-up — Graf, Agassi, Perseus, Kosmos, Scorpeus and Hyperion — fanned out against a black background under the headline Built for Champions.",
    href: "/shop?category=Paddles",
    cta: "Shop the Pro V line",
    title: "Built for champions",
  },
];

export default function Hero() {
  return (
    <section id="top" className="relative isolate">
      {/* Empty by design, and exactly the fixed header's height: announcement
          h-9 + nav h-18 = 108px = pt-27. No bottom padding — with the claim
          row gone there is nothing to hold a gap open, so the banner meets the
          nav and slides under its blur on scroll. */}
      <div className="grain relative bg-[radial-gradient(120%_140%_at_50%_-40%,#f4ffd6_0%,#fbfaf6_55%,#ffffff_100%)] pt-27" />

      <HeroBanner slides={slides} />
    </section>
  );
}
