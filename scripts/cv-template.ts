import {
  CERTIFICATION_META,
  EDUCATION_IDS,
  EDUCATION_META,
  EXPERIENCE_IDS,
  EXPERIENCE_META,
  PROFILE,
  REFERENCE_IDS,
  REFERENCE_META,
  SKILL_GROUP_IDS,
  SKILL_ITEMS,
  formatPeriod,
  formatYearMonth,
  type Locale,
} from "../lib/content/schema";
import { getDictionary } from "../lib/i18n";

/**
 * Print stylesheet for the CV. Deliberately plain: black on white, real text,
 * no multi-column tricks. Recruiters print these and applicant tracking systems
 * parse them, and both go wrong the moment a CV starts behaving like a poster.
 */
const STYLES = `
  * { margin: 0; padding: 0; box-sizing: border-box; }

  @page { size: A4; margin: 14mm 14mm 12mm; }

  body {
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 9.5pt;
    line-height: 1.28;
    color: #1a1a1a;
    background: #fff;
  }

  h1 {
    font-size: 21pt;
    font-weight: 700;
    letter-spacing: 0.055em;
    text-transform: uppercase;
  }

  .role {
    margin-top: 2px;
    font-size: 11pt;
    font-weight: 500;
    color: #444;
  }

  .contact {
    margin-top: 7px;
    font-size: 8.5pt;
    color: #555;
  }
  .contact a { color: #555; text-decoration: none; }

  h2 {
    margin-top: 9px;
    padding-bottom: 2px;
    border-bottom: 0.9px solid #999;
    font-size: 9pt;
    font-weight: 700;
    letter-spacing: 0.11em;
    text-transform: uppercase;
    color: #111;
  }

  section { margin-top: 3px; }
  p { text-align: justify; }

  .skill-row { margin-top: 4px; display: flex; gap: 8px; align-items: baseline; }
  .skill-label {
    flex: 0 0 128px;
    font-size: 8.5pt;
    font-weight: 700;
    color: #333;
  }
  .skill-items { font-size: 8.9pt; color: #222; }

  .job { margin-top: 5px; }
  .job:first-child { margin-top: 3px; }
  .job-head {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 12px;
  }
  .job-title { font-size: 10pt; font-weight: 700; }
  .job-meta { font-size: 8.5pt; color: #555; white-space: nowrap; }

  ul { margin-top: 3px; padding-left: 13px; }
  li { margin-top: 1.5px; }

  .edu { margin-top: 4px; }
  .edu-title { font-weight: 700; font-size: 9.7pt; }
  .edu-detail { font-size: 8.7pt; color: #444; }

  .cert { margin-top: 3px; font-size: 9pt; }
  .cert-meta { color: #555; font-size: 8.5pt; }
  .cert-detail { font-size: 8.9pt; color: #444; }

  .inline { margin-top: 6px; font-size: 9pt; }
  .muted { color: #555; }

  .refs { margin-top: 6px; display: flex; gap: 26px; }
  .ref { flex: 1 1 0; font-size: 8.9pt; }
  .ref-name { font-weight: 700; }
  .ref-contact { color: #555; }
`;

