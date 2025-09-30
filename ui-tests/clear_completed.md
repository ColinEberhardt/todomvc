# Clear Completed Button - UI Tests

## Overview
These tests verify that the "Clear completed" button works correctly, displaying appropriate text and removing only completed items from the list.

## Test Setup
- Open the TodoMVC application
- Add the standard set of todo items:
  - "buy some cheese"
  - "feed the cat" 
  - "book a doctors appointment"

## Test Cases

### 1. Button Text Display
**What we're testing:** The clear completed button shows the correct text

**Steps:**
1. Mark the second todo item ("feed the cat") as complete by clicking its checkbox
2. Look for the clear completed button in the footer
3. Verify the button text reads "Clear completed"

**Expected result:** Button should display "Clear completed" text when there are completed items

---

### 2. Removing Completed Items
**What we're testing:** Clicking the button removes only completed items

**Steps:**
1. Mark the second todo item ("feed the cat") as complete
2. Click the "Clear completed" button
3. Count the remaining todo items - should be exactly 2
4. Verify the first remaining item is "buy some cheese"
5. Verify the second remaining item is "book a doctors appointment"
6. Confirm that "feed the cat" is no longer in the list

**Expected result:** Only the completed item should be removed, leaving incomplete items untouched

---

### 3. Button Visibility Logic
**What we're testing:** The button appears and disappears based on completion status

**Steps:**
1. Mark the second todo item ("feed the cat") as complete
2. Verify that the clear completed button is visible
3. Click the "Clear completed" button to remove the completed item
4. Check that the clear completed button is now hidden (since no items are completed)

**Expected result:** Button should only be visible when there are completed items to clear