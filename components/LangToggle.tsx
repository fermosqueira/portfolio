"use client";

import { useRouter } from "next/navigation";
import { LOCALES, type Locale } from "@/lib/content/schema";

const LABELS: Record<Locale, string> = { es: "ES", en: "EN" };

/**
 * Both languages are always visible with the current one marked, rather than a
 * single button naming the other language — "English" reads equally well as
 * "you are here" and "go here", and the reader shouldn't have to guess.
 *
 * Switching keeps the reader in place: the current hash rides along, so someone
 * reading Experience in Spanish lands on Experience in English.
 */
export function LangToggle({ lang, groupLabel }: { lang: Locale; groupLabel: string }) {
  const router = useRouter();

  return (
    <div
      role="group"
      aria-label={groupLabel}
      className="flex items-center gap-0.5 rounded-full border border-line p-0.5"
    >
      {LOCALES.map((locale) => {
        const active = locale === lang;

        return (
          <button
            key={locale}
            type="button"
            lang={locale}
            aria-current={active ? "true" : undefined}
            data-testid={active ? "lang-current" : "lang-toggle"}
            onClick={() => {
              if (!active) router.push(`/${locale}${window.location.hash}`);
            }}
            className={
              active
                ? "rounded-full bg-accent px-2.5 py-1 font-mono text-xs font-medium text-racing"
                : "rounded-full px-2.5 py-1 font-mono text-xs text-muted transition-colors hover:text-accent"
            }
          >
            {LABELS[locale]}
          </button>
        );
      })}
    </div>
  );
}
