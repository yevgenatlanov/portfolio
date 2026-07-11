/* eslint-disable @next/next/no-img-element */
"use client";

import { Skill } from "@/types";
import { Card, CardContent } from "./ui/card";

interface SkillCardProps {
  skill: Skill;
}

export default function SkillCard({ skill }: SkillCardProps) {
  return (
    <Card className="border-white/10 bg-card/78 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_20px_70px_rgba(0,0,0,0.3)]">
      <CardContent className="py-5">
        <div className="flex items-center">
          {skill.icon && (
            <div className="mr-3 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-white/10 bg-secondary/70 text-xl">
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
