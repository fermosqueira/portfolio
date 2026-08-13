import Link from "next/link";
import { NAV_SECTION_IDS, PROFILE, type Locale } from "@/lib/content/schema";
import { getDictionary } from "@/lib/i18n";
import { LangToggle } from "./LangToggle";

/** Sticky, quiet. Section links collapse away on narrow screens. */
export function Nav({ lang }: { lang: Locale }) {
  const t = getDictionary(lang);

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-bg/80 backdrop-blur-md">
      <nav
        aria-label={lang === "es" ? "Navegación principal" : "Main navigation"}
        className="mx-auto flex h-16 max-w-3xl items-center gap-4 px-6"
      >
        <Link
          href={`/${lang}`}
          className="font-mono text-sm font-semibold tracking-tight text-accent"
        >
          {PROFILE.monogram}
        </Link>

        <ul className="hidden flex-1 items-center gap-5 sm:flex">
          {NAV_SECTION_IDS.map((id) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className="whitespace-nowrap font-mono text-xs text-muted transition-colors hover:text-fg"
              >
                {t.nav[id]}
              </a>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-2 sm:ml-0">
          <a
            href={`/cv-${lang}.pdf`}
            download
            data-testid="download-cv"
            className="whitespace-nowrap rounded-full border border-line px-3 py-1.5 font-mono text-xs text-muted transition-colors hover:border-accent-dim hover:text-accent"
          >
            {t.common.downloadCv}
          </a>
          <LangToggle
            lang={lang}
            label={t.common.switchTo}
            ariaLabel={t.common.switchLanguage}
          />
        </div>
      </nav>
    </header>
  );
}
