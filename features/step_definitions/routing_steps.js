const { When, Then } = require('@cucumber/cucumber');
const { expect } = require('expect');

// Routing and filtering specific steps
When('I filter by active items', async function () {
  await this.filterBy('active');
});

When('I filter by completed items', async function () {
  await this.filterBy('completed');
});

When('I filter by all items', async function () {
  await this.filterBy('all');
});

When('I navigate back in browser', async function () {
  await this.navigateBack();
});

Then('I should see the first todo {string}', async function (expectedText) {
  const todoExists = await this.page.locator(`li:has-text("${expectedText}")`).count() > 0;
  expect(todoExists).toBe(true);
});

Then('I should see the second todo {string}', async function (expectedText) {
  const todoExists = await this.page.locator(`li:has-text("${expectedText}")`).count() > 0;
  expect(todoExists).toBe(true);
});

Then('I should see the third todo {string}', async function (expectedText) {
  const todoExists = await this.page.locator(`li:has-text("${expectedText}")`).count() > 0;
  expect(todoExists).toBe(true);
});

Then('the first todo should be hidden', async function () {
  // Get the text of what would be the first todo when all are visible
  const firstTodoText = "buy some cheese"; // This is the first standard todo
  const todoExists = await this.page.locator(`li:has-text("${firstTodoText}")`).count() > 0;
  expect(todoExists).toBe(false);
});

Then('the second todo should be hidden', async function () {
  // Get the text of what would be the second todo when all are visible
  const secondTodoText = "feed the cat"; // This is the second standard todo
  const todoExists = await this.page.locator(`li:has-text("${secondTodoText}")`).count() > 0;
  expect(todoExists).toBe(false);
});

Then('the third todo should be hidden', async function () {
  // Get the text of what would be the third todo when all are visible
  const thirdTodoText = "book a doctors appointment"; // This is the third standard todo
  const todoExists = await this.page.locator(`li:has-text("${thirdTodoText}")`).count() > 0;
  expect(todoExists).toBe(false);
});

Then('I should see all {int} todo items', async function (expectedCount) {
  // Count todos in the DOM
  const todoCount = await this.page.locator('#todo-list li').count();
  expect(todoCount).toBe(expectedCount);
});

Then('the {string} filter should be selected', async function (filterName) {
  const selectedFilter = this.page.locator(`a.selected:has-text("${filterName}")`);
  const exists = await selectedFilter.count() > 0;
  expect(exists).toBe(true);
});