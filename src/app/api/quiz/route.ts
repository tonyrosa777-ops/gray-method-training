import { NextRequest, NextResponse } from "next/server";
import { QUIZ_QUESTIONS, QUIZ_RESULTS, type QuizType } from "@/data/quiz";

/**
 * POST /api/quiz
 *
 * Called after the user completes the quiz and submits the result lead form.
 * Sends two emails via Resend:
 *   1. Adam's notification with lead details, result type, message, and all Q&A pairs
 *   2. User results email with their type and recommended program
 *
 * Falls back gracefully if RESEND_API_KEY is not configured.
 */
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      name: string;
      email: string;
      phone: string;
      message?: string;
      resultType: QuizType;
      answers: QuizType[];
    };

    const { name, email, phone, message, resultType, answers } = body;

    if (!name || !email || !phone || !resultType) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const result = QUIZ_RESULTS[resultType];
    if (!result) {
      return NextResponse.json({ error: "Invalid result type." }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_EMAIL_TO ?? "coach_adam@graymethodtraining.com";

    if (!apiKey) {
      console.log("[quiz] Resend not configured - quiz lead submission:", {
        name,
        email,
        phone,
        resultType,
      });
      return NextResponse.json({ sent: true });
    }

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone);
    const safeMessage = message?.trim()
      ? escapeHtml(message.trim()).replace(/\n/g, "<br>")
      : "No message provided.";

    const qaRows = QUIZ_QUESTIONS.map((q, i) => {
      const answerType = answers[i];
      const answer = answerType
        ? q.answers.find((a) => a.type === answerType)?.label ?? answerType
        : "-";
      return `
        <tr style="border-bottom: 1px solid #2a2a2a;">
          <td style="padding: 10px 12px; color: #999; font-size: 12px; vertical-align: top; width: 40%;">${escapeHtml(q.question)}</td>
          <td style="padding: 10px 12px; color: #f5f0e8; font-size: 12px; vertical-align: top;">${escapeHtml(answer)}</td>
        </tr>`;
    }).join("");

    const adminHtml = `
      <!DOCTYPE html>
      <html>
      <body style="background:#111; color:#f5f0e8; font-family: Georgia, serif; margin:0; padding:32px;">
        <div style="max-width:600px; margin:0 auto;">
          <p style="font-family: monospace; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #c9a84c; margin-bottom: 24px;">
            Gray Method - Quiz Lead
          </p>

          <h2 style="font-size: 22px; font-weight: 600; margin: 0 0 8px;">
            New quiz lead: ${safeName}
          </h2>
          <p style="color: #999; font-size: 14px; margin: 0 0 24px;">
            Result type: <strong style="color: #c9a84c;">${escapeHtml(result.name)}</strong>
          </p>

          <table style="width:100%; border-collapse:collapse; margin-bottom: 28px;">
            <tr style="border-bottom: 1px solid #333;">
              <td style="padding: 8px 12px; font-size: 12px; color: #999; width: 40%;">Name</td>
              <td style="padding: 8px 12px; font-size: 13px; color: #f5f0e8;">${safeName}</td>
            </tr>
            <tr style="border-bottom: 1px solid #333;">
              <td style="padding: 8px 12px; font-size: 12px; color: #999;">Email</td>
              <td style="padding: 8px 12px; font-size: 13px; color: #f5f0e8;">
                <a href="mailto:${safeEmail}" style="color: #c9a84c;">${safeEmail}</a>
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #333;">
              <td style="padding: 8px 12px; font-size: 12px; color: #999;">Phone</td>
              <td style="padding: 8px 12px; font-size: 13px; color: #f5f0e8;">${safePhone}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-size: 12px; color: #999;">Result</td>
              <td style="padding: 8px 12px; font-size: 13px; color: #c9a84c;">${escapeHtml(result.name)} - ${escapeHtml(result.tagline)}</td>
            </tr>
          </table>

          <div style="background:#1a1a1a; border:1px solid #2a2a2a; border-radius:8px; padding:16px; margin-bottom:32px;">
            <p style="font-family: monospace; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: #999; margin:0 0 10px;">
              Message
            </p>
            <p style="font-size: 13px; color:#f5f0e8; line-height:1.7; margin:0;">${safeMessage}</p>
          </div>

          <h3 style="font-size: 13px; font-family: monospace; letter-spacing: 0.15em; text-transform: uppercase; color: #999; margin-bottom: 12px;">
            Their answers
          </h3>
          <table style="width:100%; border-collapse:collapse; background:#1a1a1a; border-radius: 8px; overflow:hidden;">
            ${qaRows}
          </table>

          <p style="margin-top: 32px; font-size: 12px; color: #555; border-top: 1px solid #222; padding-top: 16px;">
            Sent from Gray Method Training - Quiz lead form
          </p>
        </div>
      </body>
      </html>
    `;

    const bodyHtml = result.body
      .map((p) => `<p style="font-size:15px; line-height:1.8; color:#c8c0b0; margin:0 0 18px;">${escapeHtml(p)}</p>`)
      .join("");

    const userHtml = `
      <!DOCTYPE html>
      <html>
      <body style="background:#111; color:#f5f0e8; font-family: Georgia, serif; margin:0; padding:32px;">
        <div style="max-width:600px; margin:0 auto;">
          <p style="font-family: monospace; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #c9a84c; margin-bottom: 24px;">
            Gray Method Training
          </p>

          <p style="font-size: 14px; color: #999; margin: 0 0 8px;">Your result</p>
          <h1 style="font-size: 30px; font-weight: 600; margin: 0 0 8px; line-height: 1.1;">
            ${escapeHtml(result.name)}
          </h1>
          <p style="font-size: 17px; color: #c8c0b0; margin: 0 0 32px; line-height: 1.5;">
            ${escapeHtml(result.tagline)}
          </p>

          <div style="border-top: 1px solid #2a2a2a; padding-top: 28px; margin-bottom: 36px;">
            ${bodyHtml}
          </div>

          <div style="background:#1a1a1a; border: 1px solid rgba(201,168,76,0.25); border-radius: 12px; padding: 24px; margin-bottom: 36px;">
            <p style="font-family: monospace; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #c9a84c; margin: 0 0 8px;">
              Recommended for you
            </p>
            <p style="font-size: 18px; font-weight: 600; margin: 0 0 10px; color: #f5f0e8;">
              ${escapeHtml(result.recommendedProgram.name)}
            </p>
            <p style="font-size: 14px; color: #999; line-height: 1.65; margin: 0 0 20px;">
              ${escapeHtml(result.recommendedProgram.reason)}
            </p>
            <a
              href="${process.env.NEXT_PUBLIC_SITE_URL ?? "https://graymethodtraining.com"}${result.recommendedProgram.href}"
              style="display:inline-block; background:#c9a84c; color:#111; text-decoration:none; padding: 12px 24px; border-radius:8px; font-family: sans-serif; font-size: 13px; font-weight: 600;"
            >
              Learn more
            </a>
          </div>

          <div style="text-align:center; padding: 28px 0; border-top: 1px solid #2a2a2a;">
            <p style="font-size: 15px; color: #c8c0b0; margin: 0 0 16px;">
              The Gray Method team has your result. If it looks like there may be a fit, a team member will reach out and help you take the next right step.
            </p>
          </div>

          <p style="margin-top: 32px; font-size: 12px; color: #555; border-top: 1px solid #222; padding-top: 16px;">
            You received this because you completed the Gray Method Training quiz.
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
          subject: `New quiz lead: ${name} - ${result.name}`,
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
          from: "Adam Gray <noreply@graymethodtraining.com>",
          to: [email],
          subject: `Your Gray Method result - ${result.name}`,
          html: userHtml,
        }),
      }),
    ]);

    if (!adminRes.ok || !userRes.ok) {
      console.error("[quiz] Resend error", {
        adminStatus: adminRes.status,
        userStatus: userRes.status,
      });
      return NextResponse.json({ sent: false, note: "Email delivery issue." });
    }

    return NextResponse.json({ sent: true });
  } catch (err) {
    console.error("[quiz] Unexpected error:", err);
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
