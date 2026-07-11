"use client";

import { useEffect, useRef, useState } from "react";
import { experiences } from "@/data/exp";

const BATCH_SIZE = 2;

export function RevealOnScrollPagination({ variant }: { variant: "light" | "dark" }) {
  const isLight = variant === "light";
  const borderColor = isLight ? "rgba(10,10,10,0.12)" : "rgba(245,245,245,0.12)";
  const mutedColor = isLight ? "#404040" : "#a3a3a3";
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleCount((c) => Math.min(c + BATCH_SIZE, experiences.length));
          }
        });
      },
      { rootMargin: "100px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <div className="experience-resume">
        {experiences.slice(0, visibleCount).map((exp, index) => (
          <article
            key={exp.id}
            className="experience-resume-row reveal-item"
            style={{ borderColor, animationDelay: `${index * 80}ms` }}
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
      {visibleCount < experiences.length && (
        <div ref={sentinelRef} className="reveal-sentinel" />
      )}
    </div>
  );
}
