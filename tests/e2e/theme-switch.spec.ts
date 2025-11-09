import { expect, test } from "@playwright/test";

const trackSelector = '[data-testid="theme-track"]';
const thumbSelector = '[data-testid="theme-thumb"]';

async function measureGaps(page) {
  const [track, thumb] = await Promise.all([
    page.locator(trackSelector).first().boundingBox(),
    page.locator(thumbSelector).first().boundingBox()
  ]);
  if (!track || !thumb) {
    throw new Error("missing bounding box");
  }
  const padding = 4;
  const leftGap = thumb.x - track.x - padding;
  const rightGap = track.x + track.width - (thumb.x + thumb.width) - padding;
  return { leftGap, rightGap };
}

async function assertAligned(page) {
  const { leftGap, rightGap } = await measureGaps(page);
  expect(Math.abs(leftGap - rightGap)).toBeLessThanOrEqual(1);
}

test.describe("theme switch alignment", () => {
  test("desktop click + keyboard maintain equal margins", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/");
    const toggle = page.locator(trackSelector).first();
    await expect(toggle).toBeVisible();
    await assertAligned(page);
    const ariaBefore = await toggle.getAttribute("aria-checked");
    await toggle.click();
    await assertAligned(page);
    const ariaAfterClick = await toggle.getAttribute("aria-checked");
    expect(ariaAfterClick).not.toBe(ariaBefore);
    await toggle.focus();
    await page.keyboard.press("Space");
    await assertAligned(page);
    const ariaAfterKey = await toggle.getAttribute("aria-checked");
    expect(ariaAfterKey).not.toBe(ariaAfterClick);
  });

  test("mobile alignment and no horizontal scroll", async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 720 });
    await page.goto("/");
    const toggle = page.locator(trackSelector).first();
    await expect(toggle).toBeVisible();
    await assertAligned(page);
    await toggle.click();
    await assertAligned(page);
    await expect
      .poll(() => page.evaluate(() => document.documentElement.scrollWidth === window.innerWidth))
      .toBeTruthy();
  });
});
