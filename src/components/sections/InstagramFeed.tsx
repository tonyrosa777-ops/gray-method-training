import { social } from "@/data/site";
import { fetchInstagramPosts, truncateCaption, type BeholdPost } from "@/lib/instagram";
import FadeIn from "@/components/animations/FadeIn";
import StaggerContainer, { StaggerItem, staggerItemScaleVariants } from "@/components/animations/StaggerContainer";

/* ------------------------------------------------------------------ */
/*  Tile components                                                     */
/* ------------------------------------------------------------------ */

function HoverOverlay({ caption }: { caption: string }) {
  return (
    <div
      className="absolute inset-0 bg-gray-bg/75 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 z-10"
      aria-hidden="true"
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-gold mb-2 flex-shrink-0">
        <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
      </svg>
      {caption && (
        <p className="font-body text-xs text-gray-text text-center leading-relaxed line-clamp-3">
          {caption}
        </p>
      )}
    </div>
  );
}

function VideoTile({ post }: { post: BeholdPost }) {
  const posterSrc = post.thumbnailUrl ?? post.mediaUrl;
  const caption = truncateCaption(post.caption);

  return (
    <a
      href={post.permalink}
      target="_blank"
      rel="noopener noreferrer"
      className="relative aspect-square bg-gray-elevated rounded-sm overflow-hidden group block"
      aria-label={caption || "Instagram video post"}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={posterSrc}
        alt={caption || "Instagram video"}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div
        className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
        aria-hidden="true"
      >
        <div className="w-10 h-10 rounded-full bg-gray-bg/60 border border-white/20 flex items-center justify-center backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" className="text-white ml-0.5">
            <path d="M2 1.5l10 5.5-10 5.5V1.5z" />
          </svg>
        </div>
      </div>
      <HoverOverlay caption={caption} />
    </a>
  );
}

function ImageTile({ post }: { post: BeholdPost }) {
  const caption = truncateCaption(post.caption);
  const isCarousel = post.mediaType === "CAROUSEL_ALBUM";

  return (
    <a
      href={post.permalink}
      target="_blank"
      rel="noopener noreferrer"
      className="relative aspect-square bg-gray-elevated rounded-sm overflow-hidden group block"
      aria-label={caption || "Instagram post"}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={post.mediaUrl}
        alt={caption || "Instagram post"}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      {isCarousel && (
        <div className="absolute top-2 right-2 z-10 pointer-events-none" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="drop-shadow-md">
            <rect x="6" y="1" width="11" height="11" rx="1.5" stroke="white" strokeWidth="1.5" />
            <rect x="1" y="6" width="11" height="11" rx="1.5" stroke="white" strokeWidth="1.5" fill="rgba(0,0,0,0.4)" />
          </svg>
        </div>
      )}
      <HoverOverlay caption={caption} />
    </a>
  );
}

function PlaceholderTile({ index }: { index: number }) {
  return (
    <div className="relative aspect-square bg-gray-elevated border border-white/5 rounded-sm overflow-hidden group">
      <div className="absolute inset-0 bg-gray-bg/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
        <p className="font-mono text-gold text-xs tracking-widest">{social.instagramHandle}</p>
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
        <div className="w-8 h-8 rounded-full border border-gold/20 flex items-center justify-center" aria-hidden="true">
          <span className="font-mono text-gold/30 text-xs">{index}</span>
        </div>
        <span className="font-mono text-gray-muted text-xs">Instagram</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main section — Server Component, ISR 3600s via Behold             */
/* ------------------------------------------------------------------ */
export default async function InstagramFeed() {
  const posts = await fetchInstagramPosts(9);
  const hasLiveData = posts.length > 0;

  return (
    <section
      className="bg-gray-bg-2 py-24 lg:py-32"
      aria-label={`Follow ${social.instagramHandle} on Instagram`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn className="flex items-center justify-between mb-10">
          <div>
            <p className="font-body text-sm text-gray-muted tracking-wide mb-1">
              Follow along
            </p>
            <a
              href={social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="font-display text-xl font-semibold text-gray-text hover:text-gold transition-colors duration-200"
            >
              {social.instagramHandle}
            </a>
          </div>
          <a
            href={social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="group hidden sm:inline-flex items-center gap-2 font-body text-sm text-gray-text-2 hover:text-gold transition-colors duration-200"
            aria-label={`View ${social.instagramHandle} on Instagram`}
          >
            View on Instagram
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </a>
        </FadeIn>

        {hasLiveData ? (
          <StaggerContainer className="grid grid-cols-3 gap-1.5" staggerDelay={0.06}>
            {posts.map((post) => (
              <StaggerItem key={post.id} variants={staggerItemScaleVariants}>
                {post.mediaType === "VIDEO" ? (
                  <VideoTile post={post} />
                ) : (
                  <ImageTile post={post} />
                )}
              </StaggerItem>
            ))}
          </StaggerContainer>
        ) : (
          <FadeIn delay={0.1}>
            <div className="grid grid-cols-3 gap-1.5" aria-label="Instagram feed placeholder">
              {Array.from({ length: 9 }, (_, i) => (
                <PlaceholderTile key={i} index={i + 1} />
              ))}
            </div>
            <p className="font-mono text-xs text-gray-muted mt-4 text-center opacity-40">
              Add NEXT_PUBLIC_BEHOLD_FEED_ID to show live posts
            </p>
          </FadeIn>
        )}

        <div className="mt-8 text-center sm:hidden">
          <a
            href={social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-sm text-gray-text-2 hover:text-gold transition-colors duration-200"
          >
            View on Instagram →
          </a>
        </div>
      </div>
    </section>
  );
}
