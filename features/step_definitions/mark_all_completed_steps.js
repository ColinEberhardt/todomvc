const { When, Then } = require('@cucumber/cucumber');
const { expect } = require('expect');

// Mark all completed specific steps
When('I click the mark all as complete checkbox', async function () {
  await this.clickToggleAll();
});

When('I click the mark all as complete checkbox again', async function () {
  await this.clickToggleAll();
});

Then('the complete all checkbox should be checked', async function () {
  const isChecked = await this.page.locator('#toggle-all').isChecked();
  expect(isChecked).toBe(true);
});

Then('the complete all checkbox should be unchecked', async function () {
  const isChecked = await this.page.locator('#toggle-all').isChecked();
  expect(isChecked).toBe(false);
});