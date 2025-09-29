Feature: Clear Completed Button
  As a user
  I want to clear all completed todos at once
  So that I can remove finished tasks

  Background:
    Given I open the TodoMVC application
    And I have added the standard todo items

  Scenario: Display correct text
    When I mark the second todo as complete
    Then the clear completed button should show "Clear completed"

  Scenario: Remove completed items when clicked
    When I mark the second todo as complete
    And I click the clear completed button
    Then I should see 2 todo items
    And the first todo should be "buy some cheese"
    And the second todo should be "book a doctors appointment"

  Scenario: Hide button when no items are completed
    When I mark the second todo as complete
    Then the clear completed button should be visible
    When I click the clear completed button
    Then the clear completed button should be hidden