"use client";

import { experiences } from "@/data/exp";
import ExperienceCard from "./expCard";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function ExperienceList() {
  const [expandedView, setExpandedView] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredExperiences = experiences.filter(
    (exp) =>
      exp.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exp.technologies.some((tech) =>
        tech.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const visibleExperiences = expandedView
    ? filteredExperiences
    : filteredExperiences.slice(0, 3);

  return (
    <div>
      {/* Header Section */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">
          Work Experience{" "}
          <span className="text-gray-400 text-lg">
            ({filteredExperiences.length})
          </span>
        </h2>
        <p className="text-gray-400">
          My professional journey through the tech industry
        </p>
      </div>

      {/* Search Section */}
      <div className="mb-8">
        <div className="flex items-center gap-2">
          <div className="relative flex-grow">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search by role or technology"
              className="w-full p-2 pl-10 h-10 bg-zinc-800 rounded-lg text-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {searchTerm && (
            <button
              className="flex items-center h-10 px-3 bg-zinc-800 rounded-lg text-gray-300 hover:bg-zinc-700 shrink-0"
              onClick={() => setSearchTerm("")}
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Results Section */}
      <div className="relative">
        {visibleExperiences.map((experience, index) => (
          <div key={experience.id} className="relative mb-6">
            <ExperienceCard experience={experience} />

            {index < visibleExperiences.length - 1 && (
              <div className="absolute left-5 top-full h-6 w-0.5 bg-zinc-800"></div>
            )}
          </div>
        ))}

        {filteredExperiences.length > 3 && (
          <div className="text-center mt-6 mb-2">
            <button
              className="px-4 py-2 bg-zinc-800 text-gray-300 rounded-lg hover:bg-zinc-700 transition-colors"
              onClick={() => setExpandedView(!expandedView)}
            >
              {expandedView
                ? `Show Less`
                : `Show ${filteredExperiences.length - 3} More`}
            </button>
          </div>
        )}

        {filteredExperiences.length === 0 && (
          <div className="text-center py-12 bg-zinc-900 rounded-lg">
            <p className="text-gray-400 mb-2">
              No experiences match your search
            </p>
            <button
              className="text-blue-400 hover:text-blue-300"
              onClick={() => setSearchTerm("")}
            >
              Clear search
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
