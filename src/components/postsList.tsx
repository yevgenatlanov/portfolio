"use client";

import { useState } from "react";
import { blogPosts } from "@/data/posts";
import BlogPostCard from "./postCard";
import { Button } from "./ui/button";
import { ArrowDown, ArrowUp, SearchIcon } from "lucide-react";
import { Input } from "./ui/input";
import { useI18n } from "@/lib/i18n";

export default function BlogList() {
  const { t } = useI18n();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortDirection, setSortDirection] = useState<"desc" | "asc">("desc");
  const [expandedView, setExpandedView] = useState(false);

  const filteredAndSortedPosts = blogPosts
    .filter((post) => {
      // check if the post is published (2nd layer for api to prevent showing drafts)
      if (!post.isPublished) return false;

      // check search match
      const matchesSearch = searchQuery
        ? post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
        : true;

      return matchesSearch;
    })
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();

      return sortDirection === "desc" ? dateB - dateA : dateA - dateB;
    });

  const clearFilters = () => {
    setSearchQuery("");
  };

  const toggleSortDirection = () => {
    setSortDirection((prev) => (prev === "desc" ? "asc" : "desc"));
  };

  const visiblePosts = expandedView
    ? filteredAndSortedPosts
    : filteredAndSortedPosts.slice(0, 3);

  return (
    <div className="space-y-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          04: {t("blog.title")}
        </h2>
        {/* <span className="text-muted-foreground text-xl">
          ({filteredAndSortedPosts.length})
        </span> */}
        <p className="text-muted-foreground">{t("blog.subtitle")}</p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="relative flex-grow">
            <div className="relative w-full">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder={t("blog.searchPlaceholder")}
                className="w-full pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <Button
            size="icon"
            variant="secondary"
            onClick={toggleSortDirection}
            title={t(
              `blog.sorting.${
                sortDirection === "desc" ? "newestFirst" : "oldestFirst"
              }`
            )}
          >
            {sortDirection === "desc" ? (
              <ArrowDown className="h-4 w-4" />
            ) : (
              <ArrowUp className="h-4 w-4" />
            )}
          </Button>

          {searchQuery && (
            <button
              className="flex items-center h-10 px-3 bg-zinc-800 rounded-lg text-gray-300 hover:bg-zinc-700 shrink-0"
              onClick={clearFilters}
            >
              {t("common.clear")}
            </button>
          )}
        </div>
      </div>

      {visiblePosts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
          {visiblePosts.map((post, key) => (
            <BlogPostCard key={key} post={post} />
          ))}
        </div>
      )}

      {filteredAndSortedPosts.length > 3 && (
        <div className="text-center mt-6 mb-2">
          <Button
            variant="secondary"
            onClick={() => setExpandedView(!expandedView)}
          >
            {expandedView
              ? t("blog.showLess")
              : t("blog.showMore", {
                  params: { "0": filteredAndSortedPosts.length - 3 },
                })}
          </Button>
        </div>
      )}

      {visiblePosts.length === 0 && (
        <div className="text-center py-16 bg-secondary/20 rounded-lg border border-border">
          <h3 className="text-xl font-semibold text-white mb-2">
            {t("blog.noResults")}
          </h3>
          <p className="text-muted-foreground mb-4">{t("blog.tryAdjusting")}</p>
          <Button onClick={clearFilters}>{t("blog.clearFilters")}</Button>
        </div>
      )}
    </div>
  );
}
