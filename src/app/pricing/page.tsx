import type { Metadata } from "next";
import { Navbar, Footer } from "@/components/layout";
import PricingClient from "./PricingClient";

export const metadata: Metadata = {
  title: "Pricing - Gray Method Training",
  description:
    "Compare the Gray Method website packages, estimate the ROI, and choose the best fit for the next stage of the brand.",
  openGraph: {
    title: "Pricing - Gray Method Training",
    description:
      "Three one-time packages for a site that is built to turn visitors into booked calls.",
    type: "website",
  },
};

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <PricingClient />
      <Footer />
    </>
  );
}