// Content sourced verbatim from resources/*.txt — see docs/PRD.md Section 8 for
// full extraction notes, provenance, and flagged gaps. Do not invent copy here;
// add a "Coming Soon" state instead when content doesn't exist yet.

export interface Member {
  readonly slug: string;
  readonly name: string;
  readonly role: "President" | "Vice President" | "Core Member";
  readonly bio: string;
  readonly superpower: string;
  readonly links: readonly { label: string; href: string }[];
  readonly location?: string;
  readonly photo: string | null;
  readonly cutout?: string;
}

export const members: readonly Member[] = [
  {
    slug: "sai-harsha-sadhu",
    name: "Sai Harsha Sadhu",
    role: "President",
    bio: "I build products that don’t just look good in a pitch deck—they survive real users, real markets, and real-world complexity. Across five years, 10+ products, 200+ PRDs, and 2,000+ UI screens, I’ve shaped solutions across FinTech, HealthTech, AI, and digital identity. I thrive in high-ambiguity environments, turning scattered insights and competing priorities into products that are focused, functional, and built to scale.",
    superpower: "Seeing the product hiding inside a complex problem—and cutting through the noise until only what matters remains.",
    links: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/r-e-sai-harsha-sadhu/" },
      { label: "Portfolio", href: "https://saiharsha.framer.website/" },
      { label: "Email", href: "mailto:saiharsha2407@outlook.com" },
      { label: "WhatsApp", href: "https://wa.me/917287828919" },
    ],
    photo: "/team/sai-harsha.png",
    cutout: "/team/cutouts/sai-harsha.webp",
  },
  {
    slug: "akhil-menon",
    name: "Akhil Menon",
    role: "Vice President",
    bio: "I’m a product builder at Jio Platforms who likes asking two questions: “Why would a user care?” and “What do the numbers say?” With 3+ years in B2C product development, I’ve redesigned high-traffic journeys, launched platforms for 350K+ users, and built an AI-powered survey product that enabled 13M+ responses. I work where technology, UX, and growth collide—turning customer friction into experiences that convert, scale, and stick.",
    superpower: "Finding the one broken step in a user journey that everyone else has learned to live with—and fixing it before the next sprint begins.",
    links: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/akhilmn18/" },
      { label: "Email", href: "mailto:akhilmn18work@gmail.com" },
      { label: "WhatsApp", href: "https://wa.me/917977440681" },
    ],
    photo: "/team/akhil-menon.png",
    cutout: "/team/cutouts/akhil-menon.webp",
  },
  {
    slug: "anusha-p-b",
    name: "Anusha P. B.",
    role: "Core Member",
    bio: "I spot what’s missing in a market—and build the business that should exist there. At Ather Energy, I built the accessories and merchandise category from scratch, scaling it into a ₹100+ crore business with 50%+ gross margins and a 4,000+ member community. Before that, I redesigned cricket products at Decathlon and launched India’s first women’s cricket apparel line. Now at Masters’ Union, I’m exploring the intersection of sports, technology, and business to help shape India’s next wave of sports innovation.",
    superpower: "Seeing whitespace before it becomes obvious—and owning everything from the first sketch to the final P&L.",
    links: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/anushapb/" },
      { label: "WhatsApp", href: "https://wa.me/919382299775" },
    ],
    photo: "/team/anusha.png",
    cutout: "/team/cutouts/anusha.webp",
  },
  {
    slug: "akshat-dhaundiyal",
    name: "Akshat Dhaundiyal",
    role: "Core Member",
    // NOTE: source (resources/Team-Summary.txt) has a dropped word after "business" —
    // "turn complex business." reads as cut off. Filled minimally pending Akshat's
    // confirmation; see docs/PRD.md open question 19 before treating as final.
    bio: "I’m a data scientist evolving into a product builder—because predicting outcomes is fun, but shaping them is even better. I use AI, analytics, and automation to turn complex business problems into clarity. From simplifying enterprise workflows to building AI-powered tools, I enjoy taking ideas beyond dashboards and putting them into action.",
    superpower: "Spotting patterns hidden in chaos and converting them into decisions people can actually act on. \u{1F4AD}",
    links: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/akshat-dhaundiyal-1664a9122" },
      { label: "Email", href: "mailto:akshat.dhaundiyal2027@mastersunion.org" },
      { label: "WhatsApp", href: "https://wa.me/919560615045" },
    ],
    photo: "/team/akshat.png",
    cutout: "/team/cutouts/akshat.webp",
  },
  {
    slug: "saffa-ahmad",
    name: "Saffa Ahmad",
    role: "Core Member",
    // NOTE: bio/superpower are drafted from Saffa's LinkedIn resume (public/saffa-info.pdf),
    // not first-person copy she wrote herself — unlike the rest of this file. Flag for her
    // review/confirmation before treating as final; see docs/PRD.md content-provenance note
    // at the top of this file.
    bio: "I'm a Generative AI engineer with three years at Tata Consultancy Services, where I moved from Assistant System Engineer to System Engineer building software for real production systems. I hold a patent for a Smart Electric Switch, and my current focus is applying LLMs—particularly LLaMA—to practical engineering problems, backed by a BE in Computer Science with Honours in Data Science.",
    superpower: "Turning patent-grade ideas into production systems—now doing the same with Generative AI and LLaMA.",
    links: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/saffa523/" },
      { label: "WhatsApp", href: "https://wa.me/919404083985" },
    ],
    photo: "/team/saffa.png",
    cutout: "/team/cutouts/saffa.webp",
  },
  {
    slug: "muskan-sharma",
    name: "Muskan Sharma",
    role: "Core Member",
    bio: "I am an AI product enthusiast who loves turning messy problems into simple, user-focused solutions. With around 3.5 years of experience across AI consulting, product discovery, and strategy, I enjoy connecting business needs with technology. My superpower is bringing structure to chaos and taking ideas from “What if?” to “It’s live!” \u{1F680}",
    superpower:
      "Bringing structure to chaos. Give me an ambiguous problem, five conflicting stakeholder opinions, and a tight deadline—and I’ll turn them into a clear plan that everyone can rally around.",
    links: [
      { label: "Email", href: "mailto:muskan.sharma2027@mastersunion.org" },
      { label: "LinkedIn", href: "https://linkedin.com/in/muskan-sharma-273128193" },
      { label: "WhatsApp", href: "https://wa.me/918373944571" },
    ],
    location: "Gurugram, India",
    photo: "/team/muskan-sharma.png",
    cutout: "/team/cutouts/muskan-sharma.webp",
  },
  {
    slug: "supriya",
    name: "Supriya",
    role: "Core Member",
    bio: "I’m a Product Manager who gets unreasonably excited about problems. From building products from 0→1 to now building communities, I’m happiest somewhere between “what if?” and “let’s ship it.”",
    superpower: "Turning ambiguity into action. ⚡",
    links: [{ label: "WhatsApp", href: "https://wa.me/917406521184" }],
    photo: "/team/supriya.png",
    cutout: "/team/cutouts/supriya-v2.webp",
  },
  {
    slug: "om-umrania",
    name: "Om Umrania",
    role: "Core Member",
    bio: "I build AI products, decode data, and occasionally make 13 AI agents work together without starting a rebellion. From RAG systems to automation workflows, I enjoy taking ambitious ideas from 0→1 and turning them into products that create real impact. My superpower? Switching between product strategy and technical execution without losing the plot—or the user.",
    superpower: "Going from “This sounds impossible” to “I’ve already built a prototype.” \u{1F4A1}",
    links: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/omumrania" },
      { label: "GitHub", href: "https://github.com/om-umrania" },
      { label: "Portfolio", href: "https://omumrania.com/" },
      { label: "WhatsApp", href: "https://wa.me/919175968322" },
    ],
    photo: "/team/om-umrania.png",
    cutout: "/team/cutouts/om-umrania.webp",
  },
] as const;

