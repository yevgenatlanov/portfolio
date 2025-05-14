/* eslint-disable @next/next/no-img-element */
"use client";

import { Skill } from "@/types";
import { Card, CardContent } from "./ui/card";

interface SkillCardProps {
  skill: Skill;
}

export default function SkillCard({ skill }: SkillCardProps) {
  return (
    <Card className="bg-card transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardContent className="">
        <div className="flex items-center">
          {skill.icon && (
            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-xl mr-3">
              <img src={skill.icon} alt={skill.name} />
            </div>
          )}

          <div className="mr-2 flex-grow">
            <h3 className="text-foreground font-medium text-sm">
              {skill.name}
            </h3>
            <div className="text-muted-foreground text-xs">
              {skill.experience}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
