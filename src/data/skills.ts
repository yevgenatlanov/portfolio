import { Skill } from "@/types";

export const skills: Skill[] = [
  // Frontend Skills
  {
    id: "typescript",
    name: "TypeScript",
    icon: "🔷",
    category: "frontend",
    level: 5,
    experience: "5+ years",
    description:
      "Advanced type systems, generics, decorators, and compiler API",
    projects: ["cashnews", "dropster", "ticketmeta"],
    isFeatured: true,
  },
  {
    id: "react",
    name: "React",
    icon: "⚛️",
    category: "frontend",
    level: 5,
    experience: "4+ years",
    description:
      "Advanced patterns, performance optimization, custom hooks, and state management",
    projects: ["cashnews", "dropster", "ticketmeta"],
    isFeatured: true,
  },
  {
    id: "nextjs",
    name: "Next.js",
    icon: "⚡",
    category: "frontend",
    level: 5,
    experience: "3+ years",
    description:
      "App Router, SSR/SSG, API routes, middleware, and optimizations",
    projects: ["cashnews", "dropster", "ticketmeta"],
    isFeatured: true,
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    icon: "🎨",
    category: "frontend",
    level: 4,
    experience: "3+ years",
    description:
      "Responsive design, custom configurations, and component systems",
    projects: ["cashnews", "dropster"],
    isFeatured: true,
  },

  // Backend Skills
  {
    id: "nodejs",
    name: "Node.js",
    icon: "🟢",
    category: "backend",
    level: 5,
    experience: "5+ years",
    description: "Event loop, streams, performance tuning, and microservices",
    projects: ["cashnews", "dropster", "ticketmeta"],
    isFeatured: true,
  },
  {
    id: "nestjs",
    name: "NestJS",
    icon: "🪺",
    category: "backend",
    level: 5,
    experience: "4+ years",
    description: "Architecture, custom decorators, microservices, and testing",
    projects: ["cashnews", "dropster", "ticketmeta"],
    isFeatured: true,
  },
  {
    id: "graphql",
    name: "GraphQL",
    icon: "🔺",
    category: "backend",
    level: 4,
    experience: "3+ years",
    description:
      "Schema design, resolvers, Apollo Server, and performance optimization",
    projects: ["dropster"],
    isFeatured: false,
  },

  // Database Skills
  {
    id: "postgres",
    name: "PostgreSQL",
    icon: "🐘",
    category: "database",
    level: 4,
    experience: "4+ years",
    description:
      "Advanced queries, performance optimization, and stored procedures",
    projects: ["cashnews", "ticketmeta"],
    isFeatured: true,
  },
  {
    id: "mongodb",
    name: "MongoDB",
    icon: "🍃",
    category: "database",
    level: 4,
    experience: "3+ years",
    description: "Schema design, aggregation pipeline, and performance tuning",
    projects: ["dropster"],
    isFeatured: false,
  },
  {
    id: "redis",
    name: "Redis",
    icon: "🔴",
    category: "database",
    level: 3,
    experience: "2+ years",
    description: "Caching, pub/sub, and data structures",
    projects: ["dropster"],
    isFeatured: false,
  },

  // DevOps Skills
  {
    id: "docker",
    name: "Docker",
    icon: "🐳",
    category: "devops",
    level: 4,
    experience: "3+ years",
    description: "Multi-stage builds, Docker Compose, and optimization",
    projects: ["cashnews", "ticketmeta"],
    isFeatured: false,
  },
  {
    id: "k8s",
    name: "Kubernetes",
    icon: "☸️",
    category: "devops",
    level: 3,
    experience: "2+ years",
    description: "Deployment, scaling, and service management",
    projects: ["cashnews"],
    isFeatured: false,
  },
  {
    id: "cicd",
    name: "CI/CD",
    icon: "🔄",
    category: "devops",
    level: 4,
    experience: "3+ years",
    description: "GitHub Actions, GitLab CI, and automated workflows",
    projects: ["cashnews", "dropster", "ticketmeta"],
    isFeatured: false,
  },

  // Cloud Skills
  {
    id: "aws",
    name: "AWS",
    icon: "☁️",
    category: "cloud",
    level: 4,
    experience: "3+ years",
    description: "EC2, S3, Lambda, CloudFront, and CloudFormation",
    projects: ["dropster", "ticketmeta"],
    isFeatured: true,
  },

  // AI/ML Skills
  {
    id: "python",
    name: "Python",
    icon: "🐍",
    category: "languages",
    level: 3,
    experience: "2+ years",
    description: "Data analysis, automation, and scripting",
    projects: ["cashnews"],
    isFeatured: false,
  },
  {
    id: "tensorflow",
    name: "TensorFlow",
    icon: "🧠",
    category: "ai",
    level: 3,
    experience: "1+ year",
    description: "Neural networks, model training, and prediction",
    projects: ["cashnews"],
    isFeatured: false,
  },
];

// Categorized skills for easier filtering
export const skillsByCategory = skills.reduce((acc, skill) => {
  if (!acc[skill.category]) {
    acc[skill.category] = [];
  }
  acc[skill.category].push(skill);
  return acc;
}, {} as Record<string, Skill[]>);

// Featured skills
export const featuredSkills = skills.filter((skill) => skill.isFeatured);
