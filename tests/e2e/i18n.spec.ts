import { expect, test } from "@playwright/test";
import { LOCALES } from "../../lib/content/schema";

/**
 * The point of these tests is the failure mode that bit the source CVs: one
 * language quietly drifting from the other.
 */
test.describe("bilingual parity", () => {
  const LISTS = [
    "experience-list",
    "education-list",
    "certifications-list",
    "projects-list",
    "footer-links",
  ] as const;

  test("both locales expose the same number of items in every list", async ({ page }) => {
    const counts: Record<string, number[]> = {};

    for (const locale of LOCALES) {
      await page.goto(`/${locale}`);
      for (const list of LISTS) {
        const count = await page.getByTestId(list).locator("> *").count();
        (counts[list] ??= []).push(count);
      }
    }

    for (const [list, [es, en]] of Object.entries(counts)) {
      expect(es, `${list} differs between locales`).toBe(en);
      expect(es, `${list} is empty`).toBeGreaterThan(0);
    }
  });

  test("the language toggle keeps the reader on the same section", async ({ page }) => {
    await page.goto("/es#experience");
    await page.getByTestId("lang-toggle").click();

    await expect(page).toHaveURL(/\/en#experience$/);
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.locator("section#experience")).toBeVisible();
  });

  test("the toggle round-trips back to Spanish", async ({ page }) => {
    await page.goto("/en");
    await page.getByTestId("lang-toggle").click();
    await expect(page).toHaveURL(/\/es$/);
    await expect(page.locator("html")).toHaveAttribute("lang", "es");
  });

  for (const locale of LOCALES) {
    test(`/${locale} declares canonical and hreflang links`, async ({ page }) => {
      await page.goto(`/${locale}`);

      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        "href",
        new RegExp(`/${locale}$`),
      );
      for (const alternate of LOCALES) {
        await expect(
          page.locator(`link[rel="alternate"][hreflang="${alternate}"]`),
        ).toHaveCount(1);
      }
    });

    test(`/${locale} leaves no unresolved content behind`, async ({ page }) => {
      await page.goto(`/${locale}`);
      const text = (await page.locator("main").innerText()).toLowerCase();

      for (const smell of ["undefined", "null", "[object object]", "todo:"]) {
        expect(text, `rendered text contains "${smell}"`).not.toContain(smell);
      }
    });
  }
});
