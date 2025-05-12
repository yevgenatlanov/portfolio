"use client";

import { Project } from "@/types";
import { FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { BiCodeAlt } from "react-icons/bi";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="bg-card-custom rounded-lg p-4 md:p-5 mb-4 transition-all duration-300 hover:translate-y-[-4px]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="bg-zinc-800 p-2 rounded-md mr-3 flex items-center justify-center">
            <BiCodeAlt className="text-blue-400" size={24} />
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white hover:text-blue-400 transition-colors">
            {project.title}
          </h3>
        </div>

        <div className="flex items-center space-x-2">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-400 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <FaGithub size={18} />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-400 hover:text-white transition-colors"
              aria-label="Live Demo"
            >
              <FiExternalLink size={18} />
            </a>
          )}
        </div>
      </div>

      <p className="text-gray-300 mb-4">{project.description}</p>

      {project.techStack && (
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-zinc-800 rounded text-xs text-gray-300"
            >
              {tech}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
