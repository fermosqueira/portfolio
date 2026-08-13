import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { LOCALES, PROFILE } from "../../lib/content/schema";

test.describe("quality gates", () => {
  for (const locale of LOCALES) {
    test(`/${locale} serves its CV as a real PDF`, async ({ request }) => {
      const response = await request.get(`/cv-${locale}.pdf`);

      expect(response.status()).toBe(200);
      expect(response.headers()["content-type"]).toContain("application/pdf");
      expect(response.headers()["x-robots-tag"]).toContain("noindex");
      expect((await response.body()).byteLength).toBeGreaterThan(10_000);
    });

    test(`/${locale} does not leak the email address into the HTML`, async ({ request }) => {
      const html = await (await request.get(`/${locale}`)).text();
      const address = `${PROFILE.emailUser}@${PROFILE.emailDomain}`;

      expect(html, "the address is assembled in the browser, not served").not.toContain(address);
    });

    test(`/${locale} opens external links safely`, async ({ page }) => {
      await page.goto(`/${locale}`);
      const external = page.locator('a[href^="http"]:not([href*="localhost"])');

      const count = await external.count();
      expect(count).toBeGreaterThan(0);

      for (let i = 0; i < count; i++) {
        const link = external.nth(i);
        await expect(link).toHaveAttribute("target", "_blank");
        await expect(link).toHaveAttribute("rel", /noopener/);
        await expect(link).toHaveAttribute("rel", /noreferrer/);
      }
    });

    test(`/${locale} has no critical accessibility violations`, async ({ page }) => {
      await page.goto(`/${locale}`);

      const { violations } = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();

      const serious = violations.filter(
        (v) => v.impact === "critical" || v.impact === "serious",
      );

      expect(
        serious.map((v) => `${v.id}: ${v.nodes.length} node(s)`),
        "serious or critical accessibility violations",
      ).toEqual([]);
    });

    for (const width of [375, 768, 1280]) {
      test(`/${locale} fits ${width}px without sideways scrolling`, async ({ page }) => {
        await page.setViewportSize({ width, height: 900 });
        await page.goto(`/${locale}`);

        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
        );
        expect(overflow, "page scrolls horizontally").toBeLessThanOrEqual(0);
      });
    }
  }

  test("structured data describes a Person", async ({ page }) => {
    await page.goto("/es");
    const raw = await page.locator('script[type="application/ld+json"]').innerText();
    const data = JSON.parse(raw);

    expect(data["@type"]).toBe("Person");
    expect(data.name).toBe(PROFILE.name);
    expect(data.sameAs).toContain(PROFILE.github);
    expect(JSON.stringify(data)).not.toContain(PROFILE.emailDomain);
  });
});
