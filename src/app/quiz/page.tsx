import type { Metadata } from "next";
import { Navbar } from "@/components/layout";
import QuizClient from "./QuizClient";

export const metadata: Metadata = {
  title: "Find Your Fit - Gray Method Training",
  description:
    "A 3-step intake form to understand your biggest problems, your main goal, and the message you want to send. No generic advice - real answers based on your actual situation.",
  openGraph: {
    title: "Find Your Fit - Gray Method Training",
    description:
      "Answer a few honest questions. Share what is blocking you and what you want next.",
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
