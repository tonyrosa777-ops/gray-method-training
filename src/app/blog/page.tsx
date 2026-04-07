import type { Metadata } from "next";
import { BLOG_POSTS } from "@/data/static-blog-posts";
import BlogGrid from "@/components/blog/BlogGrid";
import FadeIn from "@/components/animations/FadeIn";
import Divider from "@/components/ui/Divider";
import { Navbar } from "@/components/layout";

export const metadata: Metadata = {
  title: "Blog — Gray Method Training",
  description:
    "Practical health and fitness advice from Coach Adam Gray — nutrition, mindset, training, and real talk for busy women navigating life.",
  openGraph: {
    title: "The Blog — Gray Method Training",
    description:
      "No gimmicks, no fluff. Coach Adam's real-world insights on nutrition, strength, and building a healthy life.",
    type: "website",
  },
};

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="bg-gray-bg min-h-screen pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="mb-16">
            <p className="font-mono text-xs text-gold tracking-[0.2em] uppercase mb-4">
              Insights from Coach Adam
            </p>
            <h1 className="font-display font-semibold text-title-xl text-gray-text leading-[1.1] max-w-lg">
              The Blog
            </h1>
            <p className="font-body text-lead text-gray-text-2 max-w-xl mt-4">
              No gimmicks, no fluff. Real-world advice on nutrition, strength, and building a healthy life that doesn&apos;t make you miserable.
            </p>
          </FadeIn>

          <Divider className="mb-16" />

          <BlogGrid posts={BLOG_POSTS} />
        </div>
      </main>
    </>
  );
}
