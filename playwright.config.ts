import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  workers: 3,
  timeout: 60000,
  retries: 0,
  reporter: [["list"], ["json", { outputFile: "test-results/report.json" }]],
  use: {
    baseURL: "http://127.0.0.1:3000",
    headless: true,
    launchOptions: process.env.PLAYWRIGHT_EXECUTABLE_PATH ? { executablePath: process.env.PLAYWRIGHT_EXECUTABLE_PATH } : undefined,
    screenshot: "only-on-failure",
  },
  webServer: { command: "node scripts/serve.mjs", url: "http://127.0.0.1:3000", reuseExistingServer: true, timeout: 30000 },
});
