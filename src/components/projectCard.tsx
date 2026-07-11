"use client";

import { Project } from "@/types";
import { FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { BiCodeAlt } from "react-icons/bi";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { useI18n } from "@/lib/i18n";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { t } = useI18n();
  return (
    <Card className="overflow-hidden border-white/10 bg-card/80 transition-all duration-300 hover:-translate-y-1.5 hover:border-white/20 hover:shadow-[0_28px_100px_rgba(0,0,0,0.34)]">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center rounded-full border border-white/10 bg-secondary/70 p-3">
              <BiCodeAlt className="text-primary" size={24} />
            </div>
            <CardTitle className="text-xl md:text-2xl">
              {project.title}
            </CardTitle>
          </div>

          <div className="flex items-center space-x-2">
            {project.githubUrl && project.githubUrl !== "#" && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-transparent p-2 text-muted-foreground transition-colors hover:border-white/10 hover:text-foreground"
                aria-label={t("projects.viewCode")}
              >
                <FaGithub size={18} />
              </a>
            )}
            {project.liveUrl && project.liveUrl !== "#" && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-transparent p-2 text-muted-foreground transition-colors hover:border-white/10 hover:text-foreground"
                aria-label={t("projects.viewProject")}
              >
                <FiExternalLink size={18} />
              </a>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <CardDescription className="mb-4 text-base leading-7 text-foreground/74">
          {project.description}
        </CardDescription>
      </CardContent>

      <CardFooter>
        <div className="flex flex-wrap gap-2">
          {project.techStack?.slice(0, 3).map((tech, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tech}
            </Badge>
          ))}
          {project.techStack && project.techStack.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{project.techStack.length - 3}
            </Badge>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
