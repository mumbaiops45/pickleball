import PageHero from "@/components/ui/PageHero";
import AboutIntro from "@/components/about/AboutIntro";
import AboutTimeline from "@/components/about/AboutTimeline";
import AboutValues from "@/components/about/AboutValues";
import AboutTeam from "@/components/about/AboutTeam";
import AboutContact from "@/components/about/AboutContact";

export const metadata = {
  title: "About us",
  description:
    "PADDLEHAUS presses its own paddles in Bengaluru — built for monsoon humidity, coarse outdoor courts and players who are on court four times a week.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Since 2023"
        title="We make the paddle we could not buy here."
        titleAccent="could not buy here"
        copy="Pressed in Bengaluru, tested every Saturday on public courts, and priced without an import bill on top."
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
