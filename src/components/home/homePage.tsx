"use client";

import { useDualismScroll } from "@/hooks/use-dualism-scroll";
import { useI18n } from "@/lib/i18n";
import { skills } from "@/data/skills";
import { useState, useCallback, useEffect } from "react";
import { Icon } from "@iconify/react";
import githubIcon from "@iconify/icons-mdi/github";
import linkedinIcon from "@iconify/icons-mdi/linkedin";
import pdfIcon from "@iconify/icons-mdi/file-pdf-box-outline";
import emailIcon from "@iconify/icons-mdi/alternate-email";
import { LanguageSwitcher } from "@/components/langSwitcher";
import { NumberNav } from "@/components/navigation/numberNav";
import { ProjectInteractiveTerminal } from "@/components/projects/projectInteractiveTerminal";
import { ExperienceChronoTimeline } from "@/components/experience/experienceChronoTimeline";
import { BlogNumberedVariant } from "@/components/blog/blogNumbered";

/* ── Types ── */
type SectionId = "intro" | "projects" | "exp" | "skills" | "blog" | "convergence";

/* ── Social Links (compact) ── */
function DualSocialLinks() {
  const links = [
    { href: "https://github.com/yevgenatlanov", label: "GitHub", icon: githubIcon },
    { href: "https://linkedin.com/in/yevhenii-atlanov", label: "LinkedIn", icon: linkedinIcon },
    { href: "https://atlanov.me/Atlanov-full-stack-developer.pdf", label: "CV", icon: pdfIcon },
    { href: "mailto:me@atlanov.me", label: "Email", icon: emailIcon },
  ];

  return (
    <div className="action-strip">
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          className="control-btn control-btn-icon"
        >
          <Icon icon={link.icon} width={16} height={16} />
        </a>
      ))}
      <div className="action-strip-languages mobile-only-inline">
        <LanguageSwitcher />
      </div>
    </div>
  );
}

/* ── Section Header ── */
function SectHeader({
  num,
  title,
  body,
  variant,
}: {
  num: string;
  title: string;
  body?: string;
  variant: "light" | "dark";
}) {
  return (
    <header>
      <div className="sect-num">{num}</div>
      <div className="sect-line" style={{ background: variant === "light" ? "#0a0a0a" : "#f5f5f5" }} />
      <h2 className="sect-title">{title}</h2>
      {body && <p className="sect-body">{body}</p>}
    </header>
  );
}

/* ── Skills Grid ── */
function DualSkillsList({ variant }: { variant: "light" | "dark" }) {
  const featured = skills.filter((s) => s.isFeatured);
  const rest = skills.filter((s) => !s.isFeatured);
  const display = variant === "light" ? featured : rest;

  return (
    <div className="skills-grid" role="list">
      {display.map((skill) => (
        <div key={skill.id} className="skill-pill" role="listitem">
          {skill.icon && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={skill.icon} alt="" style={{ width: 16, height: 16 }} loading="lazy" />
          )}
          <span className="skill-pill-name">{skill.name}</span>
          <span className="skill-pill-exp">{skill.experience}</span>
        </div>
      ))}
    </div>
  );
}

/* ── Section Builder ── */
function Section({
  id,
  variant,
  data,
}: {
  id: SectionId;
  variant: "light" | "dark";
  data: Record<string, { light: { num: string; title: string; body: string }; dark: { num: string; title: string; body: string } }>;
}) {
  const suffix = variant === "dark" ? "-dark" : "";

  switch (id) {
    case "intro":
      return (
        <div className="sect" id={`sect-intro${suffix}`}>
          <div className="sect-content intro-content">
            <h1 className="intro-name">{"Yevhenii Atlanov"}</h1>
            <p className="intro-role">{"Full Stack Engineer"}</p>
            {data.I && (
              <SectHeader
                num={data.I[variant].num}
                title={data.I[variant].title}
                body={data.I[variant].body}
                variant={variant}
              />
            )}
            <DualSocialLinks />
          </div>
        </div>
      );
    case "projects":
      return (
        <div className="sect" id={`sect-projects${suffix}`}>
          <div className="sect-content">
            <SectHeader
              num={data.II?.[variant].num || `${variant === "light" ? "II · visionary" : "II · practitioner"}`}
              title={data.II?.[variant].title || (variant === "light" ? "Projects" : "Systems")}
              body={data.II?.[variant].body}
              variant={variant}
            />
            <ProjectInteractiveTerminal variant={variant} />
          </div>
        </div>
      );
    case "exp":
      return (
        <div className="sect" id={`sect-exp${suffix}`}>
          <div className="sect-content">
            <SectHeader
              num={data.III?.[variant].num || `${variant === "light" ? "III · visionary" : "III · practitioner"}`}
              title={data.III?.[variant].title || (variant === "light" ? "Experience" : "Responsibility")}
              body={data.III?.[variant].body}
              variant={variant}
            />
            <ExperienceChronoTimeline variant={variant} />
          </div>
        </div>
      );
    case "skills":
      return (
        <div className="sect" id={`sect-skills${suffix}`}>
          <div className="sect-content">
            <SectHeader
              num={data.IV?.[variant].num || `${variant === "light" ? "IV · visionary" : "IV · practitioner"}`}
              title={data.IV?.[variant].title || (variant === "light" ? "Skills" : "Tools")}
              body={data.IV?.[variant].body}
              variant={variant}
            />
            <DualSkillsList variant={variant} />
          </div>
        </div>
      );
    case "blog":
      return (
        <div className="sect" id={`sect-blog${suffix}`}>
          <div className="sect-content">
            <SectHeader
              num={data.V?.[variant].num || `${variant === "light" ? "V · visionary" : "V · practitioner"}`}
              title={data.V?.[variant].title || (variant === "light" ? "Blog" : "Code")}
              body={data.V?.[variant].body}
              variant={variant}
            />
            <BlogNumberedVariant variant={variant} />
          </div>
        </div>
      );
    case "convergence":
      return (
        <div className="sect convergence" id={`sect-convergence${suffix}`}>
          <div className="sect-content">
            {data.VI && (
              <SectHeader
                num={data.VI[variant].num}
                title={data.VI[variant].title}
                body={data.VI[variant].body}
                variant={variant}
              />
            )}
          </div>
        </div>
      );
  }
}

