import Link from "next/link";
import FadeUp from "@/components/animations/FadeUp";
import StaggerContainer, { StaggerItem, staggerItemVariants } from "@/components/animations/StaggerContainer";
import PostCard from "@/components/blog/PostCard";
import { BLOG_POSTS } from "@/data/static-blog-posts";

export default function BlogPreview() {
  const posts = BLOG_POSTS.slice(0, 3);

  return (
    <section
      className="bg-gray-bg-2 py-24 lg:py-32"
      aria-label="Latest from the Gray Method blog"
    >
      <div className="max-w-7xl mx-auto px-6">
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

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <StaggerItem key={post.id} variants={staggerItemVariants}>
              <PostCard post={post} />
            </StaggerItem>
          ))}
        </StaggerContainer>

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
