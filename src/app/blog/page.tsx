import type { Metadata } from "next";
import { getAllPosts } from "@/sanity/lib/queries";
import PostCard from "@/components/blog/PostCard";
import FadeIn from "@/components/animations/FadeIn";
import StaggerContainer, {
  StaggerItem,
  staggerItemVariants,
} from "@/components/animations/StaggerContainer";
import Divider from "@/components/ui/Divider";
import { Navbar } from "@/components/layout";

export const metadata: Metadata = {
  title: "Blog â€” Gray Method Training",
  description:
    "Practical health and fitness advice from Coach Adam Gray â€” nutrition, mindset, training, and real talk for busy women navigating life.",
  openGraph: {
    title: "The Blog â€” Gray Method Training",
    description:
      "No gimmicks, no fluff. Coach Adam's real-world insights on nutrition, strength, and sustainable health.",
    type: "website",
  },
};

const PLACEHOLDER_POSTS = [
  {
    _id: "placeholder-1",
    title: "Why Women Typically Have a Harder Time Losing Body Fat Than Men",
    slug: { current: "why-women-harder-time-losing-fat" },
    publishedAt: "2024-05-23T00:00:00Z",
    excerpt:
      "It has much more to do with the mindset around nutrition and exercise than biology. After nearly 10 years and close to a thousand clients, here's what I've learned.",
    categories: [{ title: "Nutrition", slug: { current: "nutrition" } }],
    mainImage: undefined,
  },
  {
    _id: "placeholder-2",
    title: "3 Major Life Lessons I Learned From My First 2 Months of Training BJJ",
    slug: { current: "bjj-life-lessons" },
    publishedAt: "2024-05-31T00:00:00Z",
    excerpt:
      "Once we reach a certain age, we rarely opt for new. Learning something way outside our comfort zone teaches you more than you expect â€” about the skill and about yourself.",
    categories: [{ title: "Mindset", slug: { current: "mindset" } }],
    mainImage: undefined,
  },
  {
    _id: "placeholder-3",
    title: "How to Get in Control of Snacking",
    slug: { current: "control-snacking" },
    publishedAt: "2024-04-10T00:00:00Z",
    excerpt:
      "Snacking isn't the enemy. Mindless snacking is. The difference between the two is a system â€” and here's a simple one that actually works.",
    categories: [{ title: "Nutrition", slug: { current: "nutrition" } }],
    mainImage: undefined,
  },
  {
    _id: "placeholder-4",
    title: "Make the Supportive Easier and the Unsupportive Harder",
    slug: { current: "make-supportive-easier" },
    publishedAt: "2024-03-15T00:00:00Z",
    excerpt:
      "Willpower is overrated. Environment is everything. One simple principle that makes sticking to any health goal dramatically easier.",
    categories: [{ title: "Mindset", slug: { current: "mindset" } }],
    mainImage: undefined,
  },
  {
    _id: "placeholder-5",
    title: "Just Go â€” Even If You Feel Like Crap Today",
    slug: { current: "just-go" },
    publishedAt: "2024-02-20T00:00:00Z",
    excerpt:
      "The best workout is the one you actually do. On the days you don't want to show up are usually the days you need to most.",
    categories: [{ title: "Training", slug: { current: "training" } }],
    mainImage: undefined,
  },
  {
    _id: "placeholder-6",
    title: "Was It Your Mind or Your Body?",
    slug: { current: "mind-or-body" },
    publishedAt: "2024-01-08T00:00:00Z",
    excerpt:
      "Most people quit not because their body gave out â€” but because their mind checked out first. Learning to tell the difference changes everything.",
    categories: [{ title: "Mindset", slug: { current: "mindset" } }],
    mainImage: undefined,
  },
];

export default async function BlogPage() {
  const livePosts = await getAllPosts();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const posts: any[] = livePosts.length > 0 ? livePosts : PLACEHOLDER_POSTS;

  const [featured, ...rest] = posts;

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

          {featured && (
            <FadeIn className="mb-14" delay={0.1}>
              <PostCard post={featured} featured />
            </FadeIn>
          )}

          {rest.length > 0 && (
            <>
              <p className="font-mono text-xs text-gray-muted tracking-[0.15em] uppercase mb-8">
                More posts
              </p>
              <StaggerContainer
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                staggerDelay={0.08}
              >
                {rest.map((post) => (
                  <StaggerItem key={post._id} variants={staggerItemVariants}>
                    <PostCard post={post} />
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </>
          )}

          {livePosts.length === 0 && (
            <p className="font-mono text-xs text-gray-muted mt-12 text-center opacity-40">
              Placeholder content Â· Add NEXT_PUBLIC_SANITY_PROJECT_ID to .env.local Â· See SETUP.md
            </p>
          )}
        </div>
      </main>
    </>
  );
}