export function getMemberBySlug(slug: string) {
  return members.find((member) => member.slug === slug);
}

export const whoWeAre = {
  eyebrow: "Who Are We",
  heading: "Who Are We?",
  lede: "We are the people who look at everyday frustrations and ask, “How could this work better?”",
  paragraphs: [
    "ProdMan Club is a community of curious thinkers, problem-solvers, and builders who believe that great products begin with understanding people—not just technology. We explore the entire journey from identifying real user problems and challenging assumptions to designing, testing, launching, and improving meaningful solutions.",
    "Through hands-on challenges, product teardowns, simulations, industry interactions, and collaborative building, we turn product management from a classroom concept into a practical craft.",
    "We don’t just discuss products. We question them, break them down, rebuild them—and learn how to create experiences people genuinely value.",
  ],
  closing: "We don’t predict the future. We build what deserves to exist in it.",
} as const;

export const events = [
  {
    number: 1,
    slug: "back-to-future",
    title: "Back to Future",
    subtitle: "A ProdMan Challenge for Everyone",
    date: "14 August 2026",
    type: "internal" as const,
    tagline: "You think you're smart. The internet doesn't exist. Go.",
    description:
      "Your team of 4 draws a company worth billions — Amazon, Bumble, Swiggy — and gets 120 minutes to rebuild it using only 1995 technology, systems, and processes. No laptops. No AI. No internet. Just paper, landlines, cash, and people who were very good at their jobs.",
    whatYoullDo: [
      "Tear a product down to the job it really does",
      "Design an entire business on paper",
      "Find the one thing software quietly killed — and put it back",
      "Pitch it in 90 seconds to judges who will interrupt you",
    ],
    highlights: "Win Cool Prizes · Teams of 4 · Limited seats",
    time: "4:30–6:30 PM",
    durationNote: "2 hours of fun",
    venue: "CDS Auditorium",
    registerUrl: "https://forms.gle/KYP1ZWvV58hLpekX9",
    cta: "Register Now",
    urgency: "Less than a week to go",
  },
  {
    number: 2,
    title: "External Event 1",
    date: "9 October 2026",
    type: "external" as const,
    typeLabel: "External Flagship Event",
    tbd: true as const,
  },
  {
    number: 3,
    title: "Internal Event 2",
    date: "4 December 2026",
    type: "internal" as const,
    tbd: true as const,
  },
  {
    number: 4,
    title: "External Flagship Event 2",
    date: "5 February 2027",
    type: "external" as const,
    typeLabel: "External Grand Finale",
    tbd: true as const,
  },
] as const;

