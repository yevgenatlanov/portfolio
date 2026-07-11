"use client";

import * as React from "react";
import { experiences } from "@/data/exp";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const ITEMS_PER_PAGE = 2;
const TOTAL_PAGES = Math.ceil(experiences.length / ITEMS_PER_PAGE);

function ResumeRow({ exp, borderColor, mutedColor }: { exp: (typeof experiences)[number]; borderColor: string; mutedColor: string }) {
  return (
    <article className="experience-resume-row" style={{ borderColor: borderColor }}>
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
  );
}

function usePagedItems(page: number) {
  return experiences.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE);
}

/* ── 06. Terminal pagination ── */
export function PaginationTerminal({ variant }: { variant: "light" | "dark" }) {
  const isLight = variant === "light";
  const [page, setPage] = React.useState(1);
  const [input, setInput] = React.useState("");
  const [message, setMessage] = React.useState(`Type a page number (1-${TOTAL_PAGES}) and press Enter.`);
  const mutedColor = isLight ? "#404040" : "#a3a3a3";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const n = parseInt(input, 10);
    if (Number.isNaN(n) || n < 1 || n > TOTAL_PAGES) {
      setMessage(`Invalid page. Available: 1–${TOTAL_PAGES}.`);
      return;
    }
    setPage(n);
    setMessage(`Showing page ${n}.`);
  };

  const visible = usePagedItems(page - 1);

  return (
    <div>
      <div className="pagination-terminal" style={{ color: mutedColor }}>
        <form onSubmit={handleSubmit} className="pagination-terminal-prompt">
          <span>~/exp/page&gt;</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="pagination-terminal-input"
            aria-label="Page number"
          />
        </form>
        <p className="pagination-terminal-message">{message}</p>
      </div>
      <div className="experience-resume" style={{ marginTop: "1rem" }}>
        {visible.map((exp) => (
          <ResumeRow key={exp.id} exp={exp} borderColor={isLight ? "rgba(10,10,10,0.12)" : "rgba(245,245,245,0.12)"} mutedColor={mutedColor} />
        ))}
      </div>
    </div>
  );
}

