const { When, Then } = require('@cucumber/cucumber');
const { expect } = require('expect');

// Clear completed specific steps
When('I click the clear completed button', async function () {
  await this.clickClearCompleted();
});

Then('the clear completed button should show {string}', async function (expectedText) {
  await this.page.waitForSelector('.clear-completed', { timeout: 5000 });
  const buttonText = await this.page.locator('.clear-completed').textContent();
  expect(buttonText.trim()).toBe(expectedText);
});

Then('the clear completed button should be visible', async function () {
  const buttonCount = await this.page.locator('.clear-completed').count();
  expect(buttonCount).toBeGreaterThan(0);
});

Then('the clear completed button should be hidden', async function () {
  const buttonCount = await this.page.locator('.clear-completed').count();
  expect(buttonCount).toBe(0);
});