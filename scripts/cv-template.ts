import {
  CERTIFICATION_IDS,
  CERTIFICATION_META,
  EDUCATION_IDS,
  EDUCATION_META,
  EXPERIENCE_IDS,
  EXPERIENCE_META,
  PROFILE,
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
    font-size: 10.1pt;
    line-height: 1.42;
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
    margin-top: 6px;
    font-size: 8.4pt;
    color: #555;
  }
  .contact a { color: #555; text-decoration: none; }

  h2 {
    margin-top: 16px;
    padding-bottom: 3px;
    border-bottom: 0.9px solid #999;
    font-size: 9pt;
    font-weight: 700;
    letter-spacing: 0.11em;
    text-transform: uppercase;
    color: #111;
  }

  section { margin-top: 3px; }
  p { text-align: justify; }

  .skill-row { margin-top: 5px; display: flex; gap: 8px; align-items: baseline; }
  .skill-label {
    flex: 0 0 128px;
    font-size: 8.4pt;
    font-weight: 700;
    color: #333;
  }
  .skill-items { font-size: 8.8pt; color: #222; }

  .job { margin-top: 11px; }
  .job:first-child { margin-top: 7px; }
  .job-head {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 12px;
  }
  .job-title { font-size: 10pt; font-weight: 700; }
  .job-meta { font-size: 8.4pt; color: #555; white-space: nowrap; }

  ul { margin-top: 3px; padding-left: 13px; }
  li { margin-top: 1.5px; }

  .edu { margin-top: 7px; }
  .edu-title { font-weight: 700; font-size: 9.6pt; }
  .edu-detail { font-size: 8.6pt; color: #444; }

  .cert { margin-top: 4px; font-size: 9pt; }
  .cert-meta { color: #555; font-size: 8.4pt; }
  .cert-progress { margin-top: 5px; font-size: 8.6pt; color: #444; }

  .inline { margin-top: 5px; font-size: 9pt; }
  .muted { color: #555; }
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
  const contact = [
    `${PROFILE.emailUser}@${PROFILE.emailDomain}`,
    PROFILE.linkedinLabel,
    PROFILE.githubLabel,
  ].join("  |  ");

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

  const completed = CERTIFICATION_IDS.filter(
    (id) => CERTIFICATION_META[id].status === "completed",
  ).map((id) => {
    const meta = CERTIFICATION_META[id];
    const date = meta.date ? ` (${formatYearMonth(meta.date, locale)})` : "";
    return `<div class="cert"><strong>${escape(meta.title)}</strong>
      <span class="cert-meta">— ${escape(meta.issuer)}${escape(date)}</span></div>`;
  }).join("");

  const inProgressTitles = CERTIFICATION_IDS.filter(
    (id) => CERTIFICATION_META[id].status === "in-progress",
  ).map((id) => CERTIFICATION_META[id].title);

  const inProgress = inProgressTitles.length
    ? `<div class="cert-progress"><strong>${escape(t.cv.inProgressPrefix)}:</strong>
        ${inProgressTitles.map(escape).join(" · ")} — Anthropic Academy</div>`
    : "";

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
    <div class="contact">${escape(contact)}</div>
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
  <section>${completed}${inProgress}</section>

  <h2>${escape(t.cv.languagesHeading)}</h2>
  <section><div class="inline">${languages}</div></section>

  <h2>${escape(t.cv.referencesHeading)}</h2>
  <section><div class="inline muted">${escape(t.contact.references)}</div></section>
</body>
</html>`;
}
