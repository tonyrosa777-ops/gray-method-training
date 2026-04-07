/**
 * Instagram Graph API — shared fetch logic
 *
 * Token is read from Upstash Redis via token-store.ts.
 * Falls back to INSTAGRAM_ACCESS_TOKEN env var on first deploy before Redis is seeded.
 * Token is automatically refreshed every 30 days by /api/cron/refresh-instagram.
 * Adam never needs to touch this.
 */

import { getInstagramToken } from "@/lib/token-store";

export interface InstagramPost {
  id: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url: string;
  /** Only present for VIDEO type — use this as the poster image */
  thumbnail_url?: string;
  permalink: string;
  caption?: string;
  timestamp: string;
}

interface GraphAPIResponse {
  data?: InstagramPost[];
  error?: { message: string; type: string; code: number };
}

/**
 * Fetch recent Instagram posts.
 * Returns an empty array (never throws) so callers can always render a fallback.
 */
export async function fetchInstagramPosts(limit = 12): Promise<InstagramPost[]> {
  const token = await getInstagramToken();

  // No token configured — return empty so the fallback renders
  if (!token) return [];

  try {
    const url = new URL("https://graph.instagram.com/me/media");
    url.searchParams.set(
      "fields",
      "id,media_type,media_url,thumbnail_url,permalink,caption,timestamp"
    );
    url.searchParams.set("limit", String(limit));
    url.searchParams.set("access_token", token);

    const res = await fetch(url.toString(), {
      next: { revalidate: 3600 },
    });

    if (!res.ok) return [];

    const json: GraphAPIResponse = await res.json();

    // Graph API returned an error object
    if (json.error) return [];

    return json.data ?? [];
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
