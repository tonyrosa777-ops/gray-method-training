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
    const firstName = safeName.split(" ")[0] || safeName;

    const adminHtml = `
      <h2>New website lead</h2>
      <p><strong>Source:</strong> ${safeLeadSource}</p>
      <p><strong>Name:</strong> ${safeName}</p>
      <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
      <p><strong>Phone:</strong> ${safePhone}</p>
      ${safeGoal ? `<p><strong>Goal:</strong> ${safeGoal}</p>` : ""}
      <p><strong>Message:</strong></p>
      <p>${safeMessage}</p>
    `;

    const userHtml = `
      <!DOCTYPE html>
      <html>
      <body style="background:#111; color:#f5f0e8; font-family: Georgia, serif; margin:0; padding:32px;">
        <div style="max-width:600px; margin:0 auto;">
          <p style="font-family: monospace; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #c9a84c; margin-bottom: 24px;">
            Gray Method Training
          </p>

          <h1 style="font-size: 28px; font-weight: 600; margin: 0 0 12px; line-height: 1.15;">
            Your note landed, ${firstName}.
          </h1>
          <p style="font-size: 16px; color: #c8c0b0; margin: 0 0 28px; line-height: 1.55;">
            Adam reads every one.
          </p>

          <div style="border-top: 1px solid #2a2a2a; padding-top: 24px; margin-bottom: 32px;">
            <p style="font-size: 15px; line-height: 1.75; color: #c8c0b0; margin: 0 0 16px;">
              Thanks for reaching out. Your message is in front of the Gray Method team now, and someone will be in touch within a day or two with a real reply written by a human.
            </p>
            <p style="font-size: 15px; line-height: 1.75; color: #c8c0b0; margin: 0 0 16px;">
              When we follow up, we'll start where you started: with what's actually going on for you. The first conversation is just that — a conversation. You set the pace.
            </p>
            <p style="font-size: 15px; line-height: 1.75; color: #c8c0b0; margin: 0;">
              If something else comes to mind before we connect, just reply to this email — it goes straight to Adam.
            </p>
          </div>

          <div style="background:#1a1a1a; border:1px solid #2a2a2a; border-radius:8px; padding:18px 20px; margin-bottom:32px;">
            <p style="font-family: monospace; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: #c9a84c; margin: 0 0 8px;">
              While you wait
            </p>
            <p style="font-size: 14px; color: #c8c0b0; line-height: 1.65; margin: 0;">
              Take a look around the site, read what other clients have said, or take the 2-minute quiz to get a head start on what's likely the right fit for you:
              <a href="${process.env.NEXT_PUBLIC_SITE_URL ?? "https://graymethodtraining.com"}/quiz" style="color: #c9a84c;">graymethodtraining.com/quiz</a>
            </p>
          </div>

          <p style="font-size: 14px; color: #c8c0b0; margin: 0 0 4px;">— Coach Adam Gray</p>
          <p style="font-size: 13px; color: #999; margin: 0;">+ the Gray Method team</p>

          <p style="margin-top: 36px; font-size: 12px; color: #555; border-top: 1px solid #222; padding-top: 16px;">
            You received this because you reached out via graymethodtraining.com.
          </p>
        </div>
      </body>
      </html>
    `;

    const [adminRes, userRes] = await Promise.all([
      fetch("https://api.resend.com/emails", {
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
          html: adminHtml,
        }),
      }),
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Coach Adam Gray <noreply@graymethodtraining.com>",
          to: [email],
          reply_to: toEmail,
          subject: "Your note landed - Gray Method Training",
          html: userHtml,
        }),
      }),
    ]);

    if (!adminRes.ok) {
      return NextResponse.json({ error: "Failed to send email." }, { status: 502 });
    }
    if (!userRes.ok) {
      console.error("[contact] User confirmation email failed", { status: userRes.status });
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
