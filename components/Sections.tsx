import {
  AI_CARD_IDS,
  AI_CARD_META,
  CERTIFICATION_IDS,
  CERTIFICATION_META,
  EDUCATION_IDS,
  EDUCATION_META,
  EXPERIENCE_IDS,
  EXPERIENCE_META,
  PROFILE,
  PROJECT_IDS,
  PROJECT_META,
  SKILL_GROUP_IDS,
  SKILL_ITEMS,
  formatPeriod,
  formatYearMonth,
  type Locale,
} from "@/lib/content/schema";
import { getDictionary } from "@/lib/i18n";
import { Email } from "./Email";
import { Section } from "./Section";

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <li className="rounded-full border border-line bg-surface px-3 py-1 font-mono text-xs text-muted">
      {children}
    </li>
  );
}

export function About({ lang, index }: { lang: Locale; index: number }) {
  const t = getDictionary(lang);

  return (
    <Section id="about" index={index} heading={t.about.heading}>
      <div className="space-y-4 text-base leading-relaxed text-fg/90">
        {t.about.body.map((paragraph) => (
          <p key={paragraph.slice(0, 24)}>{paragraph}</p>
        ))}
      </div>

      <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-2 border-t border-line pt-6">
        <dt className="sr-only">{t.about.languagesLabel}</dt>
        {t.about.languages.map((language) => (
          <dd key={language.name} className="font-mono text-xs text-muted">
            <span className="text-fg/80">{language.name}</span> · {language.level}
          </dd>
        ))}
      </dl>
    </Section>
  );
}

