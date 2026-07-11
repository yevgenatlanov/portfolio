"use client";

import { useState } from "react";
import { experiences } from "@/data/exp";

const INITIAL_COUNT = 2;
const LOAD_COUNT = 2;

export function MinimalLoadMore({ variant }: { variant: "light" | "dark" }) {
  const isLight = variant === "light";
  const borderColor = isLight ? "rgba(10,10,10,0.12)" : "rgba(245,245,245,0.12)";
  const mutedColor = isLight ? "#404040" : "#a3a3a3";
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const visible = experiences.slice(0, visibleCount);
  const hasMore = visibleCount < experiences.length;

  return (
    <div>
      <div className="experience-resume">
        {visible.map((exp, index) => (
          <article
            key={exp.id}
            className="experience-resume-row load-more-item"
            style={{ borderColor, animationDelay: `${index * 60}ms` }}
          >
            <div className="experience-resume-primary">
              <h3 className="experience-resume-company">{exp.company}</h3>
              <p className="experience-resume-role">{exp.title}</p>
            </div>
            <div className="experience-resume-secondary" style={{ color: mutedColor }}>
              <span>
                {exp.startDate} — {exp.endDate}
              </span>
              <span>{exp.location}</span>
              <span>{exp.type}</span>
            </div>
            <p className="experience-resume-summary">{exp.achievements[0]}</p>
            <div className="experience-resume-stack" style={{ color: mutedColor }}>
              {exp.technologies.join(" · ")}
            </div>
          </article>
        ))}
      </div>
      {hasMore && (
        <button
          type="button"
          onClick={() => setVisibleCount((c) => Math.min(c + LOAD_COUNT, experiences.length))}
          className="minimal-load-more-btn"
        >
          Show {Math.min(LOAD_COUNT, experiences.length - visibleCount)} more
        </button>
      )}
    </div>
  );
}