export function getFullEvents() {
  return events.filter(
    (event): event is Extract<(typeof events)[number], { slug: string }> => "slug" in event,
  );
}

export function getEventBySlug(slug: string) {
  return getFullEvents().find((event) => event.slug === slug);
}

export const personas = [
  {
    name: "The Product Thinkers",
    you: "You see a frustrating experience and immediately start redesigning it in your head.",
    forWhom:
      "For aspiring PMs, strategists, problem-solvers, and anyone constantly asking: “What problem are we actually solving?”",
  },
  {
    name: "The Tech Builders",
    you: "You turn “What if?” into “It works.”",
    forWhom:
      "For developers, engineers, no-code explorers, and technical minds ready to transform ambitious ideas into functional products.",
  },
  {
    name: "The AI Explorers",
    you: "You don’t just prompt AI—you imagine what it should do next.",
    forWhom:
      "For curious minds experimenting with agents, automation, GenAI, intelligent experiences, and the products shaping tomorrow.",
  },
  {
    name: "The Design Minds",
    you: "You know that if users need a manual, something has already gone wrong.",
    forWhom:
      "For designers and experience enthusiasts who care about making products intuitive, useful, and impossible to ignore.",
  },
  {
    name: "The Curious Generalists",
    you: "No technical title? No problem. Curiosity is the only prerequisite.",
    forWhom:
      "For marketers, consultants, founders, operators, and business minds who want to understand how meaningful products move from insight to impact.",
  },
] as const;

export const audienceClosing = [
  "Coders build it. Designers shape it. Product minds question it. AI transforms it. We bring them all together.",
  "If you’re curious enough to ask “Why?” and bold enough to build “What’s next?”—you belong here.",
];

export const offerings = [
  { label: "Events", href: "#events" },
  { label: "Product Breakdown", href: "#breakdown" },
  { label: "Resources", href: "#resources" },
  { label: "Community", href: "#community" },
  { label: "Projects", href: "#projects" },
];

export type PMCategory = "strategy" | "design" | "tech" | "growth" | "ai_leadership";

export interface ProductBreakdownItem {
  readonly id: string;
  readonly category: PMCategory;
  readonly categoryLabel: string;
  readonly title: string;
  readonly hook: string;
  readonly description: string;
  readonly tags: readonly string[];
  readonly accentColor: string;
}

export interface ProductBreakdownCategory {
  readonly id: "all" | PMCategory;
  readonly label: string;
}

export const productBreakdownCategories: readonly ProductBreakdownCategory[] = [
  { id: "all", label: "All Pillars" },
  { id: "strategy", label: "Product Strategy" },
  { id: "design", label: "Product Design & UX" },
  { id: "tech", label: "Technical PM" },
  { id: "growth", label: "Growth & Data" },
  { id: "ai_leadership", label: "AI & Leadership" },
] as const;

