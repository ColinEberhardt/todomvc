Feature: Todo Counter
  As a user
  I want to see the number of remaining todos
  So that I know how many items I have left to complete

  Background:
    Given I open the TodoMVC application

  Scenario: Display current number of todo items
    When I add a todo "buy some cheese"
    Then the counter should show "1 item left"
    When I add a todo "feed the cat"
    Then the counter should show "2 items left"