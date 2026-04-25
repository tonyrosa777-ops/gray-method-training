import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_POSTS, getPost } from "@/data/static-blog-posts";
import PostBody from "@/components/blog/PostBody";
import TableOfContents from "@/components/blog/TableOfContents";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/animations/FadeIn";
import FadeUp from "@/components/animations/FadeUp";
import { Navbar } from "@/components/layout";

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    title: `${post.title} — Gray Method Training`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      images: [{ url: post.imageSrc }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.imageSrc],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) notFound();

  const publishedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <>
      <Navbar />
      <main className="bg-gray-bg min-h-screen">
        <div className="pt-28 pb-0">
          <div className="max-w-5xl mx-auto px-6">
            <FadeIn className="mb-8">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 font-body text-sm text-gray-muted hover:text-gold transition-colors duration-200"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M9 2L4 7l5 5" />
                </svg>
                All posts
              </Link>
            </FadeIn>

            <FadeIn delay={0.05} className="flex flex-wrap gap-2 mb-6">
              <Badge variant="gold">{post.category.title}</Badge>
            </FadeIn>

            <FadeUp delay={0.1}>
              <h1 className="font-display font-semibold text-title-xl text-gray-text leading-[1.1] mb-5">
                {post.title}
              </h1>
            </FadeUp>

            <FadeIn delay={0.15} className="flex items-center gap-4 text-gray-muted mb-10">
              <span className="font-mono text-xs">{publishedDate}</span>
              <span className="font-mono text-xs opacity-30">·</span>
              <span className="font-mono text-xs">Coach Adam Gray</span>
            </FadeIn>
          </div>

          <FadeIn delay={0.2} className="max-w-5xl mx-auto px-6 mb-0">
            <div className="relative w-full aspect-[2.5/1] rounded-xl overflow-hidden shadow-[0_24px_64px_rgba(0,0,0,0.6)]">
              <Image
                src={post.imageSrc}
                alt={post.title}
                fill
                sizes="(max-width: 1024px) 100vw, 960px"
                className="object-cover"
                priority
              />
              <div
                className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
                style={{ background: "linear-gradient(to top, rgba(8,8,8,0.4), transparent)" }}
                aria-hidden="true"
              />
            </div>
          </FadeIn>
        </div>

        <div className="max-w-5xl mx-auto px-6 pt-14 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-12 lg:gap-16 items-start">
            <article>
              <PostBody body={post.body} />

              <div className="mt-16 pt-10 border-t border-white/5">
                <div className="rounded-2xl bg-gray-elevated border border-gold/20 p-8 md:p-10">
                  <p className="font-mono text-xs text-gold tracking-widest uppercase mb-4">
                    Ready to put this into practice?
                  </p>
                  <h3 className="font-display font-semibold text-2xl md:text-3xl text-gray-text leading-tight mb-3">
                    Stop reading about it. Start doing it.
                  </h3>
                  <p className="font-body text-gray-text-2 mb-8 max-w-md">
                    Take the 2-minute quiz to find out which Gray Method program fits where you are right now, or send Adam a quick note.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Button href="/quiz" variant="gold" size="lg">
                      Find My Program
                    </Button>
                    <Button
                      href="/contact"
                      variant="ghost"
                      size="lg"
                    >
                      Tell Adam What&apos;s Going On
                    </Button>
                  </div>
                </div>
              </div>
            </article>

            <aside className="hidden lg:block">
              <TableOfContents body={post.body} />
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}
