# UI Tests - Informal Test Documentation

## Overview

This folder contains human-readable test documentation for the TodoMVC application. Unlike the formal BDD (Behavior Driven Development) tests in the `features` folder, these tests are written in plain English to be easily understood by anyone on the team, including non-technical stakeholders.

## Purpose

These informal tests serve multiple purposes:
- **Documentation**: Clear explanations of expected application behavior
- **Manual Testing Guide**: Step-by-step instructions for manual QA testing
- **Requirements Verification**: Human-readable specifications for developers
- **Onboarding**: Help new team members understand application functionality

## Test Format

Each test file follows a consistent structure:

### Header Section
- **Overview**: Brief description of what functionality is being tested
- **Test Setup**: Prerequisites and initial conditions needed

### Test Cases
Each test case includes:
- **What we're testing**: Clear statement of the test objective
- **Steps**: Numbered, specific actions to perform
- **Expected result**: What should happen if the feature works correctly

## Test Files

| File | Description |
|------|-------------|
| `adding_todos.md` | Tests for creating new todo items |
| `clear_completed.md` | Tests for the "Clear completed" button functionality |
| `counter.md` | Tests for the todo item counter display |
| `editing_todos.md` | Tests for editing existing todo items |
| `individual_items.md` | Tests for marking items complete/incomplete |
| `initial_state.md` | Tests for application startup behavior |
| `mark_all_completed.md` | Tests for the "mark all" toggle functionality |
| `routing.md` | Tests for filtering and URL routing |

## How to Use These Tests

### For Manual Testing
1. Open the TodoMVC application in a browser
2. Follow the "Test Setup" instructions for each file
3. Execute each test case step by step
4. Verify that actual results match the expected results
5. Document any discrepancies or bugs found

### For Automated Test Development
- Use these descriptions as specifications when writing automated tests
- The clear steps can be translated into code actions (clicks, typing, assertions)
- Expected results provide specific criteria for test assertions

### For Requirements Review
- Share these files with stakeholders to confirm expected behavior
- Use them in design reviews to ensure UI/UX requirements are captured
- Reference them when discussing feature changes or enhancements

## Relationship to BDD Tests

These informal tests correspond directly to the formal Gherkin/BDD tests in the `features` folder:

- `adding_todos.md` ↔ `adding_todos.feature`
- `clear_completed.md` ↔ `clear_completed.feature`
- `counter.md` ↔ `counter.feature`
- `editing_todos.md` ↔ `editing_todos.feature`
- `individual_items.md` ↔ `individual_items.feature`
- `initial_state.md` ↔ `initial_state.feature`
- `mark_all_completed.md` ↔ `mark_all_completed.feature`
- `routing.md` ↔ `routing.feature`

## Benefits of This Format

**Accessibility**: Anyone can read and understand these tests without knowing BDD syntax

**Detail**: More descriptive explanations and context than formal test syntax allows

**Flexibility**: Easy to add notes, tips, and additional context

**Collaboration**: Non-technical team members can contribute to test planning and review

**Documentation**: Serves as both tests and user documentation

## Maintenance

When updating functionality:
1. Update the corresponding informal test documentation
2. Ensure the formal BDD tests are also updated to match
3. Review that both formats capture the same requirements and expectations