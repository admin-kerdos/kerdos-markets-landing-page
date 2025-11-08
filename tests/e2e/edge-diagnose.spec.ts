import { test } from "@playwright/test";

test("hero layout diagnostics", async ({ page }) => {
  await page.goto("/");
  const result = await page.evaluate(() => {
    const de = document.documentElement;
    const hero = document.getElementById("hero");
    const fullBleed = document.querySelector<HTMLElement>(".full-bleed");
    const rect = (node: Element | null) => (node ? (node as HTMLElement).getBoundingClientRect().width : null);
    return {
      innerWidth: window.innerWidth,
      clientWidth: de.clientWidth,
      scrollbarWidth: window.innerWidth - de.clientWidth,
      heroWidth: rect(hero),
      fullBleedWidth: rect(fullBleed),
      bodyBg: getComputedStyle(document.body).backgroundColor
    };
  });
  console.log("DIAG", result);
});
