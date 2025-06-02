import { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "cashnews",
    title: "Cashnews",
    description: "🔮 Watch, Analyse, Predict - ML stock market analysis.",
    tags: ["Typescript", "NestJS", "NextJS", "Python"],
    link: "https://cashnews.ch",

    // Extended properties
    liveUrl: "https://cashnews.ch",
    githubUrl: "https://github.com/yevhenii-atlanov/cashnews",
    hasDetails: true,
    timeframe: "2024 - Present",
    techStack: [
      "TypeScript",
      "NestJS",
      "NextJS",
      "Python",
      "TensorFlow",
      "PostgreSQL",
    ],
    keyFeatures: [
      "Real-time stock market data visualization",
      "ML-based price prediction algorithms",
      "Personalized investment recommendations",
      "Market news analysis and sentiment tracking",
    ],
    role: "Full Stack Developer & ML Engineer",
    teamSize: "3 developers",
  },
  {
    id: "dropster",
    title: "Dropster",
    description: "📦 Fast and full-featured dropshipping shop",
    tags: ["Typescript", "NestJS", "NextJS"],
    link: "https://dropster.ch",

    // Extended properties
    liveUrl: "https://dropster.ch",
    githubUrl: "https://github.com/yevhenii-atlanov/dropster",
    hasDetails: true,
    timeframe: "2021 - 2022",
    techStack: ["TypeScript", "NestJS", "NextJS", "MongoDB", "Redis", "AWS S3"],
    keyFeatures: [
      "Automated supplier integration",
      "Dynamic pricing optimization",
      "Order fulfillment workflow",
      "Customer analytics dashboard",
      "Multi-currency support",
    ],
    role: "Backend Developer",
    teamSize: "5 developers",
  },{
    id: "fun1",
    title: "AskGPT",
    description:
      "Inspired with Google for me. Users who are annoyed with random questions can generate a ChatGPT link for that query, and share a shortened URL with people.",
    tags: ["Typescript", "NextJS"],
    link: "#",

    // Extended properties
    liveUrl: "https://askgpt.atlanov.me",
    githubUrl:
      "https://github.com/yevgenatlanov/flashcards/blob/master/src/app/askgpt/page.tsx",
    hasDetails: true,
    timeframe: "2025",
    techStack: ["TypeScript", "NextJS"],
    keyFeatures: [],
    role: "Full Stack Developer",
    teamSize: "",
  },
  {
    id: "bizkit",
    title: "Bizkit",
    description: "Coming soon.",
    tags: ["Typescript", "NestJS", "NextJS"],
    link: "#",

    // Extended properties
    liveUrl: "#",
    githubUrl: "#",
    hasDetails: true,
    timeframe: "2025",
    techStack: [
      "TypeScript",
      "NestJS",
      "NextJS",
      "PostgreSQL",
      "Docker",
      "Stripe API",
    ],
    keyFeatures: [],
    role: "Full Stack Developer",
    teamSize: "",
  },
];
