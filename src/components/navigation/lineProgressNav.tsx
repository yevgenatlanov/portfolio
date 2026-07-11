"use client";

type SectionId = "intro" | "projects" | "exp" | "skills" | "blog" | "convergence";

export function LineProgressNav({
  activeSection,
  onNavigate,
}: {
  activeSection: SectionId;
  onNavigate: (id: SectionId) => void;
}) {
  const items: { id: SectionId; label: string }[] = [
    { id: "intro", label: "Overview" },
    { id: "projects", label: "Projects" },
    { id: "exp", label: "Experience" },
    { id: "skills", label: "Skills" },
    { id: "blog", label: "Blog" },
    { id: "convergence", label: "Boundary" },
  ];

  const activeIndex = items.findIndex((item) => item.id === activeSection);
  const progress = Math.max(0, (activeIndex / (items.length - 1)) * 100);

  return (
    <nav className="line-progress-nav" aria-label="Section navigation">
      <div className="line-progress-track" aria-hidden="true">
        <div className="line-progress-fill" style={{ height: `${progress}%` }} />
      </div>
      <ol className="line-progress-list">
        {items.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <li key={item.id} className="line-progress-item">
              <button
                type="button"
                onClick={() => onNavigate(item.id)}
                aria-current={isActive ? "true" : undefined}
                className={`line-progress-button${isActive ? " active" : ""}`}
              >
                <span className="line-progress-dot" aria-hidden="true" />
                <span className="line-progress-label">{item.label}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
