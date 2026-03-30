import type { Metadata } from "next";
import { Navbar, Footer } from "@/components/layout";
import {
  Hero,
  PainPoints,
  AdamStory,
  GrayMethodPhilosophy,
  Programs,
  Stats,
  Testimonials,
  InstagramFeed,
  QuizCTA,
  BlogPreview,
  FinalCTA,
} from "@/components/sections";
import Divider from "@/components/ui/Divider";

export const metadata: Metadata = {
  title: "Online Fitness Coaching for Busy Women",
  description:
    "Personalized online fitness and nutrition coaching for busy women by Coach Adam Gray. Real support for strength, consistency, and life through perimenopause, menopause, and the diet cycle.",
  openGraph: {
    title: "Gray Method Training | Online Fitness Coaching for Busy Women",
    description:
      "No systems, no crash diets, no black-and-white thinking. Coach Adam Gray builds a plan around your real life.",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <Divider />
        <PainPoints />
        <Divider />
        <AdamStory />
        <Divider />
        <GrayMethodPhilosophy />
        <Divider />
        <Programs />
        <Stats />
        <Divider />
        <Testimonials />
        <Divider />
        <InstagramFeed />
        <Divider />
        <QuizCTA />
        <Divider />
        <BlogPreview />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
