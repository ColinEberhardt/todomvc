const { Given, When, Then } = require('@cucumber/cucumber');
const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const ModernPage = require('../support/modern_page');
const ModernTestOperations = require('../support/modern_test_operations');

// Test data constants
const TODO_ITEM_ONE = 'buy some cheese';
const TODO_ITEM_TWO = 'feed the cat';
const TODO_ITEM_THREE = 'book a doctors appointment';

Given('I open the TodoMVC application', async function () {
  const chromeOptions = new chrome.Options();
  chromeOptions.addArguments('--no-sandbox');
  chromeOptions.addArguments('--disable-dev-shm-usage');
  
  // Add headless mode if running in CI or if explicitly requested
  if (process.env.HEADLESS === 'true' || process.env.CI === 'true') {
    chromeOptions.addArguments('--headless');
  }

  if (process.env.CHROME_PATH !== undefined) {
    chromeOptions.setChromeBinaryPath(process.env.CHROME_PATH);
  }

  this.browser = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(chromeOptions)
    .build();

  await this.browser.get(this.baseUrl || 'http://localhost:8080');

  this.page = new ModernPage(this.browser);
  this.testOps = new ModernTestOperations(this.page);

  await this.page.ensureAppIsVisibleAndLoaded();
});

Given('I have added the standard todo items', async function () {
  await this.page.enterItem(TODO_ITEM_ONE);
  await this.page.enterItem(TODO_ITEM_TWO);
  await this.page.enterItem(TODO_ITEM_THREE);
});

When('I add a todo {string}', async function (todoText) {
  await this.page.enterItem(todoText);
});

When('I mark the first todo as complete', async function () {
  await this.page.toggleItemAtIndex(0);
});

When('I mark the second todo as complete', async function () {
  await this.page.toggleItemAtIndex(1);
});

When('I mark the third todo as complete', async function () {
  await this.page.toggleItemAtIndex(2);
});

When('I mark the first todo as incomplete', async function () {
  await this.page.toggleItemAtIndex(0);
});

When('I mark the second todo as incomplete', async function () {
  await this.page.toggleItemAtIndex(1);
});

When('I click the mark all as complete checkbox', async function () {
  await this.page.clickMarkAllCompletedCheckBox();
});

When('I click the mark all as complete checkbox again', async function () {
  await this.page.clickMarkAllCompletedCheckBox();
});

When('I double-click the second todo to edit it', async function () {
  await this.page.doubleClickItemAtIndex(1);
});

When('I edit the current item to {string} and press enter', async function (newText) {
  await this.page.editItemAtIndex(1, newText + Key.ENTER);
});

When('I edit the current item to {string}', async function (newText) {
  await this.page.editItemAtIndex(1, newText);
});

When('I edit the current item to {string} and press escape', async function (newText) {
  await this.page.editItemAtIndex(1, newText + Key.ESCAPE);
});

When('I click the first todo toggle button', async function () {
  await this.page.toggleItemAtIndex(0);
});

When('I click the clear completed button', async function () {
  await this.page.clickClearCompleteButton();
});

When('I navigate to {string}', async function (url) {
  await this.browser.get(url);
});

When('I navigate back to the TodoMVC application', async function () {
  await this.browser.get(this.baseUrl || 'http://localhost:8080');
});

When('I filter by active items', async function () {
  await this.page.filterByActiveItems();
});

When('I filter by completed items', async function () {
  await this.page.filterByCompletedItems();
});

When('I filter by all items', async function () {
  await this.page.filterByAllItems();
});

When('I navigate back in browser', async function () {
  await this.page.back();
});

Then('the todo input field should be focused', async function () {
  await this.testOps.assertNewInputFocused();
});

Then('the main section should be hidden', async function () {
  await this.testOps.assertMainSectionVisibility(false);
});

Then('the footer section should be hidden', async function () {
  await this.testOps.assertFooterVisibility(false);
});

Then('the main section should be visible', async function () {
  await this.testOps.assertMainSectionVisibility(true);
});

Then('the footer section should be visible', async function () {
  await this.testOps.assertFooterVisibility(true);
});

Then('I should see {int} todo item(s)', async function (count) {
  await this.testOps.assertItemCount(count);
});

Then('the todo should be {string}', async function (expectedText) {
  await this.testOps.assertItems([expectedText]);
});

