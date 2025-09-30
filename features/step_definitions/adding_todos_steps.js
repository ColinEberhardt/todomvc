const { When, Then } = require('@cucumber/cucumber');
const { expect } = require('expect');

// Adding todos specific steps
Then('the input field should be empty', async function () {
  const inputValue = await this.page.locator('#new-todo').inputValue();
  expect(inputValue).toBe('');
});

Then('the main section should be visible', async function () {
  const isVisible = await this.page.locator('#main').isVisible();
  expect(isVisible).toBe(true);
});

Then('the footer section should be visible', async function () {
  const isVisible = await this.page.locator('#footer').isVisible();
  expect(isVisible).toBe(true);
});

Then('the main section should be hidden', async function () {
  const isVisible = await this.page.locator('#main').isVisible();
  expect(isVisible).toBe(false);
});

Then('the footer section should be hidden', async function () {
  const isVisible = await this.page.locator('#footer').isVisible();
  expect(isVisible).toBe(false);
});