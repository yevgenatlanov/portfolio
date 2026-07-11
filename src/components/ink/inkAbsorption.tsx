"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const FOCUS_DELAY_MS = 3000;

type InkState = "balanced" | "light" | "dark";

export function InkAbsorptionEffect({ children }: { children: React.ReactNode }) {
  const [inkState, setInkState] = useState<InkState>("balanced");
  const [hoveredSide, setHoveredSide] = useState<"light" | "dark" | null>(null);
  const [progress, setProgress] = useState(0);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  const isTouch = useSyncExternalStore(
    (callback) => {
      const mq = window.matchMedia("(pointer: coarse)");
      mq.addEventListener("change", callback);
      return () => mq.removeEventListener("change", callback);
    },
    () => window.matchMedia("(pointer: coarse)").matches,
    () => false
  );

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const clearFocus = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    timerRef.current = null;
    rafRef.current = null;
    startTimeRef.current = null;
    setHoveredSide(null);
    setProgress(0);
  };

  useEffect(() => {
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const side = e.clientX < rect.left + rect.width / 2 ? "light" : "dark";
      setCursor({ x: e.clientX, y: e.clientY });

      // Пока идёт поглощение, игнорируем движение до ухода курсора.
      if (inkState !== "balanced" && inkState !== side) return;

      if (hoveredSide === side && timerRef.current) {
        return;
      }

      clearFocus();
      setHoveredSide(side);
      startTimeRef.current = performance.now();

      const tick = (now: number) => {
        if (!startTimeRef.current) return;
        const elapsed = now - startTimeRef.current;
        const nextProgress = Math.min(elapsed / FOCUS_DELAY_MS, 1);
        setProgress(nextProgress);

        if (nextProgress < 1) {
          rafRef.current = requestAnimationFrame(tick);
        }
      };

      timerRef.current = setTimeout(() => {
        setInkState(side);
        clearFocus();
      }, FOCUS_DELAY_MS);

      rafRef.current = requestAnimationFrame(tick);
    };

    const handleMouseLeave = () => {
      setInkState("balanced");
      clearFocus();
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [hoveredSide, inkState, isTouch]);

  const showIndicator = hoveredSide && inkState === "balanced";

  if (isTouch) {
    return <>{children}</>;
  }

  return (
    <div ref={containerRef} className={`ink-absorption ink-state-${inkState}`}>
      {children}

      <div
        className="ink-cursor"
        style={{
          left: cursor.x,
          top: cursor.y,
          opacity: showIndicator ? 1 : 0,
        }}
        aria-hidden="true"
      >
        <svg viewBox="0 0 40 40" className="ink-cursor-svg">
          <circle
            className="ink-cursor-track"
            cx="20"
            cy="20"
            r="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <circle
            className="ink-cursor-progress"
            cx="20"
            cy="20"
            r="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray={113}
            strokeDashoffset={113 - 113 * progress}
            transform="rotate(-90 20 20)"
          />
        </svg>
      </div>
    </div>
  );
}
