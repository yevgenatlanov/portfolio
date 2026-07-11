"use client";

type SectionId = "intro" | "projects" | "exp" | "skills" | "blog" | "convergence";

export function VerticalTextNav({
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

  return (
    <nav className="vertical-text-nav" aria-label="Section navigation">
      <ol className="vertical-text-list">
        {items.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <li key={item.id} className="vertical-text-item">
              <button
                type="button"
                onClick={() => onNavigate(item.id)}
                aria-current={isActive ? "true" : undefined}
                className={`vertical-text-button${isActive ? " active" : ""}`}
              >
                {item.label}
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
