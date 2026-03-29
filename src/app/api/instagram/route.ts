import { NextResponse } from "next/server";
import { fetchInstagramPosts } from "@/lib/instagram";

/**
 * GET /api/instagram
 *
 * Returns the most recent Instagram posts as JSON.
 * ISR revalidation: 3600s (hourly).
 * Used by any client-side components that need fresh feed data.
 */
export const revalidate = 3600;

export async function GET() {
  const posts = await fetchInstagramPosts(12);
  return NextResponse.json({ posts });
}
