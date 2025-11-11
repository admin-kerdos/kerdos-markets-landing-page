import { test, expect } from "@playwright/test";

test("metrics and ordered steps render with key claims", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("#what-is-kerdos")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Qué es Kerdos Markets" })).toBeVisible();
  await expect(page.locator('[data-stats] [data-metric="pm-profit"]')).toContainText("43%");
  await expect(page.locator('[data-stats] [data-metric="sb-profit"]')).toContainText("2%");
  await expect(page.locator('[data-stats] [data-metric="withdraw"]')).toContainText("Retiros");
  for (const h of [
    "Qué es Kerdos Markets",
    "Qué es un mercado de predicción",
    "Qué se puede apostar",
    "Por qué es mejor que lo que ya existe"
  ]) {
    await expect(page.getByRole("heading", { name: h })).toBeVisible();
  }
  await expect(page.getByText("no es la casa", { exact: false })).toBeVisible();
  await expect(page.getByText("comisiones de trading", { exact: false })).toBeVisible();
  await expect(page.getByText("precio", { exact: false })).toBeVisible();
});

test("mobile metrics scroll and no document overflow", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 720 });
  await page.goto("/");
  const row = page.locator("[data-stats]");
  const scrollable = await row.evaluate((el) => el.scrollWidth > el.clientWidth);
  expect(scrollable).toBeTruthy();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  expect(overflow).toBeFalsy();
});

test("desktop layout keeps 5/7 rhythm", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");
  const left = await page.locator('#what-is-kerdos .lg\\:col-span-5').count();
  const right = await page.locator('#what-is-kerdos .lg\\:col-span-7').count();
  expect(left).toBeGreaterThan(0);
  expect(right).toBeGreaterThan(0);
});
