"use client";

import Link from "next/link";
import { blogPosts } from "@/data/posts";

export function BlogMagazineVariant({ variant }: { variant: "light" | "dark" }) {
  const isLight = variant === "light";
  const mutedColor = isLight ? "#404040" : "#a3a3a3";

  return (
    <div className="blog-magazine">
      {blogPosts.map((post, index) => (
        <article key={post.id} className="blog-magazine-card">
          <Link href={`/blog/${post.slug}`} className="blog-magazine-link">
            <span className="blog-magazine-num" style={{ color: mutedColor }}>
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="blog-magazine-title">{post.title}</h3>
            <p className="blog-magazine-excerpt" style={{ color: mutedColor }}>
              “{post.excerpt}”
            </p>
            <div className="blog-magazine-footer" style={{ color: mutedColor }}>
              <span>{post.date}</span>
              <span>·</span>
              <span>{post.readTime}</span>
            </div>
          </Link>
        </article>
      ))}
    </div>
  );
}