export function Skills({ lang, index }: { lang: Locale; index: number }) {
  const t = getDictionary(lang);

  return (
    <Section id="skills" index={index} heading={t.skills.heading}>
      <div className="space-y-7">
        {SKILL_GROUP_IDS.map((group) => (
          <div key={group}>
            <h3 className="mb-3 font-mono text-xs uppercase tracking-wider text-fg/70">
              {t.skills.groups[group]}
            </h3>
            <ul className="flex flex-wrap gap-2">
              {SKILL_ITEMS[group].map((item) => (
                <Chip key={item}>{item}</Chip>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function Experience({ lang, index }: { lang: Locale; index: number }) {
  const t = getDictionary(lang);

  return (
    <Section id="experience" index={index} heading={t.experience.heading}>
      <ol className="relative space-y-12 border-l border-line pl-6" data-testid="experience-list">
        {EXPERIENCE_IDS.map((id) => {
          const meta = EXPERIENCE_META[id];
          const item = t.experience.items[id];

          return (
            <li key={id} className="relative">
              <span
                aria-hidden
                className="absolute -left-[1.8125rem] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-accent bg-bg"
              />
              <p className="font-mono text-xs text-muted">
                {formatPeriod(meta.start, meta.end, lang, t.common.present)}
              </p>
              <h3 className="mt-1.5 text-lg font-medium text-fg">
                {item.role}
                <span className="text-muted"> · {meta.company}</span>
              </h3>
              {item.kind && (
                <p className="mt-1 font-mono text-xs uppercase tracking-wider text-accent-dim">
                  {item.kind}
                </p>
              )}

              <ul className="mt-4 space-y-2.5">
                {item.bullets.map((bullet) => (
                  <li key={bullet.slice(0, 24)} className="flex gap-3 text-sm leading-relaxed text-muted">
                    <span aria-hidden className="mt-2 h-px w-3 shrink-0 bg-line-strong" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              <ul className="mt-5 flex flex-wrap gap-2">
                {meta.tags.map((tag) => (
                  <Chip key={tag}>{tag}</Chip>
                ))}
              </ul>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}

export function Education({ lang, index }: { lang: Locale; index: number }) {
  const t = getDictionary(lang);

  return (
    <Section id="education" index={index} heading={t.education.heading}>
      <ul className="space-y-8" data-testid="education-list">
        {EDUCATION_IDS.map((id) => {
          const meta = EDUCATION_META[id];
          const item = t.education.items[id];

          return (
            <li key={id}>
              <p className="font-mono text-xs text-muted">
                {meta.start} – {meta.end}
              </p>
              <h3 className="mt-1.5 text-lg font-medium text-fg">
                {item.title}
                <span className="text-muted"> · {meta.institution}</span>
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.detail}</p>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}

export function Certifications({ lang, index }: { lang: Locale; index: number }) {
  const t = getDictionary(lang);
  const completed = CERTIFICATION_IDS.filter(
    (id) => CERTIFICATION_META[id].status === "completed",
  );
  const inProgress = CERTIFICATION_IDS.filter(
    (id) => CERTIFICATION_META[id].status === "in-progress",
  );

  return (
    <Section id="certifications" index={index} heading={t.certifications.heading}>
      <ul className="space-y-3" data-testid="certifications-list">
        {[...completed, ...inProgress].map((id) => {
          const meta = CERTIFICATION_META[id];
          const done = meta.status === "completed";

          return (
            <li
              key={id}
              className="flex flex-wrap items-center gap-x-3 gap-y-1.5 rounded-lg border border-line bg-surface px-4 py-3"
            >
              <span
                className={
                  done
                    ? "rounded-full bg-accent px-2 py-0.5 font-mono text-[0.625rem] uppercase tracking-wider text-racing"
                    : "rounded-full border border-line-strong px-2 py-0.5 font-mono text-[0.625rem] uppercase tracking-wider text-muted"
                }
              >
                {done ? t.certifications.completedLabel : t.certifications.inProgressLabel}
              </span>
              <span className="text-sm text-fg">{meta.title}</span>
              <span className="ml-auto font-mono text-xs text-muted">
                {meta.issuer}
                {meta.date ? ` · ${formatYearMonth(meta.date, lang)}` : ""}
              </span>
            </li>
          );
        })}
      </ul>

      <p className="mt-5 text-xs leading-relaxed text-muted">{t.certifications.note}</p>
    </Section>
  );
}

export function AiWorkflow({ lang, index }: { lang: Locale; index: number }) {
  const t = getDictionary(lang);

  return (
    <Section id="ai" index={index} heading={t.ai.heading}>
      <p className="max-w-xl text-base leading-relaxed text-fg/90">{t.ai.intro}</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {AI_CARD_IDS.map((id) => (
          <article key={id} className="rounded-lg border border-line bg-surface p-5">
            <h3 className="text-base font-medium text-fg">{t.ai.cards[id].title}</h3>
            <ul className="mt-2.5 flex flex-wrap gap-2">
              {AI_CARD_META[id].tools.map((tool) => (
                <li key={tool} className="font-mono text-xs text-accent">
                  {tool}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm leading-relaxed text-muted">{t.ai.cards[id].body}</p>
          </article>
        ))}
      </div>

      <p className="mt-6 border-l-2 border-accent-dim pl-5 text-sm leading-relaxed text-muted">
        {t.ai.closing}
      </p>
    </Section>
  );
}

export function Projects({ lang, index }: { lang: Locale; index: number }) {
  const t = getDictionary(lang);

  return (
    <Section id="projects" index={index} heading={t.projects.heading}>
      <div className="space-y-4" data-testid="projects-list">
        {PROJECT_IDS.map((id) => {
          const meta = PROJECT_META[id];
          const item = t.projects.items[id];

          return (
            <article key={id} className="rounded-lg border border-line bg-surface p-5">
              <h3 className="text-base font-medium text-fg">{item.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted">{item.body}</p>

              <ul className="mt-4 flex flex-wrap gap-2">
                {meta.stack.map((tech) => (
                  <Chip key={tech}>{tech}</Chip>
                ))}
              </ul>

              {(meta.url || meta.repo) && (
                <div className="mt-5 flex flex-wrap gap-4">
                  {meta.url && (
                    <a
                      href={meta.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs text-accent hover:underline"
                    >
                      {t.projects.viewLive} ↗
                    </a>
                  )}
                  {meta.repo && (
                    <a
                      href={meta.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs text-accent hover:underline"
                    >
                      {t.projects.viewRepo} ↗
                    </a>
                  )}
                </div>
              )}
            </article>
          );
        })}
      </div>
    </Section>
  );
}

export function Contact({ lang, index }: { lang: Locale; index: number }) {
  const t = getDictionary(lang);

  return (
    <Section id="contact" index={index} heading={t.contact.heading}>
      <p className="max-w-xl text-lg leading-relaxed text-fg/90">{t.contact.body}</p>

      <dl className="mt-8 space-y-4">
        <div className="flex flex-wrap items-baseline gap-x-4">
          <dt className="w-20 font-mono text-xs uppercase tracking-wider text-muted">
            {t.contact.emailLabel}
          </dt>
          <dd>
            <Email className="text-sm text-accent hover:underline" />
          </dd>
        </div>
        <div className="flex flex-wrap items-baseline gap-x-4">
          <dt className="w-20 font-mono text-xs uppercase tracking-wider text-muted">
            {t.contact.linkedinLabel}
          </dt>
          <dd>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-accent hover:underline"
            >
              {PROFILE.linkedinLabel} ↗
            </a>
          </dd>
        </div>
        <div className="flex flex-wrap items-baseline gap-x-4">
          <dt className="w-20 font-mono text-xs uppercase tracking-wider text-muted">GitHub</dt>
          <dd>
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-accent hover:underline"
            >
              {PROFILE.githubLabel} ↗
            </a>
          </dd>
        </div>
        <div className="flex flex-wrap items-baseline gap-x-4">
          <dt className="w-20 font-mono text-xs uppercase tracking-wider text-muted">CV</dt>
          <dd>
            <a
              href={`/cv-${lang}.pdf`}
              download
              className="text-sm text-accent hover:underline"
            >
              {t.common.downloadCv} (PDF)
            </a>
          </dd>
        </div>
      </dl>

      <p className="mt-8 border-t border-line pt-6 text-xs text-muted">{t.contact.references}</p>
    </Section>
  );
}
