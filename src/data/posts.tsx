import { BlogPost } from "@/types";

export const blogPosts: BlogPost[] = [
{
  "id": "fun1-blog",
  "title": "AskGPT: Share ChatGPT Prompts as Short Links",
  "slug": "askgpt-share-chatgpt-prompts",
  "excerpt": "Transform any startup IT question into a ready-to-share ChatGPT link, inspired by “Let Me Google That For You.”",
  "date": "2025-06-02",
  "author": "Yevhenii Atlanov",
  "tags": ["Next.js", "TypeScript", "Web App", "Link Shortener"],
  "coverImage": "/images/blog/askgpt-cover.webp",
  "readTime": "3 min read",
  "isPublished": true,
  "content": "Every startup founder I know has a never-ending stream of IT questions—How do I set up continuous deployment? or What’s the best way to secure my AWS S3 buckets? These aren’t new problems, but typing out a full answer every time gets old fast. Inspired by the classic Let Me Google That For You approach, I built AskGPT to solve exactly this: transform any question into a ready-to-share ChatGPT link.\n\nWith AskGPT, simply paste in your IT question and click Shorten and Get. Behind the scenes, it crafts a ChatGPT URL (for example, chat.openai.com/?model=gpt-4&q=How+to+configure+CI/CD) and sends it through the free is.gd API to produce a tiny, shareable link—no more manual URL encoding or copy-pasting long web addresses. Your peers just click the short URL and land directly in ChatGPT with the exact prompt preloaded.\n\nKey points:\n- Startup-ready: Perfect for those boilerplate tech questions that every newcomer asks.\n- Inspired by Let Me Google That For You: Instead of directing someone to Google, you’re handing them a ChatGPT session.\n- Zero setup: No accounts, no extra steps—just paste, click, and share.\n- Open source: Check out the code on GitHub at https://github.com/yevgenatlanov/flashcards/blob/master/src/app/askgpt/page.tsx.\n\nTry it out at https://askgpt.atlanov.me and see how a tiny URL can save you time explaining the same IT answers over and over."
}

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
