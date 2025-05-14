"use client";

import { useState, useEffect } from "react";
import { useParams, notFound } from "next/navigation";
import { blogPosts } from "@/data/posts";
import { BlogPost } from "@/types";
import { useI18n } from "@/lib/i18n";
import { Calendar, Clock, User } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import SocialLinks from "@/components/socialLinks";
import ContentFixedColumn from "@/components/fixedColumn";

export default function BlogPostPage() {
  const { slug } = useParams();
  const { t } = useI18n();
  const [post, setPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    if (typeof slug === "string") {
      const foundPost = blogPosts.find((p) => p.slug === slug);
      if (foundPost) {
        setPost(foundPost);
      } else {
        notFound();
      }
    }
  }, [slug]);

  if (!post) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-64 bg-muted rounded mb-8"></div>
          <div className="h-4 w-32 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-night">
      <div className="grid grid-cols-1 md:grid-cols-12 md:gap-8">
        <div className="hidden md:block md:col-span-5 md:sticky md:top-0 md:h-screen md:overflow-y-auto">
          <ContentFixedColumn activeTab="blog" />
        </div>

        <div className="col-span-1 md:col-span-7">
          <div className="p-4 md:p-8 lg:p-14">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-8"
            >
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 mb-6 text-muted-foreground">
                <div className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className={cn(
                "prose prose-invert prose-lg max-w-none mb-12",
                "prose-headings:text-foreground",
                "prose-p:text-foreground/90",
                "prose-strong:text-foreground",
                "prose-code:text-foreground/90 prose-code:bg-muted prose-code:rounded prose-code:px-1 prose-code:py-0.5",
                "prose-pre:bg-card prose-pre:border prose-pre:border-border",
                "prose-a:text-primary prose-a:no-underline hover:prose-a:underline",
                "prose-blockquote:border-l-primary prose-blockquote:bg-card/50 prose-blockquote:py-1 prose-blockquote:px-4"
              )}
            >
              {post.content ? (
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              ) : (
                <>
                  <p className="lead">{post.excerpt}</p>
                  <br />
                  <pre>
                    <code>{`// Example code block
function greeting() {
  console.log("Hello, world!");
}

greeting();`}</code>
                  </pre>
                </>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="border-t border-border pt-8"
            >
              <h3 className="text-xl font-semibold mb-6">
                {t("blog.moreArticles")}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {blogPosts
                  .filter((p) => p.id !== post.id && p.isPublished)
                  .sort(() => 0.5 - Math.random())
                  .slice(0, 2)
                  .map((relatedPost) => (
                    <Link
                      key={relatedPost.id}
                      href={`/blog/${relatedPost.slug}`}
                      passHref
                    >
                      <motion.div
                        whileHover={{ y: -5 }}
                        transition={{ duration: 0.2 }}
                        className="bg-card rounded-lg p-6 border border-border hover:shadow-md transition-shadow"
                      >
                        <h4 className="font-medium mb-2 text-foreground">
                          {relatedPost.title}
                        </h4>
                        <p className="text-muted-foreground text-sm line-clamp-2">
                          {relatedPost.excerpt}
                        </p>
                        <div className="flex mt-4">
                          <span className="text-xs text-primary">
                            {t("blog.readMore")} →
                          </span>
                        </div>
                      </motion.div>
                    </Link>
                  ))}
              </div>
            </motion.div>

            <div className="md:hidden py-8 mt-8">
              <SocialLinks />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
