"use client";

import { useEffect, useState } from "react";
import type { BlogBlock } from "@/data/static-blog-posts";

interface TableOfContentsProps {
  body: BlogBlock[];
}

interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

function extractHeadings(body: BlogBlock[]): TocItem[] {
  return body
    .filter((b): b is Extract<BlogBlock, { type: "h2" | "h3" }> =>
      b.type === "h2" || b.type === "h3"
    )
    .map((b) => ({ id: b.id, text: b.text, level: b.type === "h2" ? 2 : 3 }));
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

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
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
        {headings.map(({ id, text, level }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={`
                block font-body text-sm leading-snug transition-colors duration-150
                ${level === 3 ? "pl-3" : ""}
                ${activeId === id ? "text-gold" : "text-gray-muted hover:text-gray-text-2"}
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
