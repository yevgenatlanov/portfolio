import React from "react";

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  link?: string;
  githubUrl?: string;
  liveUrl?: string;
  hasDetails?: boolean;
  timeframe?: string;
  techStack?: string[];
  keyFeatures?: string[];
  role?: string;
  teamSize?: string;
}

export interface Skill {
  id: string;
  name: string;
  icon: string;
  category: SkillCategory;
  level: number;
  experience: string;
  description?: string;
  projects?: string[];
  certifications?: string[];
  isFeatured?: boolean;
}

export type SkillCategory =
  | "frontend"
  | "backend"
  | "mobile"
  | "devops"
  | "database"
  | "design"
  | "tools"
  | "languages"
  | "frameworks"
  | "cloud"
  | "ai";

export interface Experience {
  id: string;
  company: string;
  title: string;
  location: string;
  type: "Remote" | "Hybrid" | "On-site" | "Mixed";
  startDate: string;
  endDate: string | "Present";
  achievements: string[];
  technologies: string[];
  teamSize?: string;
  keyProjects?: string[];
  logo?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  author: string;
  tags: string[];
  coverImage?: string;
  readTime: string;
  content?: string;
  isPublished: boolean;
}

export type TabType = "projects" | "exp" | "skills" | "blog";

export interface NavItem {
  id: TabType;
  label: string;
  number: string;
}

export interface NavigationProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export interface SocialLinkProps {
  href: string;
  label: string;
  icon: React.ReactNode;
}
