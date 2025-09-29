Feature: Data Persistence
  As a user
  I want my todos to persist when I navigate away and back
  So that I don't lose my data

  Background:
    Given I open the TodoMVC application

  Scenario: Persist todo data across navigation
    When I add a todo "buy some cheese"
    And I add a todo "feed the cat"
    And I mark the second todo as complete
    Then I should see 2 todo items
    And the first todo should be "buy some cheese" and incomplete
    And the second todo should be "feed the cat" and complete
    When I navigate to "about:blank"
    And I navigate back to the TodoMVC application
    Then I should see 2 todo items
    And the first todo should be "buy some cheese" and incomplete
    And the second todo should be "feed the cat" and complete