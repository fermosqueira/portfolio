# fermosqueira

Personal site for Fernando Mosqueira, QA Analyst. Bilingual (ES/EN), statically
generated, deployed on Vercel.

**Live:** https://fermosqueira.vercel.app

## The idea

The site and both PDF CVs are generated from a **single typed source of truth**.

Keeping two CVs in sync by hand does not work — the originals had already drifted:
one language was missing five years of experience, the dates disagreed, and the
skills section contradicted the experience section. So the content moved into
TypeScript and the drift became a compile error.

```
lib/content/schema.ts   ids + language-invariant facts (dates, companies, URLs, tools)
lib/content/types.ts    interface Content — the bilingual contract
lib/content/es.ts       satisfies Content
lib/content/en.ts       satisfies Content
        │
        ├──► app/[lang]/       the website
        └──► scripts/build-cv  public/cv-es.pdf + public/cv-en.pdf
```

Everything that is not a translatable string lives in `schema.ts` exactly once.
The per-locale files are keyed by those ids, so a missing entry in either
language fails `tsc` instead of shipping a half-translated page.

## Commands

```bash
npm run dev        # dev server
npm run build      # production build (prerenders /es and /en)
npm run cv         # regenerate both PDF CVs from the content
npm run typecheck  # also proves both locales satisfy the contract
npm run test:e2e   # Playwright suite
```

## Tests

`npm run test:e2e` runs against a production build and checks:

- both locales render all eight sections and return 200
- **content parity** — the same number of experience, education, certification
  and project entries in both languages
- the language toggle preserves the section the reader is on
- canonical and `hreflang` links per locale
- both CVs are served as real PDFs, with `noindex`
- the email address never appears in the served HTML
- every external link carries `target="_blank"` and `rel="noopener noreferrer"`
- no serious or critical accessibility violations (axe, WCAG 2.1 AA)
- no horizontal overflow at 375 / 768 / 1280 px

CI runs typecheck, lint, the CV freshness check and the E2E suite on every push.

## Regenerating the CVs

The PDFs are committed, but they are build output. Editing content without
running `npm run cv` makes them stale, so CI compares a checksum of the
deterministic CV HTML (`scripts/cv-snapshot.json`) rather than the PDF bytes —
Chromium stamps a creation date into every PDF, so the files themselves never
match byte-for-byte.

## Stack

Next.js 16 (App Router, Turbopack) · TypeScript · Tailwind v4 · Playwright ·
GitHub Actions. No runtime dependencies beyond React and Next.

Built with Claude Code.
