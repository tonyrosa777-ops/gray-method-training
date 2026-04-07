import { NextResponse } from "next/server";
import { fetchInstagramPosts } from "@/lib/instagram";

/**
 * GET /api/instagram
 *
 * Returns the 12 most recent posts from the Behold feed as JSON.
 * ISR revalidation: 3600s (hourly).
 */
export const revalidate = 3600;

export async function GET() {
  const posts = await fetchInstagramPosts(12);
  return NextResponse.json({ posts });
}
