import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Coach Adam Gray",
  description:
    "Tell Coach Adam Gray what has been getting in the way. A Gray Method team member will reach out and help you take the next right step.",
  openGraph: {
    title: "Contact Coach Adam Gray — Gray Method Training",
    description:
      "Reach out to Coach Adam Gray with a simple form built around honest support, real context, and the right next step.",
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
