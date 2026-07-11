"use client";

import { useRef, useState, useEffect } from "react";
import { experiences } from "@/data/exp";

const ITEMS_PER_PAGE = 2;

export function ScrollSnapPagination({ variant }: { variant: "light" | "dark" }) {
  const isLight = variant === "light";
  const borderColor = isLight ? "rgba(10,10,10,0.12)" : "rgba(245,245,245,0.12)";
  const mutedColor = isLight ? "#404040" : "#a3a3a3";
  const totalPages = Math.ceil(experiences.length / ITEMS_PER_PAGE);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      const newPage = Math.round(el.scrollTop / el.clientHeight);
      setPage(newPage);
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  const goToPage = (p: number) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: p * el.clientHeight, behavior: "smooth" });
  };

  return (
    <div className="pagination-scroll-snap-wrapper">
      <div ref={scrollRef} className="pagination-scroll-snap-viewport">
        {Array.from({ length: totalPages }, (_, p) => (
          <div key={p} className="pagination-scroll-snap-page">
            {experiences.slice(p * ITEMS_PER_PAGE, (p + 1) * ITEMS_PER_PAGE).map((exp) => (
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
        ))}
      </div>
      <div className="pagination-scroll-snap-dots">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goToPage(i)}
            className={page === i ? "active" : ""}
            aria-label={`Go to page ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
