"use client";

import { useMemo } from "react";
import { useParams, notFound } from "next/navigation";
import { blogPosts } from "@/data/posts";
import { useI18n } from "@/lib/i18n";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

function formatContent(content: string) {
  const paragraphs = content
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
  return paragraphs.map((p, i) => <p key={i}>{p}</p>);
}

export default function BlogPostPage() {
  const { slug } = useParams();
  const { t } = useI18n();
  const post = useMemo(() => {
    if (typeof slug !== "string") {
      return null;
    }

    const foundPost = blogPosts.find((blogPost) => blogPost.slug === slug);

    if (!foundPost) {
      notFound();
    }

    return foundPost;
  }, [slug]);

  const relatedPosts = useMemo(
    () =>
      blogPosts
        .filter((blogPost) => blogPost.id !== post?.id && blogPost.isPublished)
        .sort((leftPost, rightPost) => leftPost.slug.localeCompare(rightPost.slug))
        .slice(0, 2),
    [post?.id]
  );

  if (!post) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0a0a0a] text-[#f5f5f5]">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-64 bg-[#f5f5f5]/10 rounded mb-8"></div>
          <div className="h-4 w-32 bg-[#f5f5f5]/10 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-split">
      {/* Light side — The Idea */}
      <section className="blog-light">
        <div style={{ maxWidth: 480 }}>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium mb-10 opacity-70 hover:opacity-100 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0a0a0a] focus-visible:ring-offset-2"
          >
            <FiArrowLeft size={16} />
            {t("navigation.intro", { fallback: "Back" })}
          </Link>

          <div className="sect-num" style={{ color: "#0a0a0a", opacity: 0.55 }}>
            {t("dualism.sideLight")}
          </div>
          <div
            style={{
              width: 40,
              height: 1,
              background: "#0a0a0a",
              opacity: 0.2,
              marginBottom: "2rem",
            }}
          />

          <h1 className="blog-title">{post.title}</h1>
          <p className="blog-excerpt">{post.excerpt}</p>
          <div className="blog-meta" style={{ color: "#0a0a0a" }}>
            <span>{post.author}</span>
            <span aria-hidden="true">·</span>
            <span>{post.date}</span>
            <span aria-hidden="true">·</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </section>

      {/* Dark side — The Content */}
      <section className="blog-dark">
        <div style={{ maxWidth: 560 }}>
          <div className="sect-num" style={{ color: "#f5f5f5", opacity: 0.55 }}>
            {t("dualism.sideDark")}
          </div>
          <div
            style={{
              width: 40,
              height: 1,
              background: "#f5f5f5",
              opacity: 0.2,
              marginBottom: "2rem",
            }}
          />

          {post.content ? (
            <article className="blog-body">{formatContent(post.content)}</article>
          ) : (
            <p className="blog-body" style={{ color: "#a3a3a3" }}>
              {post.excerpt}
            </p>
          )}

          {post.tags.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "2.5rem" }}>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="dual-tag"
                  style={{ color: "#f5f5f5", borderColor: "rgba(245,245,245,0.25)" }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {relatedPosts.length > 0 && (
            <div
              style={{
                marginTop: "3rem",
                borderTop: "1px solid rgba(245,245,245,0.12)",
                paddingTop: "2rem",
              }}
            >
              <div className="sect-num" style={{ color: "#f5f5f5", opacity: 0.55, marginBottom: "1rem" }}>
                {t("blog.moreArticles")}
              </div>
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.slug}`}
                  className="related-post-link"
                >
                  <div className="related-post-title">{relatedPost.title}</div>
                  <div className="related-post-excerpt">{relatedPost.excerpt}</div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
