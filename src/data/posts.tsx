import { BlogPost } from "@/types";

export const blogPosts: BlogPost[] = [
  {
    id: "react-performance",
    title: "Optimizing React Performance",
    slug: "optimizing-react-performance",
    excerpt:
      "Learn the strategies we used to drastically improve our React application's performance, from code splitting to memoization.",
    date: "2024-05-10",
    author: "Yevhenii Atlanov",
    tags: ["React", "Performance", "JavaScript", "Web Development"],
    coverImage: "/images/blog/react-performance.webp",
    readTime: "8 min read",
    isPublished: true,
  },
  {
    id: "nextjs-13-app-router",
    title: "Making the Most of Next.js 13 App Router: A Practical Guide",
    slug: "nextjs-13-app-router-guide",
    excerpt:
      "Discover how to leverage the new App Router in Next.js 13 to build more maintainable and performant web applications.",
    date: "2024-04-22",
    author: "Yevhenii Atlanov",
    tags: ["Next.js", "React", "Web Development", "Tutorial"],
    coverImage: "/images/blog/nextjs-app-router.webp",
    readTime: "10 min read",
    isPublished: true,
  },
  {
    id: "ml-in-javascript",
    title: "Getting Started with Machine Learning in JavaScript",
    slug: "machine-learning-javascript-guide",
    excerpt:
      "Yes, you can do machine learning in JavaScript! Here's how to get started with TensorFlow.js and build your first ML model.",
    date: "2024-03-15",
    author: "Yevhenii Atlanov",
    tags: ["Machine Learning", "JavaScript", "TensorFlow.js", "AI"],
    coverImage: "/images/blog/ml-javascript.webp",
    readTime: "12 min read",
    isPublished: true,
  },
  {
    id: "nestjs-microservices",
    title: "Building Scalable Microservices with NestJS and RabbitMQ",
    slug: "nestjs-microservices-rabbitmq",
    excerpt:
      "A step-by-step guide to creating robust, scalable microservices using NestJS and RabbitMQ message queues.",
    date: "2024-02-28",
    author: "Yevhenii Atlanov",
    tags: ["NestJS", "Microservices", "Node.js", "RabbitMQ"],
    coverImage: "/images/blog/nestjs-microservices.webp",
    readTime: "15 min read",
    isPublished: true,
  },
  {
    id: "web3-development-intro",
    title: "Web3 Development for Traditional Web Developers: A Primer",
    slug: "web3-development-for-web-developers",
    excerpt:
      "Transitioning from Web2 to Web3? Here's what you need to know about blockchain development for JavaScript developers.",
    date: "2024-01-20",
    author: "Yevhenii Atlanov",
    tags: ["Web3", "Blockchain", "Ethereum", "JavaScript"],
    coverImage: "/images/blog/web3-intro.webp",
    readTime: "10 min read",
    isPublished: true,
  },
  {
    id: "typescript-generics",
    title: "Advanced TypeScript: Mastering Generics and Utility Types",
    slug: "typescript-generics-utility-types",
    excerpt:
      "Take your TypeScript skills to the next level with advanced generic patterns and built-in utility types.",
    date: "2023-12-05",
    author: "Yevhenii Atlanov",
    tags: ["TypeScript", "JavaScript", "Web Development"],
    coverImage: "/images/blog/typescript-generics.webp",
    readTime: "12 min read",
    isPublished: true,
  },
];

// Featured posts - latest 3
export const featuredPosts = blogPosts.slice(0, 3);

// Posts by tag
export const getPostsByTag = (tag: string) => {
  return blogPosts.filter((post) =>
    post.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  );
};

// Get unique tags
export const getAllTags = () => {
  const tagsSet = new Set<string>();

  blogPosts.forEach((post) => {
    post.tags.forEach((tag) => {
      tagsSet.add(tag);
    });
  });

  return Array.from(tagsSet);
};
