Feature: Initial State
  As a user
  I want the TodoMVC app to have the correct initial state
  So that I can start using it immediately

  Background:
    Given I open the TodoMVC application

  Scenario: Focus on todo input field when page loads
    Then the todo input field should be focused

  Scenario: Hide main and footer sections when no todos exist
    Then the main section should be hidden
    And the footer section should be hidden