/* ── Mobile Toggle ── */
function MobileToggle({
  activeSide,
  onToggle,
}: {
  activeSide: "light" | "dark";
  onToggle: (side: "light" | "dark") => void;
}) {
  const { t } = useI18n();

  return (
    <div className="mobile-toggle" role="tablist" aria-label="Select perspective">
      <button
        type="button"
        role="tab"
        aria-selected={activeSide === "light"}
        className={`mobile-toggle-btn ${activeSide === "light" ? "active-light" : ""}`}
        onClick={() => onToggle("light")}
      >
        {t("dualism.sideLight", { fallback: "Visionary" })}
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={activeSide === "dark"}
        className={`mobile-toggle-btn ${activeSide === "dark" ? "active-dark" : ""}`}
        onClick={() => onToggle("dark")}
      >
        {t("dualism.sideDark", { fallback: "Practitioner" })}
      </button>
    </div>
  );
}

/* ── Main Page ── */
const sectionOrder: SectionId[] = ["intro", "projects", "exp", "skills", "blog", "convergence"];

export function HomePage() {
  const { t } = useI18n();
  const { leftRef, rightRef, scrollToIndex } = useDualismScroll(sectionOrder.length);
  const [mobileSide, setMobileSide] = useState<"light" | "dark">("light");
  const [activeSection, setActiveSection] = useState<SectionId>("intro");

  const dual = t("dual") as unknown as Record<
    string,
    { light: { num: string; title: string; body: string }; dark: { num: string; title: string; body: string } }
  >;

  useEffect(() => {
    if (typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id.replace("sect-", "").replace("-dark", "") as SectionId;
            if (sectionOrder.includes(id)) {
              setActiveSection(id);
            }
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );

    sectionOrder.forEach((id) => {
      const light = document.getElementById(`sect-${id}`);
      const dark = document.getElementById(`sect-${id}-dark`);
      if (light) observer.observe(light);
      if (dark) observer.observe(dark);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = useCallback(
    (id: SectionId) => {
      const index = sectionOrder.indexOf(id);
      if (index !== -1) {
        scrollToIndex(index);
      }
      setActiveSection(id);
    },
    [scrollToIndex]
  );

  /* Keyboard navigation: arrow keys, PageUp/PageDown, Home/End switch screens */
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleKey = (e: KeyboardEvent) => {
      const idx = sectionOrder.indexOf(activeSection);
      let nextId: SectionId | null = null;

      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        nextId = sectionOrder[Math.min(idx + 1, sectionOrder.length - 1)];
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        nextId = sectionOrder[Math.max(idx - 1, 0)];
      } else if (e.key === "Home") {
        e.preventDefault();
        nextId = sectionOrder[0];
      } else if (e.key === "End") {
        e.preventDefault();
        nextId = sectionOrder[sectionOrder.length - 1];
      }

      if (nextId) {
        scrollToSection(nextId);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeSection, scrollToSection]);

  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth > 768) {
      return;
    }

    const suffix = mobileSide === "light" ? "" : "-dark";
    const el = document.getElementById(`sect-${activeSection}${suffix}`);
    if (el) {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      el.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", block: "start" });
    }
  }, [mobileSide, activeSection]);

  return (
    <>
      <div className="language-chrome desktop-only-inline">
        <LanguageSwitcher />
      </div>

      <NumberNav activeSection={activeSection} onNavigate={scrollToSection} />

      <div className="divider" aria-hidden="true" />

      <MobileToggle activeSide={mobileSide} onToggle={setMobileSide} />

      <main className="split-container">
        <section
          className={`panel panel-light${mobileSide === "dark" ? " panel-mobile-hidden" : ""}`}
          aria-label={t("dualism.sideLight", { fallback: "Visionary" })}
        >
          <div className="panel-inner" ref={leftRef}>
            {sectionOrder.map((id) => (
              <Section key={id} id={id} variant="light" data={dual} />
            ))}
          </div>
        </section>

        <section
          className={`panel panel-dark${mobileSide === "light" ? " panel-mobile-hidden" : ""}`}
          aria-label={t("dualism.sideDark", { fallback: "Practitioner" })}
        >
          {/* Desktop: reverse scroll; Mobile: natural reading order */}
          <div className="panel-inner panel-inner-desktop" ref={rightRef}>
            {[...sectionOrder].reverse().map((id) => (
              <Section key={`${id}-desktop`} id={id} variant="dark" data={dual} />
            ))}
          </div>
          <div className="panel-inner panel-inner-mobile">
            {sectionOrder.map((id) => (
              <Section key={`${id}-mobile`} id={id} variant="dark" data={dual} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
