import { expect, test } from "@playwright/test";

test("theme toggle flips body class", async ({ page }) => {
  await page.goto("/");
  const darkness = page.locator("body");
  const toggle = page.locator("[aria-label='Toggle theme']");
  await expect(toggle).toBeVisible();
  const before = await darkness.getAttribute("class");
  const beforeHasDark = (before ?? "").includes("dark");
  await toggle.click();
  const after = await darkness.getAttribute("class");
  const afterHasDark = (after ?? "").includes("dark");
  expect(afterHasDark).not.toBe(beforeHasDark);
  await toggle.click();
  const finalClass = await darkness.getAttribute("class");
  const finalHasDark = (finalClass ?? "").includes("dark");
  expect(finalHasDark).toBe(beforeHasDark);
});
