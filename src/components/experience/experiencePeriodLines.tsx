"use client";

import { getExperienceDates, formatDuration } from "@/lib/dateUtils";

export function ExperiencePeriodLines({ variant }: { variant: "light" | "dark" }) {
  const isLight = variant === "light";
  const mutedColor = isLight ? "#404040" : "#a3a3a3";
  const dated = getExperienceDates();
  const maxMonths = Math.max(...dated.map((d) => d.durationMonths));

  return (
    <div className="period-lines">
      {dated.map((exp) => {
        const width = (exp.durationMonths / maxMonths) * 100;
        return (
          <article key={exp.id} className="period-line-row">
            <div className="period-line-header">
              <div>
                <h3 className="period-line-company">{exp.company}</h3>
                <p className="period-line-role">{exp.title}</p>
              </div>
              <div className="period-line-dates" style={{ color: mutedColor }}>
                <span>{exp.startDate}</span>
                <span>—</span>
                <span>{exp.endDate}</span>
              </div>
            </div>
            <div className="period-line-bar">
              <div className="period-line-fill" style={{ width: `${width}%` }} />
              <span className="period-line-duration" style={{ color: mutedColor }}>
                {formatDuration(exp.durationMonths)}
              </span>
            </div>
          </article>
        );
      })}
    </div>
  );
}
