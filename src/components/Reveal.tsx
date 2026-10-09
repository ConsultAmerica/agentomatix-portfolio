"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Fades + lifts its children in the first time they scroll into view.
 * Content is visible without JS and for reduced-motion users.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article";
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Drive the attribute directly; no React state needed for a one-shot effect.
    const show = () => node.setAttribute("data-reveal", "shown");
    const rect = node.getBoundingClientRect();
    node.setAttribute("data-reveal", "hidden");
    if (rect.top < window.innerHeight * 0.92) {
      // setTimeout, not rAF: rAF never fires in background tabs.
      const timer = window.setTimeout(show, 40);
      return () => window.clearTimeout(timer);
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          show();
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={(node: HTMLElement | null) => {
        ref.current = node;
      }}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={className}
    >
      {children}
    </Tag>
  );
}
