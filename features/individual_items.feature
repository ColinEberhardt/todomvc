Feature: Individual Todo Items
  As a user
  I want to manage individual todo items
  So that I can track completion status

  Background:
    Given I open the TodoMVC application

  Scenario: Mark items as complete
    When I add a todo "buy some cheese"
    And I add a todo "feed the cat"
    And I mark the first todo as complete
    Then the first todo should be marked as completed
    And the second todo should be marked as incomplete
    When I mark the second todo as complete
    Then both todos should be marked as completed

  Scenario: Unmark items as complete
    When I add a todo "buy some cheese"
    And I add a todo "feed the cat"
    And I mark the first todo as complete
    Then the first todo should be marked as completed
    And the second todo should be marked as incomplete
    When I mark the first todo as incomplete
    Then both todos should be marked as incomplete