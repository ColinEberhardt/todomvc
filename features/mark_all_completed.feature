Feature: Mark All as Completed
  As a user
  I want to mark all todos as completed at once
  So that I can quickly complete all my tasks

  Background:
    Given I open the TodoMVC application
    And I have added the standard todo items

  Scenario: Mark all items as completed
    When I click the mark all as complete checkbox
    Then all todo items should be marked as completed

  Scenario: Update complete all checkbox when manually checking items
    When I mark the first todo as complete
    And I mark the second todo as complete
    And I mark the third todo as complete
    Then the complete all checkbox should be checked

  Scenario: Clear completion state of all items
    Given I click the mark all as complete checkbox
    When I click the mark all as complete checkbox again
    Then all todo items should be marked as incomplete

  Scenario: Complete all checkbox updates when items are toggled
    When I click the mark all as complete checkbox
    Then the complete all checkbox should be checked
    When I mark the first todo as incomplete
    Then the complete all checkbox should be unchecked
    When I mark the first todo as complete
    Then the complete all checkbox should be checked