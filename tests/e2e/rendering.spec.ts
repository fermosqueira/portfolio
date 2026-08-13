import { expect, test } from "@playwright/test";
import { LOCALES, SECTION_IDS } from "../../lib/content/schema";
import { getDictionary } from "../../lib/i18n";

test.describe("rendering", () => {
  for (const locale of LOCALES) {
    test(`/${locale} renders every section`, async ({ page }) => {
      const response = await page.goto(`/${locale}`);
      expect(response?.status()).toBe(200);

      await expect(page.locator("html")).toHaveAttribute("lang", locale);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText("Fernando Mosqueira");

      for (const id of SECTION_IDS) {
        await expect(page.locator(`section#${id}`), `section #${id} is missing`).toBeVisible();
      }
    });

    test(`/${locale} uses its own translations`, async ({ page }) => {
      await page.goto(`/${locale}`);
      const t = getDictionary(locale);

      await expect(page.getByText(t.hero.tagline)).toBeVisible();
      await expect(page.locator("section#contact")).toContainText(t.contact.references);
    });
  }

  test("the bare root redirects into a locale", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL(/\/(es|en)$/);
  });

  test("an unknown path still lands somewhere useful", async ({ page }) => {
    const response = await page.goto("/es/does-not-exist");
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });
});
