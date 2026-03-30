/**
 * GRAY METHOD TRAINING — SITE DATA
 *
 * All copy lives here. No hardcoded strings in JSX.
 * Adam's voice, vocabulary, and specific language rules from brand voice doc
 * are baked into every string below.
 *
 * Do NOT use: "bad food", "clean eating", "cheat meal", "toning", "transform",
 * "holistic", "optimize", "sustainable results", "journey"
 */

/* ---- Navigation ------------------------------------------- */
export const nav = {
  logo: "Gray Method",
  links: [
    { label: "About", href: "/about" },
    { label: "Programs", href: "/programs" },
    { label: "Pricing", href: "/pricing" },
    { label: "Shop", href: "/shop" },
    { label: "Reviews", href: "/reviews" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  cta: { label: "Schedule a Free Call", href: "/contact" },
};

/* ---- Hero ------------------------------------------------- */
export const hero = {
  headline: "Gray Method Online Health & Fitness",
  tagline:
    "There is no black and white, everyone is different, everything is a gray area. Let's find the perfect plan for YOU!",
  ctaPrimary: { label: "Schedule a Free Call with Coach Adam", href: "/contact" },
  ctaSecondary: { label: "Take the Quiz", href: "/quiz" },
  scrollLabel: "Scroll to explore",
};

/* ---- Pain Points ------------------------------------------ */
export const painPoints = {
  headline: "Does this sound like you?",
  cards: [
    {
      id: "mom",
      name: "The Mom",
      body: "You feed your family first. You haven't made real time for yourself in years — and you're starting to feel it everywhere.",
    },
    {
      id: "diet-cycler",
      name: "The Diet Cycler",
      body: "You've been through the rotation. Keto worked for two weeks. So did the rest of them. You keep starting over — and you are not the problem.",
    },
    {
      id: "dismissed",
      name: "The Dismissed Patient",
      body: "Your doctor ran the labs. Everything came back normal. They said it was just aging. You know something is wrong — and you're right.",
    },
    {
      id: "busy-pro",
      name: "The Busy Professional",
      body: "You have 30 minutes and a set of dumbbells. You keep waiting for the perfect schedule. It's not coming — but results still can.",
    },
  ],
};

/* ---- Adam Story ------------------------------------------- */
export const adamStory = {
  headline: "I've been there. All the way there.",
  body: [
    "I stepped on the scale backwards. I didn't want to see the number. The last one I actually saw was 329 pounds — and I knew I'd kept gaining after that.",
    "I eventually lost over 100 pounds. I thought that was the finish line.",
    "It wasn't.",
    "What followed was six years of healing my relationship with food, my body, and the way I still saw myself in the mirror. That journey — all of it — is the foundation of every piece of coaching I deliver.",
  ],
  pullQuote:
    "I sprinted to the starting line expecting everything after that to be easy — and it destroyed me.",
  cta: { label: "Read Adam's Full Story", href: "/about" },
};

/* ---- Gray Method Philosophy ------------------------------- */
export const philosophy = {
  headline: "There is no black and white.",
  sub: "There is no right diet, no wrong food, no perfect program. Everything — especially your health — is a gray area. Let's find what works for you.",
  pillars: [
    {
      number: "01",
      title: "No Systems",
      body: "I am not a system coach. Systems stuff all clients into a box, whether they belong there or not. Your plan is built for you — not a category.",
    },
    {
      number: "02",
      title: "Consistency Over Intensity",
      body: "I'll never stop shouting this from the rooftops. 80% consistent for two years beats 100% for three weeks every single time.",
    },
    {
      number: "03",
      title: "Supportive, Not Restrictive",
      body: "No 'bad foods.' No 'cheat meals.' No shame spiral. Lean protein, supportive carbohydrates, healthy fat — your body needs all of it.",
    },
  ],
};

/* ---- Programs --------------------------------------------- */
export const programs = {
  headline: "Where do you want to start?",
  items: [
    {
      id: "one-on-one",
      name: "1:1 Online Coaching",
      isFeatured: false,
      badge: null,
      description:
        "A fully personalized plan built around your equipment, your schedule, your injuries, your goals. Not a template. Not a system.",
      cta: { label: "Learn More", href: "/programs/one-on-one" },
    },
    {
      id: "eeh",
      name: "Energize & Empower Her",
      isFeatured: true,
      badge: "FLAGSHIP PROGRAM",
      description:
        "Co-created with Laura Brown, NP — Board-Certified Women's Health Nurse Practitioner. The only program that addresses your hormones and your habits together.",
      cta: { label: "Join the Waitlist", href: "/programs/energize-empower" },
    },
    {
      id: "group",
      name: "Group Coaching",
      isFeatured: false,
      badge: "LIMITED SPOTS",
      description:
        "Personalized support inside a community of women who get it.",
      cta: { label: "Learn More", href: "/programs/group" },
    },
  ],
};

/* ---- Pricing ---------------------------------------------- */
export const pricing = {
  eyebrow: "Built to win you clients",
  headline: "A website that pays for itself should not look like a template.",
  sub:
    "Three one-time package options for a Gray Method site that feels premium, earns trust fast, and turns the right visitors into booked calls.",
  chips: [
    "One-time payment",
    "Mobile-first",
    "Built around real leads",
    "You own the asset forever",
  ],
  tiers: [
    {
      id: "starter",
      name: "Starter",
      price: 1500,
      tag: "Foundation",
      description:
        "The lean setup for getting the brand online with a clean, persuasive core site.",
      features: [
        "Custom homepage and hero structure",
        "About, contact, and programs pages",
        "Mobile-first responsive layout",
        "Basic SEO, metadata, and launch setup",
        "Contact form and call-to-action flow",
      ],
      cta: "Start with Starter",
      featured: false,
    },
    {
      id: "pro",
      name: "Pro",
      price: 3000,
      tag: "Recommended",
      description:
        "The full brand experience with the integrations that actually help the site convert.",
      features: [
        "Everything in Starter",
        "Instagram feed integration and social proof",
        "Blog or CMS setup",
        "Testimonials and story-driven sections",
        "Quiz or lead capture integration",
        "Launch support and handoff walkthrough",
      ],
      cta: "Choose Pro",
      featured: true,
    },
    {
      id: "premium",
      name: "Premium",
      price: 5500,
      tag: "Full Stack",
      description:
        "The complete business platform for a site that has room to grow into every channel.",
      features: [
        "Everything in Pro",
        "Shop / commerce integration",
        "Revenue architecture and checkout flow",
        "Expanded content structure and page set",
        "Priority revisions and launch day support",
        "1-on-1 training for future updates",
      ],
      cta: "Build the Full Stack",
      featured: false,
    },
  ],
  roi: {
    eyebrow: "Run the numbers",
    headline: "How quickly does the site pay for itself?",
    sub:
      "This is a conservative sales model for selling the website itself. If the new site books more qualified calls, even one additional close can move the needle fast.",
    proofs: [
      "Interactive proof tool",
      "Conservative assumptions",
      "Warm lead benchmarks",
    ],
    defaults: {
      monthlyLeads: 4,
      closeRate: 25,
      averageClientValue: 3000,
    },
    note:
      "Benchmarks are informed by HubSpot's 2-5% lead-to-customer range, the quiz-funnel and calculator patterns called out in the competitive brief, and 2025 personal-training pricing references. Warm website inquiries are typically stronger than cold outreach, so adjust the sliders to match your real funnel.",
  },
  comparison: {
    eyebrow: "Compare packages",
    headline: "What changes as the investment goes up",
    rows: [
      {
        feature: "Custom design direction",
        starter: true,
        pro: true,
        premium: true,
      },
      {
        feature: "Mobile-first responsive build",
        starter: true,
        pro: true,
        premium: true,
      },
      {
        feature: "Contact / call booking flow",
        starter: true,
        pro: true,
        premium: true,
      },
      {
        feature: "Story-led About section",
        starter: true,
        pro: true,
        premium: true,
      },
      {
        feature: "Instagram integration",
        starter: false,
        pro: true,
        premium: true,
      },
      {
        feature: "Blog or CMS setup",
        starter: false,
        pro: true,
        premium: true,
      },
      {
        feature: "Lead magnet / quiz integration",
        starter: false,
        pro: true,
        premium: true,
      },
      {
        feature: "Shop / commerce layer",
        starter: false,
        pro: false,
        premium: true,
      },
      {
        feature: "Revenue architecture and checkout flow",
        starter: false,
        pro: false,
        premium: true,
      },
      {
        feature: "SEO setup and launch support",
        starter: true,
        pro: true,
        premium: true,
      },
    ],
  },
};

/* ---- Shop Preview ----------------------------------------- */
export const shopPreview = {
  eyebrow: "From the shop",
  headline: "Small digital resources that stay close to the work.",
  sub: "A compact Gray Method collection built for the people who want something useful right now, not another noisy storefront.",
  intro:
    "A quiet preview of the shop: a couple of digital resources, a simple path to the full collection, and nothing that pulls attention away from the coaching story.",
  highlights: [
    {
      title: "Digital downloads",
      body: "Starter materials and nutrition guidance that fit the coaching framework.",
    },
    {
      title: "Practical tools",
      body: "Resources that help the right people move from reading to doing.",
    },
    {
      title: "Always available",
      body: "A small collection that stays easy to browse whenever the timing is right.",
    },
  ],
  cta: { label: "Browse the shop", href: "/shop" },
  secondaryCta: { label: "Ask about a product", href: "/contact" },
};

/* ---- Stats ------------------------------------------------- */
export const stats = [
  {
    value: 11,
    suffix: "+",
    label: "Years coaching",
    note: null,
  },
  {
    value: 100,
    suffix: "+",
    label: "Pounds lost personally",
    note: "and every lesson that came with it",
  },
  {
    value: 4.9,
    suffix: "★",
    label: "Average Google rating",
    note: null,
  },
  {
    value: 100,
    suffix: "%",
    label: "Would recommend",
    note: null,
  },
];

/* ---- Testimonials ----------------------------------------- */
export const testimonials = {
  headline: "Real people. Real stories.",
  featured: [
    {
      id: "kayla",
      name: "Kayla",
      context: "1:1 Online Coaching",
      photoKey: "testimonialKayla",
      quote:
        "Looking back I realize I lost a lot of happiness and had the feeling that I didn't deserve to put myself first… I felt proud of my personal growth today and felt like a proud mom.",
      adamNote:
        "Kayla's biggest transformation wasn't physical — it was the moment she decided she was worth showing up for.",
    },
    {
      id: "maureen",
      name: "Maureen",
      context: "Energize & Empower Her, Cohort 1",
      photoKey: "testimonialMaureen",
      quote:
        "I haven't felt this excited or listened to in I don't know how long, when it's come to my personal health.",
      adamNote:
        "Maureen had been told everything was normal. It wasn't. She deserved someone who actually listened.",
    },
    {
      id: "deb",
      name: "Deb Alfano",
      context: "4-year client",
      photoKey: "testimonialDeb",
      quote:
        "He knows what I am capable of, even when I don't believe it. He explains what you are doing, why you are doing it and how to do it safely.",
      adamNote:
        "Four years in, and Deb still surprises herself. That never gets old.",
    },
  ],
  cta: { label: "Read All Client Stories", href: "/reviews" },
};

/* ---- Quiz CTA --------------------------------------------- */
export const quizCta = {
  headline: "Find out what's actually keeping you stuck.",
  sub: "A 2-minute quiz. Real answers, not generic advice.",
  ctaPrimary: { label: "Take the Quiz", href: "/quiz" },
  ctaSecondary: {
    label: "Or schedule a free 20-minute call with Coach Adam",
    href: "/contact",
  },
};

/* ---- Final CTA -------------------------------------------- */
export const finalCta = {
  headline: "Ready to stop starting over?",
  sub: "A free 20-minute call with Coach Adam. Not a sales pitch — just an honest conversation about where you are and where you want to go.",
  cta: { label: "Schedule Your Free Call", href: "/contact" },
  note: "No commitment. No pressure. Just a conversation.",
};

/* ---- Footer ----------------------------------------------- */
export const footer = {
  tagline: "There is no black and white. Let's find the perfect plan for YOU.",
  columns: [
    {
      heading: "Explore",
      links: [
        { label: "About Coach Adam", href: "/about" },
        { label: "Programs", href: "/programs" },
        { label: "Client Reviews", href: "/reviews" },
        { label: "Blog", href: "/blog" },
      ],
    },
    {
      heading: "Programs",
      links: [
        { label: "1:1 Online Coaching", href: "/programs/one-on-one" },
        { label: "Energize & Empower Her", href: "/programs/energize-empower" },
        { label: "Group Coaching", href: "/programs/group" },
        { label: "Free Discovery Call", href: "/contact" },
      ],
    },
    {
      heading: "Connect",
      links: [
        { label: "Contact", href: "/contact" },
        { label: "Take the Quiz", href: "/quiz" },
        {
          label: "Instagram",
          href: "https://instagram.com/adamgray_coach",
          external: true,
        },
        {
          label: "Facebook",
          href: "https://facebook.com/graymethodhealthandfitness",
          external: true,
        },
      ],
    },
  ],
  contact: {
    email: "Graymethodtraining@gmail.com",
    phone: "603-340-7281",
    location: "Henniker, NH",
  },
  copyright: `© ${new Date().getFullYear()} Gray Method Training. All rights reserved.`,
  newsletterHeading: "Get tips from Coach Adam",
  newsletterSub: "No spam. No nonsense. Just what actually works.",
};

/* ---- Social links ----------------------------------------- */
export const social = {
  instagram: "https://instagram.com/adamgray_coach",
  facebook: "https://facebook.com/graymethodhealthandfitness",
  instagramHandle: "@adamgray_coach",
};

/* ---- Discovery call link ---------------------------------- */
export const discoveryCallUrl =
  "https://docs.google.com/forms/d/e/1FAIpQLSfpfq4mQWKm_cTbg2WgWMfNEVJVrPUXw5xtURKK97hOTJi0Rg/viewform";
