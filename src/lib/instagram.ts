/**
 * Instagram feed via Behold.so
 *
 * Behold handles Instagram OAuth and token refresh automatically.
 * No Meta Developer App, no 60-day expiry, no cron jobs.
 *
 * Actual Behold API response structure (v2):
 * posts[].sizes.{ small | medium | large | full }.mediaUrl
 * We normalize this to a flat mediaUrl field on BeholdPost.
 */

/** Normalized post shape used by the component */
export interface BeholdPost {
  id: string;
  mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  mediaUrl: string;
  thumbnailUrl?: string;
  permalink: string;
  caption?: string;
  timestamp: string;
}

/** Raw shape returned by the Behold API */
interface BeholdSize {
  mediaUrl: string;
  height: number;
  width: number;
}

interface BeholdPostRaw {
  id: string;
  mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  sizes?: {
    small?: BeholdSize;
    medium?: BeholdSize;
    large?: BeholdSize;
    full?: BeholdSize;
  };
  /** Top-level mediaUrl (older API versions) */
  mediaUrl?: string;
  thumbnailUrl?: string;
  permalink: string;
  caption?: string;
  prunedCaption?: string | null;
  timestamp: string;
}

interface BeholdFeedResponse {
  posts: BeholdPostRaw[];
}

/**
 * Fetch recent posts from Behold.
 * Returns empty array on any failure so the section always renders a fallback.
 */
export async function fetchInstagramPosts(limit = 9): Promise<BeholdPost[]> {
  const feedId = process.env.NEXT_PUBLIC_BEHOLD_FEED_ID;
  if (!feedId) return [];

  // Accept either the full feed URL or just the ID
  const feedUrl = feedId.startsWith("https://")
    ? feedId
    : `https://feeds.behold.so/${feedId}`;

  try {
    const res = await fetch(feedUrl, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) return [];

    const data: BeholdFeedResponse = await res.json();

    return (data.posts ?? []).slice(0, limit).map((post) => ({
      id: post.id,
      mediaType: post.mediaType,
      // Behold v2 nests mediaUrl inside sizes — fall through to whichever size exists
      mediaUrl:
        post.mediaUrl ??
        post.sizes?.medium?.mediaUrl ??
        post.sizes?.large?.mediaUrl ??
        post.sizes?.full?.mediaUrl ??
        post.sizes?.small?.mediaUrl ??
        "",
      thumbnailUrl: post.thumbnailUrl,
      permalink: post.permalink,
      caption: post.caption ?? post.prunedCaption ?? undefined,
      timestamp: post.timestamp,
    }));
  } catch {
    return [];
  }
}

/** Truncate a caption for display */
export function truncateCaption(caption: string | undefined, maxLength = 100): string {
  if (!caption) return "";
  if (caption.length <= maxLength) return caption;
  return caption.slice(0, maxLength).trimEnd() + "…";
}
