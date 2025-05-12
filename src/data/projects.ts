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
