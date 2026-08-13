import type {
  AiCardId,
  EducationId,
  ExperienceId,
  ProjectId,
  SectionId,
  SkillGroupId,
} from "./schema";

/**
 * The bilingual contract. `es.ts` and `en.ts` both `satisfies Content`, so any
 * key one language has and the other lacks fails `tsc` before it can ship as a
 * half-translated page or a CV that drifts from its counterpart.
 */
export interface Content {
  meta: {
    title: string;
    description: string;
    /** Shown by screen readers and search engines for the OG card. */
    ogAlt: string;
  };

  nav: Record<SectionId, string>;

  common: {
    present: string;
    downloadCv: string;
    /** Accessible label for the language switch group. */
    switchLanguage: string;
    skipToContent: string;
  };

  hero: {
    role: string;
    tagline: string;
    chips: readonly string[];
    ctaContact: string;
    ctaLinkedin: string;
  };

  about: {
    heading: string;
    /** Two or three short paragraphs, first person, no corporate filler. */
    body: readonly string[];
    languagesLabel: string;
    languages: readonly { name: string; level: string }[];
  };

  skills: {
    heading: string;
    groups: Record<SkillGroupId, string>;
  };

  experience: {
    heading: string;
    items: Record<ExperienceId, { role: string; kind: string | null; bullets: readonly string[] }>;
  };

  education: {
    heading: string;
    items: Record<EducationId, { title: string; detail: string }>;
  };

  certifications: {
    heading: string;
    completedLabel: string;
    inProgressLabel: string;
    /** One line explaining that in-progress means exactly that. */
    note: string;
  };

  ai: {
    heading: string;
    intro: string;
    cards: Record<AiCardId, { title: string; body: string }>;
    /** The typed-content quality gate, described for a non-technical reader. */
    closing: string;
  };

  projects: {
    heading: string;
    items: Record<ProjectId, { title: string; body: string }>;
    viewLive: string;
    viewRepo: string;
  };

  contact: {
    heading: string;
    body: string;
    emailLabel: string;
    linkedinLabel: string;
    references: string;
  };

  footer: {
    builtWith: string;
    rights: string;
  };

  /**
   * Headings for the generated PDF. The CV reuses the site's facts verbatim —
   * dates, bullets, skills, certifications — and only names its sections
   * differently, the way a CV conventionally does.
   */
  cv: {
    summaryHeading: string;
    skillsHeading: string;
    experienceHeading: string;
    educationHeading: string;
    certificationsHeading: string;
    languagesHeading: string;
    referencesHeading: string;
    inProgressPrefix: string;
  };
}
