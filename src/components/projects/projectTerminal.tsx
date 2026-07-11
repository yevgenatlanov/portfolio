"use client";

import { projects } from "@/data/projects";
import { FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";

export function ProjectTerminalVariant({ variant }: { variant: "light" | "dark" }) {
  const isLight = variant === "light";
  const mutedColor = isLight ? "#404040" : "#a3a3a3";

  return (
    <div className="project-terminal">
      <div className="project-terminal-header" style={{ color: mutedColor }}>
        <span>~/projects</span>
        <span>ls -la</span>
      </div>
      <div className="project-terminal-body">
        {projects.map((project, index) => (
          <div key={project.id} className="project-terminal-row">
            <span className="project-terminal-prompt" style={{ color: mutedColor }}>
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="project-terminal-info">
              <div className="project-terminal-name">
                {project.title}
                <span className="project-terminal-links">
                  {project.githubUrl && project.githubUrl !== "#" && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                      <FaGithub size={13} />
                    </a>
                  )}
                  {project.liveUrl && project.liveUrl !== "#" && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label="Live">
                      <FiExternalLink size={13} />
                    </a>
                  )}
                </span>
              </div>
              <div className="project-terminal-meta" style={{ color: mutedColor }}>
                {project.role || project.description} · {project.tags.join(" ")}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
