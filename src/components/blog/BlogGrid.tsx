"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PostCard from "@/components/blog/PostCard";
import StaggerContainer, {
  StaggerItem,
  staggerItemVariants,
} from "@/components/animations/StaggerContainer";
import type { BlogPost } from "@/data/static-blog-posts";

const CATEGORIES = ["All", "Nutrition", "Mindset", "Training"] as const;
type Filter = (typeof CATEGORIES)[number];

interface BlogGridProps {
  posts: BlogPost[];
}

export default function BlogGrid({ posts }: BlogGridProps) {
  const [active, setActive] = useState<Filter>("All");

  const filtered =
    active === "All" ? posts : posts.filter((p) => p.category.title === active);

  const [featured, ...rest] = filtered;

  return (
    <>
      {/* Filter bar */}
      <div className="flex items-center gap-2 mb-14 flex-wrap">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={[
              "relative px-5 py-2 rounded-full font-body text-sm tracking-wide transition-all duration-200",
              active === cat
                ? "text-gray-bg"
                : "text-gray-text-2 hover:text-gray-text border border-white/10 hover:border-white/20",
            ].join(" ")}
          >
            {active === cat && (
              <motion.span
                layoutId="filter-pill"
                className="absolute inset-0 rounded-full bg-gold"
                transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
              />
            )}
            <span className="relative z-10">{cat}</span>
          </button>
        ))}
        <span className="ml-2 font-mono text-xs text-gray-muted">
          {filtered.length} {filtered.length === 1 ? "post" : "posts"}
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
        >
          {featured && (
            <div className="mb-14">
              <PostCard post={featured} featured />
            </div>
          )}

          {rest.length > 0 && (
            <>
              <p className="font-mono text-xs text-gray-muted tracking-[0.15em] uppercase mb-8">
                {active === "All" ? "More posts" : `All ${active} posts`}
              </p>
              <StaggerContainer
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                staggerDelay={0.06}
              >
                {rest.map((post) => (
                  <StaggerItem key={post.id} variants={staggerItemVariants}>
                    <PostCard post={post} />
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
