"use client";

import { getExperienceDates, getTotalRange, formatDuration } from "@/lib/dateUtils";

export function ExperienceTimeBars({ variant }: { variant: "light" | "dark" }) {
  const isLight = variant === "light";
  const mutedColor = isLight ? "#404040" : "#a3a3a3";
  const dated = getExperienceDates();
  const { min, max } = getTotalRange();
  const totalMs = max - min;

  return (
    <div className="time-bars">
      {dated.map((exp) => {
        const left = ((exp.start.getTime() - min) / totalMs) * 100;
        const width = ((exp.end.getTime() - exp.start.getTime()) / totalMs) * 100;
        return (
          <article key={exp.id} className="time-bar-row">
            <div className="time-bar-labels">
              <div>
                <h3 className="time-bar-company">{exp.company}</h3>
                <p className="time-bar-role">{exp.title}</p>
              </div>
              <span className="time-bar-duration" style={{ color: mutedColor }}>
                {formatDuration(exp.durationMonths)}
              </span>
            </div>
            <div className="time-bar-track">
              <div
                className="time-bar-fill"
                style={{ left: `${left}%`, width: `${width}%` }}
              />
            </div>
            <div className="time-bar-dates" style={{ color: mutedColor }}>
              <span>{exp.startDate}</span>
              <span>{exp.endDate}</span>
            </div>
          </article>
        );
      })}
    </div>
  );
}
