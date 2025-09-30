# Initial Application State - UI Tests

## Overview
These tests verify that the TodoMVC application starts in the correct state when first loaded, with proper focus and visibility settings.

## Test Setup
- Open the TodoMVC application in a fresh browser session
- Ensure no previous data or state is cached

## Test Cases

### 1. Input Field Focus on Page Load
**What we're testing:** The main todo input field is automatically focused when the page loads

**Steps:**
1. Load the TodoMVC application page
2. Wait for the page to fully load
3. Check that the todo input field (where users type new todos) has keyboard focus
4. Verify that you can immediately start typing without clicking anything

**Expected result:** 
- The cursor should be blinking in the todo input field
- Typing should immediately enter text in the input field
- No mouse click should be required to start entering a new todo

---

### 2. Hidden Interface Sections When Empty
**What we're testing:** Main content areas are hidden when no todos exist

**Steps:**
1. Load the TodoMVC application page (should start with empty todo list)
2. Look for the main section (the area that would contain the todo list)
3. Look for the footer section (the area that would contain filters and counters)
4. Verify that both sections are hidden/not visible

**Expected result:**
- The main section should not be displayed (since there are no todos to show)
- The footer section should not be displayed (since there are no todos to count or filter)
- Only the header with the input field should be visible

---

### Interface Elements to Check

**Always visible on load:**
- Application title/header
- Todo input field
- Input field placeholder text (usually "What needs to be done?")

**Hidden until todos are added:**
- Todo list container (main section)
- Item counter
- Filter buttons (All, Active, Completed)
- Clear completed button
- Mark all as complete toggle

**Focus indicators to verify:**
- Cursor blinking in the input field
- Input field border/styling showing active focus
- Ability to type immediately without clicking