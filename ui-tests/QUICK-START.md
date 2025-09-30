# Quick Start Guide - TodoMVC Automated Tests

## Prerequisites
- Node.js 18+ installed
- Git (for cloning if needed)

## Setup (First Time)

1. **Navigate to the test directory:**
   ```bash
   cd ui-tests
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Install browser binaries:**
   ```bash
   npm run install:browsers
   ```

4. **Verify setup works:**
   ```bash
   npm run test:verify
   ```

## Running Tests

### Quick Commands
```bash
# Run all tests (headless)
npm test

# Run tests with visible browser
npm run test:headed

# Run specific test file
npx playwright test adding-todos.spec.ts

# Run tests in debug mode
npm run test:debug
```

### Interactive Mode
```bash
# Launch Playwright's test UI for interactive testing
npm run test:ui
```

## Viewing Results

```bash
# Show HTML test report after running tests
npm run test:report
```

## Test Files Overview

| File | Description |
|------|-------------|
| `adding-todos.spec.ts` | Adding new todo items |
| `individual-items.spec.ts` | Marking items complete/incomplete |
| `counter.spec.ts` | Todo counter display |
| `editing-todos.spec.ts` | Editing existing todos |
| `initial-state.spec.ts` | Application startup behavior |
| `mark-all-completed.spec.ts` | "Mark all" toggle functionality |
| `clear-completed.spec.ts` | "Clear completed" button |
| `routing.spec.ts` | Filtering and URL routing |

## Common Issues

### Port Already in Use
If you see an error about port 7001 being in use:
```bash
# Kill any process using port 7001
sudo lsof -ti:7001 | xargs kill -9
```

### Browser Installation Issues
If browsers don't install correctly:
```bash
# Force reinstall browsers
npx playwright install --force
```

### Test Failures
- Check that the jQuery TodoMVC app is working by visiting http://localhost:7001 manually
- Review the test output and screenshots in the `test-results/` folder
- Use `npm run test:headed` to see what's happening in the browser

## Development Tips

1. **Use headed mode during development**: `npm run test:headed`
2. **Focus on specific tests**: `npx playwright test --grep "should add multiple"`
3. **Debug step by step**: `npm run test:debug`
4. **Check the page object model**: Look at `src/pages/TodoPage.ts` for available methods
5. **Review test reports**: Always check `npm run test:report` after failures

## Getting Help

- Check the full README: `README-AUTOMATED.md`
- Playwright documentation: https://playwright.dev/
- Test specifications: The original `.md` files in this directory