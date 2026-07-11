"use client";

import * as React from "react";

export type SectionId = "intro" | "projects" | "exp" | "skills" | "blog" | "convergence";

const items: { id: SectionId; label: string; num: string }[] = [
  { id: "intro", label: "Overview", num: "01" },
  { id: "projects", label: "Projects", num: "02" },
  { id: "exp", label: "Experience", num: "03" },
  { id: "skills", label: "Skills", num: "04" },
  { id: "blog", label: "Blog", num: "05" },
  { id: "convergence", label: "Boundary", num: "06" },
];

/* ── 04. Axis nav ──
 * Navigation as the central boundary between light and dark.
 * Numbers live on the light side, labels on the dark side.
 * The active section lights up the bridge between the two halves.
 */
export function AxisNav({
  activeSection,
  onNavigate,
}: {
  activeSection: SectionId;
  onNavigate: (id: SectionId) => void;
}) {
  return (
    <nav className="nav-axis" aria-label="Section navigation">
      <span className="nav-axis-line" aria-hidden="true" />
      <ol className="nav-axis-list">
        {items.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <li key={item.id} className="nav-axis-item">
              <button
                type="button"
                onClick={() => onNavigate(item.id)}
                aria-current={isActive ? "true" : undefined}
                className={`nav-axis-btn${isActive ? " active" : ""}`}
              >
                <span className="nav-axis-num">{item.num}</span>
                <span className="nav-axis-bridge" aria-hidden="true">
                  <span className="nav-axis-dot" />
                </span>
                <span className="nav-axis-label">{item.label}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/* ── 05. Mirror rail ──
 * Two mirrored vertical rails: one anchored to the light panel,
 * one to the dark panel. The active section draws a thin line
 * across the boundary, connecting both perspectives.
 */
export function MirrorRailNav({
  activeSection,
  onNavigate,
}: {
  activeSection: SectionId;
  onNavigate: (id: SectionId) => void;
}) {
  return (
    <React.Fragment>
      <nav className="nav-mirror nav-mirror-left" aria-label="Section navigation light">
        <ol className="nav-mirror-list">
          {items.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <li key={item.id} className="nav-mirror-item">
                <button
                  type="button"
                  onClick={() => onNavigate(item.id)}
                  aria-current={isActive ? "true" : undefined}
                  className={`nav-mirror-btn${isActive ? " active" : ""}`}
                >
                  <span className="nav-mirror-num">{item.num}</span>
                  <span className="nav-mirror-label">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ol>
      </nav>

      <nav className="nav-mirror nav-mirror-right" aria-label="Section navigation dark">
        <ol className="nav-mirror-list">
          {items.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <li key={item.id} className="nav-mirror-item">
                <button
                  type="button"
                  onClick={() => onNavigate(item.id)}
                  aria-current={isActive ? "true" : undefined}
                  className={`nav-mirror-btn${isActive ? " active" : ""}`}
                >
                  <span className="nav-mirror-num">{item.num}</span>
                  <span className="nav-mirror-label">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ol>
      </nav>
    </React.Fragment>
  );
}

/* ── 06. Phase nav ──
 * Each section is a phase. Passed phases are dimmed fills,
 * the active phase is fully lit, future phases remain outlines.
 */
export function PhaseNav({
  activeSection,
  onNavigate,
}: {
  activeSection: SectionId;
  onNavigate: (id: SectionId) => void;
}) {
  const activeIndex = items.findIndex((i) => i.id === activeSection);

  return (
    <nav className="nav-phase" aria-label="Section navigation">
      <span className="nav-phase-track" aria-hidden="true" />
      <ol className="nav-phase-list">
        {items.map((item, index) => {
          const isActive = activeSection === item.id;
          const isPast = index < activeIndex;
          return (
            <li key={item.id} className="nav-phase-item">
              <button
                type="button"
                onClick={() => onNavigate(item.id)}
                aria-current={isActive ? "true" : undefined}
                className={`nav-phase-btn${isActive ? " active" : ""}${isPast ? " past" : ""}`}
              >
                <span className="nav-phase-orb" aria-hidden="true">
                  <span className="nav-phase-fill" />
                </span>
                <span className="nav-phase-label">
                  {item.num} · {item.label}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/* ── 07. Contour nav ──
 * A single vertical contour line with ticks. The active tick
 * extends and reveals its label; everything else stays minimal.
 */
export function ContourNav({
  activeSection,
  onNavigate,
}: {
  activeSection: SectionId;
  onNavigate: (id: SectionId) => void;
}) {
  return (
    <nav className="nav-contour" aria-label="Section navigation">
      <span className="nav-contour-line" aria-hidden="true" />
      <ol className="nav-contour-list">
        {items.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <li key={item.id} className="nav-contour-item">
              <button
                type="button"
                onClick={() => onNavigate(item.id)}
                aria-current={isActive ? "true" : undefined}
                className={`nav-contour-btn${isActive ? " active" : ""}`}
              >
                <span className="nav-contour-tick" aria-hidden="true" />
                <span className="nav-contour-num">{item.num}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
