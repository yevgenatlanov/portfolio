"use client";

import { BlogPost } from "@/types";
import Link from "next/link";
import { FaClock } from "react-icons/fa";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";

interface BlogPostCardProps {
  post: BlogPost;
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <Card className="overflow-hidden border-white/10 bg-card/80 transition-all duration-300 hover:-translate-y-1.5 hover:border-white/20 hover:shadow-[0_28px_100px_rgba(0,0,0,0.34)]">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl hover:text-primary transition-colors">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </CardTitle>

        <div className="flex items-center text-sm text-muted-foreground">
          <FaClock className="mr-1" size={14} />
          <span>{post.readTime}</span>
        </div>
      </CardHeader>

      <CardContent>
        <CardDescription className="line-clamp-2 text-sm text-foreground/74 sm:text-base sm:leading-7">
          {post.excerpt}
        </CardDescription>
      </CardContent>

      <CardFooter>
        <div className="flex flex-wrap gap-2">
          {post.tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
          {post.tags.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{post.tags.length - 3}
            </Badge>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
