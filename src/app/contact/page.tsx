import type { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
  title: "Contact Coach Adam Gray",
  description:
    "Send Coach Adam Gray a quick note about where you are right now. His team will follow up and help figure out the right next step.",
  openGraph: {
    title: "Contact Coach Adam Gray — Gray Method Training",
    description:
      "Reach out to Coach Adam Gray with a simple lead form built around honest support and the right next step.",
    type: "website",
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