Then('the todos should be {string} and {string}', async function (first, second) {
  await this.testOps.assertItems([first, second]);
});

Then('the first todo should be {string}', async function (expectedText) {
  await this.testOps.assertItemText(0, expectedText);
});

Then('the second todo should be {string}', async function (expectedText) {
  await this.testOps.assertItemText(1, expectedText);
});

Then('the third todo should be {string}', async function (expectedText) {
  await this.testOps.assertItemText(2, expectedText);
});

Then('the input field should be empty', async function () {
  await this.testOps.assertNewItemInputFieldText('');
});

Then('all todo items should be marked as completed', async function () {
  await this.testOps.assertItemCompletedStates([true, true, true]);
});

Then('all todo items should be marked as incomplete', async function () {
  await this.testOps.assertItemCompletedStates([false, false, false]);
});

Then('the complete all checkbox should be checked', async function () {
  await this.testOps.assertCompleteAllCheckedStatus(true);
});

Then('the complete all checkbox should be unchecked', async function () {
  await this.testOps.assertCompleteAllCheckedStatus(false);
});

Then('the first todo should be marked as completed', async function () {
  await this.testOps.assertItemCompletedStates([true, false]);
});

Then('the second todo should be marked as incomplete', async function () {
  await this.testOps.assertItemCompletedStates([true, false]);
});

Then('both todos should be marked as completed', async function () {
  await this.testOps.assertItemCompletedStates([true, true]);
});

Then('both todos should be marked as incomplete', async function () {
  await this.testOps.assertItemCompletedStates([false, false]);
});

Then('the item input should be focused', async function () {
  await this.testOps.assertItemInputFocused();
});

Then('the new todo input should be blurred', async function () {
  await this.testOps.assertNewInputBlurred();
});

Then('the toggle button for the second todo should be hidden', async function () {
  await this.testOps.assertItemToggleIsHidden(1);
});

Then('the label for the second todo should be hidden', async function () {
  await this.testOps.assertItemLabelIsHidden(1);
});

Then('the counter should show {string}', async function (expectedText) {
  await this.testOps.assertItemCountText(expectedText);
});

Then('the clear completed button should show {string}', async function (expectedText) {
  await this.testOps.assertClearCompleteButtonText(expectedText);
});

Then('the clear completed button should be visible', async function () {
  await this.testOps.assertClearCompleteButtonVisibility(true);
});

Then('the clear completed button should be hidden', async function () {
  await this.testOps.assertClearCompleteButtonVisibility(false);
});

Then('the first todo should be {string} and incomplete', async function (expectedText) {
  await this.testOps.assertItemText(0, expectedText);
  await this.testOps.assertItemCompletedStates([false, true]);
});

Then('the second todo should be {string} and complete', async function (expectedText) {
  await this.testOps.assertItemText(1, expectedText);
  await this.testOps.assertItemCompletedStates([false, true]);
});

Then('I should see the first todo {string}', async function (expectedText) {
  await this.testOps.assertTodoIsVisible(expectedText);
});

Then('I should see the second todo {string}', async function (expectedText) {
  await this.testOps.assertTodoIsVisible(expectedText);
});

Then('I should see the third todo {string}', async function (expectedText) {
  await this.testOps.assertTodoIsVisible(expectedText);
});

Then('the second todo should be hidden', async function () {
  await this.testOps.assertItems([TODO_ITEM_ONE, this.page.ITEM_HIDDEN_OR_REMOVED, TODO_ITEM_THREE]);
});

Then('the first todo should be hidden', async function () {
  await this.testOps.assertItems([this.page.ITEM_HIDDEN_OR_REMOVED, TODO_ITEM_TWO]);
});

Then('the third todo should be hidden', async function () {
  await this.testOps.assertItems([this.page.ITEM_HIDDEN_OR_REMOVED, TODO_ITEM_TWO]);
});

Then('I should see all {int} todo items', async function (count) {
  await this.testOps.assertItemCount(count);
  await this.testOps.assertItems([TODO_ITEM_ONE, TODO_ITEM_TWO, TODO_ITEM_THREE]);
});

Then('the {string} filter should be selected', async function (filterName) {
  const filterIndex = { 'All': 0, 'Active': 1, 'Completed': 2 }[filterName];
  await this.testOps.assertFilterAtIndexIsSelected(filterIndex);
});