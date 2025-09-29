'use strict';

const { By, until, Key } = require('selenium-webdriver');

const DEFAULT_TIMEOUT = 3000;
const REMOVED_TIMEOUT = 100;

const REMOVE_TEXT_KEY_SEQ = Array(51).join(Key.BACK_SPACE + Key.DELETE);

// Unique symbols
const ELEMENT_MISSING = Object.freeze({});
const ITEM_HIDDEN_OR_REMOVED = Object.freeze({});

class ModernPage {
  constructor(browser) {
    this.browser = browser;
    this.ITEM_HIDDEN_OR_REMOVED = ITEM_HIDDEN_OR_REMOVED;
    
    // Use class selectors to match TodoMVC structure
    this.idSelectors = false;
    this.classOrId = this.idSelectors ? '#' : '.';
  }

  // CSS ELEMENT SELECTORS
  getMainSectionCss() { 
    return '.main'; 
  }

  getFooterSectionCss() { 
    return '.footer'; 
  }

  getClearCompletedButtonCss() { 
    return '.clear-completed'; 
  }

  getNewInputCss() { 
    return '.new-todo'; 
  }

  getToggleAllCss() { 
    return '.toggle-all'; 
  }

  getItemCountCss() { 
    return '.todo-count'; 
  }

  getFilterCss(index) {
    return '.filters li:nth-of-type(' + (index + 1) + ') a';
  }

  getSelectedFilterCss(index) { 
    return this.getFilterCss(index) + '.selected'; 
  }

  getFilterAllCss() { 
    return this.getFilterCss(0); 
  }

  getFilterActiveCss() { 
    return this.getFilterCss(1); 
  }

  getFilterCompletedCss() { 
    return this.getFilterCss(2); 
  }

  getListCss(suffixCss) { 
    return '.todo-list' + (suffixCss || ''); 
  }

  getListItemCss(index, suffixCss, excludeParentSelector) {
    suffixCss = (index === undefined ? '' : ':nth-of-type(' + (index + 1) + ')') + (suffixCss || '');
    return excludeParentSelector ? 'li' + suffixCss : this.getListCss(' li' + suffixCss);
  }

  getListItemToggleCss(index) {
    return this.getListItemCss(index, ' .toggle');
  }

  getListItemLabelCss(index) {
    return this.getListItemCss(index, ' label');
  }

  getListItemEditCss(index) {
    return this.getListItemCss(index, ' .edit');
  }

  getEditingListItemInputCss() {
    return this.getListCss(' li.editing .edit');
  }

  // ELEMENT HELPER METHODS
  async ensureAppIsVisibleAndLoaded() {
    await this.browser.wait(until.elementLocated(By.css(this.getNewInputCss())), DEFAULT_TIMEOUT);
    return this.browser.wait(until.elementIsVisible(this.browser.findElement(By.css(this.getNewInputCss()))), DEFAULT_TIMEOUT);
  }

  async waitForElement(css, failMsg) {
    try {
      const element = await this.browser.wait(until.elementLocated(By.css(css)), DEFAULT_TIMEOUT);
      
      // For toggle elements, they might have opacity: 0, so just check if they're present and enabled
      if (css.includes('.toggle')) {
        await this.browser.wait(until.elementIsEnabled(element), DEFAULT_TIMEOUT);
        return element;
      } else {
        // For other elements, check visibility as before
        return await this.browser.wait(until.elementIsVisible(element), DEFAULT_TIMEOUT);
      }
    } catch (error) {
      throw new Error(failMsg || `Element ${css} not found`);
    }
  }

  async waitForVisibility(shouldBeVisible, css, failMsg) {
    if (shouldBeVisible) {
      return this.waitForElement(css, failMsg);
    } else {
      try {
        const element = await this.browser.findElement(By.css(css));
        await this.browser.wait(until.elementIsNotVisible(element), DEFAULT_TIMEOUT);
        return true;
      } catch (error) {
        // Element not found is also "not visible"
        return true;
      }
    }
  }

  async waitForFocusedElement(css, failMsg) {
    const element = await this.waitForElement(css, failMsg);
    const activeElement = await this.browser.switchTo().activeElement();
    const isSame = await this.browser.executeScript('return arguments[0] === arguments[1]', element, activeElement);
    if (!isSame) {
      throw new Error(failMsg || `Element ${css} is not focused`);
    }
    return element;
  }

  async waitForBlurredElement(css, failMsg) {
    const element = await this.browser.findElement(By.css(css));
    const activeElement = await this.browser.switchTo().activeElement();
    const isSame = await this.browser.executeScript('return arguments[0] === arguments[1]', element, activeElement);
    if (isSame) {
      throw new Error(failMsg || `Element ${css} is still focused`);
    }
    return element;
  }

  async waitForTextContent(text, failMsg) {
    return async (element) => {
      await this.browser.wait(async () => {
        const actualText = await element.getText();
        return actualText === text;
      }, DEFAULT_TIMEOUT, failMsg);
      return element;
    };
  }

  // ACTION METHODS
  async enterItem(itemText) {
    const inputElement = await this.waitForElement(this.getNewInputCss());
    await inputElement.sendKeys(itemText + Key.ENTER);
  }

  async toggleItemAtIndex(index) {
    const toggleElement = await this.waitForElement(this.getListItemToggleCss(index));
    await toggleElement.click();
  }

  async clickMarkAllCompletedCheckBox() {
    const toggleAllElement = await this.waitForElement(this.getToggleAllCss());
    await toggleAllElement.click();
  }

  async doubleClickItemAtIndex(index) {
    const labelElement = await this.waitForElement(this.getListItemLabelCss(index));
    const actions = this.browser.actions();
    await actions.doubleClick(labelElement).perform();
  }

  async editItemAtIndex(index, text) {
    const editElement = await this.waitForElement(this.getListItemEditCss(index));
    await editElement.clear();
    await editElement.sendKeys(text);
  }

  async clickClearCompleteButton() {
    const clearButton = await this.waitForElement(this.getClearCompletedButtonCss());
    await clearButton.click();
  }

  async filterByAllItems() {
    const filterElement = await this.waitForElement(this.getFilterAllCss());
    await filterElement.click();
  }

  async filterByActiveItems() {
    const filterElement = await this.waitForElement(this.getFilterActiveCss());
    await filterElement.click();
  }

  async filterByCompletedItems() {
    const filterElement = await this.waitForElement(this.getFilterCompletedCss());
    await filterElement.click();
  }

  async back() {
    await this.browser.navigate().back();
  }

  // WAIT METHODS FOR TEST OPERATIONS
  async waitForListItemCount(expectedCount) {
    await this.browser.wait(async () => {
      try {
        const elements = await this.browser.findElements(By.css(this.getListItemCss()));
        return elements.length === expectedCount;
      } catch (error) {
        return false;
      }
    }, DEFAULT_TIMEOUT, `Expected ${expectedCount} items in list`);
  }

  async waitForMainSectionRemovedOrEmpty() {
    return this.waitForVisibility(false, this.getMainSectionCss(), 'Expected main section to be hidden');
  }

  async waitForClearCompleteButton() {
    return this.waitForElement(this.getClearCompletedButtonCss());
  }
}

module.exports = ModernPage;