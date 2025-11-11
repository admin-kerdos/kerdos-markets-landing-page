import { test, expect } from "@playwright/test";

test("renders metrics and key headings", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("#what-is-kerdos")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Qué es Kerdos Markets" })).toBeVisible();
  await expect(page.locator('[data-metric="pm-profit"]')).toContainText("43%");
  await expect(page.locator('[data-metric="sb-profit"]')).toContainText("2%");
  await expect(page.locator('[data-metric="withdraw"]')).toContainText("Retiros");
});

test("mobile metrics row scrolls", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 720 });
  await page.goto("/");
  const row = page.locator("[data-stats]");
  const scrollable = await row.evaluate((el) => el.scrollWidth > el.clientWidth);
  expect(scrollable).toBeTruthy();
});

test("no horizontal overflow", async ({ page }) => {
  for (const [w, h] of [
    [360, 720],
    [768, 900],
    [1280, 900]
  ]) {
    await page.setViewportSize({ width: w, height: h });
    await page.goto("/");
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    expect(overflow).toBeFalsy();
  }
});
