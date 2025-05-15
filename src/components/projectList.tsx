"use client";

import { useI18n } from "@/lib/i18n";
import ProjectCard from "./projectCard";
import { projects } from "@/data/projects";

export default function ProjectsList() {
  const { t } = useI18n();
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 relative">
        <div className="absolute -left-4 md:-left-10 top-1/2 transform -translate-y-1/2 opacity-10 text-8xl md:text-8xl font-bold text-primary pointer-events-none select-none">
          01
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2 sm:mb-0">
          {t("projects.title")}
        </h2>
        <p className="text-muted-foreground max-w-md">
          {t("projects.subtitle")}
        </p>
      </div>

      <div className="space-y-6" aria-label="Project list">
        {projects.map((project, key) => (
          <ProjectCard key={key} project={project} />
        ))}
      </div>
    </div>
  );
}
