import PageHero from "@/components/ui/PageHero";
import AboutIntro from "@/components/about/AboutIntro";
import AboutTimeline from "@/components/about/AboutTimeline";
import AboutValues from "@/components/about/AboutValues";
import AboutTeam from "@/components/about/AboutTeam";
import AboutContact from "@/components/about/AboutContact";

export const metadata = {
  title: "About us",
  description:
    "India's premier pickleball manufacturing house. PADDLEHAUS presses its own paddles and rotomolds its own balls in Bengaluru — built for monsoon humidity, coarse outdoor courts, and shipped to players in the USA, Dubai and Belgium.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Since 2023 · Made in India"
        title="India's premier pickleball manufacturing house."
        titleAccent="manufacturing house"
        copy="Paddles pressed and balls rotomolded in Bengaluru from high-quality imported raw materials, tested every Saturday on public courts, and played on in the USA, Dubai and Belgium."
        crumbs={[{ label: "About" }]}
      />
      <AboutIntro />
      <AboutTimeline />
      <AboutValues />
      <AboutTeam />
      <AboutContact />
    </>
  );
}
