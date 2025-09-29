# TodoMVC BDD Tests

This directory contains Behavior-Driven Development (BDD) tests for the TodoMVC application using Cucumber.js with Gherkin syntax.

## Overview

The BDD tests are organized into feature files that describe the behavior of the TodoMVC application in natural language. Each feature file contains scenarios written in Gherkin syntax that can be easily understood by both technical and non-technical stakeholders.

## Features

The test suite covers the following features:

- **Initial State** (`initial_state.feature`): Tests for the application's initial state
- **Adding Todos** (`adding_todos.feature`): Tests for adding new todo items
- **Mark All Completed** (`mark_all_completed.feature`): Tests for the "mark all as complete" functionality
- **Individual Items** (`individual_items.feature`): Tests for managing individual todo items
- **Editing Todos** (`editing_todos.feature`): Tests for editing existing todo items
- **Counter** (`counter.feature`): Tests for the todo counter display
- **Clear Completed** (`clear_completed.feature`): Tests for clearing completed items
- **Persistence** (`persistence.feature`): Tests for data persistence across navigation
- **Routing** (`routing.feature`): Tests for filtering and routing functionality

## Prerequisites

1. Node.js installed
2. Chrome browser installed
3. TodoMVC application running (typically on http://localhost:8080)

## Installation

The BDD tests use modern versions of Selenium WebDriver and ChromeDriver for better compatibility:

```bash
cd features
npm install
```

## Running Tests

### Basic Test Run
```bash
npm test
```

### Generate HTML Report
```bash
npm run test:html
```

### Generate JSON Report
```bash
npm run test:json
```

### Environment Variables

You can customize test execution using environment variables:

- `BASE_URL`: The URL of the TodoMVC application (default: http://localhost:8080)
- `HEADLESS`: Set to 'true' to run in headless mode (default: false)
- `CI`: Set to 'true' to automatically enable headless mode for CI/CD
- `CHROME_PATH`: Path to Chrome binary if not in standard location

Example:
```bash
BASE_URL=http://localhost:3000 HEADLESS=true npm test
```

## Test Structure

### Feature Files
Feature files are written in Gherkin syntax and located in the `features/` directory. Each file describes a specific aspect of the TodoMVC application's behavior.

### Step Definitions
Step definitions are JavaScript functions that implement the steps described in the feature files. They are located in `features/step_definitions/steps.js`.

### Support Files
Support files contain setup and teardown logic, world configuration, and other test utilities. They are located in the `features/support/` directory.

## Converting from Original Tests

These BDD tests are equivalent to the original Mocha tests found in the `tests/` directory but use modern dependencies. The key differences:

1. **Modern Dependencies**: Uses Selenium WebDriver 4.x and ChromeDriver 119.x for better compatibility
2. **Natural Language**: Tests are written in Gherkin syntax using Given/When/Then steps
3. **Stakeholder Friendly**: Non-technical stakeholders can read and understand the tests
4. **Reusable Steps**: Common steps can be reused across multiple scenarios
5. **Living Documentation**: Feature files serve as living documentation of the application's behavior
6. **Self-Contained**: No dependency on the original test infrastructure

## Test Data

The tests use the same standard test data as the original tests:
- "buy some cheese"
- "feed the cat"  
- "book a doctors appointment"

## Browser Compatibility

The tests are configured to run with Chrome by default but can be configured to use other browsers supported by Selenium WebDriver.

## Reports

Test reports are generated in the `reports/` directory:
- `cucumber-report.html`: Human-readable HTML report
- `cucumber-report.json`: Machine-readable JSON report for CI/CD integration