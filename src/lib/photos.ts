/**
 * GRAY METHOD TRAINING — PHOTO MANIFEST
 *
 * Each slot maps to a file in /public/images/.
 * Drop Adam's photos with the exact filenames below and they will
 * automatically replace the placeholder components — zero code changes needed.
 *
 * Placeholder renders: slot name + description + aspect ratio indicator
 * so the demo layout is fully legible before any photos are added.
 */

export interface PhotoSlot {
  /** Unique identifier — used as the key in PhotoPlaceholder */
  id: string;
  /** Resolved file path under /public */
  src: string;
  /** Descriptive alt text for accessibility + SEO */
  alt: string;
  /** Width / Height ratio as a CSS aspect-ratio string e.g. "3/4" */
  aspectRatio: string;
  /** Human-readable description for placeholders */
  description: string;
  /** Where this photo is used */
  usedIn: string;
}

export const photos: Record<string, PhotoSlot> = {
  heroAdam: {
    id: "photo-hero-adam",
    src: "/images/hero-adam.jpg",
    alt: "Coach Adam Gray — Gray Method Training",
    aspectRatio: "3/4",
    description: "Adam — direct camera, coaching context, warm light",
    usedIn: "Hero section (right panel, desktop)",
  },
  adamStoryMain: {
    id: "photo-adam-story-main",
    src: "/images/adam-story-main.jpg",
    alt: "Coach Adam Gray — personal story",
    aspectRatio: "4/5",
    description: "Adam — candid, not posed. Gym, outdoor, or everyday.",
    usedIn: "AdamStory section (left panel)",
  },
  adamStorySecondary: {
    id: "photo-adam-story-secondary",
    src: "/images/adam-story-secondary.jpg",
    alt: "Coach Adam Gray — everyday life",
    aspectRatio: "1/1",
    description: "A second moment — BJJ, dog walk, Dunkin', anything real",
    usedIn: "AdamStory section (small inset, optional)",
  },
  adamAboutFull: {
    id: "photo-adam-about-full",
    src: "/images/adam-about-full.jpg",
    alt: "Coach Adam Gray — About page",
    aspectRatio: "2/3",
    description: "Full-length or three-quarter, editorial crop",
    usedIn: "/about page hero",
  },
  adamCoaching: {
    id: "photo-adam-coaching",
    src: "/images/adam-coaching.jpg",
    alt: "Coach Adam Gray coaching a client",
    aspectRatio: "16/9",
    description: "Adam coaching a client or explaining a movement",
    usedIn: "Programs section background",
  },
  testimonialKayla: {
    id: "photo-testimonial-kayla",
    src: "/images/testimonial-kayla.jpg",
    alt: "Kayla — Gray Method Training client",
    aspectRatio: "1/1",
    description: "Client headshot",
    usedIn: "Testimonials — Kayla card",
  },
  testimonialMaureen: {
    id: "photo-testimonial-maureen",
    src: "/images/testimonial-maureen.jpg",
    alt: "Maureen — Gray Method Training client",
    aspectRatio: "1/1",
    description: "Client headshot",
    usedIn: "Testimonials — Maureen card",
  },
  testimonialDeb: {
    id: "photo-testimonial-deb",
    src: "/images/testimonial-deb.jpg",
    alt: "Deb Alfano — Gray Method Training client",
    aspectRatio: "1/1",
    description: "Client headshot",
    usedIn: "Testimonials — Deb Alfano card",
  },
  testimonialRachel: {
    id: "photo-testimonial-rachel",
    src: "/images/testimonial-rachel.jpg",
    alt: "Rachel — Gray Method Training client",
    aspectRatio: "1/1",
    description: "Client headshot",
    usedIn: "Testimonials — Rachel card",
  },
  eehLaura: {
    id: "photo-eeh-laura",
    src: "/images/laura-brown.jpg",
    alt: "Laura Brown, NP — Sapphire Women's Healthcare",
    aspectRatio: "1/1",
    description: "Professional headshot of Laura Brown, NP",
    usedIn: "Energize & Empower Her program card",
  },
  eehHero: {
    id: "photo-eeh-hero",
    src: "/images/eeh-hero.jpg",
    alt: "Energize & Empower Her program",
    aspectRatio: "16/9",
    description: "Program context — women, energy, empowerment",
    usedIn: "/programs/energize-empower page hero",
  },
  aboutBjj: {
    id: "photo-about-bjj",
    src: "/images/adam-bjj.jpg",
    alt: "Coach Adam Gray training Brazilian Jiu-Jitsu",
    aspectRatio: "4/3",
    description: "Adam at BJJ practice",
    usedIn: "/about page — life section",
  },
  aboutLife: {
    id: "photo-about-life",
    src: "/images/adam-life.jpg",
    alt: "Coach Adam Gray — everyday life in New Hampshire",
    aspectRatio: "4/3",
    description: "Everyday moment — dog, soccer, NH",
    usedIn: "/about page — life section",
  },
  blogDefault: {
    id: "photo-blog-default",
    src: "/images/blog-default.jpg",
    alt: "Gray Method Training blog",
    aspectRatio: "16/9",
    description: "Generic coaching/gym image for blog post fallback",
    usedIn: "Blog post fallback image",
  },
};

/** Typed helper — get a slot by key with type safety */
export function getPhoto(key: keyof typeof photos): PhotoSlot {
  return photos[key];
}
