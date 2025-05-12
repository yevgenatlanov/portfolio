/* eslint-disable @next/next/no-img-element */
"use client";

import { Skill } from "@/types";

interface SkillCardProps {
  skill: Skill;
}

export default function SkillCard({ skill }: SkillCardProps) {
  return (
    <div className="bg-card-custom rounded-lg p-4 md:p-5 transition-all duration-300 hover:translate-y-[-4px]">
      <div className="flex items-center">
        {skill.icon && (
          <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-xl mr-3">
            <img src={skill.icon} alt={skill.name} />
          </div>
        )}

        <div className="mr-2 flex-grow">
          <h3 className="text-white font-medium text-sm">{skill.name}</h3>
          <div className="text-gray-400 text-xs">{skill.experience}</div>
        </div>
      </div>
    </div>
  );
}
