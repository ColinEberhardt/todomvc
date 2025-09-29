Feature: Adding New Todos
  As a user
  I want to add new todo items
  So that I can keep track of things I need to do

  Background:
    Given I open the TodoMVC application

  Scenario: Add todo items
    When I add a todo "buy some cheese"
    Then I should see 1 todo item
    And the todo should be "buy some cheese"
    When I add a todo "feed the cat"
    Then I should see 2 todo items
    And the todos should be "buy some cheese" and "feed the cat"

  Scenario: Clear input field after adding item
    When I add a todo "buy some cheese"
    Then the input field should be empty

  Scenario: Append new items to bottom of list
    When I add a todo "buy some cheese"
    And I add a todo "feed the cat"
    And I add a todo "book a doctors appointment"
    Then I should see 3 todo items
    And the first todo should be "buy some cheese"
    And the second todo should be "feed the cat"
    And the third todo should be "book a doctors appointment"

  Scenario: Trim whitespace from input
    When I add a todo "   buy some cheese  "
    Then the first todo should be "buy some cheese"

  Scenario: Show main and footer sections when items are added
    When I add a todo "buy some cheese"
    Then the main section should be visible
    And the footer section should be visible