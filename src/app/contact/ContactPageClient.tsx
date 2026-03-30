"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Navbar } from "@/components/layout";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/animations/FadeIn";
import FadeUp from "@/components/animations/FadeUp";

/* ------------------------------------------------------------------ */
/*  Schema                                                            */
/* ------------------------------------------------------------------ */
const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().optional(),
  goal: z.string().optional(),
  message: z.string().min(10, "Tell Adam a bit more — at least 10 characters"),
});
type FormData = z.infer<typeof schema>;

/* ------------------------------------------------------------------ */
/*  Form                                                              */
/* ------------------------------------------------------------------ */
function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-xl bg-gray-elevated border border-gold/20 p-10 text-center">
        <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center mx-auto mb-5" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="rgba(200,169,110,0.9)" strokeWidth="1.5">
            <polyline points="4 10 8 14 16 6" />
          </svg>
        </div>
        <h3 className="font-display font-semibold text-title-md text-gray-text mb-2">Message sent.</h3>
        <p className="font-body text-sm text-gray-text-2">
          Adam personally reads every message. You&apos;ll hear back within 24 hours — usually much sooner.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block font-body text-xs text-gray-text-2 tracking-wide uppercase mb-2" htmlFor="name">
            Name <span className="text-gold">*</span>
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            {...register("name")}
            className="w-full bg-gray-elevated border border-white/10 rounded-lg px-4 py-3 font-body text-sm text-gray-text placeholder-gray-muted focus:outline-none focus:border-gold/40 transition-colors"
            placeholder="Your name"
          />
          {errors.name && <p className="font-mono text-xs text-orange-accent mt-1.5">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block font-body text-xs text-gray-text-2 tracking-wide uppercase mb-2" htmlFor="email">
            Email <span className="text-gold">*</span>
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            {...register("email")}
            className="w-full bg-gray-elevated border border-white/10 rounded-lg px-4 py-3 font-body text-sm text-gray-text placeholder-gray-muted focus:outline-none focus:border-gold/40 transition-colors"
            placeholder="you@example.com"
          />
          {errors.email && <p className="font-mono text-xs text-orange-accent mt-1.5">{errors.email.message}</p>}
        </div>
      </div>

      <div>
        <label className="block font-body text-xs text-gray-text-2 tracking-wide uppercase mb-2" htmlFor="phone">
          Phone <span className="text-gray-muted">(optional)</span>
        </label>
        <input
          id="phone"
          type="tel"
          autoComplete="tel"
          {...register("phone")}
          className="w-full bg-gray-elevated border border-white/10 rounded-lg px-4 py-3 font-body text-sm text-gray-text placeholder-gray-muted focus:outline-none focus:border-gold/40 transition-colors"
          placeholder="(603) 555-0100"
        />
      </div>

      <div>
        <label className="block font-body text-xs text-gray-text-2 tracking-wide uppercase mb-2" htmlFor="goal">
          What&apos;s your main goal? <span className="text-gray-muted">(optional)</span>
        </label>
        <select
          id="goal"
          {...register("goal")}
          className="w-full bg-gray-elevated border border-white/10 rounded-lg px-4 py-3 font-body text-sm text-gray-text focus:outline-none focus:border-gold/40 transition-colors appearance-none"
        >
          <option value="">Select one…</option>
          <option value="fat-loss">Lose body fat</option>
          <option value="muscle">Build strength and muscle</option>
          <option value="energy">Improve energy and mood</option>
          <option value="perimenopause">Navigate perimenopause / menopause</option>
          <option value="nutrition">Get my nutrition under control</option>
          <option value="consistency">Build consistent habits</option>
          <option value="unsure">Not sure yet — want to talk it through</option>
        </select>
      </div>

      <div>
        <label className="block font-body text-xs text-gray-text-2 tracking-wide uppercase mb-2" htmlFor="message">
          Tell Adam a bit about yourself <span className="text-gold">*</span>
        </label>
        <textarea
          id="message"
          rows={5}
          {...register("message")}
          className="w-full bg-gray-elevated border border-white/10 rounded-lg px-4 py-3 font-body text-sm text-gray-text placeholder-gray-muted focus:outline-none focus:border-gold/40 transition-colors resize-none"
          placeholder="Where are you right now, what have you tried, what feels stuck?"
        />
        {errors.message && <p className="font-mono text-xs text-orange-accent mt-1.5">{errors.message.message}</p>}
      </div>

      <Button type="submit" variant="gold" size="lg" className="w-full justify-center" disabled={status === "loading"}>
        {status === "loading" ? "Sending…" : "Send Message"}
      </Button>

      {status === "error" && (
        <p className="font-body text-xs text-orange-accent text-center">
          Something went wrong. Email Adam directly at{" "}
          <a href="mailto:Graymethodtraining@gmail.com" className="underline">
            Graymethodtraining@gmail.com
          </a>
        </p>
      )}

      <p className="font-mono text-xs text-gray-muted text-center">
        No commitment · No sales pitch · Adam reads every message personally
      </p>
    </form>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                              */
/* ------------------------------------------------------------------ */
export default function ContactPageClient() {
  return (
    <>
      <Navbar />
      <main className="bg-gray-bg min-h-screen pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[45fr_55fr] gap-16 items-start">
            <div className="lg:pt-4">
              <FadeIn>
                <p className="font-mono text-xs text-gold tracking-[0.2em] uppercase mb-5">
                  Get in touch
                </p>
              </FadeIn>
              <FadeUp delay={0.05}>
                <h1 className="font-display font-semibold text-display text-gray-text leading-[1.05] mb-6">
                  Let&apos;s talk.
                </h1>
              </FadeUp>
              <FadeUp delay={0.1}>
                <p className="font-body text-lead text-gray-text-2 leading-relaxed mb-8">
                  A free 20-minute call with Adam. Not a sales pitch — just an honest conversation about where you are and what might actually help.
                </p>
              </FadeUp>

              <FadeIn delay={0.2} className="space-y-4">
                {[
                  { title: "He listens first.", body: "Adam will ask about your history, your schedule, and what you've already tried. He won't assume." },
                  { title: "No pressure, ever.", body: "If coaching isn't the right fit, he'll tell you. He'd rather give you honest advice than make a sale." },
                  { title: "Fast response.", body: "Adam personally reads every message. You'll hear back within 24 hours — usually same day." },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4 p-5 rounded-xl bg-gray-elevated border border-white/5">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold mt-2.5 flex-shrink-0" aria-hidden="true" />
                    <div>
                      <p className="font-body font-medium text-gray-text text-sm">{item.title}</p>
                      <p className="font-body text-xs text-gray-muted mt-0.5 leading-relaxed">{item.body}</p>
                    </div>
                  </div>
                ))}
              </FadeIn>

              <FadeIn delay={0.3} className="mt-8 pt-8 border-t border-white/5">
                <p className="font-mono text-xs text-gray-muted tracking-wide mb-3 uppercase">Or reach Adam directly</p>
                <div className="space-y-2">
                  <a href="mailto:Graymethodtraining@gmail.com" className="flex items-center gap-3 font-body text-sm text-gray-text-2 hover:text-gold transition-colors duration-200 group">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gold/50 group-hover:text-gold transition-colors">
                      <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                    Graymethodtraining@gmail.com
                  </a>
                  <a href="tel:6033407281" className="flex items-center gap-3 font-body text-sm text-gray-text-2 hover:text-gold transition-colors duration-200 group">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gold/50 group-hover:text-gold transition-colors">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12 19.79 19.79 0 0 1 1.08 3.4 2 2 0 0 1 3.06 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    (603) 340-7281
                  </a>
                </div>
              </FadeIn>
            </div>

            <FadeIn delay={0.15}>
              <div className="rounded-2xl bg-gray-elevated border border-white/5 p-8 lg:p-10 shadow-card">
                <h2 className="font-display font-semibold text-title-md text-gray-text mb-6">
                  Send Adam a message
                </h2>
                <ContactForm />
              </div>
            </FadeIn>
          </div>
        </div>
      </main>
    </>
  );
}
