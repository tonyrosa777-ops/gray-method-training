import Image from "next/image";
import { PortableText } from "@portabletext/react";
import type { PortableTextComponents } from "@portabletext/react";
import type { SanityDocument } from "@sanity/client";
import { urlFor } from "@/sanity/lib/image";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="font-body text-base text-gray-text-2 leading-[1.8] mb-5">{children}</p>
    ),
    h2: ({ children, value }) => (
      <h2
        id={value._key}
        className="font-display font-semibold text-title-lg text-gray-text leading-tight mt-12 mb-5 scroll-mt-24"
      >
        {children}
      </h2>
    ),
    h3: ({ children, value }) => (
      <h3
        id={value._key}
        className="font-display font-semibold text-title-md text-gray-text leading-tight mt-10 mb-4 scroll-mt-24"
      >
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="font-body font-medium text-base text-gray-text uppercase tracking-wider mt-8 mb-3">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="pull-quote my-8">{children}</blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="font-body text-base text-gray-text-2 leading-[1.8] mb-5 space-y-2 ml-4">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="font-body text-base text-gray-text-2 leading-[1.8] mb-5 space-y-2 ml-4 list-decimal">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="relative pl-4 before:absolute before:left-0 before:top-[0.65em] before:w-1.5 before:h-1.5 before:rounded-full before:bg-gold">
        {children}
      </li>
    ),
    number: ({ children }) => <li>{children}</li>,
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-gray-text">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic text-gray-text-2">{children}</em>
    ),
    link: ({ value, children }) => {
      const href = value?.href ?? "#";
      const isExternal = href.startsWith("http");
      return (
        <a
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="text-gold underline underline-offset-2 decoration-gold/40 hover:decoration-gold transition-colors duration-200"
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      const src = urlFor(value).width(900).fit("max").url();
      return (
        <figure className="my-10">
          <div className="relative w-full rounded-xl overflow-hidden">
            <Image
              src={src}
              alt={value.alt ?? ""}
              width={900}
              height={0}
              style={{ height: "auto" }}
              sizes="(max-width: 768px) 100vw, 700px"
              className="w-full object-cover"
            />
          </div>
          {value.caption && (
            <figcaption className="font-mono text-xs text-gray-muted text-center mt-3 tracking-wide">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

interface PostBodyProps {
  body: SanityDocument[];
}

export default function PostBody({ body }: PostBodyProps) {
  return (
    <div className="max-w-none">
      <PortableText value={body} components={components} />
    </div>
  );
}
