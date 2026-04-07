import type { BlogBlock } from "@/data/static-blog-posts";

interface PostBodyProps {
  body: BlogBlock[];
}

export default function PostBody({ body }: PostBodyProps) {
  return (
    <div className="max-w-none">
      {body.map((block, i) => {
        switch (block.type) {
          case "h2":
            return (
              <h2
                key={i}
                id={block.id}
                className="font-display font-semibold text-title-lg text-gray-text leading-tight mt-12 mb-5 scroll-mt-24"
              >
                {block.text}
              </h2>
            );
          case "h3":
            return (
              <h3
                key={i}
                id={block.id}
                className="font-display font-semibold text-title-md text-gray-text leading-tight mt-10 mb-4 scroll-mt-24"
              >
                {block.text}
              </h3>
            );
          case "blockquote":
            return (
              <blockquote key={i} className="pull-quote my-8">
                {block.text}
              </blockquote>
            );
          case "ul":
            return (
              <ul key={i} className="font-body text-base text-gray-text-2 leading-[1.8] mb-5 space-y-2 ml-4">
                {block.items.map((item, j) => (
                  <li
                    key={j}
                    className="relative pl-4 before:absolute before:left-0 before:top-[0.65em] before:w-1.5 before:h-1.5 before:rounded-full before:bg-gold"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            );
          default: // "p"
            return (
              <p key={i} className="font-body text-base text-gray-text-2 leading-[1.8] mb-5">
                {block.text}
              </p>
            );
        }
      })}
    </div>
  );
}
