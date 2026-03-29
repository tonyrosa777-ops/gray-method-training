import Link from "next/link";
import FadeUp from "@/components/animations/FadeUp";
import StaggerContainer, { StaggerItem, staggerItemVariants } from "@/components/animations/StaggerContainer";
import PostCard from "@/components/blog/PostCard";
import { getRecentPosts } from "@/sanity/lib/queries";

/**
 * Blog Preview — Phase 7 version
 * Pulls 3 most recent posts from Sanity (ISR 3600s).
 * Falls back to static placeholder cards when Sanity is not configured.
 */

const PLACEHOLDER_POSTS = [
  {
    _id: "prev-1",
    title: "Why Women Typically Have a Harder Time Losing Body Fat Than Men",
    slug: { current: "why-women-harder-time-losing-fat" },
    publishedAt: "2024-05-23T00:00:00Z",
    excerpt:
      "It has much more to do with mindset around nutrition than biology. After nearly 10 years and close to a thousand clients, here's what I've learned.",
    categories: [{ title: "Nutrition", slug: { current: "nutrition" } }],
    mainImage: undefined,
  },
  {
    _id: "prev-2",
    title: "3 Major Life Lessons I Learned From My First 2 Months of Training BJJ",
    slug: { current: "bjj-life-lessons" },
    publishedAt: "2024-05-31T00:00:00Z",
    excerpt:
      "Learning a new skill way outside your comfort zone teaches you more than the skill itself. These lessons apply to anything worth doing.",
    categories: [{ title: "Mindset", slug: { current: "mindset" } }],
    mainImage: undefined,
  },
  {
    _id: "prev-3",
    title: "Make the Supportive Easier and the Unsupportive Harder",
    slug: { current: "make-supportive-easier" },
    publishedAt: "2024-03-15T00:00:00Z",
    excerpt:
      "Willpower is overrated. Environment is everything. One simple principle that makes any health goal dramatically easier to stick with.",
    categories: [{ title: "Mindset", slug: { current: "mindset" } }],
    mainImage: undefined,
  },
];

export default async function BlogPreview() {
  const livePosts = await getRecentPosts(3);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const posts: any[] = livePosts.length > 0 ? livePosts : PLACEHOLDER_POSTS;

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
          {posts.map((post) => (
            <StaggerItem key={post._id} variants={staggerItemVariants}>
              <PostCard post={post} />
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
