"use client";

import { useI18n } from "@/lib/i18n";
import ProjectCard from "./projectCard";
import { projects } from "@/data/projects";

export default function ProjectsList() {
  const { t } = useI18n();
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6 relative">
        <div className="absolute -left-4 md:-left-10 top-1/2 transform -translate-y-1/2 opacity-10 text-8xl md:text-8xl font-bold text-primary pointer-events-none select-none">
          01
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2 relative z-10">
          {t("projects.title")}
        </h2>
        <p className="text-muted-foreground">{t("projects.subtitle")}</p>
      </div>
      <div className="space-y-6" aria-label="Project list">
        {projects.map((project, key) => (
          <ProjectCard key={key} project={project} />
        ))}
      </div>
    </div>
  );
}
