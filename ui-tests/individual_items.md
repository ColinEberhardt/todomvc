# Individual Todo Items - UI Tests

## Overview
These tests verify that users can mark individual todo items as complete or incomplete, and that the completion status is accurately tracked and displayed.

## Test Setup
- Open the TodoMVC application
- Start with an empty todo list

## Test Cases

### 1. Marking Items as Complete
**What we're testing:** Individual items can be marked as complete and incomplete status is preserved for others

**Steps:**
1. Add a todo item "buy some cheese"
2. Add a todo item "feed the cat"
3. Click the toggle checkbox for the first todo item to mark it as complete
4. Verify that the first todo item appears as completed (should have visual indication like strikethrough or checkmark)
5. Verify that the second todo item remains marked as incomplete (no completion styling)
6. Click the toggle checkbox for the second todo item to mark it as complete
7. Verify that both todo items now appear as completed

**Expected result:** 
- Items should show clear visual distinction between complete and incomplete states
- Marking one item as complete should not affect the status of other items
- Both items should be markable as complete independently

---

### 2. Unmarking Items as Complete
**What we're testing:** Completed items can be returned to incomplete status

**Steps:**
1. Add a todo item "buy some cheese"
2. Add a todo item "feed the cat"  
3. Click the toggle checkbox for the first todo item to mark it as complete
4. Verify that the first todo item appears as completed
5. Verify that the second todo item appears as incomplete
6. Click the toggle checkbox for the first todo item again to mark it as incomplete
7. Verify that both todo items now appear as incomplete (no completion styling on either)

**Expected result:**
- Previously completed items should be returnable to incomplete status
- Toggling completion status should work in both directions
- Visual styling should update immediately to reflect the current state

---

### Visual Indicators to Check
When testing completion status, verify these visual elements:
- **Completed items:** Usually have strikethrough text, checked checkbox, or grayed-out appearance
- **Incomplete items:** Normal text styling, unchecked checkbox, full opacity
- **Checkboxes:** Should clearly show checked/unchecked state
- **Text styling:** Should immediately reflect the completion status