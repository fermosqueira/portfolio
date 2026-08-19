import { PROFILE, TEST_STATS, type Locale } from "@/lib/content/schema";
import { getDictionary } from "@/lib/i18n";

export function Hero({ lang }: { lang: Locale }) {
  const t = getDictionary(lang);

  return (
    <section className="pb-4 pt-16 sm:pt-24" aria-labelledby="hero-name">
      <div className="relative mb-8 flex h-16 w-16 items-center justify-center rounded-full border border-line-strong bg-surface font-mono text-lg font-semibold text-accent">
        {PROFILE.monogram}
        <span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5">
          <span className="status-pulse absolute inset-0 rounded-full" />
          <span
            className="relative m-auto h-2 w-2 rounded-full bg-accent ring-2 ring-bg"
            role="img"
            aria-label={t.hero.available}
          />
        </span>
      </div>

      <h1 id="hero-name" className="text-4xl font-semibold tracking-tight sm:text-5xl">
        {PROFILE.name}
      </h1>

      <p className="mt-3 font-mono text-sm uppercase tracking-[0.2em] text-accent">
        {t.hero.role}
      </p>

      <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{t.hero.tagline}</p>

      <ul className="mt-8 flex flex-wrap gap-2">
        {t.hero.chips.map((chip) => (
          <li
            key={chip}
            className="rounded-full border border-line bg-surface px-3 py-1 font-mono text-xs text-muted"
          >
            {chip}
          </li>
        ))}
      </ul>

      {/*
        Not decoration: TEST_STATS is a real, CI-verified count of the suite
        that covers this page (see lib/content/schema.ts). "passed" / "failed"
        are left untranslated on purpose — that's Playwright's own reporter
        vocabulary, not site chrome, and it reads the same in any language.
      */}
      <div className="mt-8 inline-flex flex-col gap-1.5 rounded-lg border border-line bg-surface px-4 py-3 font-mono text-xs">
        <div className="flex items-center gap-2 text-muted">
          <span aria-hidden className="text-accent">
            $
          </span>
          <span>npx playwright test</span>
        </div>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="inline-flex items-center gap-1.5 font-medium text-accent">
            <span aria-hidden>✓</span>
            {TEST_STATS.passed} passed
          </span>
          <span aria-hidden className="text-line-strong">
            ·
          </span>
          <span className="text-muted">0 failed</span>
          <span aria-hidden className="text-line-strong">
            ·
          </span>
          <span className="text-muted">ES/EN parity</span>
          <span aria-hidden className="caret-blink ml-0.5 inline-block h-3 w-[6px] bg-accent" />
        </div>
      </div>
      <p className="mt-2 max-w-xs font-mono text-[0.6875rem] leading-relaxed text-muted">
        {t.hero.statCaption}
      </p>

      <div className="mt-10 flex flex-wrap items-center gap-3">
        <a
          href="#contact"
          className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-racing transition-opacity hover:opacity-90"
        >
          {t.hero.ctaContact}
        </a>
        <a
          href={PROFILE.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-line px-5 py-2.5 text-sm text-muted transition-colors hover:border-accent-dim hover:text-accent"
        >
          {t.hero.ctaLinkedin}
        </a>
      </div>
    </section>
  );
}
