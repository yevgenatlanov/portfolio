"use client";

import Link from "next/link";
import { blogPosts } from "@/data/posts";

export function BlogListVariant({ variant }: { variant: "light" | "dark" }) {
  const isLight = variant === "light";
  const borderColor = isLight ? "rgba(10,10,10,0.12)" : "rgba(245,245,245,0.12)";
  const mutedColor = isLight ? "#404040" : "#a3a3a3";

  return (
    <div className="blog-list">
      {blogPosts.map((post) => (
        <article key={post.id} className="blog-row" style={{ borderColor }}>
          <Link href={`/blog/${post.slug}`} className="blog-row-link">
            <div className="blog-row-head">
              <h3 className="blog-row-title">{post.title}</h3>
              <span className="blog-row-date" style={{ color: mutedColor }}>
                {post.date}
              </span>
            </div>
            <p className="blog-row-excerpt" style={{ color: mutedColor }}>
              {post.excerpt}
            </p>
            <div className="blog-row-footer">
              <span style={{ color: mutedColor }}>{post.readTime}</span>
              <div className="blog-row-tags">
                {post.tags.map((tag) => (
                  <span key={tag} className="project-tag" style={{ borderColor }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        </article>
      ))}
    </div>
  );
}
