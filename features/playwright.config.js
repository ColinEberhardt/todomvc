// Playwright configuration for TodoMVC BDD tests
const { devices } = require('@playwright/test');

module.exports = {
  // Test directory
  testDir: './step_definitions',
  
  // Timeout for each test
  timeout: 30 * 1000,
  
  // Expect timeout
  expect: {
    timeout: 5000
  },
  
  // Fail the build on CI if you accidentally left test.only in the source code
  forbidOnly: !!process.env.CI,
  
  // Retry on CI only
  retries: process.env.CI ? 2 : 0,
  
  // Opt out of parallel tests on CI
  workers: process.env.CI ? 1 : undefined,
  
  // Reporter to use
  reporter: [
    ['html', { outputFolder: 'reports/playwright-report' }],
    ['json', { outputFile: 'reports/playwright-results.json' }]
  ],
  
  // Shared settings for all the projects below
  use: {
    // Base URL for tests
    baseURL: 'file://' + require('path').resolve(__dirname, '../examples/jquery/index.html'),
    
    // Collect trace when retrying the failed test
    trace: 'on-first-retry',
    
    // Capture screenshot on failure
    screenshot: 'only-on-failure',
    
    // Record video on failure
    video: 'retain-on-failure'
  },

  // Configure projects for major browsers
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    
    // Mobile browsers
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],
  
  // Run your local dev server before starting the tests
  webServer: process.env.CI ? undefined : {
    command: 'cd ../examples/jquery && python -m http.server 8000',
    port: 8000,
    reuseExistingServer: !process.env.CI
  }
};