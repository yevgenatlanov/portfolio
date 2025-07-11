"use client";

import { useMemo, useState } from "react";
import { skills, skillsByCategory } from "@/data/skills";
import SkillCard from "./skillsCard";
import { SkillCategory } from "@/types";
import { Button } from "./ui/button";
import { useI18n } from "@/lib/i18n";

export default function SkillsList() {
  const { t } = useI18n();

  const [selectedCategory, setSelectedCategory] = useState<
    SkillCategory | "all"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = Object.keys(skillsByCategory) as SkillCategory[];

  const filteredSkills = useMemo(() => {
    return skills.filter((skill) => {
      const matchesCategory =
        selectedCategory === "all" || skill.category === selectedCategory;
      const matchesSearch =
        !searchQuery ||
        skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.description?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const getCategoryLabel = (category: string) => {
    if (category === "all") return t("skills.allSkills");
    return t(`skills.categories.${category}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 relative">
        <div className="absolute -left-4 md:-left-10 top-1/2 transform -translate-y-1/2 opacity-10 text-8xl md:text-8xl font-bold text-primary pointer-events-none select-none">
          03
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2 sm:mb-0">
          {t("skills.title")}
        </h2>
        <p className="text-muted-foreground max-w-md">{t("skills.subtitle")}</p>
      </div>

      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === "all" ? "default" : "secondary"}
            size="sm"
            onClick={() => setSelectedCategory("all")}
          >
            {t("skills.allSkills")}
          </Button>

          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "secondary"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {getCategoryLabel(category)} ({skillsByCategory[category].length})
            </Button>
          ))}
        </div>
      </div>

      {filteredSkills.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {filteredSkills.map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            {t("skills.noResults")}
          </p>
          <Button
            variant="link"
            className="mt-4 text-primary"
            onClick={() => {
              setSelectedCategory("all");
              setSearchQuery("");
            }}
          >
            {t("skills.clearFilters")}
          </Button>
        </div>
      )}
    </div>
  );
}
