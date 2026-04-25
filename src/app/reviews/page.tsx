import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout";
import Button from "@/components/ui/Button";
import Divider from "@/components/ui/Divider";
import FadeIn from "@/components/animations/FadeIn";
import FadeUp from "@/components/animations/FadeUp";
import StaggerContainer, { StaggerItem, staggerItemVariants } from "@/components/animations/StaggerContainer";

export const metadata: Metadata = {
  title: "Client Reviews — Gray Method Training",
  description:
    "Real stories from real clients. Not star ratings — actual people, actual transformations. Read what working with Coach Adam has meant for women who were done starting over.",
  openGraph: {
    title: "Client Reviews — Gray Method Training",
    description: "Real stories from real women who stopped starting over.",
    type: "website",
  },
};

/* ---- Data ------------------------------------------------- */

const featuredStories = [
  {
    id: "kayla",
    name: "Kayla",
    context: "1:1 Online Coaching",
    program: "1:1",
    story: [
      "Kayla came to Adam recently divorced, raising a 5-year-old on her own. She didn't believe she deserved to put herself first. That phrase — \"I don't deserve to put myself first\" — is something Adam hears often. But Kayla was the one who finally said it out loud.",
      "She didn't come in looking for a number on a scale. She came in exhausted from carrying everything alone. Adam built her a plan around the time she actually had — not the time she wished she had.",
      "A few months in, she sent Adam a message: \"I felt proud of my personal growth today and felt like a proud mom.\"",
      "The biggest transformation wasn't physical. It was the moment Kayla decided she was worth showing up for.",
    ],
    pullQuote: "Looking back I realize I lost a lot of happiness and had the feeling that I didn't deserve to put myself first… I felt proud of my personal growth today and felt like a proud mom.",
    adamNote: "Kayla's biggest transformation wasn't physical — it was the moment she decided she was worth showing up for.",
  },
  {
    id: "maureen",
    name: "Maureen",
    context: "Energize & Empower Her, Cohort 1",
    program: "EEH",
    story: [
      "Maureen had been to her doctor. Tests came back normal. She was told it was just a part of getting older — to eat less and move more.",
      "She knew something was wrong. She was right.",
      "When she joined Energize & Empower Her, she got what she had been missing for years: someone who actually listened. Laura Brown, NP evaluated her from the hormonal side. Adam built her a training and nutrition plan around what her body actually needed — not what the standard advice had failed to give her.",
    ],
    pullQuote: "I haven't felt this excited or listened to in I don't know how long, when it's come to my personal health.",
    adamNote: "Maureen had been told everything was normal. It wasn't. She deserved someone who actually listened.",
  },
  {
    id: "rachel",
    name: "Rachel",
    context: "1:1 Online Coaching",
    program: "1:1",
    story: [
      "Rachel had a serious injury. The kind that changes what you think your body is capable of. She came to Adam afraid — not just of re-injury, but of starting again at all.",
      "Adam built her program around the fear, not in spite of it. Small progressions. Real attention to what her body was telling her. He didn't push past the fear — he helped her walk through it.",
      "She eventually went back to coaching soccer.",
    ],
    pullQuote: "The biggest loss was the loss of fear.",
    adamNote: "That one hit different. Four words. That's the whole story.",
  },
];

const clientQuotes = [
  {
    id: "deb",
    name: "Deb Alfano",
    context: "4-year client",
    quote:
      "He explains what you are doing, why you are doing it and how to do it safely. He knows what I am capable of, even when I don't believe it. On a personal note, Adam is one of the nicest people I have ever met and I know he has my best interest at heart.",
  },
  {
    id: "holly",
    name: "Holly",
    context: "Energize & Empower Her",
    quote: "Food is not the enemy anymore.",
  },
  {
    id: "kali",
    name: "Kali Mara",
    context: "Online Coaching",
    quote:
      "He challenges not only your body but also your brain. Most importantly, he LISTENS! He will challenge you if you want or need it and he will accommodate you if something isn't right for you. He is quite simply the BEST!!",
  },
  {
    id: "keri",
    name: "Keri Fossum",
    context: "Online Coaching",
    quote:
      "When working online he took a full inventory of the equipment I had at home and built my workouts around that. I definitely recommend Adam Gray for anyone that is looking for a quality coach to achieve their fitness goals.",
  },
  {
    id: "anonymous-eeh",
    name: "EEH Client",
    context: "Energize & Empower Her",
    quote:
      "I hate to even admit that, Adam… but I am not happy if I don't get my workout in. I couldn't get down on the floor in the kitchen to put the Tupperware in the back cabinet. Now I can do lunges across the floor.",
  },
  {
    id: "stephanie",
    name: "Stephanie",
    context: "Energize & Empower Her",
    quote:
      "I expected to get finger-wagged for missing workouts. Instead I got understanding. That's when something shifted.",
  },
  {
    id: "anonymous-2",
    name: "Client",
    context: "1:1 Coaching",
    quote:
      "I thought I'm going to do 12 weeks with Adam and I'm going to be right back where I started. And now I feel like ten weeks in, and this is sustainable. I can sustain this.",
  },
  {
    id: "sarah-j",
    name: "Sarah J.",
    context: "Online Coaching",
    quote:
      "I really liked the program and how it was catered to me and what I needed for success! If I ever had a question, Coach Adam was there to help!",
  },
];

