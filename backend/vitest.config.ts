import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    exclude: ["node_modules/**", "dist/**", "coverage/**"],
    setupFiles: ["./src/tests/setup.ts"],
  },
});
