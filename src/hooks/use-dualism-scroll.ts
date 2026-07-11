"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface UseDualismScrollReturn {
  leftRef: React.RefObject<HTMLDivElement | null>;
  rightRef: React.RefObject<HTMLDivElement | null>;
  progress: number;
  scrollHintVisible: boolean;
  scrollToIndex: (index: number) => void;
}

export function useDualismScroll(sectionCount: number): UseDualismScrollReturn {
  const leftRef = useRef<HTMLDivElement | null>(null);
  const rightRef = useRef<HTMLDivElement | null>(null);
  const spacerRef = useRef<HTMLDivElement | null>(null);

  const maxScrollRef = useRef(0);
  const [isMobile, setIsMobile] = useState(false);

  /* Build a scroll-track spacer so the document has the same length as the
     panel content. Each spacer section is sized to match its panel section,
     which lets scroll-snap and programmatic navigation land exactly on a screen. */
  const createSpacer = useCallback(() => {
    if (typeof document === "undefined" || spacerRef.current || sectionCount <= 0) {
      return;
    }

    const wrapper = document.createElement("div");
    wrapper.setAttribute("aria-hidden", "true");
    wrapper.style.position = "relative";
    wrapper.style.width = "100%";
    wrapper.style.pointerEvents = "none";
    wrapper.style.zIndex = "-1";

    for (let i = 0; i < sectionCount; i++) {
      const section = document.createElement("div");
      section.className = "dual-spacer-section";
      wrapper.appendChild(section);
    }

    document.body.appendChild(wrapper);
    spacerRef.current = wrapper;
  }, [sectionCount]);

  const removeSpacer = useCallback(() => {
    if (spacerRef.current && spacerRef.current.parentNode) {
      spacerRef.current.parentNode.removeChild(spacerRef.current);
      spacerRef.current = null;
    }
  }, []);

  const updateSpacerHeights = useCallback(() => {
    if (!leftRef.current || !spacerRef.current) return;

    const sections = Array.from(leftRef.current.children) as HTMLElement[];
    const spacers = Array.from(spacerRef.current.children) as HTMLElement[];

    sections.forEach((sect, i) => {
      const spacer = spacers[i];
      if (!spacer) return;
      spacer.style.height = `${sect.offsetHeight}px`;
    });
  }, []);

  const applyTransforms = useCallback(() => {
    if (isMobile) return;

    const y = window.scrollY;

    if (leftRef.current) {
      leftRef.current.style.transform = `translateY(${-y}px)`;
    }
    if (rightRef.current) {
      // The right panel content is reversed and anchored to the bottom, so it
      // moves down as the user scrolls down, keeping the same section in view.
      rightRef.current.style.transform = `translateY(${y}px)`;
    }
  }, [isMobile]);

  const recalc = useCallback(() => {
    if (isMobile || sectionCount <= 0) {
      maxScrollRef.current = 0;
      if (leftRef.current) leftRef.current.style.transform = "";
      if (rightRef.current) rightRef.current.style.transform = "";
      if (spacerRef.current) spacerRef.current.style.height = "0px";
      return;
    }

    if (leftRef.current && spacerRef.current) {
      updateSpacerHeights();

      const contentHeight = leftRef.current.scrollHeight;
      maxScrollRef.current = Math.max(0, contentHeight - window.innerHeight);

      spacerRef.current.style.height = `${contentHeight}px`;
      applyTransforms();
    }
  }, [isMobile, sectionCount, updateSpacerHeights, applyTransforms]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const updateViewportMode = (event?: MediaQueryListEvent) => {
      setIsMobile(event ? event.matches : mediaQuery.matches);
    };

    updateViewportMode();
    mediaQuery.addEventListener("change", updateViewportMode);

    return () => mediaQuery.removeEventListener("change", updateViewportMode);
  }, []);

  useEffect(() => {
    if (isMobile) {
      removeSpacer();
      return;
    }

    createSpacer();
    recalc();

    const handleResize = () => recalc();
    const handleLoad = () => recalc();

    window.addEventListener("resize", handleResize);
    window.addEventListener("load", handleLoad);
    if (document.fonts) {
      document.fonts.ready.then(recalc);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("load", handleLoad);
      removeSpacer();
    };
  }, [isMobile, createSpacer, removeSpacer, recalc]);

  useEffect(() => {
    if (isMobile) return;

    const handleScroll = () => applyTransforms();

    window.addEventListener("scroll", handleScroll, { passive: true });
    applyTransforms();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile, applyTransforms]);

  const scrollToIndex = useCallback(
    (index: number) => {
      if (typeof window === "undefined" || isMobile) return;

      const clamped = Math.max(0, Math.min(index, sectionCount - 1));
      const section = spacerRef.current?.children[clamped] as HTMLElement | undefined;

      if (!section) return;

      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({
        top: section.offsetTop,
        behavior: prefersReduced ? "auto" : "smooth",
      });
    },
    [isMobile, sectionCount]
  );

  /* Wheel-driven one-section-at-a-time navigation.
     - Respects nested scrollable areas (e.g. interactive terminal):
       lets them scroll internally until a boundary is reached.
     - Locks during the smooth animation so a single wheel gesture or
       trackpad momentum advances exactly one screen. */
  useEffect(() => {
    if (typeof window === "undefined" || isMobile || sectionCount <= 0) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lockDuration = prefersReduced ? 120 : 820;
    let locked = false;
    let unlockTimer: number | undefined;

    const getCurrentIndex = () => {
      if (!spacerRef.current) return 0;
      const spacers = Array.from(spacerRef.current.children) as HTMLElement[];
      const y = window.scrollY;
      let idx = 0;
      for (let i = 0; i < spacers.length; i++) {
        if (spacers[i].offsetTop <= y + window.innerHeight * 0.5) idx = i;
      }
      return idx;
    };

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 8) return;

      // Walk up from the target to find a nested scrollable ancestor.
      // Allow it to scroll internally until it hits the boundary in the
      // wheel direction; only then do we take over and advance a section.
      let node = e.target as HTMLElement | null;
      while (node && node !== document.body && node !== document.documentElement) {
        const cs = getComputedStyle(node);
        const scrollable =
          (cs.overflowY === "auto" || cs.overflowY === "scroll") &&
          node.scrollHeight - node.clientHeight > 1;
        if (scrollable) {
          const atTop = node.scrollTop <= 0;
          const atBottom = node.scrollTop + node.clientHeight >= node.scrollHeight - 1;
          const goingDown = e.deltaY > 0;
          const goingUp = e.deltaY < 0;
          if ((goingDown && !atBottom) || (goingUp && !atTop)) return;
          break;
        }
        node = node.parentElement;
      }

      e.preventDefault();
      if (locked) return;

      const current = getCurrentIndex();
      const target = Math.max(0, Math.min(sectionCount - 1, current + (e.deltaY > 0 ? 1 : -1)));
      if (target === current) return;

      locked = true;
      window.clearTimeout(unlockTimer);
      scrollToIndex(target);
      unlockTimer = window.setTimeout(() => {
        locked = false;
      }, lockDuration);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.clearTimeout(unlockTimer);
    };
  }, [isMobile, sectionCount, scrollToIndex]);

  return {
    leftRef,
    rightRef,
    progress: 0,
    scrollHintVisible: false,
    scrollToIndex,
  };
}
