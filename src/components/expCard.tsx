"use client";

import { Experience } from "@/types";
import { useState } from "react";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUsers,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
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

interface ExperienceCardProps {
  experience: Experience;
}

export default function ExperienceCard({ experience }: ExperienceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { t } = useI18n();

  const dateRange = `${experience.startDate} - ${experience.endDate}`;

  const getDuration = () => {
    try {
      const startDate = new Date(experience.startDate);
      const endDate =
        experience.endDate === "Present"
          ? new Date()
          : new Date(experience.endDate);
      const diffInMonths =
        (endDate.getFullYear() - startDate.getFullYear()) * 12 +
        endDate.getMonth() -
        startDate.getMonth();

      if (diffInMonths < 12) {
        return `${diffInMonths} month${diffInMonths !== 1 ? "s" : ""}`;
      }

      const years = Math.floor(diffInMonths / 12);
      const months = diffInMonths % 12;

      if (months === 0) {
        return `${years} year${years !== 1 ? "s" : ""}`;
      }

      return `${years} year${years !== 1 ? "s" : ""} ${months} month${
        months !== 1 ? "s" : ""
      }`;
    } catch (error) {
      console.log("error date setup", error);
      return null;
    }
  };

  const getTypeBadgeVariant = (
    type: "Remote" | "Hybrid" | "On-site" | "Mixed"
  ) => {
    switch (type) {
      case "Remote":
        return "default";
      case "Hybrid":
        return "secondary";
      case "On-site":
        return "outline";
      case "Mixed":
        return "outline";
      default:
        return "secondary";
    }
  };

  const getTypeLabel = (type: "Remote" | "Hybrid" | "On-site" | "Mixed") => {
    return t(`experience.badges.${type.toLowerCase()}`);
  };

  return (
    <Card className="bg-card overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="pb-0">
        <div className="flex-1">
          <div className="flex flex-wrap items-center mb-2">
            <div
              className="flex items-center flex-grow cursor-pointer"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <button
                className="text-gray-400 hover:text-white cursor-pointer transition-colors mr-2"
                aria-label={isExpanded ? "Collapse details" : "Expand details"}
              >
                {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              <CardTitle className="text-xl">{experience.title}</CardTitle>
            </div>

            <Badge variant={getTypeBadgeVariant(experience.type)}>
              {getTypeLabel(experience.type)}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <CardDescription className="text-lg font-medium text-primary">
            {experience.company}
          </CardDescription>

          <div className="flex items-center text-sm text-muted-foreground">
            <FaMapMarkerAlt className="mr-1 flex-shrink-0" size={14} />
            <span>{experience.location}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex flex-wrap gap-y-2 gap-x-4 text-sm text-muted-foreground mt-2">
          <div className="flex items-center">
            <FaCalendarAlt className="mr-1" size={14} />
            <span>{dateRange}</span>
            {getDuration() && (
              <span className="hidden sm:inline-block ml-1 text-muted-foreground/70">
                ({getDuration()})
              </span>
            )}
          </div>

          {experience.teamSize && (
            <div className="flex items-center">
              <FaUsers className="mr-1" size={14} />
              <span>{experience.teamSize}</span>
            </div>
          )}

          {isExpanded && (
            <div className="mt-4 pt-4 border-t border-zinc-800 animate-fadeIn">
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-300 mb-2">
                  {t("experience.details.keyAchievements")}
                </h4>
                <ul className="list-disc list-inside text-sm text-gray-400 space-y-2">
                  {experience.achievements.map((achievement, index) => (
                    <li key={index} className="leading-relaxed">
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-semibold mb-2">
                  {t("experience.details.technologies")}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {experience.technologies.map((tech, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
