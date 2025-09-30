const { Then } = require('@cucumber/cucumber');
const { expect } = require('expect');

// Initial state specific steps
Then('the todo input field should be focused', async function () {
  const newTodoInput = this.page.locator('#new-todo');
  const isFocused = await newTodoInput.evaluate(el => document.activeElement === el);
  expect(isFocused).toBe(true);
});