export const productBreakdown: readonly ProductBreakdownItem[] = [
  {
    id: "spot-the-problem",
    category: "strategy",
    categoryLabel: "Product Strategy",
    title: "Spot the Problem",
    hook: "Because “I have a cool app idea” is not user research.",
    description: "Talk to users, uncover real frustrations, validate assumptions, and identify problems worth solving.",
    tags: ["User Research", "Personas", "Jobs to Be Done", "Problem Validation"],
    accentColor: "var(--acid)",
  },
  {
    id: "shape-the-strategy",
    category: "strategy",
    categoryLabel: "Product Strategy",
    title: "Shape the Strategy",
    hook: "Decide where the product is going—and why anyone should follow.",
    description: "Define the vision, understand the market, create value, and find a reason for the product to win.",
    tags: ["Product Vision", "Market Research", "Positioning", "Business Models"],
    accentColor: "var(--acid)",
  },
  {
    id: "design-the-experience",
    category: "design",
    categoryLabel: "Product Design & UX",
    title: "Design the Experience",
    hook: "If users need instructions for the “simple” flow, we need to talk.",
    description:
      "Map journeys, create wireframes, build prototypes, and design experiences that make sense outside the team meeting.",
    tags: ["UX", "User Journeys", "Wireframes", "Prototyping"],
    accentColor: "var(--cyan)",
  },
  {
    id: "choose-what-gets-built",
    category: "tech",
    categoryLabel: "Technical PM",
    title: "Choose What Gets Built",
    hook: "One roadmap. Fifty feature requests. Zero extra developers. Good luck.",
    description:
      "Prioritise ruthlessly, define the MVP, manage trade-offs, and confidently say “not yet” to approximately everyone.",
    tags: ["Roadmaps", "MVPs", "RICE", "Backlogs"],
    accentColor: "var(--acid)",
  },
  {
    id: "build-with-the-team",
    category: "tech",
    categoryLabel: "Technical PM",
    title: "Build With the Team",
    hook: "The PM doesn’t build everything—but somehow knows what everyone is building.",
    description: "Work with designers, engineers, marketers, analysts, and stakeholders to transform ideas into working products.",
    tags: ["PRDs", "User Stories", "Agile", "Product Launches"],
    accentColor: "var(--acid)",
  },
  {
    id: "let-the-data-judge",
    category: "growth",
    categoryLabel: "Growth & Data",
    title: "Let the Data Judge",
    hook: "Everyone has opinions. The funnel has receipts.",
    description:
      "Track what users do—not just what they say. Measure adoption, conversion, engagement, retention, and everything between “signed up” and “never returned.”",
    tags: ["Metrics", "Funnels", "A/B Testing", "Retention"],
    accentColor: "var(--cyan)",
  },
  {
    id: "make-it-grow",
    category: "growth",
    categoryLabel: "Growth & Data",
    title: "Make It Grow",
    hook: "Launching the product was the beginning, not the victory lap.",
    description: "Run experiments, improve activation, create growth loops, and give users compelling reasons to stay and return.",
    tags: ["Growth", "Experiments", "Product-Led Growth", "Optimisation"],
    accentColor: "var(--cyan)",
  },
  {
    id: "add-ai-responsibly",
    category: "ai_leadership",
    categoryLabel: "AI & Leadership",
    title: "Add AI — Responsibly",
    hook: "No, adding “AI-powered” to the landing page does not count.",
    description:
      "Design intelligent experiences, evaluate models, manage accuracy, reduce bias, and ensure AI solves a real problem instead of becoming a decorative feature.",
    tags: ["GenAI", "AI Agents", "Evaluations", "Responsible AI"],
    accentColor: "var(--acid)",
  },
] as const;

export const newsletterTopics = ["Product Teardowns", "AI Trends", "PM Frameworks", "Opportunities", "Club Updates"];

export const siteNav = [
  { label: "Who We Are", href: "#who-are-we" },
  { label: "Members", href: "#members" },
  { label: "Events", href: "#events" },
  { label: "Who It's For", href: "#audience" },
  { label: "Community", href: "#community" },
  { label: "Breakdown", href: "#breakdown" },
  { label: "Resources", href: "#resources" },
  { label: "Projects", href: "#projects" },
];

export const whatsappUrl = "#"; // TODO: real WhatsApp community invite link — see docs/PRD.md Section 11
export const registrationUrl = "#"; // TODO: real event registration flow — see docs/PRD.md Section 11
