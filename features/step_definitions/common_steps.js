const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('expect');

// Common Given steps
Given('I open the TodoMVC application', async function () {
  await this.navigateToApp();
});

Given('I have added the standard todo items', async function () {
  await this.addStandardTodos();
});

// Common When steps
When('I add a todo {string}', async function (todoText) {
  await this.addTodo(todoText);
});

When('I mark the first todo as complete', async function () {
  await this.markTodoComplete(1);
});

When('I mark the second todo as complete', async function () {
  await this.markTodoComplete(2);
});

When('I mark the third todo as complete', async function () {
  await this.markTodoComplete(3);
});

When('I mark the first todo as incomplete', async function () {
  await this.markTodoIncomplete(1);
});

When('I mark the second todo as incomplete', async function () {
  await this.markTodoIncomplete(2);
});

When('I mark the {int} todo as complete', async function (index) {
  await this.markTodoComplete(index);
});

When('I mark the {int} todo as incomplete', async function (index) {
  await this.markTodoIncomplete(index);
});

// Common Then steps
Then('I should see {int} todo item(s)', async function (expectedCount) {
  const actualCount = await this.getTodoCount();
  expect(actualCount).toBe(expectedCount);
});

Then('the todo should be {string}', async function (expectedText) {
  const actualText = await this.getTodoText(1);
  expect(actualText).toBe(expectedText);
});

Then('the first todo should be {string}', async function (expectedText) {
  const actualText = await this.getTodoText(1);
  expect(actualText).toBe(expectedText);
});

Then('the second todo should be {string}', async function (expectedText) {
  const actualText = await this.getTodoText(2);
  expect(actualText).toBe(expectedText);
});

Then('the third todo should be {string}', async function (expectedText) {
  const actualText = await this.getTodoText(3);
  expect(actualText).toBe(expectedText);
});

Then('the todos should be {string} and {string}', async function (firstTodo, secondTodo) {
  const firstActual = await this.getTodoText(1);
  const secondActual = await this.getTodoText(2);
  expect(firstActual).toBe(firstTodo);
  expect(secondActual).toBe(secondTodo);
});

Then('the first todo should be marked as completed', async function () {
  const isCompleted = await this.isTodoCompleted(1);
  expect(isCompleted).toBe(true);
});

Then('the second todo should be marked as completed', async function () {
  const isCompleted = await this.isTodoCompleted(2);
  expect(isCompleted).toBe(true);
});

Then('the first todo should be marked as incomplete', async function () {
  const isCompleted = await this.isTodoCompleted(1);
  expect(isCompleted).toBe(false);
});

Then('the second todo should be marked as incomplete', async function () {
  const isCompleted = await this.isTodoCompleted(2);
  expect(isCompleted).toBe(false);
});

Then('both todos should be marked as completed', async function () {
  const firstCompleted = await this.isTodoCompleted(1);
  const secondCompleted = await this.isTodoCompleted(2);
  expect(firstCompleted).toBe(true);
  expect(secondCompleted).toBe(true);
});

Then('both todos should be marked as incomplete', async function () {
  const firstCompleted = await this.isTodoCompleted(1);
  const secondCompleted = await this.isTodoCompleted(2);
  expect(firstCompleted).toBe(false);
  expect(secondCompleted).toBe(false);
});

Then('all todo items should be marked as completed', async function () {
  const todoCount = await this.getTodoCount();
  for (let i = 1; i <= todoCount; i++) {
    const isCompleted = await this.isTodoCompleted(i);
    expect(isCompleted).toBe(true);
  }
});

Then('all todo items should be marked as incomplete', async function () {
  const todoCount = await this.getTodoCount();
  for (let i = 1; i <= todoCount; i++) {
    const isCompleted = await this.isTodoCompleted(i);
    expect(isCompleted).toBe(false);
  }
});