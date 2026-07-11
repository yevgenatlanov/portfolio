"use client";

type SectionId = "intro" | "projects" | "exp" | "skills" | "blog" | "convergence";

export function NumberNav({
  activeSection,
  onNavigate,
}: {
  activeSection: SectionId;
  onNavigate: (id: SectionId) => void;
}) {
  const items: { id: SectionId; label: string; num: string }[] = [
    { id: "intro", label: "Overview", num: "01" },
    { id: "projects", label: "Projects", num: "02" },
    { id: "exp", label: "Experience", num: "03" },
    { id: "skills", label: "Skills", num: "04" },
    { id: "blog", label: "Blog", num: "05" },
    { id: "convergence", label: "Boundary", num: "06" },
  ];

  return (
    <nav className="number-nav" aria-label="Section navigation">
      <ol className="number-nav-list">
        {items.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <li key={item.id} className="number-nav-item">
              <button
                type="button"
                onClick={() => onNavigate(item.id)}
                aria-current={isActive ? "true" : undefined}
                className={`number-nav-button${isActive ? " active" : ""}`}
              >
                <span className="number-nav-num">{item.num}</span>
                <span className="number-nav-label">{item.label}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
