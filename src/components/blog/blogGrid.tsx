"use client";

import Link from "next/link";
import { blogPosts } from "@/data/posts";

export function BlogGridVariant({ variant }: { variant: "light" | "dark" }) {
  const isLight = variant === "light";
  const borderColor = isLight ? "rgba(10,10,10,0.12)" : "rgba(245,245,245,0.12)";
  const mutedColor = isLight ? "#404040" : "#a3a3a3";

  return (
    <div className="blog-grid">
      {blogPosts.map((post) => (
        <article
          key={post.id}
          className="blog-card"
          style={{ borderColor, background: isLight ? "#fff" : "rgba(245,245,245,0.03)" }}
        >
          <Link href={`/blog/${post.slug}`} className="blog-card-link">
            <h3 className="blog-card-title">{post.title}</h3>
            <p className="blog-card-excerpt" style={{ color: mutedColor }}>
              {post.excerpt}
            </p>
            <div className="blog-card-footer">
              <span className="blog-card-date" style={{ color: mutedColor }}>
                {post.date} · {post.readTime}
              </span>
              <div className="blog-card-tags">
                {post.tags.slice(0, 3).map((tag) => (
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
