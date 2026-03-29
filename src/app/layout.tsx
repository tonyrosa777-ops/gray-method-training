import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, Space_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

/* ---- Fonts ------------------------------------------------ */
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

/* ---- Metadata --------------------------------------------- */
export const metadata: Metadata = {
  metadataBase: new URL("https://graymethodtraining.com"),
  title: {
    default: "Gray Method Training | Online Fitness Coaching for Busy Women",
    template: "%s | Gray Method Training",
  },
  description:
    "Online fitness coaching for busy women by Coach Adam Gray. Personalized workout and nutrition plans for women navigating perimenopause, menopause, and the diet cycle. Henniker, NH.",
  keywords: [
    "online fitness coach for women",
    "women's fitness coaching",
    "perimenopause weight loss",
    "menopause fitness coach",
    "online personal trainer New Hampshire",
    "busy women fitness",
    "Coach Adam Gray",
    "Gray Method Training",
    "strength training for women over 40",
    "stop yo-yo dieting",
  ],
  authors: [{ name: "Adam Gray", url: "https://graymethodtraining.com/about" }],
  creator: "Adam Gray",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://graymethodtraining.com",
    siteName: "Gray Method Training",
    title: "Gray Method Training | Online Fitness Coaching for Busy Women",
    description:
      "Online fitness coaching for busy women by Coach Adam Gray. No systems, no crash diets — just a plan built around your life.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Gray Method Training — Coach Adam Gray",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gray Method Training | Coach Adam Gray",
    description:
      "Online fitness coaching for busy women. No systems, no crash diets — just a plan built around your life.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://graymethodtraining.com",
  },
};

/* ---- JSON-LD ---------------------------------------------- */
const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "HealthAndBeautyBusiness"],
  name: "Gray Method Training",
  description:
    "Online fitness coaching for busy women by Coach Adam Gray. Specializing in perimenopause, menopause, and sustainable habit-building.",
  url: "https://graymethodtraining.com",
  telephone: "603-340-7281",
  email: "Graymethodtraining@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Henniker",
    addressRegion: "NH",
    addressCountry: "US",
  },
  priceRange: "$$",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    bestRating: "5",
    reviewCount: "20",
  },
  founder: {
    "@type": "Person",
    name: "Adam Gray",
    jobTitle: "Online Fitness Coach",
    description:
      "Certified fitness coach with 11+ years of experience helping busy women build sustainable health habits. Lost over 100 lbs personally.",
    url: "https://graymethodtraining.com/about",
  },
  areaServed: { "@type": "Country", name: "United States" },
};

/* ---- Root Layout ------------------------------------------ */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable} ${spaceMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd),
          }}
        />
      </head>
      <body className="min-h-screen antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
