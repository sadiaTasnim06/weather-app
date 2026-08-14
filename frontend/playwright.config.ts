import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",

  use: {
    baseURL: "http://localhost:5174",
    trace: "on-first-retry",
  },

  webServer: {
    command: "npm run dev -- --host 0.0.0.0",
    url: "http://localhost:5174",
    reuseExistingServer: true,
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
