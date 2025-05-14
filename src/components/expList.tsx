"use client";

import { experiences } from "@/data/exp";
import ExperienceCard from "./expCard";
import { useState } from "react";
import { Button } from "./ui/button";
import { SearchIcon, X } from "lucide-react";
import { Input } from "./ui/input";
import { useI18n } from "@/lib/i18n";

export default function ExperienceList() {
  const [expandedView, setExpandedView] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { t } = useI18n();

  const filteredExperiences = experiences.filter(
    (exp) =>
      exp.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exp.technologies.some((tech) =>
        tech.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const visibleExperiences = expandedView
    ? filteredExperiences
    : filteredExperiences.slice(0, 3);

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          02: {t("experience.title")}
        </h2>
        <p className="text-muted-foreground">{t("experience.subtitle")}</p>
      </div>

      <div className="mb-8">
        <div className="flex items-center gap-2">
          <div className="relative flex-grow">
            <div className="relative w-full">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder={t("experience.searchPlaceholder")}
                className="w-full pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {searchTerm && (
            <Button
              variant="secondary"
              size="default"
              onClick={() => setSearchTerm("")}
            >
              <X className="h-4 w-4 mr-2" />
              {t("common.clear")}
            </Button>
          )}
        </div>
      </div>

      <div className="relative">
        {visibleExperiences.map((experience, index) => (
          <div key={experience.id} className="relative mb-6">
            <ExperienceCard key={index} experience={experience} />
          </div>
        ))}

        {filteredExperiences.length > 3 && (
          <div className="text-center mt-6 mb-2">
            <Button
              variant="secondary"
              onClick={() => setExpandedView(!expandedView)}
            >
              {expandedView
                ? t("experience.showLess")
                : t("experience.showMore", {
                    params: { "0": filteredExperiences.length - 3 },
                  })}
            </Button>
          </div>
        )}

        {filteredExperiences.length === 0 && (
          <div className="text-center py-12 bg-background rounded-lg border border-border">
            <p className="text-muted-foreground mb-2">
              {t("experience.noResults")}
            </p>
            <Button
              variant="link"
              className="text-primary"
              onClick={() => setSearchTerm("")}
            >
              {t("experience.clearSearch")}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
