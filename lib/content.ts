// Content sourced verbatim from resources/*.txt — see docs/PRD.md Section 8 for
// full extraction notes, provenance, and flagged gaps. Do not invent copy here;
// add a "Coming Soon" state instead when content doesn't exist yet.

export const members = [
  {
    name: "Om Umrania",
    bio: "I build AI products, decode data, and occasionally make 13 AI agents work together without starting a rebellion. From RAG systems to automation workflows, I enjoy taking ambitious ideas from 0→1 and turning them into products that create real impact. My superpower? Switching between product strategy and technical execution without losing the plot—or the user.",
    superpower: "Going from “This sounds impossible” to “I’ve already built a prototype.” \u{1F4A1}",
    links: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/omumrania" },
      { label: "GitHub", href: "https://github.com/om-umrania" },
      { label: "Portfolio", href: "https://omumrania.com/" },
    ],
    photo: null,
  },
  {
    name: "Muskan Sharma",
    bio: "I am an AI product enthusiast who loves turning messy problems into simple, user-focused solutions. With around 3.5 years of experience across AI consulting, product discovery, and strategy, I enjoy connecting business needs with technology. My superpower is bringing structure to chaos and taking ideas from “What if?” to “It’s live!” \u{1F680}",
    superpower:
      "Bringing structure to chaos. Give me an ambiguous problem, five conflicting stakeholder opinions, and a tight deadline—and I’ll turn them into a clear plan that everyone can rally around.",
    links: [
      { label: "Email", href: "mailto:muskan.sharma2027@mastersunion.org" },
      { label: "LinkedIn", href: "https://linkedin.com/in/muskan-sharma-273128193" },
    ],
    location: "Gurugram, India",
    photo: "/team/muskan-sharma.jpg",
  },
  {
    name: "Akshat Dhaundiyal",
    // NOTE: source (resources/Team-Summary.txt) has a dropped word after "business" —
    // "turn complex business." reads as cut off. Filled minimally pending Akshat's
    // confirmation; see docs/PRD.md open question 19 before treating as final.
    bio: "I’m a data scientist evolving into a product builder—because predicting outcomes is fun, but shaping them is even better. I use AI, analytics, and automation to turn complex business problems into clarity. From simplifying enterprise workflows to building AI-powered tools, I enjoy taking ideas beyond dashboards and putting them into action.",
    superpower: "Spotting patterns hidden in chaos and converting them into decisions people can actually act on. \u{1F4AD}",
    links: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/akshat-dhaundiyal-1664a9122" },
      { label: "Email", href: "mailto:akshat.dhaundiyal2027@mastersunion.org" },
    ],
    photo: null,
  },
  {
    name: "Supriya",
    bio: "I’m a Product Manager who gets unreasonably excited about problems. From building products from 0→1 to now building communities, I’m happiest somewhere between “what if?” and “let’s ship it.”",
    superpower: "Turning ambiguity into action. ⚡",
    links: [],
    photo: "/team/supriya.jpg",
  },
] as const;

export const events = [
  {
    number: 1,
    title: "Product Design Workshop & Hackathon",
    date: "14 August 2026",
    type: "internal" as const,
    tagline: "Bring a problem. Leave with a prototype.",
    description:
      "Participants identify a meaningful problem, understand their users, generate ideas, and build a rapid prototype in one intensive product-design experience.",
    outcomes: "Problem discovery, design thinking, ideation, rapid prototyping",
    cta: "Register Now",
    urgency: "Less than a week to go",
  },
  {
    number: 2,
    title: "The Product Challenge",
    date: "9 October 2026",
    type: "external" as const,
    typeLabel: "External Flagship Event",
    tagline: "Solve beyond the classroom.",
    description:
      "Participants tackle a real-world product challenge, uncover user insights, define a product strategy, and pitch a feasible and impactful solution.",
    outcomes: "User research, product strategy, prioritisation, solution pitching",
    cta: "Coming Soon",
  },
  {
    number: 3,
    title: "Build, Test & Iterate",
    date: "4 December 2026",
    type: "internal" as const,
    tagline: "Great products are not born finished—they evolve.",
    description:
      "Teams test assumptions, gather feedback, measure outcomes, and improve their early solutions through rapid iterations.",
    outcomes: "Validation, user testing, metrics, product iteration",
    cta: "Save the Date",
  },
  {
    number: 4,
    title: "Product Showcase: The Grand Finale",
    date: "5 February 2027",
    type: "external" as const,
    typeLabel: "External Grand Finale",
    tagline: "From your first problem statement to a product worth presenting.",
    description:
      "Teams present their refined products to industry leaders, mentors, and fellow builders, demonstrating the complete journey from problem discovery to final execution.",
    outcomes: "Product showcase, expert feedback, networking, recognition",
    cta: "Save the Date",
  },
] as const;

export const mission = {
  whyWeExist: [
    "Because great products don’t begin with features. They begin with “Wait… why is this so difficult?”",
    "The Product Management Club is where curious minds become confident product builders. We question the obvious, obsess over users, challenge assumptions, and occasionally debate button placements longer than we’d like to admit.",
    "Through hands-on workshops, live challenges, industry conversations, and rapid experiments, we turn messy problems into thoughtful products—and classroom concepts into real product decisions.",
  ],
  whoAreWe: [
    "A slightly over-curious mix of future product managers, designers, strategists, technologists, and builders.",
    "We may approach problems differently, but we share one belief: the best way to understand a product is to roll up your sleeves and build one.",
  ],
  ourMission:
    "To create a playground where aspiring product minds can question boldly, think strategically, build rapidly, fail safely, and iterate relentlessly.",
  whatComesOutOfIt: [
    "Ideas that escape the sticky-note stage",
    "Problems understood before solutions are built",
    "Decisions backed by users—not assumptions",
    "Prototypes tested before becoming “revolutionary”",
    "Stronger portfolios and sharper product instincts",
    "A community that loves asking, “But what problem are we actually solving?”",
  ],
  closing: "We don’t just talk product. We think it, test it, break it, rebuild it—and make it matter.",
};

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
  { label: "Members", href: "#members" },
  { label: "Events", href: "#events" },
  { label: "Mission", href: "#mission" },
  { label: "Who It's For", href: "#audience" },
  { label: "Community", href: "#community" },
  { label: "Breakdown", href: "#breakdown" },
  { label: "Resources", href: "#resources" },
  { label: "Projects", href: "#projects" },
];

export const whatsappUrl = "#"; // TODO: real WhatsApp community invite link — see docs/PRD.md Section 11
export const registrationUrl = "#"; // TODO: real event registration flow — see docs/PRD.md Section 11
