"use client";

import { useState } from "react";
import { blogPosts } from "@/data/posts";
import BlogPostCard from "./postCard";
import { FaSearch, FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";

export default function BlogList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"desc" | "asc">("desc");

  const filteredAndSortedPosts = blogPosts
    .filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesTag = selectedTag
        ? post.tags.some(
            (tag) => tag.toLowerCase() === selectedTag.toLowerCase()
          )
        : true;

      return matchesSearch && matchesTag && post.isPublished;
    })
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();

      return sortDirection === "desc" ? dateB - dateA : dateA - dateB;
    });

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedTag(null);
  };

  const toggleSortDirection = () => {
    setSortDirection((prev) => (prev === "desc" ? "asc" : "desc"));
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white">
          Blog{" "}
          <span className="text-gray-400 text-lg">
            ({filteredAndSortedPosts.length})
          </span>
        </h2>
        <p className="text-gray-400">
          Thoughts, ideas, and staff i find interesting
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="relative flex-grow">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full p-2 pl-10 h-10 bg-zinc-800 rounded-lg text-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <button
            className="flex items-center h-10 px-3 bg-zinc-800 rounded-lg text-gray-300 hover:bg-zinc-700 shrink-0"
            onClick={toggleSortDirection}
            title={sortDirection === "desc" ? "Newest First" : "Oldest First"}
          >
            {sortDirection === "desc" ? (
              <FaSortAmountDown />
            ) : (
              <FaSortAmountUp />
            )}
          </button>

          {(searchQuery || selectedTag) && (
            <button
              className="flex items-center h-10 px-3 bg-zinc-800 rounded-lg text-gray-300 hover:bg-zinc-700 shrink-0"
              onClick={clearFilters}
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {filteredAndSortedPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-1">
          {filteredAndSortedPosts.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-zinc-900 rounded-lg">
          <h3 className="text-xl font-semibold text-white mb-2">
            No articles found
          </h3>
          <p className="text-gray-400 mb-4">
            Try adjusting your search or filters
          </p>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            onClick={clearFilters}
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
}
