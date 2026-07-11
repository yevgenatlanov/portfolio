"use client";

import Link from "next/link";
import { blogPosts } from "@/data/posts";

export function BlogNumberedVariant({ variant }: { variant: "light" | "dark" }) {
  const isLight = variant === "light";
  const mutedColor = isLight ? "#404040" : "#a3a3a3";

  return (
    <div className="blog-numbered">
      {blogPosts.map((post, index) => (
        <article key={post.id} className="blog-numbered-row">
          <span className="blog-numbered-num" style={{ color: mutedColor }}>
            {String(index + 1).padStart(2, "0")}
          </span>
          <Link href={`/blog/${post.slug}`} className="blog-numbered-link">
            <h3 className="blog-numbered-title">{post.title}</h3>
            <div className="blog-numbered-meta" style={{ color: mutedColor }}>
              <span>{post.date}</span>
              <span>·</span>
              <span>{post.readTime}</span>
              <span>·</span>
              <span>{post.tags.join(" · ")}</span>
            </div>
          </Link>
        </article>
      ))}
    </div>
  );
}
