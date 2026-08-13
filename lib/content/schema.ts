/**
 * Language-invariant data + the ids that both locales must cover.
 *
 * Anything that is not a translatable string lives here exactly once: dates,
 * company names, URLs, tool names. The per-locale files (`es.ts`, `en.ts`) are
 * keyed by these ids, so a missing entry in either language is a type error
 * rather than a page that quietly renders half-empty in one locale.
 */

export const LOCALES = ["es", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "es";

export const SECTION_IDS = [
  "about",
  "skills",
  "experience",
  "education",
  "certifications",
  "ai",
  "projects",
  "contact",
] as const;
export type SectionId = (typeof SECTION_IDS)[number];

/**
 * The nav links to a subset. The page is a single scroll, so listing all eight
 * sections is noise — and at this column width they simply don't fit on one line.
 */
export const NAV_SECTION_IDS = ["experience", "ai", "projects", "contact"] as const;

/* ------------------------------------------------------------------ profile */

export const PROFILE = {
  name: "Fernando Mosqueira",
  monogram: "FM",
  /** Split so the address never appears as a contiguous string in the HTML. */
  emailUser: "fhermosqueira",
  emailDomain: "gmail.com",
  linkedin: "https://www.linkedin.com/in/fer-mosqueira/",
  linkedinLabel: "linkedin.com/in/fer-mosqueira",
  github: "https://github.com/fermosqueira",
  githubLabel: "github.com/fermosqueira",
  site: "https://fermosqueira.vercel.app",
} as const;

/* --------------------------------------------------------------------- dates */

/** `YYYY-MM`, or `null` for "still going". */
export type YearMonth = `${number}-${number}` | string;

const MONTHS: Record<Locale, string[]> = {
  es: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
};

export function formatYearMonth(value: YearMonth, locale: Locale): string {
  const [year, month] = value.split("-");
  return `${MONTHS[locale][Number(month) - 1]} ${year}`;
}

export function formatPeriod(
  start: YearMonth,
  end: YearMonth | null,
  locale: Locale,
  presentLabel: string,
): string {
  return `${formatYearMonth(start, locale)} – ${end ? formatYearMonth(end, locale) : presentLabel}`;
}

/* ---------------------------------------------------------------- experience */

export const EXPERIENCE_IDS = ["iconext", "naif"] as const;
export type ExperienceId = (typeof EXPERIENCE_IDS)[number];

export const EXPERIENCE_META: Record<
  ExperienceId,
  { company: string; start: YearMonth; end: YearMonth | null; tags: readonly string[] }
> = {
  iconext: {
    company: "ICONEXT",
    start: "2024-08",
    end: null,
    tags: ["Playwright", "TypeScript", "Postman", "Swagger", "Trello", "Agile"],
  },
  naif: {
    company: "NAIF",
    start: "2021-09",
    end: "2026-05",
    tags: ["KPIs", "ERP", "Process control", "Continuous improvement"],
  },
};

/* ----------------------------------------------------------------- education */

export const EDUCATION_IDS = ["untref", "gcba"] as const;
export type EducationId = (typeof EDUCATION_IDS)[number];

export const EDUCATION_META: Record<
  EducationId,
  { institution: string; start: string; end: string }
> = {
  untref: { institution: "UNTREF", start: "2024", end: "2025" },
  gcba: { institution: "GCBA", start: "2018", end: "2019" },
};

/* ------------------------------------------------------------ certifications */

export const CERTIFICATION_IDS = [
  "claude-code-101",
  "ai-fluency",
  "claude-code-in-action",
  "agent-skills",
  "subagents",
  "claude-api",
] as const;
export type CertificationId = (typeof CERTIFICATION_IDS)[number];

export type CertificationStatus = "completed" | "in-progress";

/**
 * Course titles are Anthropic's own product names and stay in English in both
 * locales. Flipping one to `completed` is a one-word change here — the website
 * badge and both CVs pick it up on the next build.
 */
export const CERTIFICATION_META: Record<
  CertificationId,
  { title: string; issuer: string; status: CertificationStatus; date: YearMonth | null }
> = {
  "claude-code-101": {
    title: "Claude Code 101",
    issuer: "Anthropic Academy",
    status: "completed",
    date: "2026-08",
  },
  "ai-fluency": {
    title: "AI Fluency: Framework & Foundations",
    issuer: "Anthropic Academy",
    status: "in-progress",
    date: null,
  },
  "claude-code-in-action": {
    title: "Claude Code in Action",
    issuer: "Anthropic Academy",
    status: "in-progress",
    date: null,
  },
  "agent-skills": {
    title: "Introduction to Agent Skills",
    issuer: "Anthropic Academy",
    status: "in-progress",
    date: null,
  },
  subagents: {
    title: "Introduction to Subagents",
    issuer: "Anthropic Academy",
    status: "in-progress",
    date: null,
  },
  "claude-api": {
    title: "Building with the Claude API",
    issuer: "Anthropic Academy",
    status: "in-progress",
    date: null,
  },
};

/* ---------------------------------------------------------------- references */

export const REFERENCE_IDS = ["magnolfi", "dorrego"] as const;
export type ReferenceId = (typeof REFERENCE_IDS)[number];

/**
 * Only rendered into the generated PDFs — the website still says "available on
 * request". Both people gave Fernando permission to publish their details.
 */
export const REFERENCE_META: Record<
  ReferenceId,
  { name: string; company: string; email: string; phone: string }
> = {
  magnolfi: {
    name: "Gabriela Magnolfi",
    company: "NAIF",
    email: "naifoficinas@gmail.com",
    phone: "+54 9 11 5347-6283",
  },
  dorrego: {
    name: "Federico Dorrego",
    company: "ICONEXT",
    email: "dorrego.fede@gmail.com",
    phone: "+54 9 11 6966-3133",
  },
};

/* -------------------------------------------------------------------- skills */

export const SKILL_GROUP_IDS = ["testing", "tools", "methods"] as const;
export type SkillGroupId = (typeof SKILL_GROUP_IDS)[number];

/** Industry terms both CVs already keep in English. */
export const SKILL_ITEMS: Record<SkillGroupId, readonly string[]> = {
  testing: [
    "Functional Testing",
    "API Testing",
    "Regression Testing",
    "Performance Testing",
    "UX/UI Testing",
    "Automated Testing",
  ],
  tools: ["Playwright", "TypeScript", "Postman", "Swagger", "GitHub", "Trello"],
  methods: ["Agile/Scrum", "Bug Tracking", "Test Case Design", "AI-Driven Testing"],
};

/* --------------------------------------------------------------- ai workflow */

export const AI_CARD_IDS = ["design", "editor", "build"] as const;
export type AiCardId = (typeof AI_CARD_IDS)[number];

export const AI_CARD_META: Record<AiCardId, { tools: readonly string[] }> = {
  design: { tools: ["ChatGPT"] },
  editor: { tools: ["GitHub Copilot", "Cursor"] },
  build: { tools: ["Claude Code"] },
};

/* ------------------------------------------------------------------ projects */

export const PROJECT_IDS = ["e2e", "api", "aplicador", "site"] as const;
export type ProjectId = (typeof PROJECT_IDS)[number];

export const PROJECT_META: Record<
  ProjectId,
  { stack: readonly string[]; url: string | null; repo: string | null }
> = {
  e2e: {
    stack: ["Playwright", "TypeScript", "Page Object Model", "GitHub Actions"],
    url: null,
    repo: `${PROFILE.github}/PlaywrightTestAutomation`,
  },
  api: {
    stack: ["Playwright", "TypeScript", "REST", "GitHub Actions"],
    url: null,
    repo: `${PROFILE.github}/PlaywrightApiTestAutomation`,
  },
  aplicador: {
    stack: ["Python", "SQLite", "Chrome Extension MV3", "SMTP/IMAP", "GitHub Actions"],
    url: null,
    repo: `${PROFILE.github}/aplicator`,
  },
  site: {
    stack: ["Next.js", "TypeScript", "Tailwind", "Playwright", "GitHub Actions"],
    url: PROFILE.site,
    // TODO: completar cuando el repo de este sitio sea público.
    repo: null,
  },
};
