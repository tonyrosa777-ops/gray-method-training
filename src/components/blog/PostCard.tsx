import Image from "next/image";
import Link from "next/link";
import type { BlogPostSummary } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import Badge from "@/components/ui/Badge";

interface PostCardProps {
  post: BlogPostSummary;
  /** Large featured card variant — wider layout */
  featured?: boolean;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function PostCard({ post, featured = false }: PostCardProps) {
  const href = `/blog/${post.slug}`;
  const imageSrc = post.mainImage
    ? urlFor(post.mainImage).width(featured ? 900 : 600).height(featured ? 560 : 360).fit("crop").url()
    : null;

  if (featured) {
    return (
      <Link
        href={href}
        className="group relative flex flex-col lg:flex-row rounded-xl overflow-hidden bg-gray-elevated border border-white/5 hover:border-gold/20 transition-all duration-300 shadow-card hover:shadow-card-hover"
      >
        {/* Image */}
        <div className="relative lg:w-[58%] aspect-[16/9] lg:aspect-auto overflow-hidden flex-shrink-0">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={post.mainImage?.alt ?? post.title}
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />
          ) : (
            <div className="absolute inset-0 bg-gray-subtle flex items-center justify-center">
              <span className="font-mono text-xs text-gray-muted tracking-widest uppercase">
                Featured Post
              </span>
            </div>
          )}
          {/* Gold gradient overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(to right, transparent 60%, rgba(8,8,8,0.5) 100%)",
            }}
            aria-hidden="true"
          />
        </div>

        {/* Text */}
        <div className="flex flex-col justify-center p-8 lg:p-12 gap-5">
          {/* Categories */}
          {post.categories && post.categories.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.categories.map((cat) => (
                <Badge key={cat.slug} variant="gold">
                  {cat.title}
                </Badge>
              ))}
            </div>
          )}

          {/* Title */}
          <h2 className="font-display font-semibold text-title-lg text-gray-text leading-[1.15] group-hover:text-gold transition-colors duration-300">
            {post.title}
          </h2>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="font-body text-base text-gray-text-2 leading-relaxed line-clamp-3">
              {post.excerpt}
            </p>
          )}

          {/* Meta */}
          <div className="flex items-center gap-3 mt-auto pt-4 border-t border-white/5">
            <span className="font-mono text-xs text-gray-muted">
              {formatDate(post.publishedAt)}
            </span>
            <span className="font-body text-xs text-gold group-hover:translate-x-1 transition-transform duration-200 inline-block">
              Read →
            </span>
          </div>
        </div>
      </Link>
    );
  }

  /* -- Standard card -- */
  return (
    <Link
      href={href}
      className="group flex flex-col rounded-xl overflow-hidden bg-gray-elevated border border-white/5 hover:border-gold/20 transition-all duration-300 shadow-card hover:shadow-card-hover"
    >
      {/* Image */}
      <div className="relative aspect-[16/9] overflow-hidden flex-shrink-0">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={post.mainImage?.alt ?? post.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-gray-subtle flex items-center justify-center">
            <span className="font-mono text-xs text-gray-muted tracking-widest uppercase">
              Gray Method
            </span>
          </div>
        )}
      </div>

      {/* Text */}
      <div className="flex flex-col flex-1 p-6 gap-3">
        {post.categories && post.categories.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {post.categories.slice(0, 2).map((cat) => (
              <Badge key={cat.slug} variant="category">
                {cat.title}
              </Badge>
            ))}
          </div>
        )}

        <h3 className="font-display font-semibold text-title-md text-gray-text leading-snug group-hover:text-gold transition-colors duration-200 line-clamp-2">
          {post.title}
        </h3>

        {post.excerpt && (
          <p className="font-body text-sm text-gray-text-2 leading-relaxed line-clamp-2 flex-1">
            {post.excerpt}
          </p>
        )}

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/5">
          <span className="font-mono text-xs text-gray-muted">
            {formatDate(post.publishedAt)}
          </span>
          <span className="font-body text-xs text-gold opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200">
            Read →
          </span>
        </div>
      </div>
    </Link>
  );
}
