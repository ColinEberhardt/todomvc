'use strict';

const { By } = require('selenium-webdriver');

class ModernTestOperations {
  constructor(page) {
    this.page = page;
    this.browser = page.browser;
  }

  async assertItemInputFocused() {
    return this.page.waitForFocusedElement(this.page.getEditingListItemInputCss(), 'Expected the item input to be focused');
  }

  async assertNewInputFocused() {
    return this.page.waitForFocusedElement(this.page.getNewInputCss());
  }

  async assertNewInputBlurred() {
    return this.page.waitForBlurredElement(this.page.getNewInputCss());
  }

  async assertItemCount(itemCount) {
    if (itemCount === 0) {
      return this.page.waitForMainSectionRemovedOrEmpty();
    } else {
      return this.page.waitForListItemCount(itemCount);
    }
  }

  async assertClearCompleteButtonText(buttonText) {
    const button = await this.page.waitForClearCompleteButton();
    const textContentFn = await this.page.waitForTextContent(buttonText, 'Expected clear button text to be ' + buttonText);
    return textContentFn(button);
  }

  async assertClearCompleteButtonVisibility(shouldBeVisible) {
    const failMsg = 'Expected the clear completed items button to be ' + (shouldBeVisible ? 'visible' : 'hidden');
    return this.page.waitForVisibility(shouldBeVisible, this.page.getClearCompletedButtonCss(), failMsg);
  }

  async assertMainSectionVisibility(shouldBeVisible) {
    const failMsg = 'Expected main section to be ' + (shouldBeVisible ? 'visible' : 'hidden');
    return this.page.waitForVisibility(shouldBeVisible, this.page.getMainSectionCss(), failMsg);
  }

  async assertFooterVisibility(shouldBeVisible) {
    const failMsg = 'Expected footer to be ' + (shouldBeVisible ? 'visible' : 'hidden');
    return this.page.waitForVisibility(shouldBeVisible, this.page.getFooterSectionCss(), failMsg);
  }

  async assertItemToggleIsHidden(index) {
    return this.page.waitForVisibility(false, this.page.getListItemToggleCss(index),
      'Expected the item toggle button to be hidden');
  }

  async assertItemLabelIsHidden(index) {
    return this.page.waitForVisibility(false, this.page.getListItemLabelCss(index), 'Expected the item label to be hidden');
  }

  async assertNewItemInputFieldText(expectedText) {
    const inputElement = await this.page.waitForElement(this.page.getNewInputCss());
    const actualText = await inputElement.getAttribute('value');
    if (actualText !== expectedText) {
      throw new Error(`Expected input field text to be "${expectedText}" but was "${actualText}"`);
    }
  }

  async assertItemText(index, expectedText) {
    const labelElement = await this.page.waitForElement(this.page.getListItemLabelCss(index));
    const actualText = await labelElement.getText();
    if (actualText !== expectedText) {
      throw new Error(`Expected item ${index} text to be "${expectedText}" but was "${actualText}"`);
    }
  }

  async assertItems(expectedItems) {
    // Count only non-hidden expected items (this is what should be visible)
    const expectedVisibleItems = expectedItems.filter(item => item !== this.page.ITEM_HIDDEN_OR_REMOVED);
    
    // Wait for the correct number of visible items (some implementations remove DOM elements, others hide them)
    await this.page.waitForListItemCount(expectedVisibleItems.length);
    
    // Get all visible todo items from the DOM
    const listItems = await this.browser.findElements(By.css('.todo-list li'));
    const visibleItems = [];
    
    for (const item of listItems) {
      try {
        if (await item.isDisplayed()) {
          const labelElement = await item.findElement(By.css('label'));
          const text = await labelElement.getText();
          visibleItems.push(text);
        }
      } catch (e) {
        // Skip if element is stale or doesn't have a label
        continue;
      }
    }
    
    // Check that we have the expected visible items
    if (visibleItems.length !== expectedVisibleItems.length) {
      throw new Error(`Expected ${expectedVisibleItems.length} visible items but found ${visibleItems.length}: [${visibleItems.join(', ')}]`);
    }
    
    // Check that each expected visible item is present
    for (const expectedItem of expectedVisibleItems) {
      if (!visibleItems.includes(expectedItem)) {
        throw new Error(`Expected item "${expectedItem}" to be visible but only found: [${visibleItems.join(', ')}]`);
      }
    }
  }

  async assertItemCompletedStates(expectedStates) {
    for (let i = 0; i < expectedStates.length; i++) {
      const toggleElement = await this.page.waitForElement(this.page.getListItemToggleCss(i));
      const isChecked = await toggleElement.isSelected();
      if (isChecked !== expectedStates[i]) {
        throw new Error(`Expected item ${i} completed state to be ${expectedStates[i]} but was ${isChecked}`);
      }
    }
  }

  async assertCompleteAllCheckedStatus(shouldBeChecked) {
    const toggleAllElement = await this.page.waitForElement(this.page.getToggleAllCss());
    const isChecked = await toggleAllElement.isSelected();
    if (isChecked !== shouldBeChecked) {
      throw new Error(`Expected complete all checkbox to be ${shouldBeChecked ? 'checked' : 'unchecked'} but was ${isChecked ? 'checked' : 'unchecked'}`);
    }
  }

  async assertItemCountText(expectedText) {
    const countElement = await this.page.waitForElement(this.page.getItemCountCss());
    const textContentFn = await this.page.waitForTextContent(expectedText, 'Expected item count text to be ' + expectedText);
    return textContentFn(countElement);
  }

  async assertTodoIsVisible(expectedText) {
    // Find all visible todo labels and check if any contains the expected text
    const labelElements = await this.page.browser.findElements(By.css('.todo-list li label'));
    const visibleLabels = [];
    
    for (const labelElement of labelElements) {
      try {
        if (await labelElement.isDisplayed()) {
          const text = await labelElement.getText();
          visibleLabels.push(text);
          if (text === expectedText) {
            return; // Found the todo, test passes
          }
        }
      } catch (e) {
        // Element might be stale, skip it
        continue;
      }
    }
    
    throw new Error(`Expected todo "${expectedText}" to be visible, but only found: [${visibleLabels.join(', ')}]`);
  }

  async assertFilterAtIndexIsSelected(index) {
    const filterElement = await this.page.waitForElement(this.page.getSelectedFilterCss(index));
    if (!filterElement) {
      throw new Error(`Expected filter at index ${index} to be selected`);
    }
  }
}

module.exports = ModernTestOperations;