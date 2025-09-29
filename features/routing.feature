Feature: Routing and Filtering
  As a user
  I want to filter todos by their completion status
  So that I can focus on specific types of tasks

  Background:
    Given I open the TodoMVC application
    And I have added the standard todo items
    And I mark the second todo as complete

  Scenario: Display active items
    When I filter by active items
    Then I should see the first todo "buy some cheese"
    And I should see the third todo "book a doctors appointment"
    And the second todo should be hidden

  Scenario: Display completed items
    When I filter by completed items
    Then I should see the second todo "feed the cat"
    And the first todo should be hidden
    And the third todo should be hidden

  Scenario: Display all items
    When I filter by active items
    And I filter by completed items
    And I filter by all items
    Then I should see all 3 todo items
    And the first todo should be "buy some cheese"
    And the second todo should be "feed the cat"
    And the third todo should be "book a doctors appointment"

  Scenario: Highlight currently applied filter
    Then the "All" filter should be selected
    When I filter by active items
    Then the "Active" filter should be selected
    When I filter by completed items
    Then the "Completed" filter should be selected

  Scenario: Respect browser back button
    When I filter by active items
    And I filter by completed items
    Then I should see the second todo "feed the cat"
    When I navigate back in browser
    Then I should see the first todo "buy some cheese"
    And I should see the third todo "book a doctors appointment"
    And the second todo should be hidden
    When I navigate back in browser
    Then I should see all 3 todo items