"use client";

import { useState } from "react";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

import { NumberNav } from "@/components/navigation/numberNav";
import { VerticalTextNav } from "@/components/navigation/verticalTextNav";
import { LineProgressNav } from "@/components/navigation/lineProgressNav";
import {
  AxisNav,
  MirrorRailNav,
  PhaseNav,
  ContourNav,
} from "@/components/navigation/navVariants";

import { ProjectInteractiveTerminal } from "@/components/projects/projectInteractiveTerminal";
import { ProjectListVariant } from "@/components/projects/projectList";
import { ProjectMinimalVariant } from "@/components/projects/projectMinimal";
import { ProjectCardsVariant } from "@/components/projects/projectCards";
import { ProjectTerminalVariant } from "@/components/projects/projectTerminal";
import {
  ProjectCarouselVariant,
  ProjectAccordionVariant,
  ProjectKanbanVariant,
  ProjectFeatureMatrixVariant,
  ProjectMasonryVariant,
} from "@/components/projects/projectVariants";

import { ExperienceChronoTimeline } from "@/components/experience/experienceChronoTimeline";
import { ExperienceTimeBars } from "@/components/experience/experienceTimeBars";
import { ExperiencePeriodLines } from "@/components/experience/experiencePeriodLines";
import { ExperienceYearStream } from "@/components/experience/experienceYearStream";
import { ExperienceDurationBlocks } from "@/components/experience/experienceDurationBlocks";
import {
  ExperienceTimelineVariant,
  ExperienceCompactVariant,
  ExperiencePassportVariant,
  ExperienceStatsVariant,
  ExperienceRadarVariant,
} from "@/components/experience/experienceVariants";

import { BlogListVariant } from "@/components/blog/blogList";
import { BlogNumberedVariant } from "@/components/blog/blogNumbered";
import { BlogGridVariant } from "@/components/blog/blogGrid";
import { BlogMagazineVariant } from "@/components/blog/blogMagazine";
import {
  BlogCardVariant,
  BlogTableVariant,
  BlogMinimalVariant,
  BlogCarouselVariant,
  BlogSearchableVariant,
  BlogTagCloudVariant,
} from "@/components/blog/blogVariants";

import { ScrollSnapPagination } from "@/components/pagination/scrollSnapPagination";
import { HorizontalSwipePagination } from "@/components/pagination/horizontalSwipePagination";
import { MinimalLoadMore } from "@/components/pagination/minimalLoadMore";
import { DragScrollerPagination } from "@/components/pagination/dragScrollerPagination";
import { RevealOnScrollPagination } from "@/components/pagination/revealOnScrollPagination";
import {
  PaginationTerminal,
  PaginationKeyboard,
  PaginationStacked,
  PaginationProgress,
  PaginationSegmented,
} from "@/components/pagination/paginationVariants";

type SectionId = "intro" | "projects" | "exp" | "skills" | "blog" | "convergence";

type NavVariant =
  | "numbers"
  | "vertical"
  | "line"
  | "axis"
  | "mirror"
  | "phase"
  | "contour";

function VariantLabel({ children }: { children: React.ReactNode }) {
  return <div className="variant-label">{children}</div>;
}

function VariantBlock({ children }: { children: React.ReactNode }) {
  return <div className="variant-block">{children}</div>;
}

