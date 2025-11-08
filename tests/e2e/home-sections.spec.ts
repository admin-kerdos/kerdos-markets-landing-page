import { expect, test } from "@playwright/test";

test.describe("landing structure", () => {
  test("renders only the required sections in order", async ({ page }) => {
    await page.goto("/");
    const sections = page.locator("main section");
    await expect(sections).toHaveCount(3);
    await expect(sections.nth(0)).toHaveAttribute("id", "hero");
    await expect(sections.nth(1)).toHaveAttribute("id", "how-it-works");
    await expect(sections.nth(2)).toHaveAttribute("id", "faq");
  });

  test("hero video satisfies autoplay requirements", async ({ page }) => {
    await page.goto("/");
    const video = page.locator('[data-testid="hero-video"]');
    await expect(video).toBeVisible();
    await expect(video).toHaveJSProperty("muted", true);
    await expect(video).toHaveJSProperty("playsInline", true);
    await expect(video).toHaveJSProperty("loop", true);
    await expect(video).toHaveJSProperty("autoplay", true);
    const rect = await video.evaluate((node) => {
      const { width, height } = node.getBoundingClientRect();
      return { width, height };
    });
    expect(rect.width).toBeGreaterThan(0);
    expect(rect.height).toBeGreaterThan(0);
    expect(rect.height).toBeGreaterThan(rect.width * 0.3);
  });

  test("how it works grid expone tres módulos", async ({ page }) => {
    await page.goto("/");
    const modules = page.locator('[data-testid="how-step-card"]');
    await expect(modules).toHaveCount(3);
    await modules.first().focus();
    await expect(modules.first()).toBeFocused();
  });

  test("faq accordion toggles via keyboard", async ({ page }) => {
    await page.goto("/");
    const firstItem = page.locator('[data-testid="faq-item-0"]');
    const firstTrigger = firstItem.locator("summary");
    const firstPanel = firstItem.locator("[data-accordion-panel]");
    await page.waitForTimeout(200);
    await firstTrigger.focus();
    await expect(firstTrigger).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(firstItem).toHaveAttribute("open", "");
    await expect(firstPanel).toBeVisible();
    await page.keyboard.press(" ");
    await expect(firstItem).not.toHaveAttribute("open", "");
  });
});
