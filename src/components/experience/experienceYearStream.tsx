"use client";

import { getExperienceDates, getTotalRange, formatDuration } from "@/lib/dateUtils";

export function ExperienceYearStream({ variant }: { variant: "light" | "dark" }) {
  const isLight = variant === "light";
  const mutedColor = isLight ? "#404040" : "#a3a3a3";
  const dated = getExperienceDates();
  const { min, max } = getTotalRange();

  const startYear = new Date(min).getFullYear();
  const endYear = new Date(max).getFullYear();
  const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);

  return (
    <div className="year-stream">
      <div className="year-stream-axis">
        {years.map((year) => (
          <span key={year} className="year-stream-year" style={{ color: mutedColor }}>
            {year}
          </span>
        ))}
      </div>
      <div className="year-stream-items">
        {dated.map((exp) => {
          const left = ((exp.start.getTime() - min) / (max - min)) * 100;
          const width = ((exp.end.getTime() - exp.start.getTime()) / (max - min)) * 100;
          return (
            <article key={exp.id} className="year-stream-item" style={{ left: `${left}%`, width: `${width}%` }}>
              <div className="year-stream-card">
                <h3 className="year-stream-company">{exp.company}</h3>
                <p className="year-stream-role">{exp.title}</p>
                <span className="year-stream-duration" style={{ color: mutedColor }}>
                  {formatDuration(exp.durationMonths)}
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
