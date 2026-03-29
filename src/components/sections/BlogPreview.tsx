import Link from "next/link";
import FadeUp from "@/components/animations/FadeUp";
import StaggerContainer, { StaggerItem, staggerItemVariants } from "@/components/animations/StaggerContainer";
import Badge from "@/components/ui/Badge";
import PhotoPlaceholder from "@/components/ui/PhotoPlaceholder";

/**
 * Blog Preview — Phase 5 version
 * Shows 3 placeholder cards mirroring the final card design.
 * Live posts (from Sanity) wired in Phase 7.
 */

const PLACEHOLDER_POSTS = [
  {
    id: "post-1",
    category: "Nutrition",
    title: "Why 'Clean Eating' Failed You — And What to Do Instead",
    readTime: "5 min read",
    excerpt:
      "Restriction works in the short term and destroys you in the long term. Here's the framework I use with every client to build a nutrition approach they can actually keep.",
    slug: "clean-eating-vs-supportive-eating",
  },
  {
    id: "post-2",
    category: "Perimenopause",
    title: "Your Doctor Said Your Labs Are Normal. They're Not Wrong — But They're Missing Something.",
    readTime: "7 min read",
    excerpt:
      "Normal lab values don't always mean you feel normal. What perimenopause symptoms aren't captured in a standard panel — and what to ask for instead.",
    slug: "labs-normal-still-struggling",
  },
  {
    id: "post-3",
    category: "Training",
    title: "30 Minutes Is Enough. Here's Why You're Not Seeing Results From It.",
    readTime: "4 min read",
    excerpt:
      "Time is not the problem. Consistency is not the problem either. The issue is almost always structure — and this is how to fix it.",
    slug: "30-minutes-enough",
  },
];

export default function BlogPreview() {
  return (
    <section
      className="bg-gray-bg-2 py-24 lg:py-32"
      aria-label="Latest from the Gray Method blog"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <FadeUp className="flex items-end justify-between mb-12">
          <div>
            <p className="font-mono text-xs text-gray-muted tracking-[0.2em] uppercase mb-2">
              From the blog
            </p>
            <h2 className="font-display font-semibold text-title-xl text-gray-text">
              Real talk. No filler.
            </h2>
          </div>
          <Link
            href="/blog"
            className="group hidden sm:inline-flex items-center gap-2 font-body text-sm text-gray-text-2 hover:text-gold transition-colors duration-200"
          >
            Read All Posts
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </Link>
        </FadeUp>

        {/* Post cards */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PLACEHOLDER_POSTS.map((post) => (
            <StaggerItem key={post.id} variants={staggerItemVariants}>
              <article className="group flex flex-col h-full">
                <Link href={`/blog/${post.slug}`} className="block" tabIndex={-1} aria-hidden="true">
                  {/* Post image */}
                  <div className="relative rounded-lg overflow-hidden mb-5">
                    <PhotoPlaceholder
                      photoKey="blogDefault"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div
                      className="absolute inset-0 bg-gray-bg/30 group-hover:bg-gray-bg/10 transition-colors duration-300"
                      aria-hidden="true"
                    />
                  </div>
                </Link>

                {/* Meta */}
                <div className="flex items-center gap-3 mb-3">
                  <Badge variant="category">{post.category}</Badge>
                  <span className="font-mono text-xs text-gray-muted">{post.readTime}</span>
                </div>

                {/* Title */}
                <h3 className="font-display font-semibold text-title-md text-gray-text mb-3 leading-snug group-hover:text-gold-light transition-colors duration-200 flex-1">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>

                {/* Excerpt */}
                <p className="font-body text-sm text-gray-text-2 leading-relaxed mb-5">
                  {post.excerpt}
                </p>

                {/* Read more link */}
                <Link
                  href={`/blog/${post.slug}`}
                  className="group/link inline-flex items-center gap-1.5 font-body text-sm text-gold hover:text-gold-light transition-colors duration-200"
                >
                  Read more
                  <span className="transition-transform duration-200 group-hover/link:translate-x-1">→</span>
                </Link>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Mobile CTA */}
        <div className="mt-10 text-center sm:hidden">
          <Link
            href="/blog"
            className="font-body text-sm text-gray-text-2 hover:text-gold transition-colors duration-200"
          >
            Read All Posts →
          </Link>
        </div>
      </div>
    </section>
  );
}
