import { defineConfig, devices } from '@playwright/test';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',

  // Maximum time one test/action can take - 30 sec
  timeout: 15000,

  // Maximum time expect() should wait for the condition to be met - 10 sec
  expect: {
    timeout: 10000,
  },

  // Run tests in files in parallel
  fullyParallel: true,

  // Fail the build on CI if you accidentally left test.only in the source code.
  forbidOnly: !!process.env.CI,

  // Retries
  retries: process.env.CI ? 2 : 1,

  // Workers for each job shard.
  workers: process.env.CI ? 2 : undefined,

  // Reporter to use. See https://playwright.dev/docs/test-reporters
  reporter: [['html'], ['junit', { outputFile: 'results.xml' }]],

  // Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions.
  use: {
    // URL to use in all tests
    baseURL: 'https://www.saucedemo.com/',

    // Collect trace. See https://playwright.dev/docs/trace-viewer
    trace: 'retain-on-failure',

    // Change the default data-testid attribute.
    testIdAttribute: 'data-test',
  },

  // Configure projects for major browsers.
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
    },
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
      },
    },
  ],
});
