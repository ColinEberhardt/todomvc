# Todo Counter - UI Tests

## Overview
These tests verify that the counter accurately displays the number of remaining (incomplete) todo items using proper grammar.

## Test Setup
- Open the TodoMVC application
- Start with an empty todo list

## Test Cases

### 1. Counter Updates with Item Addition
**What we're testing:** The counter shows the correct count and uses proper singular/plural grammar

**Steps:**
1. Add a todo item "buy some cheese"
2. Check that the counter displays "1 item left" (singular)
3. Add another todo item "feed the cat" 
4. Check that the counter now displays "2 items left" (plural)

**Expected result:** 
- With 1 item: "1 item left" (singular "item")
- With 2 items: "2 items left" (plural "items")

---

### Additional Counter Scenarios to Verify

**Zero items:**
- When the list is empty, counter should not be visible or should show appropriate text

**Completed items:**
- Counter should only count incomplete items
- If you have 3 total items and 1 is completed, counter should show "2 items left"

**Grammar accuracy:**
- Always use "item" for count of 1
- Always use "items" for any count other than 1 (0, 2, 3, etc.)