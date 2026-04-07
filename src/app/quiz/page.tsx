import type { Metadata } from "next";
import { Navbar } from "@/components/layout";
import QuizClient from "./QuizClient";

export const metadata: Metadata = {
  title: "What Kind of Client Are You? — Gray Method Training",
  description:
    "8 honest questions. Find out exactly which type of client you are and get a personalized program recommendation from Coach Adam Gray.",
  openGraph: {
    title: "What Kind of Client Are You? — Gray Method Training",
    description:
      "8 quick questions. No wrong answers. Walk away knowing exactly what kind of help fits your situation right now.",
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
