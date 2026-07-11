"use client";

import { projects } from "@/data/projects";
import { FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";

export function ProjectCardsVariant({ variant }: { variant: "light" | "dark" }) {
  const isLight = variant === "light";
  const borderColor = isLight ? "rgba(10,10,10,0.12)" : "rgba(245,245,245,0.12)";
  const mutedColor = isLight ? "#404040" : "#a3a3a3";

  return (
    <div className="projects-grid">
      {projects.map((project) => (
        <article
          key={project.id}
          className="project-card"
          style={{ borderColor, background: isLight ? "#fff" : "rgba(245,245,245,0.03)" }}
        >
          <div className="project-card-head">
            <h3 className="project-card-title">{project.title}</h3>
            <div className="project-card-links">
              {project.githubUrl && project.githubUrl !== "#" && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View code on GitHub"
                >
                  <FaGithub size={16} />
                </a>
              )}
              {project.liveUrl && project.liveUrl !== "#" && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View live project"
                >
                  <FiExternalLink size={16} />
                </a>
              )}
            </div>
          </div>

          <p className="project-card-role" style={{ color: mutedColor }}>
            {project.role || project.description}
          </p>
          <p className="project-card-body">{project.description}</p>

          <div className="project-card-tags">
            {project.tags.map((tag) => (
              <span key={tag} className="project-tag" style={{ borderColor }}>
                {tag}
              </span>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}
