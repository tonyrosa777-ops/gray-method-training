import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Coach Adam Gray",
  description:
    "Schedule a free 20-minute call with Coach Adam Gray or send a message directly. Honest support for busy women who want a plan that fits real life.",
  openGraph: {
    title: "Contact Coach Adam Gray — Gray Method Training",
    description:
      "Reach out to Coach Adam Gray for a free discovery call or a direct conversation about where you are and what might actually help.",
    type: "website",
  },
};

export default function ContactLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
