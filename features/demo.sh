#!/bin/bash

# Quick demo of the TodoMVC BDD test suite
# This script runs a single feature to demonstrate the test automation

cd "$(dirname "$0")"

echo "🚀 TodoMVC BDD Test Suite Demo"
echo "==============================="
echo ""
echo "This demo will run the 'Initial State' feature to show how the automated tests work."
echo ""

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

# Check if Playwright browsers are installed
if [ ! -d "$HOME/Library/Caches/ms-playwright/chromium-"* ]; then
    echo "🌐 Installing Playwright browsers..."
    npx playwright install chromium
    echo ""
fi

echo "🧪 Running Initial State feature tests..."
echo ""

# Run the initial state feature with visible browser for demo
HEADLESS=false npx cucumber-js initial_state.feature

echo ""
echo "✅ Demo completed!"
echo ""
echo "To run all tests: npm test"
echo "To run with visible browser: HEADLESS=false npm test"
echo "To run in debug mode: npm run test:debug"
echo ""
echo "See README.md for more options and documentation."