import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/contact
 *
 * Sends lead form submissions to Adam's email via Resend.
 * Requires: RESEND_API_KEY + CONTACT_EMAIL_TO in .env.local
 * See SETUP.md for Resend setup instructions.
 *
 * Falls back gracefully (returns success) if Resend is not configured,
 * so the form works for testing without email credentials.
 */
export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, message, goal, source } = await req.json();

    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: "Name, email, phone, and message are required." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_EMAIL_TO ?? "coach_adam@graymethodtraining.com";

    if (!apiKey) {
      console.log("[contact] Resend not configured - lead submission:", {
        name,
        email,
        phone,
        goal,
        source,
      });
      return NextResponse.json({ sent: true });
    }

    const leadSource = source ?? "Simple Contact Lead";
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone);
    const safeGoal = goal ? escapeHtml(goal) : "";
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");
    const safeLeadSource = escapeHtml(leadSource);

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
        subject: `New lead from ${name} - Gray Method`,
        html: `
          <h2>New website lead</h2>
          <p><strong>Source:</strong> ${safeLeadSource}</p>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
          <p><strong>Phone:</strong> ${safePhone}</p>
          ${safeGoal ? `<p><strong>Goal:</strong> ${safeGoal}</p>` : ""}
          <p><strong>Message:</strong></p>
          <p>${safeMessage}</p>
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

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
