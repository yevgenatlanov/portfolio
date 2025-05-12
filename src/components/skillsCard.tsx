"use client";

import { Skill } from "@/types";
import { useState } from "react";

interface SkillCardProps {
  skill: Skill;
}

export default function SkillCard({ skill }: SkillCardProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  return (
    <div className="bg-card-custom rounded-lg p-4 md:p-5 transition-all duration-300 hover:translate-y-[-4px]">
      <div className="flex items-center">
        {/* Icon */}
        {skill.icon && (
          <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-xl mr-3">
            {skill.icon}
          </div>
        )}

        {/* Skill name and exp */}
        <div className="mr-2 flex-grow">
          <h3 className="text-white font-medium text-sm">{skill.name}</h3>
          <div className="text-gray-400 text-xs">{skill.experience}</div>
        </div>

        {/* Level indicator */}
        <div
          className="flex-shrink-0 relative"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <div className="w-16 cursor-help">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className={`h-1 ${
                    i <= skill.level ? "w-3 bg-blue-500" : "w-2 bg-zinc-700"
                  } rounded-full`}
                />
              ))}
            </div>
          </div>

          {/* Tooltip */}
          {showTooltip && (
            <div className="absolute z-10 right-0 bottom-6 w-48 bg-zinc-900 text-gray-300 text-xs p-2 rounded shadow-lg">
              Subjective expertise level (1-5)
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
