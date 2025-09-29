#!/bin/bash

# Create reports directory if it doesn't exist
mkdir -p reports

# Run the BDD tests
echo "Running TodoMVC BDD Tests..."
npm test

echo "BDD tests completed. Check the reports directory for detailed results."