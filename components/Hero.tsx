import { PROFILE, type Locale } from "@/lib/content/schema";
import { getDictionary } from "@/lib/i18n";

export function Hero({ lang }: { lang: Locale }) {
  const t = getDictionary(lang);

  return (
    <section className="pb-4 pt-16 sm:pt-24" aria-labelledby="hero-name">
      <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-full border border-line-strong bg-surface font-mono text-lg font-semibold text-accent">
        {PROFILE.monogram}
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
