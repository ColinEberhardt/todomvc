# Mark All as Completed - UI Tests

## Overview
These tests verify the "mark all as completed" functionality, which allows users to toggle the completion status of all todo items at once, and ensures the control stays synchronized with individual item changes.

## Test Setup
- Open the TodoMVC application
- Add the standard set of todo items:
  - "buy some cheese"
  - "feed the cat"
  - "book a doctors appointment"

## Test Cases

### 1. Mark All Items as Completed
**What we're testing:** The mark all checkbox completes every todo item at once

**Steps:**
1. Locate the "mark all as complete" checkbox (usually a down arrow or checkbox at the top of the list)
2. Click the mark all as complete control
3. Verify that all three todo items now appear as completed
4. Check that each item shows completion styling (strikethrough, checkmarks, etc.)

**Expected result:** All todo items should be marked as completed simultaneously

---

### 2. Auto-Check When All Items Manually Completed
**What we're testing:** The mark all checkbox automatically becomes checked when all items are individually marked complete

**Steps:**
1. Start with all items incomplete
2. Manually click the toggle checkbox for the first todo item ("buy some cheese")
3. Manually click the toggle checkbox for the second todo item ("feed the cat")  
4. Manually click the toggle checkbox for the third todo item ("book a doctors appointment")
5. Check that the "mark all as complete" checkbox is now automatically checked

**Expected result:** The mark all checkbox should become checked when all individual items are completed

---

### 3. Mark All Items as Incomplete
**What we're testing:** Clicking mark all again uncompletes all items

**Steps:**
1. Use the mark all checkbox to complete all items (they should all be completed)
2. Click the mark all as complete checkbox again
3. Verify that all todo items are now marked as incomplete
4. Check that no items show completion styling

**Expected result:** All items should return to incomplete status

---

### 4. Mark All Checkbox Synchronization
**What we're testing:** The mark all checkbox stays synchronized when individual items are toggled

**Steps:**
1. Use the mark all checkbox to complete all items
2. Verify the mark all checkbox appears checked
3. Manually click the first todo item to mark it as incomplete
4. Check that the mark all checkbox is now unchecked (since not all items are complete)
5. Manually click the first todo item again to mark it as complete
6. Check that the mark all checkbox is now checked again (since all items are complete again)

**Expected result:** 
- Mark all checkbox should be checked only when ALL items are complete
- Mark all checkbox should be unchecked when ANY item is incomplete
- The checkbox should update immediately when individual items change

---

### Visual Elements to Verify

**Mark all control appearance:**
- Usually appears as a down arrow (❯) or checkbox at the top of the todo list
- Should be visually distinct and clearly clickable
- May change appearance when checked vs unchecked

**Synchronization indicators:**
- When all items complete: mark all should appear checked/pressed
- When any item incomplete: mark all should appear unchecked/unpressed
- Changes should be immediate and visually clear