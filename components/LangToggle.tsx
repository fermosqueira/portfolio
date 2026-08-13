"use client";

import { useRouter } from "next/navigation";
import type { Locale } from "@/lib/content/schema";
import { otherLocale } from "@/lib/i18n";

/**
 * Switches locale while keeping the reader where they were: the current hash
 * rides along, so someone reading Experience in Spanish lands on Experience in
 * English rather than back at the top.
 */
export function LangToggle({
  lang,
  label,
  ariaLabel,
}: {
  lang: Locale;
  label: string;
  ariaLabel: string;
}) {
  const router = useRouter();
  const target = otherLocale(lang);

  return (
    <button
      type="button"
      lang={target}
      aria-label={ariaLabel}
      data-testid="lang-toggle"
      onClick={() => router.push(`/${target}${window.location.hash}`)}
      className="whitespace-nowrap rounded-full border border-line px-3 py-1.5 font-mono text-xs text-muted transition-colors hover:border-accent-dim hover:text-accent"
    >
      {label}
    </button>
  );
}
