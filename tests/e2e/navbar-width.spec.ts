import { expect, test, type Locator, type Page } from "@playwright/test";

const navRoleName = /secciones de la página/i;
const mobileViewports = [
  { width: 360, height: 720 },
  { width: 390, height: 844 }
];
const navTapTargets = ["Cómo funciona", "Preguntas"];

async function getViewportMetrics(page: Page) {
  return page.evaluate(() => ({
    innerWidth: window.innerWidth,
    scrollWidth: document.documentElement.scrollWidth
  }));
}

async function getNavMetrics(nav: Locator) {
  return nav.evaluate((node) => {
    const rect = node.getBoundingClientRect();
    return {
      width: rect.width,
      right: rect.right,
      scrollWidth: node.scrollWidth,
      clientWidth: node.clientWidth
    };
  });
}

test.describe("navbar width", () => {
  test("desktop navbar stays inside viewport without scroll", async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 900 });
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: navRoleName });
    await expect(nav).toBeVisible();
    const viewport = await getViewportMetrics(page);
    const navMetrics = await getNavMetrics(nav);
    expect(navMetrics.width).toBeLessThanOrEqual(viewport.innerWidth - 16);
    expect(viewport.scrollWidth).toBe(viewport.innerWidth);
  });

  test("mobile navbar constrains overflow and stays visible after taps", async ({ page }) => {
    for (const size of mobileViewports) {
      await page.setViewportSize(size);
      await page.goto("/");
      const nav = page.getByRole("navigation", { name: navRoleName });
      await expect(nav).toBeVisible();
      const viewport = await getViewportMetrics(page);
      const navMetrics = await getNavMetrics(nav);
      expect(viewport.scrollWidth).toBe(viewport.innerWidth);
      expect(navMetrics.width).toBeLessThanOrEqual(viewport.innerWidth);
      if (navMetrics.scrollWidth > navMetrics.clientWidth) {
        expect(navMetrics.scrollWidth).toBeGreaterThan(navMetrics.clientWidth);
      }
      for (const target of navTapTargets) {
        await page.getByRole("link", { name: target }).click();
        const afterTapViewport = await getViewportMetrics(page);
        const afterTapNav = await getNavMetrics(nav);
        expect(afterTapNav.right).toBeLessThanOrEqual(afterTapViewport.innerWidth);
      }
    }
  });

  test("navbar survives viewport resizing without overflow", async ({ page }) => {
    const sequence = [
      { width: 360, height: 720 },
      { width: 1024, height: 900 },
      { width: 360, height: 720 }
    ];
    await page.setViewportSize(sequence[0]);
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: navRoleName });
    await expect(nav).toBeVisible();
    for (const size of sequence) {
      await page.setViewportSize(size);
      const viewport = await getViewportMetrics(page);
      const navMetrics = await getNavMetrics(nav);
      expect(navMetrics.width).toBeLessThanOrEqual(viewport.innerWidth);
      expect(viewport.scrollWidth).toBe(viewport.innerWidth);
    }
  });
});
