import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/newsletter
 *
 * Subscribes an email to ConvertKit.
 * Requires: CONVERTKIT_API_KEY + CONVERTKIT_FORM_ID in .env.local
 * See SETUP.md for full instructions.
 */
export async function POST(req: NextRequest) {
  const apiKey = process.env.CONVERTKIT_API_KEY;
  const formId = process.env.CONVERTKIT_FORM_ID;

  if (!apiKey || !formId) {
    // Not configured — return success so the UI doesn't break during dev
    return NextResponse.json({ subscribed: true });
  }

  try {
    const { email, firstName } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    const res = await fetch(
      `https://api.convertkit.com/v3/forms/${formId}/subscribe`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          api_key: apiKey,
          email: email.trim(),
          first_name: firstName?.trim() || undefined,
        }),
      }
    );

    if (!res.ok) {
      return NextResponse.json({ error: "ConvertKit error" }, { status: 502 });
    }

    return NextResponse.json({ subscribed: true });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