export default function UiVariantsPage() {
  const [activeNav, setActiveNav] = useState<SectionId>("intro");
  const [selectedNav, setSelectedNav] = useState<NavVariant>("numbers");

  const navDemos: { id: NavVariant; label: string; component: React.ReactNode }[] = [
    { id: "numbers", label: "Numbered list", component: <NumberNav activeSection={activeNav} onNavigate={setActiveNav} /> },
    { id: "vertical", label: "Vertical text", component: <VerticalTextNav activeSection={activeNav} onNavigate={setActiveNav} /> },
    { id: "line", label: "Line + progress", component: <LineProgressNav activeSection={activeNav} onNavigate={setActiveNav} /> },
    { id: "axis", label: "Axis", component: <AxisNav activeSection={activeNav} onNavigate={setActiveNav} /> },
    { id: "mirror", label: "Mirror rail", component: <MirrorRailNav activeSection={activeNav} onNavigate={setActiveNav} /> },
    { id: "phase", label: "Phase", component: <PhaseNav activeSection={activeNav} onNavigate={setActiveNav} /> },
    { id: "contour", label: "Contour line", component: <ContourNav activeSection={activeNav} onNavigate={setActiveNav} /> },
  ];

  return (
    <div className="ui-variants-page">
      <div className="ui-variants-inner">
        <Link href="/" className="ui-variants-back">
          <FiArrowLeft size={16} />
          Back to home
        </Link>

        <h1 className="ui-variants-title">UI Variants</h1>
        <p className="ui-variants-lead">
          10 different ways to present each block. Existing variants stay; new ones are added as alternatives.
        </p>

        <section className="ui-variants-section">
          <h2 className="ui-variants-section-title">Navigation</h2>
          <p className="ui-variants-section-desc">
            Pick a navigation concept to preview it. Only variants that fit the dualistic split-screen idea stay here.
          </p>

          <div className="nav-variant-picker">
            {navDemos.map((demo) => (
              <button
                key={demo.id}
                type="button"
                className={`nav-variant-picker-btn${selectedNav === demo.id ? " active" : ""}`}
                onClick={() => setSelectedNav(demo.id)}
              >
                {demo.label}
              </button>
            ))}
          </div>

          <div className="nav-variant-stage">
            {navDemos.find((d) => d.id === selectedNav)?.component}
            <div className="nav-variant-stage-label">
              Active section: <strong>{activeNav}</strong>
            </div>
          </div>
        </section>

        <section className="ui-variants-section">
          <h2 className="ui-variants-section-title">Projects</h2>

          <VariantBlock>
            <VariantLabel>01 — Interactive terminal (with pagination)</VariantLabel>
            <ProjectInteractiveTerminal variant="light" />
          </VariantBlock>

          <VariantBlock>
            <VariantLabel>02 — Compact list</VariantLabel>
            <ProjectListVariant variant="light" />
          </VariantBlock>

          <VariantBlock>
            <VariantLabel>03 — Minimal numbered rows</VariantLabel>
            <ProjectMinimalVariant variant="light" />
          </VariantBlock>

          <VariantBlock>
            <VariantLabel>04 — Cards grid</VariantLabel>
            <ProjectCardsVariant variant="light" />
          </VariantBlock>

          <VariantBlock>
            <VariantLabel>05 — Static terminal</VariantLabel>
            <ProjectTerminalVariant variant="light" />
          </VariantBlock>

          <VariantBlock>
            <VariantLabel>06 — Carousel</VariantLabel>
            <ProjectCarouselVariant variant="light" />
          </VariantBlock>

          <VariantBlock>
            <VariantLabel>07 — Accordion</VariantLabel>
            <ProjectAccordionVariant variant="light" />
          </VariantBlock>

          <VariantBlock>
            <VariantLabel>08 — Kanban board</VariantLabel>
            <ProjectKanbanVariant variant="light" />
          </VariantBlock>

          <VariantBlock>
            <VariantLabel>09 — Feature matrix</VariantLabel>
            <ProjectFeatureMatrixVariant variant="light" />
          </VariantBlock>

          <VariantBlock>
            <VariantLabel>10 — Masonry</VariantLabel>
            <ProjectMasonryVariant variant="light" />
          </VariantBlock>
        </section>

        <section className="ui-variants-section">
          <h2 className="ui-variants-section-title">Experience — Time</h2>
          <p className="ui-variants-section-desc">
            Experience is measured in months and years. These variants make time the main visual axis.
          </p>

          <VariantBlock>
            <VariantLabel>01 — Chrono timeline (proportional time)</VariantLabel>
            <ExperienceChronoTimeline variant="light" />
          </VariantBlock>

          <VariantBlock>
            <VariantLabel>02 — Time bars</VariantLabel>
            <ExperienceTimeBars variant="light" />
          </VariantBlock>

          <VariantBlock>
            <VariantLabel>03 — Period lines</VariantLabel>
            <ExperiencePeriodLines variant="light" />
          </VariantBlock>

          <VariantBlock>
            <VariantLabel>04 — Year stream</VariantLabel>
            <ExperienceYearStream variant="light" />
          </VariantBlock>

          <VariantBlock>
            <VariantLabel>05 — Duration blocks</VariantLabel>
            <ExperienceDurationBlocks variant="light" />
          </VariantBlock>

          <VariantBlock>
            <VariantLabel>06 — Classic timeline</VariantLabel>
            <ExperienceTimelineVariant variant="light" />
          </VariantBlock>

          <VariantBlock>
            <VariantLabel>07 — Compact accordion</VariantLabel>
            <ExperienceCompactVariant variant="light" />
          </VariantBlock>

          <VariantBlock>
            <VariantLabel>08 — Passport cards</VariantLabel>
            <ExperiencePassportVariant variant="light" />
          </VariantBlock>

          <VariantBlock>
            <VariantLabel>09 — Stats overview</VariantLabel>
            <ExperienceStatsVariant variant="light" />
          </VariantBlock>

          <VariantBlock>
            <VariantLabel>10 — Tech frequency radar</VariantLabel>
            <ExperienceRadarVariant variant="light" />
          </VariantBlock>
        </section>

        <section className="ui-variants-section">
          <h2 className="ui-variants-section-title">Blog</h2>

          <VariantBlock>
            <VariantLabel>01 — List with tags</VariantLabel>
            <BlogListVariant variant="light" />
          </VariantBlock>

          <VariantBlock>
            <VariantLabel>02 — Numbered index</VariantLabel>
            <BlogNumberedVariant variant="light" />
          </VariantBlock>

          <VariantBlock>
            <VariantLabel>03 — Grid cards</VariantLabel>
            <BlogGridVariant variant="light" />
          </VariantBlock>

          <VariantBlock>
            <VariantLabel>04 — Magazine quote</VariantLabel>
            <BlogMagazineVariant variant="light" />
          </VariantBlock>

          <VariantBlock>
            <VariantLabel>05 — Featured card</VariantLabel>
            <BlogCardVariant variant="light" />
          </VariantBlock>

          <VariantBlock>
            <VariantLabel>06 — Table</VariantLabel>
            <BlogTableVariant variant="light" />
          </VariantBlock>

          <VariantBlock>
            <VariantLabel>07 — Minimal rows</VariantLabel>
            <BlogMinimalVariant variant="light" />
          </VariantBlock>

          <VariantBlock>
            <VariantLabel>08 — Carousel</VariantLabel>
            <BlogCarouselVariant variant="light" />
          </VariantBlock>

          <VariantBlock>
            <VariantLabel>09 — Searchable list</VariantLabel>
            <BlogSearchableVariant variant="light" />
          </VariantBlock>

          <VariantBlock>
            <VariantLabel>10 — Tag cloud</VariantLabel>
            <BlogTagCloudVariant variant="light" />
          </VariantBlock>
        </section>

        <section className="ui-variants-section">
          <h2 className="ui-variants-section-title">Pagination</h2>
          <p className="ui-variants-section-desc">
            Minimal, functional ways to move through long text blocks: scroll, swipe, drag, reveal.
          </p>

          <VariantBlock>
            <VariantLabel>01 — Scroll-snap pages</VariantLabel>
            <ScrollSnapPagination variant="light" />
          </VariantBlock>

          <VariantBlock>
            <VariantLabel>02 — Horizontal swipe</VariantLabel>
            <HorizontalSwipePagination variant="light" />
          </VariantBlock>

          <VariantBlock>
            <VariantLabel>03 — Minimal load more</VariantLabel>
            <MinimalLoadMore variant="light" />
          </VariantBlock>

          <VariantBlock>
            <VariantLabel>04 — Drag to scroll</VariantLabel>
            <DragScrollerPagination variant="light" />
          </VariantBlock>

          <VariantBlock>
            <VariantLabel>05 — Reveal on scroll</VariantLabel>
            <RevealOnScrollPagination variant="light" />
          </VariantBlock>

          <VariantBlock>
            <VariantLabel>06 — Terminal input</VariantLabel>
            <PaginationTerminal variant="light" />
          </VariantBlock>

          <VariantBlock>
            <VariantLabel>07 — Keyboard</VariantLabel>
            <PaginationKeyboard variant="light" />
          </VariantBlock>

          <VariantBlock>
            <VariantLabel>08 — Stacked sheets</VariantLabel>
            <PaginationStacked variant="light" />
          </VariantBlock>

          <VariantBlock>
            <VariantLabel>09 — Progress steps</VariantLabel>
            <PaginationProgress variant="light" />
          </VariantBlock>

          <VariantBlock>
            <VariantLabel>10 — Segmented bar</VariantLabel>
            <PaginationSegmented variant="light" />
          </VariantBlock>
        </section>
      </div>
    </div>
  );
}
