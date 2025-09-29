const { BeforeAll, AfterAll, Before, After, setWorldConstructor } = require('@cucumber/cucumber');

class TodoMVCWorld {
  constructor() {
    this.browser = null;
    this.page = null;
    this.testOps = null;
    this.baseUrl = process.env.BASE_URL || 'http://localhost:8080';
  }

  async cleanup() {
    if (this.browser) {
      try {
        // Clear localStorage and reload for clean state
        await this.browser.executeScript('window.localStorage && localStorage.clear(); location.reload(true);');
      } catch (error) {
        // Ignore errors during cleanup
      }
    }
  }

  async closeBrowser() {
    if (this.browser) {
      try {
        await this.browser.quit();
      } catch (error) {
        // Ignore errors during browser close
      }
      this.browser = null;
      this.page = null;
      this.testOps = null;
    }
  }
}

setWorldConstructor(TodoMVCWorld);

// Clean up after each scenario
After(async function () {
  // Close browser after each scenario for clean state
  await this.closeBrowser();
});