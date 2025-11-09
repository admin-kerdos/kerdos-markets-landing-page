import { expect, test } from "@playwright/test";

const navSelector = '[aria-label="Secciones de la página"]';
const themeSwitchSelector = '[role="switch"][aria-label="Cambiar tema"]';

async function centerDiff(page) {
  const nav = page.locator(navSelector).first();
  return nav.evaluate((node) => {
    const rect = node.getBoundingClientRect();
    const viewportCenter = window.innerWidth / 2;
    const navCenter = rect.left + rect.width / 2;
    return Math.abs(navCenter - viewportCenter);
  });
}

async function assertNoHorizontalScroll(page) {
  const result = await page.evaluate(() => document.documentElement.scrollWidth === window.innerWidth);
  expect(result).toBeTruthy();
}

test.describe("navbar centering", () => {
  test("nav pill stays centered before and after theme toggle", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/");
    const nav = page.locator(navSelector).first();
    await expect(nav).toBeVisible();
    await assertNoHorizontalScroll(page);
    expect(await centerDiff(page)).toBeLessThanOrEqual(4);
    const themeSwitch = page.locator(themeSwitchSelector).first();
    await themeSwitch.click();
    await expect(themeSwitch).toHaveAttribute("aria-checked", "true");
    await assertNoHorizontalScroll(page);
    expect(await centerDiff(page)).toBeLessThanOrEqual(4);
  });

  test("nav pill remains centered across desktop resizes", async ({ page }) => {
    const sizes = [
      { width: 1280, height: 900 },
      { width: 1440, height: 900 },
      { width: 1024, height: 900 }
    ];
    await page.setViewportSize(sizes[0]);
    await page.goto("/");
    const nav = page.locator(navSelector).first();
    await expect(nav).toBeVisible();
    for (const size of sizes) {
      await page.setViewportSize(size);
      await page.waitForTimeout(50);
      await assertNoHorizontalScroll(page);
      expect(await centerDiff(page)).toBeLessThanOrEqual(4);
    }
  });
});
