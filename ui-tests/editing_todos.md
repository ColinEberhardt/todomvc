# Editing Todo Items - UI Tests

## Overview
These tests verify that users can edit existing todo items using double-click interaction, with proper focus management and save/cancel functionality.

## Test Setup
- Open the TodoMVC application
- Add the standard set of todo items:
  - "buy some cheese"
  - "feed the cat"
  - "book a doctors appointment"
- Double-click on the second todo item ("feed the cat") to enter edit mode

## Test Cases

### 1. Edit Mode Focus Management
**What we're testing:** Proper focus behavior when entering edit mode

**Steps:**
1. After double-clicking the second todo item, verify that:
   - The item's input field receives focus (cursor should be active in the text field)
   - The main todo input field at the top loses focus (should be blurred)

**Expected result:** Focus should transfer from the main input to the item being edited

---

### 2. Interface Changes During Editing
**What we're testing:** Other controls are hidden while editing an item

**Steps:**
1. While in edit mode for the second todo item, verify that:
   - The toggle checkbox for that item is hidden
   - The text label for that item is hidden (replaced by the input field)

**Expected result:** Only the edit input field should be visible for the item being edited

---

### 3. Save Changes with Enter Key
**What we're testing:** Pressing Enter saves the edited text

**Steps:**
1. While editing the second todo item, change the text to "buy some sausages"
2. Press the Enter key
3. Verify that the second todo item now displays "buy some sausages"
4. Confirm that edit mode has ended

**Expected result:** Changes should be saved and edit mode should exit

---

### 4. Save Changes on Focus Loss
**What we're testing:** Clicking elsewhere saves the edited text

**Steps:**
1. While editing the second todo item, change the text to "buy some sausages"
2. Click on the toggle checkbox of the first todo item (to shift focus away)
3. Verify that the second todo item now displays "buy some sausages"
4. Confirm that edit mode has ended

**Expected result:** Changes should be saved when focus moves away from the edit field

---

### 5. Whitespace Trimming
**What we're testing:** Extra spaces are removed from edited text

**Steps:**
1. While editing the second todo item, change the text to "    buy some sausages  " (with extra spaces)
2. Press Enter to save
3. Verify that the todo item displays exactly "buy some sausages" without the extra spaces

**Expected result:** Leading and trailing whitespace should be automatically removed

---

### 6. Delete Item with Empty Text
**What we're testing:** Entering empty text deletes the todo item

**Steps:**
1. While editing the second todo item, delete all text (make it completely empty)
2. Press Enter to save
3. Verify that there are now only 2 todo items remaining
4. Check that the first item is "buy some cheese"
5. Check that the second item is "book a doctors appointment"
6. Confirm that "feed the cat" has been completely removed

**Expected result:** The todo item should be deleted when saved with empty text

---

### 7. Cancel Changes with Escape Key
**What we're testing:** Pressing Escape cancels edits and reverts to original text

**Steps:**
1. While editing the second todo item, change the text to "foo"
2. Press the Escape key (before pressing Enter or clicking elsewhere)
3. Verify that the second todo item still displays the original text "feed the cat"
4. Confirm that edit mode has ended without saving changes

**Expected result:** Original text should be restored and changes should be discarded