"use client";

import { useState } from "react";
import { skills, skillsByCategory } from "@/data/skills";
import SkillCard from "./skillsCard";
import { SkillCategory } from "@/types";

export default function SkillsList() {
  const [selectedCategory, setSelectedCategory] = useState<
    SkillCategory | "all"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = Object.keys(skillsByCategory) as SkillCategory[];

  const filteredSkills = skills.filter((skill) => {
    const matchesCategory =
      selectedCategory === "all" || skill.category === selectedCategory;
    const matchesSearch =
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      frontend: "Frontend",
      backend: "Backend",
      database: "Database",
      devops: "DevOps",
      cloud: "Cloud",
      languages: "Languages",
      frameworks: "Frameworks",
      tools: "Tools",
      mobile: "Mobile",
      design: "Design",
      ai: "AI/ML",
      all: "All Skills",
    };

    return (
      labels[category] || category.charAt(0).toUpperCase() + category.slice(1)
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Skills</h2>
      </div>
      <div className="mb-8">
        {/* <div className="mb-4">
          <input
            type="text"
            placeholder="Search skills..."
            className="w-full p-3 bg-zinc-800 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div> */}

        <div className="flex flex-wrap gap-2">
          <button
            className={`px-3 py-2 rounded-lg text-sm ${
              selectedCategory === "all"
                ? "bg-blue-600 text-white"
                : "bg-zinc-800 text-gray-300 hover:bg-zinc-700"
            }`}
            onClick={() => setSelectedCategory("all")}
          >
            All Skills
          </button>

          {categories.map((category) => (
            <button
              key={category}
              className={`px-3 py-2 rounded-lg text-sm ${
                selectedCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-zinc-800 text-gray-300 hover:bg-zinc-700"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {getCategoryLabel(category)} ({skillsByCategory[category].length})
            </button>
          ))}
        </div>
      </div>

      {filteredSkills.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredSkills.map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No skills match your criteria</p>
          <button
            className="mt-4 text-blue-400 hover:text-blue-300"
            onClick={() => {
              setSelectedCategory("all");
              setSearchQuery("");
            }}
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
