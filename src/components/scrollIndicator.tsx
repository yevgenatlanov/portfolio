"use client";

import { useEffect, useState } from "react";

export default function ScrollProgressIndicator() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentSection = document.querySelector("div[id]:not(.hidden)");

      if (currentSection) {
        const sectionHeight = currentSection.clientHeight;
        const scrollPosition = window.scrollY;
        const viewportHeight = window.innerHeight;

        const maxScroll = sectionHeight - viewportHeight;

        if (maxScroll <= 0) {
          setScrollProgress(100);
        } else {
          const progress = Math.min((scrollPosition / maxScroll) * 100, 100);
          setScrollProgress(progress);
        }
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="scroll-progress-container">
      <div
        className="scroll-progress-bar"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />
    </div>
  );
}
