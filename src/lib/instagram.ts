/**
 * Instagram feed via Behold.so
 *
 * Behold handles Instagram OAuth and token refresh automatically.
 * No Meta Developer App, no 60-day expiry, no cron jobs.
 *
 * Setup: Adam goes to behold.so, connects his Instagram, copies the Feed ID.
 * That ID goes in NEXT_PUBLIC_BEHOLD_FEED_ID — that's it.
 *
 * Feed URL: https://feeds.behold.so/{FEED_ID}
 */

export interface BeholdPost {
  id: string;
  mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  mediaUrl: string;
  /** Present on VIDEO posts — use as poster image */
  thumbnailUrl?: string;
  permalink: string;
  caption?: string;
  timestamp: string;
}

interface BeholdFeedResponse {
  posts: BeholdPost[];
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
    return (data.posts ?? []).slice(0, limit);
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
