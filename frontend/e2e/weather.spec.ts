import { test, expect } from "@playwright/test";

test("weather app loads", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: "Weather App" }),
  ).toBeVisible();
});
