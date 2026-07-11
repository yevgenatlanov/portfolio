"use client";

import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { projects } from "@/data/projects";
import { FaGithub } from "react-icons/fa";
import { FiExternalLink, FiChevronDown, FiChevronLeft, FiChevronRight } from "react-icons/fi";

function variantColors(variant: "light" | "dark") {
  const isLight = variant === "light";
  return {
    muted: isLight ? "#404040" : "#a3a3a3",
    border: isLight ? "rgba(10,10,10,0.12)" : "rgba(245,245,245,0.12)",
    cardBg: isLight ? "#fff" : "rgba(245,245,245,0.03)",
  };
}

/* ── 06. Carousel variant ── */
export function ProjectCarouselVariant({ variant }: { variant: "light" | "dark" }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: false });
  const [prevEnabled, setPrevEnabled] = React.useState(false);
  const [nextEnabled, setNextEnabled] = React.useState(true);
  const { muted, border, cardBg } = variantColors(variant);

  const onSelect = React.useCallback(() => {
    if (!emblaApi) return;
    setPrevEnabled(emblaApi.canScrollPrev());
    setNextEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi, onSelect]);

  return (
    <div className="project-carousel">
      <div className="project-carousel-viewport" ref={emblaRef}>
        <div className="project-carousel-track">
          {projects.map((project) => (
            <article
              key={project.id}
              className="project-carousel-slide"
              style={{ borderColor: border, background: cardBg }}
            >
              <div className="project-carousel-head">
                <h3 className="project-carousel-title">{project.title}</h3>
                <div className="project-carousel-links">
                  {project.githubUrl && project.githubUrl !== "#" && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                      <FaGithub size={15} />
                    </a>
                  )}
                  {project.liveUrl && project.liveUrl !== "#" && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label="Live">
                      <FiExternalLink size={15} />
                    </a>
                  )}
                </div>
              </div>
              <p className="project-carousel-role" style={{ color: muted }}>
                {project.role || project.description}
              </p>
              <p className="project-carousel-body">{project.description}</p>
              <div className="project-carousel-tags">
                {project.tags.map((tag) => (
                  <span key={tag} className="project-tag" style={{ borderColor: border }}>
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className="project-carousel-controls">
        <Button
          variant="outline"
          size="icon"
          onClick={() => emblaApi?.scrollPrev()}
          disabled={!prevEnabled}
          aria-label="Previous project"
        >
          <FiChevronLeft size={16} />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => emblaApi?.scrollNext()}
          disabled={!nextEnabled}
          aria-label="Next project"
        >
          <FiChevronRight size={16} />
        </Button>
      </div>
    </div>
  );
}

/* ── 07. Accordion variant ── */
export function ProjectAccordionVariant({ variant }: { variant: "light" | "dark" }) {
  const { muted, border } = variantColors(variant);

  return (
    <AccordionPrimitive.Root type="single" collapsible className="project-accordion">
      {projects.map((project) => (
        <AccordionPrimitive.Item
          key={project.id}
          value={project.id}
          className="project-accordion-item"
          style={{ borderColor: border }}
        >
          <AccordionPrimitive.Trigger className="project-accordion-trigger">
            <span className="project-accordion-title">{project.title}</span>
            <span className="project-accordion-meta" style={{ color: muted }}>
              {project.role || project.description}
            </span>
            <FiChevronDown className="project-accordion-icon" size={16} />
          </AccordionPrimitive.Trigger>
          <AccordionPrimitive.Content className="project-accordion-content">
            <div className="project-accordion-body">
              <p className="project-accordion-desc">{project.description}</p>
              {project.keyFeatures && project.keyFeatures.length > 0 && (
                <>
                  <h4 className="project-accordion-subtitle" style={{ color: muted }}>
                    Key features
                  </h4>
                  <ul className="project-accordion-list">
                    {project.keyFeatures.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                </>
              )}
              <div className="project-accordion-tags">
                {project.tags.map((tag) => (
                  <span key={tag} className="project-tag" style={{ borderColor: border }}>
                    {tag}
                  </span>
                ))}
              </div>
              <div className="project-accordion-actions">
                {project.githubUrl && project.githubUrl !== "#" && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    GitHub
                  </a>
                )}
                {project.liveUrl && project.liveUrl !== "#" && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    Live
                  </a>
                )}
              </div>
            </div>
          </AccordionPrimitive.Content>
        </AccordionPrimitive.Item>
      ))}
    </AccordionPrimitive.Root>
  );
}

/* ── 08. Kanban variant ── */
export function ProjectKanbanVariant({ variant }: { variant: "light" | "dark" }) {
  const { muted, border, cardBg } = variantColors(variant);
  const columns = [
    { id: "current", label: "Current", filter: (p: (typeof projects)[number]) => p.timeframe?.includes("Present") },
    { id: "shipped", label: "Shipped", filter: (p: (typeof projects)[number]) => !p.timeframe?.includes("Present") && p.liveUrl && p.liveUrl !== "#" },
    { id: "experiments", label: "Experiments", filter: (p: (typeof projects)[number]) => !p.timeframe?.includes("Present") && (!p.liveUrl || p.liveUrl === "#") },
  ];

  return (
    <div className="project-kanban">
      {columns.map((column) => (
        <div key={column.id} className="project-kanban-col">
          <h3 className="project-kanban-header" style={{ color: muted }}>
            {column.label}
          </h3>
          <div className="project-kanban-cards">
            {projects.filter(column.filter).map((project) => (
              <Card key={project.id} className="project-kanban-card" style={{ borderColor: border, background: cardBg }}>
                <CardHeader className="project-kanban-card-head">
                  <CardTitle className="project-kanban-card-title">{project.title}</CardTitle>
                  <CardDescription style={{ color: muted }}>{project.role || project.description}</CardDescription>
                </CardHeader>
                <CardContent className="project-kanban-card-body">
                  <div className="project-kanban-tags">
                    {project.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" style={{ borderColor: border }}>
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── 09. Feature matrix variant ── */
export function ProjectFeatureMatrixVariant({ variant }: { variant: "light" | "dark" }) {
  const { muted, border } = variantColors(variant);
  const allFeatures = Array.from(
    new Set(projects.flatMap((p) => p.keyFeatures || []))
  );

  return (
    <div className="project-matrix" style={{ borderColor: border }}>
      <div className="project-matrix-row project-matrix-header">
        <div className="project-matrix-cell project-matrix-feature">Feature</div>
        {projects.map((project) => (
          <div key={project.id} className="project-matrix-cell project-matrix-project">
            {project.title}
          </div>
        ))}
      </div>
      {allFeatures.map((feature) => (
        <div key={feature} className="project-matrix-row" style={{ borderColor: border }}>
          <div className="project-matrix-cell project-matrix-feature" style={{ color: muted }}>
            {feature}
          </div>
          {projects.map((project) => (
            <div key={project.id} className="project-matrix-cell project-matrix-project">
              {project.keyFeatures?.includes(feature) ? (
                <span className="project-matrix-check" aria-label="Included">
                  ●
                </span>
              ) : (
                <span className="project-matrix-empty" aria-label="Not included">
                  —
                </span>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

/* ── 10. Masonry variant ── */
export function ProjectMasonryVariant({ variant }: { variant: "light" | "dark" }) {
  const { muted, border, cardBg } = variantColors(variant);
  const columns: (typeof projects)[] = [[], [], []];
  projects.forEach((project, index) => {
    columns[index % 3].push(project);
  });

  return (
    <div className="project-masonry">
      {columns.map((column, colIndex) => (
        <div key={colIndex} className="project-masonry-col">
          {column.map((project) => (
            <article
              key={project.id}
              className="project-masonry-card"
              style={{ borderColor: border, background: cardBg }}
            >
              <div className="project-masonry-head">
                <h3 className="project-masonry-title">{project.title}</h3>
                <div className="project-masonry-links">
                  {project.githubUrl && project.githubUrl !== "#" && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                      <FaGithub size={14} />
                    </a>
                  )}
                  {project.liveUrl && project.liveUrl !== "#" && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label="Live">
                      <FiExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>
              <p className="project-masonry-body">{project.description}</p>
              <Separator style={{ background: border, margin: "0.75rem 0" }} />
              <div className="project-masonry-tags">
                {project.tags.map((tag) => (
                  <span key={tag} className="project-tag" style={{ borderColor: border }}>
                    {tag}
                  </span>
                ))}
              </div>
              <span className="project-masonry-time" style={{ color: muted }}>
                {project.timeframe}
              </span>
            </article>
          ))}
        </div>
      ))}
    </div>
  );
}
