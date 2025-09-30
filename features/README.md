# TodoMVC BDD Test Suite

This is a comprehensive automated test suite for the TodoMVC jQuery example using Behavior-Driven Development (BDD) principles.

## Technology Stack

- **Cucumber.js**: BDD test framework for writing human-readable test scenarios
- **Playwright**: Modern web automation library for cross-browser testing
- **Node.js**: JavaScript runtime for test execution

## Features Tested

The test suite covers all major TodoMVC functionality:

1. **Initial State** - App loads correctly with proper focus and hidden sections
2. **Adding Todos** - Creating new todo items with validation
3. **Counter** - Display of remaining todo items count
4. **Individual Items** - Marking items as complete/incomplete
5. **Editing Todos** - In-place editing of todo text
6. **Clear Completed** - Removing all completed items at once
7. **Mark All Completed** - Toggle all items completion state
8. **Routing & Filtering** - Filter todos by All/Active/Completed states

## Setup

1. **Install dependencies:**
   ```bash
   cd features
   npm install
   ```

2. **Install Playwright browsers:**
   ```bash
   npm run install:playwright
   ```

   Or run the complete setup:
   ```bash
   npm run setup
   ```

## Running Tests

### Run all tests (headless mode):
```bash
npm test
```

### Run tests with browser visible:
```bash
HEADLESS=false npm test
```

### Run tests in debug mode (slow motion + devtools):
```bash
npm run test:debug
```

### Run specific feature:
```bash
npx cucumber-js adding_todos.feature
```

### Run specific scenario:
```bash
npx cucumber-js adding_todos.feature --name "Add todo items"
```

## Test Reports

After running tests, reports are generated in the `reports/` directory:

- `cucumber_report.json` - JSON format for CI/CD integration
- `cucumber_report.html` - HTML report for human viewing

## Project Structure

```
features/
├── package.json              # Dependencies and npm scripts
├── cucumber.js               # Cucumber configuration
├── *.feature                 # BDD feature files (test scenarios)
├── support/
│   ├── world.js              # Test context and browser setup
│   └── hooks.js              # Before/After test hooks
├── step_definitions/
│   ├── common_steps.js       # Reusable step definitions
│   ├── adding_todos_steps.js # Steps for adding todos
│   ├── counter_steps.js      # Steps for counter functionality
│   ├── editing_steps.js      # Steps for editing todos
│   ├── clear_completed_steps.js # Steps for clear completed
│   ├── mark_all_completed_steps.js # Steps for mark all
│   ├── routing_steps.js      # Steps for filtering/routing
│   └── initial_state_steps.js # Steps for initial state
└── reports/                  # Generated test reports
```

## Writing New Tests

1. **Add scenarios to existing .feature files** or create new ones
2. **Implement step definitions** in the appropriate step files
3. **Use the TodoWorld helper methods** for common operations:
   - `this.addTodo(text)` - Add a new todo
   - `this.getTodoCount()` - Get number of todos
   - `this.markTodoComplete(index)` - Mark todo as complete
   - `this.filterBy(filter)` - Apply filter (all/active/completed)

## Environment Variables

- `HEADLESS=false` - Run tests with visible browser
- `DEBUG=true` - Enable debug mode (slow motion + console logs)

## Debugging

When tests fail:
1. Screenshots are automatically captured and attached to reports
2. Use `DEBUG=true` to see browser actions in slow motion
3. Console logs from the page are displayed in debug mode
4. Use `HEADLESS=false` to watch tests execute in real-time

## CI/CD Integration

The test suite is designed for easy CI/CD integration:
- Returns proper exit codes (0 for success, non-zero for failure)
- Generates machine-readable JSON reports
- Supports parallel execution (configurable in cucumber.js)
- Works in headless mode by default

Example GitHub Actions usage:
```yaml
- name: Run BDD Tests
  run: |
    cd features
    npm install
    npm run install:playwright
    npm test
```