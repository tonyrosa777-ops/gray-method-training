import { getSanityClient } from "./client";
import type { SanityDocument } from "@sanity/client";

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

export interface BlogCategory {
  title: string;
  slug: string; // normalized to string during fetch
}

export interface BlogPostSummary {
  _id: string;
  title: string;
  slug: string; // normalized to string during fetch
  publishedAt: string;
  mainImage?: SanityDocument & { alt?: string };
  excerpt?: string;
  categories?: BlogCategory[];
}

export interface BlogPost extends BlogPostSummary {
  body: SanityDocument[]; // PortableText blocks
  seo?: {
    title?: string;
    description?: string;
  };
}

/* ------------------------------------------------------------------ */
/*  GROQ queries                                                        */
/* ------------------------------------------------------------------ */

const postSummaryFields = `
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  mainImage { ..., alt },
  excerpt,
  "categories": categories[]->{ title, "slug": slug.current }
`;

/** Fetch all published posts, newest first */
export async function getAllPosts(): Promise<BlogPostSummary[]> {
  const client = getSanityClient(process.env.NODE_ENV === "production");
  if (!client) return [];

  return client.fetch(
    `*[_type == "post"] | order(publishedAt desc) { ${postSummaryFields} }`,
    {},
    { next: { revalidate: 60 } }
  );
}

/** Fetch a single post by slug */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const client = getSanityClient(process.env.NODE_ENV === "production");
  if (!client) return null;

  const post = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      ${postSummaryFields},
      body,
      seo
    }`,
    { slug },
    { next: { revalidate: 60 } }
  );

  return post ?? null;
}

/** All post slugs — used for generateStaticParams */
export async function getAllPostSlugs(): Promise<string[]> {
  const client = getSanityClient(false);
  if (!client) return [];

  const slugs = await client.fetch<Array<{ slug: string }>>(
    `*[_type == "post"] { "slug": slug.current }`,
    {},
    { next: { revalidate: 3600 } }
  );

  return slugs.map((s) => s.slug);
}

/** 3 most recent posts for the homepage preview */
export async function getRecentPosts(count = 3): Promise<BlogPostSummary[]> {
  const client = getSanityClient(process.env.NODE_ENV === "production");
  if (!client) return [];

  return client.fetch(
    `*[_type == "post"] | order(publishedAt desc) [0...$count] { ${postSummaryFields} }`,
    { count },
    { next: { revalidate: 3600 } }
  );
}
