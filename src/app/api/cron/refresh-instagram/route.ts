import { NextRequest, NextResponse } from "next/server";
import { getInstagramToken, setInstagramToken } from "@/lib/token-store";

/**
 * GET /api/cron/refresh-instagram
 *
 * Called automatically by Vercel Cron on the 1st of every month.
 * Reads the current Instagram token from Upstash, hits the Instagram
 * refresh endpoint for a fresh 60-day token, and writes it back.
 * Adam never knows it happened.
 *
 * Security: Vercel sends Authorization: Bearer {CRON_SECRET} on every
 * cron invocation. Any other caller gets a 401.
 *
 * Schedule (vercel.json): "0 0 1 * *" — midnight UTC on the 1st of each month
 */
export async function GET(req: NextRequest) {
  // Only Vercel Cron (or a correctly-credentialed manual trigger) may call this
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const currentToken = await getInstagramToken();
  if (!currentToken) {
    return NextResponse.json(
      { error: "No token found — set INSTAGRAM_ACCESS_TOKEN in Vercel env vars for initial seed" },
      { status: 400 }
    );
  }

  // Hit the Instagram long-lived token refresh endpoint
  const url = new URL("https://graph.instagram.com/refresh_access_token");
  url.searchParams.set("grant_type", "ig_refresh_token");
  url.searchParams.set("access_token", currentToken);

  let refreshRes: Response;
  try {
    refreshRes = await fetch(url.toString());
  } catch (err) {
    console.error("[cron/refresh-instagram] Network error:", err);
    return NextResponse.json({ error: "Network error contacting Instagram" }, { status: 502 });
  }

  if (!refreshRes.ok) {
    const body = await refreshRes.text();
    console.error("[cron/refresh-instagram] Instagram refresh failed:", refreshRes.status, body);
    return NextResponse.json(
      { error: "Instagram refresh failed", status: refreshRes.status, detail: body },
      { status: 502 }
    );
  }

  const { access_token, expires_in } = await refreshRes.json() as {
    access_token: string;
    token_type: string;
    expires_in: number;
  };

  await setInstagramToken(access_token);

  const expiresInDays = Math.floor(expires_in / 86400);
  console.log(`[cron/refresh-instagram] Token refreshed successfully. Expires in ${expiresInDays} days.`);

  return NextResponse.json({ ok: true, expires_in_days: expiresInDays });
}
