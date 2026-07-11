"use client";

import { useRef, useState, useEffect } from "react";
import { experiences } from "@/data/exp";

export function DragScrollerPagination({ variant }: { variant: "light" | "dark" }) {
  const isLight = variant === "light";
  const borderColor = isLight ? "rgba(10,10,10,0.12)" : "rgba(245,245,245,0.12)";
  const mutedColor = isLight ? "#404040" : "#a3a3a3";
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const onMouseDown = (e: MouseEvent) => {
      setIsDragging(true);
      setStartY(e.pageY - el.offsetTop);
      setScrollTop(el.scrollTop);
      el.style.cursor = "grabbing";
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      const y = e.pageY - el.offsetTop;
      const walk = (y - startY) * 1.2;
      el.scrollTop = scrollTop - walk;
    };

    const onMouseUp = () => {
      setIsDragging(false);
      el.style.cursor = "grab";
    };

    el.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      el.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [isDragging, startY, scrollTop]);

  return (
    <div className="pagination-drag-wrapper">
      <div ref={trackRef} className="pagination-drag-track" style={{ cursor: "grab" }}>
        {experiences.map((exp) => (
          <article key={exp.id} className="experience-resume-row" style={{ borderColor }}>
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
      <div className="pagination-drag-hint">drag to scroll</div>
    </div>
  );
}
