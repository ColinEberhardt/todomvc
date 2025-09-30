const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('expect');

// Editing specific steps
Given('I double-click the second todo to edit it', async function () {
  await this.doubleClickTodo(2);
  // Wait for editing mode to be active
  await this.page.waitForSelector('.editing', { timeout: 2000 });
});

When('I edit the current item to {string} and press enter', async function (newText) {
  await this.editTodo(newText);
  await this.pressEnterOnEdit();
});

When('I edit the current item to {string}', async function (newText) {
  await this.editTodo(newText);
});

When('I edit the current item to {string} and press escape', async function (newText) {
  await this.editTodo(newText);
  await this.pressEscapeOnEdit();
});

When('I click the first todo toggle button', async function () {
  await this.markTodoComplete(1);
});

Then('the item input should be focused', async function () {
  const editInput = this.page.locator('.editing .edit');
  const isFocused = await editInput.evaluate(el => document.activeElement === el);
  expect(isFocused).toBe(true);
});

Then('the new todo input should be blurred', async function () {
  const newTodoInput = this.page.locator('#new-todo');
  const isFocused = await newTodoInput.evaluate(el => document.activeElement === el);
  expect(isFocused).toBe(false);
});

Then('the toggle button for the second todo should be hidden', async function () {
  const todos = this.page.locator('#todo-list li');
  const secondTodo = todos.nth(1);
  const toggleButton = secondTodo.locator('.toggle');
  const isVisible = await toggleButton.isVisible();
  expect(isVisible).toBe(false);
});

Then('the label for the second todo should be hidden', async function () {
  const todos = this.page.locator('#todo-list li');
  const secondTodo = todos.nth(1);
  const label = secondTodo.locator('label');
  const isVisible = await label.isVisible();
  expect(isVisible).toBe(false);
});