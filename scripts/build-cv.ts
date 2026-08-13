import { createHash } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";
import { LOCALES, PROFILE } from "../lib/content/schema";
import { renderCv } from "./cv-template";

const OUT_DIR = path.join(process.cwd(), "public");
const SNAPSHOT = path.join(process.cwd(), "scripts", "cv-snapshot.json");

/**
 * A4 minus the @page margins, in CSS pixels at 96dpi.
 * 210mm - 28mm wide, 297mm - 26mm tall.
 *
 * The page must be laid out at exactly this width to know how many sheets the
 * PDF will take. Measuring at the browser's default viewport instead reports a
 * one-page CV that prints as three.
 */
const PRINT_WIDTH = Math.round((182 / 25.4) * 96);
const PRINT_HEIGHT = Math.round((271 / 25.4) * 96);

/**
 * Regenerates both CVs from the same content the website renders.
 *
 * The PDFs themselves are not byte-reproducible — Chromium stamps a creation
 * date into every file — so a checksum of the deterministic HTML is written
 * alongside them. CI regenerates and diffs that snapshot: if someone edits the
 * content and forgets to re-run this script, the committed PDFs are stale and
 * the build says so.
 */
async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: PRINT_WIDTH, height: PRINT_HEIGHT },
  });
  const snapshot: Record<string, string> = {};
  let overflowed = false;

  try {
    for (const locale of LOCALES) {
      const html = renderCv(locale);
      snapshot[locale] = createHash("sha256").update(html).digest("hex");

      const page = await context.newPage();
      await page.emulateMedia({ media: "print" });
      await page.setContent(html, { waitUntil: "load" });

      // Margins come from `@page` in cv-template.ts. Setting them here too
      // applies both, shrinking the real content box and forcing a stray break.
      const pdf = await page.pdf({ printBackground: true, preferCSSPageSize: true });

      const target = path.join(OUT_DIR, `cv-${locale}.pdf`);
      await writeFile(target, pdf);

      // A CV that spills onto a second page is a layout bug, not a preference.
      const sheets = (await page.evaluate(
        (height) => document.body.scrollHeight / height,
        PRINT_HEIGHT,
      )) as number;

      console.log(
        `${path.relative(process.cwd(), target)}  ` +
          `${(pdf.length / 1024).toFixed(0)} KB  ${sheets.toFixed(2)} sheet(s)`,
      );
      if (sheets > 1) {
        overflowed = true;
        console.error(`  ! cv-${locale} does not fit on one page`);
      }

      await page.close();
    }
  } finally {
    await browser.close();
  }

  await writeFile(SNAPSHOT, `${JSON.stringify(snapshot, null, 2)}\n`);

  if (overflowed) {
    throw new Error("At least one CV spills past a single page. Tighten cv-template.ts.");
  }

  console.log(`Done. Served from ${PROFILE.site}/cv-{es,en}.pdf`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
