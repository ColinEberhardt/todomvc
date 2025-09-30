# Routing and Filtering - UI Tests

## Overview
These tests verify that users can filter todo items by their completion status (All, Active, Completed) and that the URL routing and browser navigation work correctly with these filters.

## Test Setup
- Open the TodoMVC application
- Add the standard set of todo items:
  - "buy some cheese"
  - "feed the cat"
  - "book a doctors appointment"
- Mark the second todo item ("feed the cat") as complete

## Test Cases

### 1. Display Active (Incomplete) Items Only
**What we're testing:** The Active filter shows only incomplete todo items

**Steps:**
1. Click the "Active" filter button in the footer
2. Verify that you can see the first todo: "buy some cheese"
3. Verify that you can see the third todo: "book a doctors appointment"  
4. Verify that the second todo ("feed the cat") is hidden or not displayed
5. Count the visible items - should be exactly 2

**Expected result:** Only incomplete items should be visible when Active filter is selected

---

### 2. Display Completed Items Only
**What we're testing:** The Completed filter shows only completed todo items

**Steps:**
1. Click the "Completed" filter button in the footer
2. Verify that you can see the second todo: "feed the cat"
3. Verify that the first todo ("buy some cheese") is hidden or not displayed
4. Verify that the third todo ("book a doctors appointment") is hidden or not displayed
5. Count the visible items - should be exactly 1

**Expected result:** Only completed items should be visible when Completed filter is selected

---

### 3. Display All Items
**What we're testing:** The All filter shows every todo item regardless of completion status

**Steps:**
1. Start by applying the Active filter (so only incomplete items show)
2. Then apply the Completed filter (so only completed items show)  
3. Finally click the "All" filter button
4. Verify that all 3 todo items are now visible
5. Check that the first todo is "buy some cheese"
6. Check that the second todo is "feed the cat"
7. Check that the third todo is "book a doctors appointment"

**Expected result:** All items should be visible with their current completion status when All filter is selected

---

### 4. Filter Button Highlighting
**What we're testing:** The currently active filter is visually highlighted

**Steps:**
1. When the page first loads, verify that the "All" filter button appears selected/highlighted
2. Click the "Active" filter button
3. Verify that the "Active" filter button now appears selected/highlighted
4. Verify that the "All" filter button no longer appears selected
5. Click the "Completed" filter button  
6. Verify that the "Completed" filter button now appears selected/highlighted
7. Verify that the "Active" filter button no longer appears selected

**Expected result:** Only the currently active filter should be visually highlighted at any time

---

### 5. Browser Back Button Navigation
**What we're testing:** Browser back/forward buttons work correctly with filter changes

**Steps:**
1. Start on the default "All" filter (should show all 3 items)
2. Click the "Active" filter button (URL should change, should show 2 items)
3. Click the "Completed" filter button (URL should change, should show 1 item)
4. Use the browser's back button once
5. Verify you're back on "Active" filter showing the first and third todos
6. Verify the second todo ("feed the cat") is hidden
7. Use the browser's back button again
8. Verify you're back on "All" filter showing all 3 todos

**Expected result:** Browser navigation should correctly restore previous filter states

---

### URL and Visual Indicators to Check

**URL routing:**
- Default: usually ends with `#/` or `#/all`
- Active filter: usually ends with `#/active`  
- Completed filter: usually ends with `#/completed`

**Filter button styling:**
- Selected filter: different background, border, or text color
- Unselected filters: standard button appearance
- Clear visual distinction between selected and unselected states

**Item visibility:**
- Hidden items: completely removed from view (not just grayed out)
- Visible items: normal display with current completion styling
- No layout shifts when switching between filters