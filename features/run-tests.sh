#!/bin/bash

# TodoMVC BDD Test Runner
# This script provides convenient commands for running the test suite

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_color() {
    printf "${2}${1}${NC}\n"
}

# Function to show usage
show_usage() {
    print_color "TodoMVC BDD Test Runner" $BLUE
    echo ""
    print_color "Usage: ./run-tests.sh [COMMAND] [OPTIONS]" $YELLOW
    echo ""
    echo "Commands:"
    echo "  setup     - Install dependencies and browsers"
    echo "  test      - Run all tests (headless)"
    echo "  debug     - Run tests in debug mode (visible browser, slow motion)"
    echo "  watch     - Run tests with visible browser"
    echo "  feature   - Run specific feature file"
    echo "  scenario  - Run specific scenario by name"
    echo "  help      - Show this help message"
    echo ""
    echo "Examples:"
    echo "  ./run-tests.sh setup"
    echo "  ./run-tests.sh test"
    echo "  ./run-tests.sh debug"
    echo "  ./run-tests.sh watch"
    echo "  ./run-tests.sh feature adding_todos.feature"
    echo "  ./run-tests.sh scenario \"Add todo items\""
    echo ""
}

# Change to the features directory
cd "$(dirname "$0")"

case "${1:-help}" in
    "setup")
        print_color "🔧 Setting up test environment..." $BLUE
        npm install
        npm run install:playwright
        print_color "✅ Setup complete!" $GREEN
        ;;
    
    "test")
        print_color "🧪 Running BDD tests (headless mode)..." $BLUE
        npm test
        print_color "✅ Tests completed!" $GREEN
        ;;
    
    "debug")
        print_color "🐛 Running tests in debug mode..." $YELLOW
        DEBUG=true HEADLESS=false npm test
        ;;
    
    "watch")
        print_color "👀 Running tests with visible browser..." $BLUE
        HEADLESS=false npm test
        ;;
    
    "feature")
        if [ -z "$2" ]; then
            print_color "❌ Please specify a feature file" $RED
            echo "Example: ./run-tests.sh feature adding_todos.feature"
            exit 1
        fi
        print_color "🧪 Running feature: $2" $BLUE
        npx cucumber-js "$2"
        ;;
    
    "scenario")
        if [ -z "$2" ]; then
            print_color "❌ Please specify a scenario name" $RED
            echo "Example: ./run-tests.sh scenario \"Add todo items\""
            exit 1
        fi
        print_color "🧪 Running scenario: $2" $BLUE
        npx cucumber-js --name "$2"
        ;;
    
    "help"|*)
        show_usage
        ;;
esac