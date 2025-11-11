import { expect, test } from "@playwright/test";

const sectionSelector = "#what-is-kerdos";
const metricsSelector = '[aria-label="metrics"]';

async function hasNoOverflow(page) {
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth === window.innerWidth);
  expect(overflow).toBeTruthy();
}

test.describe("prediction explainer v2", () => {
  test("does not render path text", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText(/Qué es Kerdos Markets →/)).toHaveCount(0);
  });

  test("renders headings, stats and key claims", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(sectionSelector)).toBeVisible();
    const headings = [
      "Qué es Kerdos Markets",
      "Qué es un mercado de predicción",
      "Qué se puede apostar",
      "Por qué es mejor que lo que ya existe"
    ];
    for (const heading of headings) {
      await expect(page.getByRole("heading", { name: heading })).toBeVisible();
    }
    await expect(page.locator('[data-metric="profit-pm"]')).toContainText("43%");
    await expect(page.locator('[data-metric="profit-sb"]')).toContainText("2%");
    await expect(page.locator('[data-metric="withdraw"]')).toContainText("Retiros instantáneos");
    await expect(page.getByText("no juega contra vos", { exact: false })).toBeVisible();
    await expect(page.getByText("comisiones de trading", { exact: false })).toBeVisible();
    await expect(page.getByText("precio = probabilidad", { exact: false })).toBeVisible();
  });

  test("responsive layout and metrics behavior", async ({ page }) => {
    const viewports = [
      { width: 360, height: 720 },
      { width: 768, height: 900 },
      { width: 1280, height: 900 }
    ];
    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      await page.goto("/");
      await hasNoOverflow(page);
    }
    await page.setViewportSize({ width: 360, height: 720 });
    await page.goto("/");
    const metrics = page.locator(metricsSelector);
    await expect(metrics).toBeVisible();
    const scrollable = await metrics.evaluate((node) => node.scrollWidth > node.clientWidth);
    expect(scrollable).toBeTruthy();
    const hasSnap = await metrics.evaluate((node) => node.className.includes("snap-x"));
    expect(hasSnap).toBeTruthy();
  });
});
