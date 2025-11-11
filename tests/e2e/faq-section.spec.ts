import { test, expect } from "@playwright/test";

test.describe("FAQ section", () => {
  test("only one answer is visible at a time", async ({ page }) => {
    await page.goto("/");

    const firstQuestion = page.getByRole("button", {
      name: "¿Qué es Kerdos Markets y en qué se diferencia de una casa de apuestas?",
    });
    await expect(page.getByTestId("faq-answer-difference")).toBeVisible();

    const secondQuestion = page.getByRole("button", {
      name: "¿Cómo funciona el precio y qué significa que refleje probabilidad?",
    });
    await secondQuestion.click();

    await expect(page.getByTestId("faq-answer-difference")).toBeHidden();
    await expect(page.getByTestId("faq-answer-pricing")).toBeVisible();
  });

  test("feedback buttons toggle selection", async ({ page }) => {
    await page.goto("/");

    const withdrawQuestion = page.getByRole("button", {
      name: "¿Cómo deposito y retiro? ¿Hay mínimos o comisiones? ¿Los retiros son instantáneos?",
    });
    await withdrawQuestion.click();

    const helpfulYes = page.getByTestId("feedback-up-payments");
    const helpfulNo = page.getByTestId("feedback-down-payments");

    await helpfulYes.click();
    await expect(helpfulYes).toHaveAttribute("aria-pressed", "true");
    await expect(helpfulNo).toHaveAttribute("aria-pressed", "false");

    await helpfulNo.click();
    await expect(helpfulNo).toHaveAttribute("aria-pressed", "true");
    await expect(helpfulYes).toHaveAttribute("aria-pressed", "false");
  });
});
