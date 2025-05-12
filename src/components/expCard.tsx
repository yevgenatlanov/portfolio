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

interface ExperienceCardProps {
  experience: Experience;
}

export default function ExperienceCard({ experience }: ExperienceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

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

  const getTypeBadgeColor = (
    type: "Remote" | "Hybrid" | "On-site" | "Mixed"
  ) => {
    switch (type) {
      case "Remote":
        return "bg-blue-900 text-blue-300";
      case "Hybrid":
        return "bg-purple-900 text-purple-300";
      case "On-site":
        return "bg-green-900 text-green-300";
      case "Mixed":
        return "bg-green-900 text-green-300";
      default:
        return "bg-gray-800 text-gray-300";
    }
  };

  return (
    <div className="bg-card-custom rounded-lg p-4 md:p-5 mb-4 transition-all duration-300 hover:translate-y-[-4px]">
      <div className="flex justify-between items-start">
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
              <h3 className="text-xl font-bold text-white">
                {experience.title}
              </h3>
            </div>

            {/* Type badge - pushed to next row on mobile */}
            <span
              className={`text-xs px-2 py-1 rounded mt-1 sm:mt-0 ${getTypeBadgeColor(
                experience.type
              )}`}
            >
              {experience.type}
            </span>
          </div>

          <div className=" text-lg font-medium text-blue-400 mb-2">
            {experience.company}
          </div>

          <div className="flex flex-wrap gap-y-2 text-sm text-gray-400">
            <div className="flex items-center mr-4">
              <FaCalendarAlt className="mr-1" />
              <span>{dateRange}</span>
              {getDuration() && (
                <span className="hidden sm:inline-block ml-1 text-gray-500">
                  ({getDuration()})
                </span>
              )}
            </div>

            <div className="flex items-center mr-4">
              <FaMapMarkerAlt className="mr-1" />
              <span>{experience.location}</span>
            </div>

            {experience.teamSize && (
              <div className="flex items-center">
                <FaUsers className="mr-1" />
                <span>{experience.teamSize}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-zinc-800 animate-fadeIn">
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-300 mb-2">
              KEY ACHIEVEMENTS
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
            <h4 className="text-sm font-semibold text-gray-300 mb-2">
              TECHNOLOGIES
            </h4>
            <div className="flex flex-wrap gap-2">
              {experience.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-zinc-800 rounded text-xs text-gray-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
