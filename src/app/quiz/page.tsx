import type { Metadata } from "next";
import { Navbar } from "@/components/layout";
import QuizClient from "./QuizClient";

export const metadata: Metadata = {
  title: "Find Your Fit — Gray Method Training",
  description:
    "A 2-minute quiz to help Coach Adam understand where you are and which program is the right fit. No generic advice — real answers based on your actual situation.",
  openGraph: {
    title: "Find Your Fit — Gray Method Training",
    description:
      "Answer a few honest questions. Find out which program fits your real life.",
    type: "website",
  },
};

export default function QuizPage() {
  return (
    <>
      <Navbar />
      <main className="bg-gray-bg min-h-screen">
        <QuizClient />
      </main>
    </>
  );
}