const escape = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export function renderCv(locale: Locale): string {
  const t = getDictionary(locale);

  // The public PDF carries the same channels as the site: no phone, no address.
  //
  // Rendered as real anchors, not plain text: Playwright keeps <a href> as clickable
  // annotations in the generated PDF, so a recruiter can reach the portfolio from the
  // attachment itself — which is the copy that gets forwarded internally and reopened
  // weeks later, when the original email is long gone.
  const contact = [
    [`mailto:${PROFILE.emailUser}@${PROFILE.emailDomain}`, `${PROFILE.emailUser}@${PROFILE.emailDomain}`],
    [PROFILE.linkedin, PROFILE.linkedinLabel],
    [PROFILE.github, PROFILE.githubLabel],
    [PROFILE.site, PROFILE.siteLabel],
  ]
    .map(([href, label]) => `<a href="${escape(href)}">${escape(label)}</a>`)
    .join("  |  ");

  const skills = SKILL_GROUP_IDS.map(
    (group) => `
      <div class="skill-row">
        <div class="skill-label">${escape(t.skills.groups[group])}</div>
        <div class="skill-items">${SKILL_ITEMS[group].map(escape).join(" · ")}</div>
      </div>`,
  ).join("");

  const experience = EXPERIENCE_IDS.map((id) => {
    const meta = EXPERIENCE_META[id];
    const item = t.experience.items[id];
    const period = formatPeriod(meta.start, meta.end, locale, t.common.present);
    const kind = item.kind ? ` (${item.kind.toLowerCase()})` : "";

    return `
      <div class="job">
        <div class="job-head">
          <span class="job-title">${escape(item.role)}</span>
          <span class="job-meta">${escape(meta.company)} | ${escape(period)}${escape(kind)}</span>
        </div>
        <ul>${item.bullets.map((b) => `<li>${escape(b)}</li>`).join("")}</ul>
      </div>`;
  }).join("");

  const education = EDUCATION_IDS.map((id) => {
    const meta = EDUCATION_META[id];
    const item = t.education.items[id];

    return `
      <div class="edu">
        <div class="edu-title">
          ${escape(item.title)} — ${escape(meta.institution)} (${meta.start}–${meta.end})
        </div>
        <div class="edu-detail">${escape(item.detail)}</div>
      </div>`;
  }).join("");

  // Curated for the CV specifically — not a generic loop over CERTIFICATION_IDS
  // like the website's Certifications section. Playwright 101 leads (the one
  // directly relevant to a QA role); the Anthropic Academy micro-courses are
  // grouped into one line so they don't outweigh it. In-progress courses are
  // omitted here — the website still shows those with its own "en curso" badge.
  // One-line descriptions are grounded in real, verifiable course content:
  // Playwright 101's from its official syllabus (testmuai.com), the Anthropic
  // line from what those four courses actually cover.
  const pw = CERTIFICATION_META["playwright-101"];
  const pwDate = pw.date ? ` (${formatYearMonth(pw.date, locale)})` : "";
  const pwDetail =
    locale === "es"
      ? "Automatización end-to-end: selectors, auto-waiting, cross-browser testing, Page Object Model."
      : "End-to-end automation: selectors, auto-waiting, cross-browser testing, Page Object Model.";

  const anthropicIds = [
    "claude-code-101",
    "ai-fluency",
    "claude-code-in-action",
    "agent-skills",
  ] as const;
  const anthropicTitles = anthropicIds.map((id) => CERTIFICATION_META[id].title);
  const anthropicDate = formatYearMonth(CERTIFICATION_META["claude-code-101"].date!, locale);
  const anthropicDetail =
    locale === "es"
      ? "Uso práctico de Claude Code, fluency en IA y Agent Skills para desarrollo asistido."
      : "Practical use of Claude Code, AI fluency and Agent Skills for AI-assisted development.";

  const completed = `
    <div class="cert"><strong>${escape(pw.title)}</strong>
      <span class="cert-meta">— ${escape(pw.issuer)}${escape(pwDate)}</span>
      <span class="cert-detail"> — ${escape(pwDetail)}</span></div>
    <div class="cert"><strong>Anthropic Academy</strong>
      <span class="cert-meta">— ${anthropicTitles.map(escape).join(" · ")} (${escape(anthropicDate)})</span>
      <span class="cert-detail"> — ${escape(anthropicDetail)}</span></div>`;

  const references = REFERENCE_IDS.map((id) => {
    const ref = REFERENCE_META[id];
    return `
      <div class="ref">
        <div class="ref-name">${escape(ref.name)} — ${escape(ref.company)}</div>
        <div class="ref-contact">${escape(ref.email)} · ${escape(ref.phone)}</div>
      </div>`;
  }).join("");

  const languages = t.about.languages
    .map((l) => `${escape(l.name)}: ${escape(l.level)}`)
    .join("  ·  ");

  return `<!doctype html>
<html lang="${locale}">
<head>
  <meta charset="utf-8">
  <title>${escape(PROFILE.name)} — ${escape(t.hero.role)}</title>
  <style>${STYLES}</style>
</head>
<body>
  <header>
    <h1>${escape(PROFILE.name)}</h1>
    <div class="role">${escape(t.hero.role)}</div>
    <div class="contact">${contact}</div>
  </header>

  <h2>${escape(t.cv.summaryHeading)}</h2>
  <section><p>${escape(t.about.body.join(" "))}</p></section>

  <h2>${escape(t.cv.skillsHeading)}</h2>
  <section>${skills}</section>

  <h2>${escape(t.cv.experienceHeading)}</h2>
  <section>${experience}</section>

  <h2>${escape(t.cv.educationHeading)}</h2>
  <section>${education}</section>

  <h2>${escape(t.cv.certificationsHeading)}</h2>
  <section>${completed}</section>

  <h2>${escape(t.cv.languagesHeading)}</h2>
  <section><div class="inline">${languages}</div></section>

  <h2>${escape(t.cv.referencesHeading)}</h2>
  <section><div class="refs">${references}</div></section>
</body>
</html>`;
}
