import { expect, test } from "@playwright/test";

test("theme toggle switches data-theme on html and body", async ({ page }) => {
  await page.goto("/");
  const toggle = page.locator("[aria-label='Toggle theme']");
  await expect(toggle).toBeVisible();
  const html = page.locator("html");
  const body = page.locator("body");
  const initial = await html.getAttribute("data-theme");
  await toggle.click();
  await expect(html).not.toHaveAttribute("data-theme", initial ?? "");
  await expect(html).toHaveAttribute("data-theme", await body.getAttribute("data-theme"));
  await toggle.click();
  await expect(html).toHaveAttribute("data-theme", initial ?? "dark");
  await expect(html).toHaveAttribute("data-theme", await body.getAttribute("data-theme"));
});
