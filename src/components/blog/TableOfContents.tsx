"use client";

import { useEffect, useState } from "react";
import type { SanityDocument } from "@sanity/client";

interface TocItem {
  _key: string;
  text: string;
  level: 2 | 3;
}

interface TableOfContentsProps {
  body: SanityDocument[];
}

function extractHeadings(body: SanityDocument[]): TocItem[] {
  return body
    .filter(
      (block): block is SanityDocument & { style: string; children: Array<{ text: string }> } =>
        block._type === "block" && (block.style === "h2" || block.style === "h3")
    )
    .map((block) => ({
      _key: block._key as string,
      text: block.children.map((child) => child.text).join(""),
      level: block.style === "h2" ? 2 : 3,
    }));
}

export default function TableOfContents({ body }: TableOfContentsProps) {
  const headings = extractHeadings(body);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-20% 0% -70% 0%" }
    );

    headings.forEach(({ _key }) => {
      const el = document.getElementById(_key);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 2) return null;

  return (
    <nav aria-label="Table of contents" className="sticky top-28">
      <p className="font-mono text-xs text-gold tracking-[0.15em] uppercase mb-4">
        In this post
      </p>
      <ul className="space-y-1.5">
        {headings.map(({ _key, text, level }) => (
          <li key={_key}>
            <a
              href={`#${_key}`}
              className={`
                block font-body text-sm leading-snug transition-colors duration-150
                ${level === 3 ? "pl-3" : ""}
                ${activeId === _key ? "text-gold" : "text-gray-muted hover:text-gray-text-2"}
              `}
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
