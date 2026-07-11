"use client";

import * as React from "react";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { blogPosts, getAllTags } from "@/data/posts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FiSearch, FiChevronLeft, FiChevronRight, FiClock, FiCalendar } from "react-icons/fi";

function variantColors(variant: "light" | "dark") {
  const isLight = variant === "light";
  return {
    muted: isLight ? "#404040" : "#a3a3a3",
    border: isLight ? "rgba(10,10,10,0.12)" : "rgba(245,245,245,0.12)",
    cardBg: isLight ? "#fff" : "rgba(245,245,245,0.03)",
  };
}

/* ── 05. Featured card variant ── */
export function BlogCardVariant({ variant }: { variant: "light" | "dark" }) {
  const { muted, border, cardBg } = variantColors(variant);
  const featured = blogPosts[0];
  if (!featured) return null;

  return (
    <div className="blog-featured">
      <Card className="blog-featured-card" style={{ borderColor: border, background: cardBg }}>
        <CardHeader>
          <div className="blog-featured-meta" style={{ color: muted }}>
            <span>{featured.date}</span>
            <span>·</span>
            <span>{featured.readTime}</span>
          </div>
          <CardTitle className="blog-featured-title">
            <Link href={`/blog/${featured.slug}`}>{featured.title}</Link>
          </CardTitle>
          <CardDescription style={{ color: muted }}>{featured.excerpt}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="blog-featured-tags">
            {featured.tags.map((tag) => (
              <Badge key={tag} variant="outline" style={{ borderColor: border }}>
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/* ── 06. Table variant ── */
export function BlogTableVariant({ variant }: { variant: "light" | "dark" }) {
  const { muted, border } = variantColors(variant);

  return (
    <div className="blog-table-wrapper" style={{ borderColor: border }}>
      <table className="blog-table">
        <thead>
          <tr style={{ borderColor: border }}>
            <th>#</th>
            <th>Title</th>
            <th>Date</th>
            <th>Read</th>
            <th>Tags</th>
          </tr>
        </thead>
        <tbody>
          {blogPosts.map((post, index) => (
            <tr key={post.id} style={{ borderColor: border }}>
              <td style={{ color: muted }}>{String(index + 1).padStart(2, "0")}</td>
              <td>
                <Link href={`/blog/${post.slug}`} className="blog-table-link">
                  {post.title}
                </Link>
              </td>
              <td style={{ color: muted }}>{post.date}</td>
              <td style={{ color: muted }}>{post.readTime}</td>
              <td>
                <div className="blog-table-tags">
                  {post.tags.map((tag) => (
                    <span key={tag} className="project-tag" style={{ borderColor: border }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ── 07. Minimal variant ── */
export function BlogMinimalVariant({ variant }: { variant: "light" | "dark" }) {
  const { muted } = variantColors(variant);

  return (
    <div className="blog-minimal">
      {blogPosts.map((post, index) => (
        <article key={post.id} className="blog-minimal-row">
          <span className="blog-minimal-num" style={{ color: muted }}>
            {String(index + 1).padStart(2, "0")}
          </span>
          <Link href={`/blog/${post.slug}`} className="blog-minimal-link">
            {post.title}
          </Link>
          <span className="blog-minimal-read" style={{ color: muted }}>
            <FiClock size={12} />
            {post.readTime}
          </span>
        </article>
      ))}
    </div>
  );
}

/* ── 08. Carousel variant ── */
export function BlogCarouselVariant({ variant }: { variant: "light" | "dark" }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: false });
  const [prevEnabled, setPrevEnabled] = React.useState(false);
  const [nextEnabled, setNextEnabled] = React.useState(true);
  const { muted, border, cardBg } = variantColors(variant);

  const onSelect = React.useCallback(() => {
    if (!emblaApi) return;
    setPrevEnabled(emblaApi.canScrollPrev());
    setNextEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi, onSelect]);

  return (
    <div className="blog-carousel">
      <div className="blog-carousel-viewport" ref={emblaRef}>
        <div className="blog-carousel-track">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="blog-carousel-slide"
              style={{ borderColor: border, background: cardBg }}
            >
              <Link href={`/blog/${post.slug}`} className="blog-carousel-link">
                <span className="blog-carousel-date" style={{ color: muted }}>
                  <FiCalendar size={12} />
                  {post.date}
                </span>
                <h3 className="blog-carousel-title">{post.title}</h3>
                <p className="blog-carousel-excerpt" style={{ color: muted }}>
                  {post.excerpt}
                </p>
                <div className="blog-carousel-tags">
                  {post.tags.map((tag) => (
                    <span key={tag} className="project-tag" style={{ borderColor: border }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
      <div className="blog-carousel-controls">
        <Button variant="outline" size="icon" onClick={() => emblaApi?.scrollPrev()} disabled={!prevEnabled}>
          <FiChevronLeft size={16} />
        </Button>
        <Button variant="outline" size="icon" onClick={() => emblaApi?.scrollNext()} disabled={!nextEnabled}>
          <FiChevronRight size={16} />
        </Button>
      </div>
    </div>
  );
}

/* ── 09. Searchable variant ── */
export function BlogSearchableVariant({ variant }: { variant: "light" | "dark" }) {
  const [query, setQuery] = React.useState("");
  const { muted, border } = variantColors(variant);

  const filtered = blogPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(query.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="blog-searchable">
      <div className="blog-searchable-input" style={{ borderColor: border }}>
        <FiSearch size={16} style={{ color: muted }} />
        <Input
          type="text"
          placeholder="Search posts..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="blog-searchable-field"
          style={{ borderColor: "transparent" }}
        />
      </div>
      <div className="blog-searchable-results">
        {filtered.map((post) => (
          <article key={post.id} className="blog-searchable-row" style={{ borderColor: border }}>
            <Link href={`/blog/${post.slug}`} className="blog-searchable-link">
              <h3 className="blog-searchable-title">{post.title}</h3>
              <p className="blog-searchable-excerpt" style={{ color: muted }}>
                {post.excerpt}
              </p>
            </Link>
            <div className="blog-searchable-tags">
              {post.tags.map((tag) => (
                <span key={tag} className="project-tag" style={{ borderColor: border }}>
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
        {filtered.length === 0 && (
          <p className="blog-searchable-empty" style={{ color: muted }}>
            No posts found.
          </p>
        )}
      </div>
    </div>
  );
}

/* ── 10. Tag cloud variant ── */
export function BlogTagCloudVariant({ variant }: { variant: "light" | "dark" }) {
  const { muted, border, cardBg } = variantColors(variant);
  const tags = getAllTags();
  const postsByTag = tags.map((tag) => ({
    tag,
    count: blogPosts.filter((post) => post.tags.includes(tag)).length,
  }));
  const maxCount = Math.max(...postsByTag.map((t) => t.count), 1);

  return (
    <div className="blog-tag-cloud">
      <Card className="blog-tag-cloud-card" style={{ borderColor: border, background: cardBg }}>
        <CardHeader>
          <CardTitle className="blog-tag-cloud-title">Browse by tag</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="blog-tag-cloud-list">
            {postsByTag.map(({ tag, count }) => (
              <span
                key={tag}
                className="blog-tag-cloud-item"
                style={{
                  borderColor: border,
                  opacity: 0.4 + (count / maxCount) * 0.6,
                  fontSize: `clamp(0.8rem, ${0.8 + (count / maxCount) * 0.5}rem, 1.25rem)`,
                }}
              >
                {tag}
                <span className="blog-tag-cloud-count" style={{ color: muted }}>
                  {count}
                </span>
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
      <div className="blog-tag-cloud-posts">
        {blogPosts.map((post) => (
          <article key={post.id} className="blog-tag-cloud-post" style={{ borderColor: border }}>
            <Link href={`/blog/${post.slug}`} className="blog-tag-cloud-post-link">
              {post.title}
            </Link>
            <span style={{ color: muted }}>{post.readTime}</span>
          </article>
        ))}
      </div>
    </div>
  );
}
