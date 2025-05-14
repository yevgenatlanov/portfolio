"use client";

import { useI18n } from "@/lib/i18n";
import ProjectCard from "./projectCard";
import { projects } from "@/data/projects";

export default function ProjectsList() {
  const { t } = useI18n();
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          01: {t("projects.title")}
        </h2>
      </div>
      <div className="space-y-6" aria-label="Project list">
        {projects.map((project, key) => (
          <ProjectCard key={key} project={project} />
        ))}
      </div>
    </div>
  );
}
