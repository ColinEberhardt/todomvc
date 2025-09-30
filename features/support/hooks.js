const { Before, After, BeforeAll, AfterAll } = require('@cucumber/cucumber');

BeforeAll(async function () {
  console.log('Setting up test environment...');
});

Before(async function () {
  await this.openBrowser();
});

After(async function (scenario) {
  if (scenario.result.status === 'FAILED' && this.page) {
    try {
      // Take screenshot on failure
      const screenshot = await this.page.screenshot({ type: 'png' });
      this.attach(screenshot, 'image/png');
    } catch (error) {
      console.log('Could not take screenshot:', error.message);
    }
  }
  
  await this.closeBrowser();
});

AfterAll(async function () {
  console.log('Cleaning up test environment...');
});