"use client";

import ProjectCard from "./projectCard";
import { projects } from "@/data/projects";

export default function ProjectsList() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Pet Projects</h2>
      </div>
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
