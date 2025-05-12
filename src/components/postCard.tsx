"use client";

import { BlogPost } from "@/types";
import Link from "next/link";
import { FaClock } from "react-icons/fa";

interface BlogPostCardProps {
  post: BlogPost;
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <div className="bg-card-custom rounded-lg p-4 md:p-5 mb-4 transition-all duration-300 hover:translate-y-[-4px]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl md:text-2xl font-bold text-white hover:text-blue-400 transition-colors">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>
      </div>

      <p className="text-gray-300 mb-4 line-clamp-2">{post.excerpt}</p>

      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {post.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-zinc-800 rounded text-xs text-gray-300"
            >
              {tag}
            </span>
          ))}
          {post.tags.length > 3 && (
            <span className="px-2 py-1 bg-zinc-800 rounded text-xs text-gray-300">
              +{post.tags.length - 3}
            </span>
          )}
        </div>
        <div className="flex items-center text-sm text-gray-400">
          <FaClock className="mr-1" size={14} />
          <span>{post.readTime}</span>
        </div>
      </div>
    </div>
  );
}
