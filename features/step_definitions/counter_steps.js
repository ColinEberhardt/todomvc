const { Then } = require('@cucumber/cucumber');
const { expect } = require('expect');

// Counter specific steps
Then('the counter should show {string}', async function (expectedText) {
  const counterText = await this.page.locator('#todo-count').textContent();
  expect(counterText.trim()).toBe(expectedText);
});