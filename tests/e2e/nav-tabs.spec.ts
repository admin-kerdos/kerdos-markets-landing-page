import { expect, test } from "@playwright/test";

test("nav indicator updates when reaching the Cómo funciona section", async ({ page }, testInfo) => {
  if (testInfo.project.name.includes("mobile")) {
    test.skip("Nav highlight hidden on mobile layout.");
  }
  await page.goto("/");

  const howSection = page.locator("#how-it-works");
  await howSection.scrollIntoViewIfNeeded();

  const highlight = page.locator("[data-nav] span[style*='left']");
  await expect(highlight).toBeVisible();
  const activeLink = page.locator("[data-nav] a", { hasText: "Qué es Kérdos Markets" });
  await expect(activeLink).toHaveAttribute("aria-current", "page");
});

test("nav indicator aligns with the Qué es Kérdos Markets tab", async ({ page }, testInfo) => {
  if (testInfo.project.name.includes("mobile")) {
    test.skip("Nav highlight hidden on mobile layout.");
  }
  await page.goto("/");

  const howSection = page.locator("#how-it-works");
  await howSection.scrollIntoViewIfNeeded();

  const nav = page.locator("[data-nav]");
  const highlight = nav.locator(":scope > span").first();
  const targetLink = nav.locator("a", { hasText: "Qué es Kérdos Markets" });
  await expect(targetLink).toHaveAttribute("aria-current", "page");

  await expect(async () => {
    const [highlightBox, targetBox] = await Promise.all([highlight.boundingBox(), targetLink.boundingBox()]);
    if (!highlightBox || !targetBox) {
      throw new Error("Failed to read bounding boxes for nav highlight alignment check.");
    }
    const leftDelta = Math.abs(highlightBox.x - targetBox.x);
    const widthDelta = Math.abs(highlightBox.width - targetBox.width);
    expect(leftDelta).toBeLessThanOrEqual(1);
    expect(widthDelta).toBeLessThanOrEqual(1);
  }).toPass();
});

test("scrolling from hero into Qué es Kérdos Markets updates the active tab", async ({ page }, testInfo) => {
  if (testInfo.project.name.includes("mobile")) {
    test.skip("Desktop-only nav indicator behavior.");
  }
  await page.goto("/");

  const metrics = await page.evaluate(() => {
    const section = document.getElementById("how-it-works");
    const nav = document.querySelector("[data-nav]");
    if (!section || !nav) {
      throw new Error("Missing required DOM nodes");
    }
    return {
      sectionOffset: section.offsetTop,
      navHeight: nav.getBoundingClientRect().height
    };
  });

  await page.evaluate(({ sectionOffset, navHeight }) => {
    const target = Math.max(sectionOffset - navHeight - 24, 0);
    window.scrollTo(0, target);
  }, metrics);

  await page.waitForTimeout(300);

  const activeLink = page.locator("[data-nav] [aria-current='page']");
  await expect(activeLink).toHaveText("Qué es Kérdos Markets");
});
