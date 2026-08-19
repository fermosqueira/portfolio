import type { SectionId } from "@/lib/content/schema";
import { Reveal } from "./Reveal";

/**
 * One numbered section, prefixed with the same ✓ used on a passing test and
 * on a completed certification — the whole page reads as one status system
 * rather than three unrelated decorations.
 */
export function Section({
  id,
  index,
  heading,
  children,
}: {
  id: SectionId;
  index: number;
  heading: string;
  children: React.ReactNode;
}) {
  return (
    // No scroll-margin here: html's scroll-padding-top owns the anchor offset.
    <section id={id} aria-labelledby={`${id}-heading`} className="py-14 sm:py-20">
      <Reveal>
        <div className="mb-8 flex items-baseline gap-3">
          <span
            aria-hidden
            className="inline-flex items-center gap-1.5 font-mono text-xs tracking-widest text-accent"
          >
            <span className="text-[0.85em]">✓</span>
            {String(index).padStart(2, "0")}
          </span>
          <h2
            id={`${id}-heading`}
            className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-muted"
          >
            {heading}
          </h2>
          <span aria-hidden className="h-px flex-1 bg-line" />
        </div>
        {children}
      </Reveal>
    </section>
  );
}
