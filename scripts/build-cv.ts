import { createHash } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";
import { LOCALES, PROFILE } from "../lib/content/schema";
import { renderCv } from "./cv-template";

const OUT_DIR = path.join(process.cwd(), "public");
const SNAPSHOT = path.join(process.cwd(), "scripts", "cv-snapshot.json");

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
  const context = await browser.newContext();
  const snapshot: Record<string, string> = {};

  try {
    for (const locale of LOCALES) {
      const html = renderCv(locale);
      snapshot[locale] = createHash("sha256").update(html).digest("hex");

      const page = await context.newPage();
      await page.setContent(html, { waitUntil: "load" });

      const pdf = await page.pdf({
        format: "A4",
        printBackground: true,
        margin: { top: "14mm", right: "14mm", bottom: "12mm", left: "14mm" },
      });

      const target = path.join(OUT_DIR, `cv-${locale}.pdf`);
      await writeFile(target, pdf);

      // A CV that spills onto a second page is a layout bug, not a preference.
      const pages = (await page.evaluate(
        () => document.documentElement.scrollHeight / 1122,
      )) as number;

      console.log(
        `${path.relative(process.cwd(), target)}  ` +
          `${(pdf.length / 1024).toFixed(0)} KB  ~${pages.toFixed(2)} page(s)`,
      );
      if (pages > 1.02) {
        console.warn(`  ! cv-${locale} overflows one page — tighten the template`);
      }

      await page.close();
    }
  } finally {
    await browser.close();
  }

  await writeFile(SNAPSHOT, `${JSON.stringify(snapshot, null, 2)}\n`);
  console.log(`Done. Served from ${PROFILE.site}/cv-{es,en}.pdf`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
