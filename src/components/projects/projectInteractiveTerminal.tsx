"use client";

import { useState, useRef, useEffect } from "react";
import { projects } from "@/data/projects";
import { FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";

const ITEMS_PER_PAGE = 3;

export function ProjectInteractiveTerminal({ variant }: { variant: "light" | "dark" }) {
  const isLight = variant === "light";
  const mutedColor = isLight ? "#404040" : "#a3a3a3";
  const [history, setHistory] = useState<{ type: "input" | "output"; text: React.ReactNode }[]>([
    { type: "output", text: `Found ${projects.length} projects. Type "help" for available commands.` },
  ]);
  const [input, setInput] = useState("");
  const [page, setPage] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);

  const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE);

  useEffect(() => {
    // Only scroll the terminal body, not the entire document
    const container = bottomRef.current?.closest('.project-terminal-scroll') as HTMLElement | null;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [history]);

  const print = (text: React.ReactNode) => {
    setHistory((h) => [...h, { type: "output", text }]);
  };

  const renderPage = (p: number) => {
    const start = p * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const items = projects.slice(start, end);
    return (
      <div key={`page-${p}`}>
        <div style={{ marginBottom: "0.5rem", color: mutedColor }}>
          Page {p + 1} of {totalPages}
        </div>
        {items.map((project, idx) => {
          const globalIndex = start + idx + 1;
          return (
            <div key={project.id} className="project-terminal-row">
              <span className="project-terminal-prompt" style={{ color: mutedColor }}>
                {String(globalIndex).padStart(2, "0")}
              </span>
              <div className="project-terminal-info">
                <div className="project-terminal-name">
                  {project.title}
                  <span className="project-terminal-links">
                    {project.githubUrl && project.githubUrl !== "#" && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                        <FaGithub size={13} />
                      </a>
                    )}
                    {project.liveUrl && project.liveUrl !== "#" && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label="Live">
                        <FiExternalLink size={13} />
                      </a>
                    )}
                  </span>
                </div>
                <div className="project-terminal-meta" style={{ color: mutedColor }}>
                  {project.role || project.description} · {project.tags.join(" ")}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderProjectDetails = (globalIndex: number) => {
    const project = projects[globalIndex - 1];
    if (!project) return <div>Project not found.</div>;
    return (
      <div style={{ padding: "0.5rem 0" }}>
        <div style={{ fontWeight: 600, marginBottom: "0.35rem" }}>{project.title}</div>
        <div style={{ color: mutedColor, marginBottom: "0.5rem" }}>
          {project.role || project.description}
          {project.timeframe && <span> · {project.timeframe}</span>}
        </div>
        {project.keyFeatures && project.keyFeatures.length > 0 && (
          <div style={{ marginBottom: "0.5rem" }}>
            <div style={{ color: mutedColor, marginBottom: "0.25rem" }}>Key features:</div>
            <ul style={{ paddingLeft: "1rem", margin: 0 }}>
              {project.keyFeatures.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>
        )}
        <div style={{ color: mutedColor }}>Stack: {project.tags.join(" · ")}</div>
        <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
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
    );
  };

  const handleCommand = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    setHistory((h) => [...h, { type: "input", text: `~/projects > ${raw}` }]);
    setInput("");

    if (cmd === "") return;

    if (cmd === "help") {
      print(
        <div>
          Available commands:
          <ul style={{ paddingLeft: "1.25rem", margin: "0.25rem 0 0" }}>
            <li>ls — list projects on current page</li>
            <li>next / prev — navigate pages</li>
            <li>page N — jump to page N</li>
            <li>cat N — show details for project #N</li>
            <li>clear — clear terminal</li>
          </ul>
        </div>
      );
      return;
    }

    if (cmd === "clear") {
      setHistory([]);
      return;
    }

    if (cmd === "ls") {
      print(renderPage(page));
      return;
    }

    if (cmd === "next") {
      if (page >= totalPages - 1) {
        print("Already on the last page.");
        return;
      }
      const newPage = page + 1;
      setPage(newPage);
      print(renderPage(newPage));
      return;
    }

    if (cmd === "prev") {
      if (page <= 0) {
        print("Already on the first page.");
        return;
      }
      const newPage = page - 1;
      setPage(newPage);
      print(renderPage(newPage));
      return;
    }

    if (cmd.startsWith("page ")) {
      const n = parseInt(cmd.replace("page ", ""), 10);
      if (Number.isNaN(n) || n < 1 || n > totalPages) {
        print(`Invalid page. Available pages: 1–${totalPages}.`);
        return;
      }
      const newPage = n - 1;
      setPage(newPage);
      print(renderPage(newPage));
      return;
    }

    if (cmd.startsWith("cat ")) {
      const n = parseInt(cmd.replace("cat ", ""), 10);
      if (Number.isNaN(n) || n < 1 || n > projects.length) {
        print(`Invalid project index. Available: 1–${projects.length}.`);
        return;
      }
      print(renderProjectDetails(n));
      return;
    }

    print(`Command not found: ${raw}. Type "help" for available commands.`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
    }
  };

  return (
    <div className="project-terminal">
      <div className="project-terminal-header" style={{ color: mutedColor }}>
        <span>~/projects</span>
        <span>projects@{variant === "light" ? "visionary" : "practitioner"}</span>
      </div>
      <div className="project-terminal-body project-terminal-scroll">
        {history.map((entry, i) =>
          entry.type === "input" ? (
            <div key={i} className="project-terminal-input-line">
              {entry.text}
            </div>
          ) : (
            <div key={i} className="project-terminal-output-line">
              {entry.text}
            </div>
          )
        )}
        <div className="project-terminal-input-line">
          <span style={{ color: mutedColor }}>~/projects &gt;</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="project-terminal-input"
            autoFocus
            aria-label="Terminal command"
          />
        </div>
        <div ref={bottomRef} />
      </div>
      <div className="project-terminal-footer" style={{ color: mutedColor }}>
        <span>tip: try "ls", "next", "cat 1"</span>
        <span>
          {page + 1}/{totalPages}
        </span>
      </div>
    </div>
  );
}
