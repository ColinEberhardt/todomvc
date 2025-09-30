# Adding New Todos - UI Tests

## Overview
These tests verify that users can successfully add new todo items to their list and that the interface behaves correctly when items are added.

## Test Setup
- Open the TodoMVC application in a browser
- Ensure the application starts with an empty todo list

## Test Cases

### 1. Basic Todo Addition
**What we're testing:** Users can add multiple todo items

**Steps:**
1. Type "buy some cheese" in the input field and press Enter
2. Verify that exactly 1 todo item appears in the list
3. Check that the todo text shows "buy some cheese"
4. Type "feed the cat" in the input field and press Enter  
5. Verify that exactly 2 todo items are now visible
6. Check that both todos display correctly: "buy some cheese" and "feed the cat"

**Expected result:** Both items should be visible and display the correct text

---

### 2. Input Field Clearing
**What we're testing:** The input field automatically clears after adding an item

**Steps:**
1. Type "buy some cheese" in the input field and press Enter
2. Check that the input field is now empty and ready for the next entry

**Expected result:** Input field should be completely empty

---

### 3. Item Ordering
**What we're testing:** New items are added to the bottom of the list in the correct order

**Steps:**
1. Add "buy some cheese" to the list
2. Add "feed the cat" to the list  
3. Add "book a doctors appointment" to the list
4. Verify there are exactly 3 items total
5. Check that the first item shows "buy some cheese"
6. Check that the second item shows "feed the cat"
7. Check that the third item shows "book a doctors appointment"

**Expected result:** Items should appear in the exact order they were added

---

### 4. Whitespace Handling
**What we're testing:** Extra spaces are automatically trimmed from todo text

**Steps:**
1. Type "   buy some cheese  " (with spaces before and after) and press Enter
2. Check that the todo item displays exactly "buy some cheese" without the extra spaces

**Expected result:** Only the core text should be displayed, with leading and trailing spaces removed

---

### 5. Interface Visibility
**What we're testing:** The main interface sections appear when todos are added

**Steps:**
1. Start with empty todo list (main and footer sections should be hidden)
2. Add "buy some cheese" to the list
3. Verify that the main section (containing the todo list) becomes visible
4. Verify that the footer section (with controls) becomes visible

**Expected result:** Both main and footer sections should be displayed after adding the first item