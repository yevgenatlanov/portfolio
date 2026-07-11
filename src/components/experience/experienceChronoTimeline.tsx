"use client";

import { useSyncExternalStore } from "react";
import { getExperienceDates, getTotalRange, formatDuration } from "@/lib/dateUtils";

export function ExperienceChronoTimeline({ variant }: { variant: "light" | "dark" }) {
  const isLight = variant === "light";
  const mutedColor = isLight ? "#404040" : "#a3a3a3";
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  // Render a stable placeholder during SSR and the initial client render so the
  // server and client output match. The actual timeline (which depends on
  // `new Date()` and can differ between environments) is computed after mount.
  if (!mounted) {
    return <div className="chrono-timeline chrono-timeline-placeholder" aria-hidden="true" />;
  }

  const dated = getExperienceDates();
  const { min, max } = getTotalRange();
  const totalMs = max - min;

  if (totalMs <= 0 || Number.isNaN(totalMs)) {
    return <div className="chrono-timeline chrono-timeline-placeholder" aria-hidden="true" />;
  }

  return (
    <div className="chrono-timeline">
      <div className="chrono-timeline-track" aria-hidden="true">
        {dated.map((exp) => {
          const top = ((exp.end.getTime() - min) / totalMs) * 100;
          return <div key={exp.id} className="chrono-timeline-tick" style={{ top: `${(100 - top).toFixed(4)}%` }} />;
        })}
      </div>
      <div className="chrono-timeline-items">
        {dated.map((exp) => {
          const top = ((exp.end.getTime() - min) / totalMs) * 100;
          return (
            <article
              key={exp.id}
              className="chrono-timeline-item"
              style={{ top: `${(100 - top).toFixed(4)}%` }}
            >
              <div className="chrono-timeline-date">
                <span className="chrono-timeline-end">{exp.endDate}</span>
                <span className="chrono-timeline-duration" style={{ color: mutedColor }}>
                  {formatDuration(exp.durationMonths)}
                </span>
              </div>
              <div className="chrono-timeline-content">
                <h3 className="chrono-timeline-company">{exp.company}</h3>
                <p className="chrono-timeline-role">{exp.title}</p>
                <p className="chrono-timeline-meta" style={{ color: mutedColor }}>
                  {exp.startDate} — {exp.endDate} · {exp.location}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
