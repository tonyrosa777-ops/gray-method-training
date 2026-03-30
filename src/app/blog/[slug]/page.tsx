import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllPostSlugs } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import PostBody from "@/components/blog/PostBody";
import TableOfContents from "@/components/blog/TableOfContents";
import NewsletterSignup from "@/components/blog/NewsletterSignup";
import Badge from "@/components/ui/Badge";
import FadeIn from "@/components/animations/FadeIn";
import FadeUp from "@/components/animations/FadeUp";
import { Navbar } from "@/components/layout";

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  const title = post.seo?.title ?? `${post.title} â€” Gray Method Training`;
  const description =
    post.seo?.description ?? post.excerpt ?? "Coach Adam Gray on health and fitness.";
  const imageUrl = post.mainImage
    ? urlFor(post.mainImage).width(1200).height(630).fit("crop").url()
    : undefined;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: post.publishedAt,
      images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630 }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  const publishedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const heroImageSrc = post.mainImage
    ? urlFor(post.mainImage).width(1400).height(560).fit("crop").url()
    : null;

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

            {post.categories && post.categories.length > 0 && (
              <FadeIn delay={0.05} className="flex flex-wrap gap-2 mb-6">
                {post.categories.map((cat) => (
                  <Badge key={cat.slug} variant="gold">
                    {cat.title}
                  </Badge>
                ))}
              </FadeIn>
            )}

            <FadeUp delay={0.1}>
              <h1 className="font-display font-semibold text-title-xl text-gray-text leading-[1.1] mb-5">
                {post.title}
              </h1>
            </FadeUp>

            <FadeIn delay={0.15} className="flex items-center gap-4 text-gray-muted mb-10">
              <span className="font-mono text-xs">{publishedDate}</span>
              <span className="font-mono text-xs opacity-30">Â·</span>
              <span className="font-mono text-xs">Coach Adam Gray</span>
            </FadeIn>
          </div>

          {heroImageSrc && (
            <FadeIn delay={0.2} className="max-w-5xl mx-auto px-6 mb-0">
              <div className="relative w-full aspect-[2.5/1] rounded-xl overflow-hidden shadow-[0_24px_64px_rgba(0,0,0,0.6)]">
                <Image
                  src={heroImageSrc}
                  alt={post.mainImage?.alt ?? post.title}
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
          )}
        </div>

        <div className="max-w-5xl mx-auto px-6 pt-14 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-12 lg:gap-16 items-start">
            <article>
              {post.body && <PostBody body={post.body} />}

              <div className="mt-16 pt-10 border-t border-white/5">
                <NewsletterSignup />
              </div>
            </article>

            <aside className="hidden lg:block">
              {post.body && <TableOfContents body={post.body} />}
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}
