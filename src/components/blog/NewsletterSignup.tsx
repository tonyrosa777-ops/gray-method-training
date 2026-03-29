"use client";

import { useState, type FormEvent } from "react";
import Button from "@/components/ui/Button";

/**
 * Newsletter signup form — posts to /api/newsletter.
 * Connect ConvertKit by adding CONVERTKIT_API_KEY + CONVERTKIT_FORM_ID to .env.local.
 * See SETUP.md for full ConvertKit integration instructions.
 */
export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, firstName }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="rounded-xl bg-gray-elevated border border-gold/15 p-8 lg:p-10">
      {/* Gold dot accent */}
      <div className="w-8 h-8 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center mb-5" aria-hidden="true">
        <div className="w-2 h-2 rounded-full bg-gold" />
      </div>

      {status === "success" ? (
        <div>
          <h3 className="font-display font-semibold text-title-md text-gray-text mb-2">
            You&apos;re in.
          </h3>
          <p className="font-body text-sm text-gray-text-2">
            Check your inbox — Coach Adam&apos;s next post is on its way.
          </p>
        </div>
      ) : (
        <>
          <h3 className="font-display font-semibold text-title-md text-gray-text mb-2">
            Get Coach Adam&apos;s best content
          </h3>
          <p className="font-body text-sm text-gray-text-2 mb-6 max-w-sm">
            No gimmicks, no spam. Just practical health and fitness advice for real life.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First name"
              className="flex-1 bg-gray-subtle border border-white/10 rounded-lg px-4 py-3 font-body text-sm text-gray-text placeholder-gray-muted focus:outline-none focus:border-gold/40 transition-colors"
              aria-label="First name"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              required
              className="flex-[2] bg-gray-subtle border border-white/10 rounded-lg px-4 py-3 font-body text-sm text-gray-text placeholder-gray-muted focus:outline-none focus:border-gold/40 transition-colors"
              aria-label="Email address"
            />
            <Button
              type="submit"
              variant="gold"
              size="md"
              disabled={status === "loading"}
              className="flex-shrink-0"
            >
              {status === "loading" ? "Subscribing…" : "Subscribe"}
            </Button>
          </form>

          {status === "error" && (
            <p className="font-body text-xs text-orange-accent mt-3">
              Something went wrong. Try again or email Adam directly.
            </p>
          )}
        </>
      )}
    </div>
  );
}
