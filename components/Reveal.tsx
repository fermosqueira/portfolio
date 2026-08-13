"use client";

import { useEffect, useRef } from "react";

/**
 * Fades children in as they enter the viewport. The hidden start state lives in
 * globals.css behind `prefers-reduced-motion: no-preference`, and a <noscript>
 * override in the layout keeps everything visible when JS never runs.
 */
export function Reveal({
  children,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "li";
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      node.dataset.reveal = "shown";
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.reveal = "shown";
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    // @ts-expect-error -- ref type narrows per tag, all of which are HTMLElement
    <Tag ref={ref} data-reveal="" className={className}>
      {children}
    </Tag>
  );
}
