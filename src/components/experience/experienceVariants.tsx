"use client";

import * as React from "react";
import { experiences } from "@/data/exp";
import { getExperienceDates, formatDuration } from "@/lib/dateUtils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FiMapPin, FiUsers, FiCalendar, FiChevronDown } from "react-icons/fi";

function variantColors(variant: "light" | "dark") {
  const isLight = variant === "light";
  return {
    muted: isLight ? "#404040" : "#a3a3a3",
    border: isLight ? "rgba(10,10,10,0.12)" : "rgba(245,245,245,0.12)",
    cardBg: isLight ? "#fff" : "rgba(245,245,245,0.03)",
  };
}

/* ── 06. Classic timeline variant ── */
export function ExperienceTimelineVariant({ variant }: { variant: "light" | "dark" }) {
  const { muted } = variantColors(variant);
  const dated = getExperienceDates();

  return (
    <div className="experience-timeline">
      {dated.map((exp) => (
        <article key={exp.id} className="timeline-item">
          <span className="timeline-marker" aria-hidden="true" />
          <div className="timeline-content">
            <div className="timeline-head">
              <h3 className="timeline-company">{exp.company}</h3>
              <span className="timeline-period" style={{ color: muted }}>
                {formatDuration(exp.durationMonths)}
              </span>
            </div>
            <p className="timeline-role">{exp.title}</p>
            <div className="timeline-meta" style={{ color: muted }}>
              <span>
                <FiCalendar size={12} />
                {exp.startDate} — {exp.endDate}
              </span>
              <span>
                <FiMapPin size={12} />
                {exp.location}
              </span>
              {exp.teamSize && (
                <span>
                  <FiUsers size={12} />
                  {exp.teamSize}
                </span>
              )}
            </div>
            <ul className="timeline-achievements">
              {exp.achievements.slice(0, 2).map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
            <div className="timeline-tags">
              {exp.technologies.slice(0, 5).map((tech) => (
                <span key={tech} className="project-tag" style={{ borderColor: variant === "light" ? "rgba(10,10,10,0.12)" : "rgba(245,245,245,0.12)" }}>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

/* ── 07. Compact / accordion variant ── */
export function ExperienceCompactVariant({ variant }: { variant: "light" | "dark" }) {
  const [openId, setOpenId] = React.useState<string | null>(null);
  const { muted } = variantColors(variant);
  const dated = getExperienceDates();

  return (
    <div className="experience-compact">
      {dated.map((exp) => {
        const isOpen = openId === exp.id;
        return (
          <article key={exp.id} className="experience-item">
            <button
              type="button"
              className="experience-item-head"
              onClick={() => setOpenId(isOpen ? null : exp.id)}
              aria-expanded={isOpen}
            >
              <div>
                <h3 className="experience-item-company">{exp.company}</h3>
                <p className="experience-item-role">{exp.title}</p>
              </div>
              <div className="experience-item-toggle">
                <span className="experience-item-period" style={{ color: muted }}>
                  {exp.startDate} — {exp.endDate}
                </span>
                <FiChevronDown
                  size={16}
                  style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s ease" }}
                />
              </div>
            </button>
            <div className="experience-item-meta" style={{ color: muted }}>
              <span>{exp.location}</span>
              <span>{exp.type}</span>
              <span>{formatDuration(exp.durationMonths)}</span>
            </div>
            {isOpen && (
              <div className="experience-item-details">
                <ul className="experience-item-list">
                  {exp.achievements.map((a, i) => (
                    <li key={i}>{a}</li>
                  ))}
                </ul>
                <div className="experience-item-tags">
                  {exp.technologies.map((tech) => (
                    <span key={tech} className="project-tag" style={{ borderColor: variant === "light" ? "rgba(10,10,10,0.12)" : "rgba(245,245,245,0.12)" }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
}

/* ── 08. Passport variant ── */
export function ExperiencePassportVariant({ variant }: { variant: "light" | "dark" }) {
  const { muted, border, cardBg } = variantColors(variant);
  const dated = getExperienceDates();

  return (
    <div className="experience-passport">
      {dated.map((exp) => (
        <Card
          key={exp.id}
          className="experience-passport-card"
          style={{ borderColor: border, background: cardBg }}
        >
          <CardHeader className="experience-passport-header">
            <div>
              <CardTitle className="experience-passport-company">{exp.company}</CardTitle>
              <p className="experience-passport-role">{exp.title}</p>
            </div>
            <span className="experience-passport-period" style={{ color: muted }}>
              {exp.startDate} — {exp.endDate}
            </span>
          </CardHeader>
          <CardContent>
            <div className="experience-passport-meta" style={{ color: muted }}>
              <Badge variant="outline" style={{ borderColor: border }}>
                {exp.type}
              </Badge>
              <span>{exp.location}</span>
              <span>{formatDuration(exp.durationMonths)}</span>
            </div>
            <p className="experience-passport-summary">{exp.achievements[0]}</p>
            <div className="experience-passport-stack">
              {exp.technologies.slice(0, 6).map((tech) => (
                <span key={tech} className="project-tag" style={{ borderColor: border }}>
                  {tech}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

/* ── 09. Stats variant ── */
export function ExperienceStatsVariant({ variant }: { variant: "light" | "dark" }) {
  const { muted, border, cardBg } = variantColors(variant);
  const dated = getExperienceDates();
  const totalMonths = dated.reduce((sum, exp) => sum + exp.durationMonths, 0);
  const totalYears = (totalMonths / 12).toFixed(1);
  const allTech = Array.from(new Set(experiences.flatMap((e) => e.technologies)));
  const allLocations = Array.from(new Set(experiences.map((e) => e.location)));

  const stats = [
    { label: "Companies", value: experiences.length },
    { label: "Years of work", value: totalYears },
    { label: "Technologies", value: allTech.length },
    { label: "Locations", value: allLocations.length },
  ];

  return (
    <div className="experience-stats">
      <div className="experience-stats-grid">
        {stats.map((stat) => (
          <Card
            key={stat.label}
            className="experience-stats-card"
            style={{ borderColor: border, background: cardBg }}
          >
            <CardHeader>
              <CardTitle className="experience-stats-value">{stat.value}</CardTitle>
            </CardHeader>
            <CardContent>
              <span className="experience-stats-label" style={{ color: muted }}>
                {stat.label}
              </span>
            </CardContent>
          </Card>
        ))}
      </div>
      <Separator style={{ background: border, margin: "1.5rem 0" }} />
      <div className="experience-stats-tech">
        {allTech.slice(0, 24).map((tech) => (
          <Badge key={tech} variant="outline" style={{ borderColor: border }}>
            {tech}
          </Badge>
        ))}
      </div>
    </div>
  );
}

/* ── 10. Radar / skill frequency variant ── */
export function ExperienceRadarVariant({ variant }: { variant: "light" | "dark" }) {
  const { muted, border, cardBg } = variantColors(variant);
  const frequency = experiences.reduce<Record<string, number>>((acc, exp) => {
    exp.technologies.forEach((tech) => {
      acc[tech] = (acc[tech] || 0) + 1;
    });
    return acc;
  }, {});

  const sorted = Object.entries(frequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20);

  const max = sorted[0]?.[1] ?? 1;

  return (
    <div className="experience-radar">
      <Card className="experience-radar-card" style={{ borderColor: border, background: cardBg }}>
        <CardHeader>
          <CardTitle className="experience-radar-title">Tech frequency</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="experience-radar-list">
            {sorted.map(([tech, count]) => (
              <div key={tech} className="experience-radar-row">
                <span className="experience-radar-name">{tech}</span>
                <div className="experience-radar-bar" style={{ background: border }}>
                  <div
                    className="experience-radar-fill"
                    style={{ width: `${(count / max) * 100}%` }}
                  />
                </div>
                <span className="experience-radar-count" style={{ color: muted }}>
                  {count}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
