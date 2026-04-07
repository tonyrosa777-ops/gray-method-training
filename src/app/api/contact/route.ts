import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/contact
 *
 * Sends contact form submissions to Adam's email via Resend.
 * Requires: RESEND_API_KEY + CONTACT_EMAIL_TO in .env.local
 * See SETUP.md for Resend setup instructions.
 *
 * Falls back gracefully (returns success) if Resend is not configured,
 * so the form works for testing without email credentials.
 */
export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, message, goal } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_EMAIL_TO ?? "coach_adam@graymethodtraining.com";

    // If Resend is not configured, log and return success so dev testing works
    if (!apiKey) {
      console.log("[contact] Resend not configured — form submission:", { name, email, goal });
      return NextResponse.json({ sent: true });
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Gray Method Website <noreply@graymethodtraining.com>",
        to: [toEmail],
        reply_to: email,
        subject: `New contact from ${name} — Gray Method`,
        html: `
          <h2>New contact form submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
          ${goal ? `<p><strong>Goal:</strong> ${goal}</p>` : ""}
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br>")}</p>
        `,
      }),
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to send email." }, { status: 502 });
    }

    return NextResponse.json({ sent: true });
  } catch {
    return NextResponse.json({ error: "Internal error." }, { status: 500 });
  }
}
