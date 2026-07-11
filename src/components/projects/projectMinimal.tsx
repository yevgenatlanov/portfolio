"use client";

import { projects } from "@/data/projects";
import { FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";

export function ProjectMinimalVariant({ variant }: { variant: "light" | "dark" }) {
  const isLight = variant === "light";
  const mutedColor = isLight ? "#404040" : "#a3a3a3";

  return (
    <div className="project-minimal">
      {projects.map((project, index) => (
        <article key={project.id} className="project-minimal-row">
          <div className="project-minimal-num" style={{ color: mutedColor }}>
            {String(index + 1).padStart(2, "0")}
          </div>
          <div className="project-minimal-main">
            <h3 className="project-minimal-title">{project.title}</h3>
            <p className="project-minimal-role" style={{ color: mutedColor }}>
              {project.role || project.description}
            </p>
          </div>
          <div className="project-minimal-stack" style={{ color: mutedColor }}>
            {project.tags.slice(0, 4).join(" · ")}
          </div>
          <div className="project-minimal-links">
            {project.githubUrl && project.githubUrl !== "#" && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <FaGithub size={14} />
              </a>
            )}
            {project.liveUrl && project.liveUrl !== "#" && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label="Live">
                <FiExternalLink size={14} />
              </a>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
