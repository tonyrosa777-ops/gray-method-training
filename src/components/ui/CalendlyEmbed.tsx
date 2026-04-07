"use client";

import { useEffect, useMemo, useRef } from "react";

const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL ??
  "https://calendly.com/graymethodtraining/discovery-call";

interface CalendlyEmbedProps {
  name: string;
  email: string;
  onBooked: () => void;
}

export default function CalendlyEmbed({ name, email, onBooked }: CalendlyEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptLoaded = useRef(false);

  const embedUrl = useMemo(() => {
    const params = new URLSearchParams({
      name,
      email,
      background_color: "111111",
      text_color: "f5f0e8",
      primary_color: "c9a84c",
      hide_gdpr_banner: "1",
      hide_event_type_details: "0",
    });
    return `${CALENDLY_URL}?${params.toString()}`;
  }, [name, email]);

  // Load the Calendly widget script once per page
  useEffect(() => {
    if (scriptLoaded.current) return;
    scriptLoaded.current = true;
    const existing = document.getElementById("calendly-widget-script");
    if (!existing) {
      const script = document.createElement("script");
      script.id = "calendly-widget-script";
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  // Listen for booking-complete postMessage from Calendly's iframe
  useEffect(() => {
    function handleMessage(e: MessageEvent) {
      if (
        e.origin === "https://calendly.com" &&
        (e.data as { event?: string })?.event === "calendly.event_scheduled"
      ) {
        onBooked();
      }
    }
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [onBooked]);

  return (
    <div
      ref={containerRef}
      className="calendly-inline-widget w-full overflow-hidden rounded-xl"
      data-url={embedUrl}
      style={{ minWidth: "320px", height: "660px" }}
    />
  );
}
