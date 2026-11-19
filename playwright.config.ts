import { defineConfig, devices } from "@playwright/test";

/**
 * Browser tests (e2e/). They run against the production build served by `vite preview`.
 * They use the installed Google Chrome (`channel: "chrome"`), which GitHub's Ubuntu runners
 * already have, so no extra browser download is needed.
 *
 *   npm run test:e2e        build + run all tests
 *   npx playwright test     run tests against an existing build
 */
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["github"], ["list"]] : "list",
  use: {
    baseURL: "http://localhost:4173",
    channel: "chrome",
    trace: "retain-on-failure",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], channel: "chrome" } },
    { name: "mobile", use: { ...devices["Pixel 7"], channel: "chrome" } },
  ],
  webServer: {
    command: "npx vite preview --port 4173 --strictPort",
    url: "http://localhost:4173",
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