/* ── 07. Keyboard pagination ── */
export function PaginationKeyboard({ variant }: { variant: "light" | "dark" }) {
  const isLight = variant === "light";
  const [page, setPage] = React.useState(0);
  const mutedColor = isLight ? "#404040" : "#a3a3a3";

  const visible = usePagedItems(page);

  return (
    <div>
      <div className="experience-resume">
        {visible.map((exp) => (
          <ResumeRow key={exp.id} exp={exp} borderColor={isLight ? "rgba(10,10,10,0.12)" : "rgba(245,245,245,0.12)"} mutedColor={mutedColor} />
        ))}
      </div>
      <div className="pagination-demo-control">
        <div className="pagination-keyboard">
          <button
            type="button"
            className="pagination-keyboard-arrow"
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            aria-label="Previous page"
          >
            <FiChevronLeft size={16} />
          </button>
          <div className="pagination-keyboard-pages">
            {Array.from({ length: TOTAL_PAGES }, (_, i) => (
              <button
                key={i}
                type="button"
                className={`pagination-keyboard-page${page === i ? " active" : ""}`}
                onClick={() => setPage(i)}
                aria-label={`Page ${i + 1}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="pagination-keyboard-arrow"
            onClick={() => setPage((p) => Math.min(TOTAL_PAGES - 1, p + 1))}
            disabled={page === TOTAL_PAGES - 1}
            aria-label="Next page"
          >
            <FiChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── 08. Stacked sheets pagination ── */
export function PaginationStacked({ variant }: { variant: "light" | "dark" }) {
  const [page, setPage] = React.useState(0);

  return (
    <div className="pagination-demo-control" data-variant={variant}>
      <div className="pagination-stacked">
        <button
          type="button"
          className="pagination-stacked-btn"
          onClick={() => setPage((p) => Math.max(0, p - 1))}
          disabled={page === 0}
          aria-label="Previous page"
        >
          <FiChevronLeft size={18} />
        </button>
        <div className="pagination-stacked-sheets">
          {Array.from({ length: TOTAL_PAGES }, (_, i) => {
            const offset = (i - page) * 6;
            const isActive = i === page;
            return (
              <button
                key={i}
                type="button"
                className={`pagination-stacked-sheet${isActive ? " active" : ""}${!isActive ? " hidden" : ""}`}
                onClick={() => setPage(i)}
                style={{
                  transform: `translate(${offset}px, ${-offset}px)`,
                  opacity: isActive ? 1 : 0.3,
                  zIndex: isActive ? 10 : 10 - Math.abs(i - page),
                }}
                aria-label={`Page ${i + 1}`}
              >
                <span className="pagination-stacked-sheet-num">{i + 1}</span>
              </button>
            );
          })}
        </div>
        <button
          type="button"
          className="pagination-stacked-btn"
          onClick={() => setPage((p) => Math.min(TOTAL_PAGES - 1, p + 1))}
          disabled={page === TOTAL_PAGES - 1}
          aria-label="Next page"
        >
          <FiChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

/* ── 09. Progress steps pagination ── */
export function PaginationProgress({ variant }: { variant: "light" | "dark" }) {
  const [page, setPage] = React.useState(0);
  const progress = (page / (TOTAL_PAGES - 1)) * 100;

  return (
    <div>
      <div className="experience-resume">
        {usePagedItems(page).map((exp) => (
          <ResumeRow
            key={exp.id}
            exp={exp}
            borderColor={variant === "light" ? "rgba(10,10,10,0.12)" : "rgba(245,245,245,0.12)"}
            mutedColor={variant === "light" ? "#404040" : "#a3a3a3"}
          />
        ))}
      </div>
      <div className="pagination-demo-control">
        <div className="pagination-progress">
          <div className="pagination-progress-track" aria-hidden="true">
            <div className="pagination-progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <div className="pagination-progress-steps">
            {Array.from({ length: TOTAL_PAGES }, (_, i) => {
              const state = i === page ? "active" : i < page ? "passed" : "";
              return (
                <button
                  key={i}
                  type="button"
                  className={`pagination-progress-step ${state}`}
                  onClick={() => setPage(i)}
                  aria-label={`Page ${i + 1}`}
                >
                  <span className="pagination-progress-dot" />
                  <span className="pagination-progress-label">{i + 1}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── 10. Segmented bar pagination ── */
export function PaginationSegmented({ variant }: { variant: "light" | "dark" }) {
  const [page, setPage] = React.useState(0);

  return (
    <div>
      <div className="experience-resume">
        {usePagedItems(page).map((exp) => (
          <ResumeRow
            key={exp.id}
            exp={exp}
            borderColor={variant === "light" ? "rgba(10,10,10,0.12)" : "rgba(245,245,245,0.12)"}
            mutedColor={variant === "light" ? "#404040" : "#a3a3a3"}
          />
        ))}
      </div>
      <div className="pagination-demo-control">
        <div className="pagination-segmented">
          <button
            type="button"
            className="pagination-segmented-edge"
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            aria-label="Previous page"
          >
            <FiChevronLeft size={18} />
          </button>
          <div className="pagination-segmented-bar">
            {Array.from({ length: TOTAL_PAGES }, (_, i) => (
              <button
                key={i}
                type="button"
                className={`pagination-segmented-piece${page === i ? " active" : ""}`}
                style={{ flex: 1 }}
                onClick={() => setPage(i)}
                aria-label={`Page ${i + 1}`}
              >
                <span className="pagination-segmented-num">{i + 1}</span>
              </button>
            ))}
          </div>
          <button
            type="button"
            className="pagination-segmented-edge"
            onClick={() => setPage((p) => Math.min(TOTAL_PAGES - 1, p + 1))}
            disabled={page === TOTAL_PAGES - 1}
            aria-label="Next page"
          >
            <FiChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
