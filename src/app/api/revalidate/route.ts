import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/revalidate
 *
 * On-demand ISR webhook — triggered by Sanity when content changes.
 *
 * Setup:
 * 1. In Sanity, add a webhook: POST https://your-domain.com/api/revalidate
 * 2. Set filter: _type == "post"
 * 3. Set secret in SANITY_REVALIDATE_SECRET env var
 * 4. In webhook headers, add: { "x-revalidate-secret": "your_secret" }
 *
 * See SETUP.md for full instructions.
 */
export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;

  // Verify the secret if configured
  if (secret) {
    const incomingSecret = req.headers.get("x-revalidate-secret");
    if (incomingSecret !== secret) {
      return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
    }
  }

  try {
    const body = await req.json();
    const slug = body?.result?.slug?.current as string | undefined;

    if (slug) {
      // Revalidate the specific post
      revalidatePath(`/blog/${slug}`);
    }

    // Always revalidate the blog index and homepage preview
    revalidatePath("/blog");
    revalidatePath("/");

    return NextResponse.json({ revalidated: true, slug: slug ?? "all", timestamp: Date.now() });
  } catch {
    return NextResponse.json({ message: "Error processing webhook" }, { status: 500 });
  }
}
