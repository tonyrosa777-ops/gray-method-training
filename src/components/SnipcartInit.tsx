"use client";

import { useEffect } from "react";

/**
 * SnipcartInit — Injects #snipcart div via direct DOM manipulation.
 *
 * NEVER put <div id="snipcart"> in JSX.
 * React tracking that div causes OuterLayoutRouter to crash on navigation
 * when Snipcart injects adjacent DOM nodes (NotFoundError).
 *
 * This component uses useEffect → the div is created AFTER React paints
 * and never enters React's virtual DOM. Snipcart can do whatever it wants.
 *
 * See: snipcart-nextjs-dom-conflict SKILL.md
 */
export default function SnipcartInit() {
  useEffect(() => {
    if (!document.getElementById("snipcart")) {
      const div = document.createElement("div");
      div.id = "snipcart";
      div.setAttribute("data-config-modal-style", "side");
      div.setAttribute(
        "data-api-key",
        process.env.NEXT_PUBLIC_SNIPCART_API_KEY ?? ""
      );
      div.hidden = true;
      document.body.appendChild(div);
    }
  }, []);

  return null;
}
