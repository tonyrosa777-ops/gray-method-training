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
