"use client";

import { getExperienceDates, formatDuration } from "@/lib/dateUtils";

export function ExperienceDurationBlocks({ variant }: { variant: "light" | "dark" }) {
  const isLight = variant === "light";
  const mutedColor = isLight ? "#404040" : "#a3a3a3";
  const dated = getExperienceDates();
  const maxMonths = Math.max(...dated.map((d) => d.durationMonths));

  return (
    <div className="duration-blocks">
      {dated.map((exp) => {
        const size = Math.max(1, Math.round((exp.durationMonths / maxMonths) * 10));
        return (
          <article key={exp.id} className="duration-block">
            <div className="duration-block-left">
              <span className="duration-block-dates" style={{ color: mutedColor }}>
                {exp.startDate} — {exp.endDate}
              </span>
              <h3 className="duration-block-company">{exp.company}</h3>
              <p className="duration-block-role">{exp.title}</p>
            </div>
            <div className="duration-block-right">
              <div
                className="duration-block-marker"
                style={{
                  width: `${size * 0.75}rem`,
                  minWidth: "1.5rem",
                }}
              />
              <span className="duration-block-label" style={{ color: mutedColor }}>
                {formatDuration(exp.durationMonths)}
              </span>
            </div>
          </article>
        );
      })}
    </div>
  );
}