const googleReviews = [
  {
    id: "sarah-robinson",
    name: "Sarah Robinson",
    stars: 5,
    quote:
      "I've been working with Adam for several years and it has been such a great partnership. He acts as my accountabila-buddy!",
  },
  {
    id: "katie-giguere",
    name: "Katie Giguere",
    stars: 5,
    quote:
      "Adam is a very skilled and knowledgeable strength and conditioning coach. He is the type that will never give up on you, whatever your goal is.",
  },
  {
    id: "beth",
    name: "Beth Therriault",
    stars: 5,
    quote:
      "I have tried gyms, videos, HIIT training, Pilates… you name it, I did it. Working with Adam was by far the most accountability and discipline I've had. He is so helpful and truly works to make sure that he is the kind of trainer you need.",
  },
  {
    id: "nannu",
    name: "NANNU NOBIS",
    stars: 5,
    quote:
      "Adam coached me for several years (7+) and he is fantastic! I'm a 67-year old male with a heart condition — but with Adam's care and encouragement my heart condition is improving and I'm outdoors doing things I love!",
  },
  {
    id: "linda",
    name: "Linda Dianis",
    stars: 5,
    quote:
      "Adam has been a very conscientious and encouraging help to me. He is one of those people who actually LISTENS, and then offers individualized recommendations.",
  },
  {
    id: "elizabeth",
    name: "Elizabeth Kovar",
    stars: 5,
    quote:
      "Adam is an amazing coach. Attentive, knowledgeable and passionate for helping others regardless of their needs. He can meet anyone at their current level and make them better.",
  },
  {
    id: "hillary",
    name: "Hillary Blevens",
    stars: 5,
    quote:
      "Absolutely changed my life. Been working with him for almost 12 weeks now and I've seen massive results. More energy, more clarity all around.",
  },
  {
    id: "alison",
    name: "Alison Timmins-Ordway",
    stars: 5,
    quote:
      "I have been able to message Adam at any time and he is quick to get back to me. I'm so happy he started this program — he makes the program work with whatever equipment you have at home.",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="currentColor" className="text-gold" aria-hidden="true">
          <path d="M7 1l1.545 3.09L12 4.635l-2.5 2.427.59 3.438L7 8.772l-3.09 1.728.59-3.438L2 4.635l3.455-.545L7 1z" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewsPage() {
  return (
    <>
      <Navbar />
      <main className="bg-gray-bg min-h-screen">

        {/* ---- Hero ---- */}
        <section className="pt-32 pb-20 relative overflow-hidden">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(200,169,110,0.07) 0%, transparent 70%)", filter: "blur(100px)" }}
            aria-hidden="true"
          />
          <div className="max-w-4xl mx-auto px-6 relative z-10">
            <FadeIn>
              <p className="font-mono text-xs text-gold tracking-[0.2em] uppercase mb-4">
                Client Stories
              </p>
            </FadeIn>
            <FadeUp delay={0.05}>
              <h1 className="font-display font-semibold text-display text-gray-text leading-[1.05] mb-5">
                Real people.<br />Real stories.
              </h1>
            </FadeUp>
            <FadeUp delay={0.15}>
              <p className="font-body text-lead text-gray-text-2 max-w-2xl leading-relaxed">
                These aren&apos;t star ratings. They&apos;re real accounts from women who came in skeptical, stayed consistent, and found out what was actually possible when someone built a plan around their real life.
              </p>
            </FadeUp>
          </div>
        </section>

        <Divider />

        {/* ---- Featured client stories ---- */}
        <section className="py-24 lg:py-32">
          <div className="max-w-4xl mx-auto px-6 space-y-20">
            {featuredStories.map((story, i) => (
              <FadeUp key={story.id} delay={i * 0.05}>
                <article>
                  {/* Header */}
                  <div className="flex items-center gap-4 mb-8">
                    <div
                      className="w-12 h-12 rounded-full bg-gray-elevated border border-gold/20 flex items-center justify-center flex-shrink-0"
                      aria-hidden="true"
                    >
                      <span className="font-mono text-sm text-gold font-medium">
                        {story.name[0]}
                      </span>
                    </div>
                    <div>
                      <p className="font-body font-medium text-gray-text text-base">{story.name}</p>
                      <p className="font-mono text-xs text-gold tracking-wider">{story.context}</p>
                    </div>
                  </div>

                  {/* Story body */}
                  <div className="border-l-2 border-gold/20 pl-8 space-y-4 mb-8">
                    {story.story.map((paragraph, j) => (
                      <p key={j} className="font-body text-base text-gray-text-2 leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {/* Pull quote */}
                  <blockquote className="relative pl-8 mb-6">
                    <span
                      className="absolute left-0 top-0 font-display text-5xl text-gold/30 leading-none select-none"
                      aria-hidden="true"
                    >
                      &ldquo;
                    </span>
                    <p className="font-display font-medium text-xl text-gray-text leading-snug italic">
                      {story.pullQuote}
                    </p>
                    <footer className="mt-3">
                      <cite className="font-body text-sm text-gray-muted not-italic">— {story.name}</cite>
                    </footer>
                  </blockquote>

                  {/* Adam's note */}
                  <div className="flex items-start gap-3 mt-6 p-5 rounded-xl bg-gray-elevated border border-white/5">
                    <div className="flex-shrink-0 mt-0.5">
                      <div className="w-1 h-full min-h-[24px] bg-gold/40 rounded-full" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-mono text-xs text-gold tracking-wider mb-1.5">~ Coach Adam</p>
                      <p className="font-body text-sm text-gray-text-2 leading-relaxed italic">
                        {story.adamNote}
                      </p>
                    </div>
                  </div>
                </article>

                {i < featuredStories.length - 1 && (
                  <div className="mt-16 w-full h-px bg-white/5" aria-hidden="true" />
                )}
              </FadeUp>
            ))}
          </div>
        </section>

        <Divider />

        {/* ---- Quote grid ---- */}
        <section className="py-24 lg:py-32 bg-gray-bg-2">
          <div className="max-w-7xl mx-auto px-6">
            <FadeIn className="mb-12">
              <p className="font-mono text-xs text-gray-muted tracking-[0.2em] uppercase mb-2">In their words</p>
              <h2 className="font-display font-semibold text-title-xl text-gray-text">
                More from clients
              </h2>
            </FadeIn>

            <StaggerContainer
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
              staggerDelay={0.07}
            >
              {clientQuotes.map((item) => (
                <StaggerItem key={item.id} variants={staggerItemVariants}>
                  <div className="p-7 rounded-xl bg-gray-elevated border border-white/5 h-full flex flex-col gap-4">
                    <p className="font-mono text-xs text-gold tracking-wider">{item.context}</p>
                    <blockquote className="font-body text-sm text-gray-text-2 leading-relaxed italic flex-1">
                      &ldquo;{item.quote}&rdquo;
                    </blockquote>
                    <footer>
                      <cite className="font-body font-medium text-gray-text text-sm not-italic">— {item.name}</cite>
                    </footer>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        <Divider />

        {/* ---- Google reviews ---- */}
        <section className="py-24 lg:py-32">
          <div className="max-w-7xl mx-auto px-6">
            <FadeIn className="mb-4">
              <p className="font-mono text-xs text-gray-muted tracking-[0.2em] uppercase mb-2">Google Reviews</p>
              <div className="flex items-center gap-4">
                <h2 className="font-display font-semibold text-title-xl text-gray-text">
                  4.9 ★ average
                </h2>
                <span className="font-mono text-xs text-gray-muted">(Google)</span>
              </div>
            </FadeIn>

            <StaggerContainer
              className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
              staggerDelay={0.06}
            >
              {googleReviews.map((review) => (
                <StaggerItem key={review.id} variants={staggerItemVariants}>
                  <div className="p-6 rounded-xl bg-gray-elevated border border-white/5 h-full flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <StarRating count={review.stars} />
                      <svg width="20" height="20" viewBox="0 0 24 24" className="text-gray-muted/40 flex-shrink-0" aria-label="Google review" role="img">
                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                      </svg>
                    </div>
                    <blockquote className="font-body text-sm text-gray-text-2 leading-relaxed italic flex-1">
                      &ldquo;{review.quote}&rdquo;
                    </blockquote>
                    <footer>
                      <cite className="font-body font-medium text-gray-text text-sm not-italic">— {review.name}</cite>
                    </footer>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        <Divider />

        {/* ---- CTA ---- */}
        <section className="py-24 lg:py-28 bg-gray-bg-2">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <FadeIn>
              <p className="font-mono text-xs text-gold tracking-[0.2em] uppercase mb-4">Ready?</p>
              <h2 className="font-display font-semibold text-title-xl text-gray-text mb-5">
                Your story could be next.
              </h2>
              <p className="font-body text-lead text-gray-text-2 mb-8 max-w-xl mx-auto leading-relaxed">
                Every client above started by reaching out. No pressure, no pitch, just enough context for Adam&apos;s team to ask the right questions.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button href="/contact" variant="gold" size="lg">
                  Tell Adam What&apos;s Going On
                </Button>
                <Link
                  href="/quiz"
                  className="font-body text-sm text-gray-text-2 hover:text-gold transition-colors duration-200"
                >
                  Not sure where to start? Take the quiz →
                </Link>
              </div>
              <p className="font-mono text-xs text-gray-muted mt-6">No commitment. No pressure. Honest advice.</p>
            </FadeIn>
          </div>
        </section>

      </main>
    </>
  );
}
