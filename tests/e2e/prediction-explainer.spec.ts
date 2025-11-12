import { test, expect } from "@playwright/test";

const sectionSelector = "#how-it-works";
const cardSelector = '[data-testid="how-step-card"]';

test("Cómo funciona cards render with key claims", async ({ page }) => {
  await page.goto("/");
  const section = page.locator(sectionSelector);
  await expect(section).toBeVisible();
  const headings = [
    "Qué es Kérdos Markets",
    "Qué es un mercado de predicción",
    'Qué se puede "apostar" (participar)',
    "Por qué es mejor que lo que ya existe"
  ];
  for (const heading of headings) {
    await expect(section.getByRole("heading", { name: heading })).toBeVisible();
  }
  await expect(section.locator(cardSelector)).toHaveCount(4);
  await expect(section.getByText("liquidez 24/7", { exact: false })).toBeVisible();
  await expect(section.getByText("probabilidad", { exact: false })).toBeVisible();
  await expect(section.getByText("comisiones", { exact: false })).toBeVisible();
});

test("mobile layout stacks the cards without overflow", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 720 });
  await page.goto("/");
  const section = page.locator(sectionSelector);
  await expect(section.locator(cardSelector)).toHaveCount(4);
  const grid = section.locator("div.grid");
  const columns = await grid.evaluate((node) => getComputedStyle(node).gridTemplateColumns.split(" ").length);
  expect(columns).toBe(1);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  expect(overflow).toBeFalsy();
});

test("desktop layout switches to a multi-column grid", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");
  const section = page.locator(sectionSelector);
  const grid = section.locator("div.grid");
  const columns = await grid.evaluate((node) => getComputedStyle(node).gridTemplateColumns.split(" ").length);
  expect(columns).toBeGreaterThanOrEqual(3);
});
