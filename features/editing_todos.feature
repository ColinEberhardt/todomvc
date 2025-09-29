Feature: Editing Todo Items
  As a user
  I want to edit existing todo items
  So that I can update their content

  Background:
    Given I open the TodoMVC application
    And I have added the standard todo items
    And I double-click the second todo to edit it

  Scenario: Focus the input when editing
    Then the item input should be focused
    And the new todo input should be blurred

  Scenario: Hide other controls when editing
    Then the toggle button for the second todo should be hidden
    And the label for the second todo should be hidden

  Scenario: Save edits on enter
    When I edit the current item to "buy some sausages" and press enter
    Then the second todo should be "buy some sausages"

  Scenario: Save edits on blur
    When I edit the current item to "buy some sausages"
    And I click the first todo toggle button
    Then the second todo should be "buy some sausages"

  Scenario: Trim entered text
    When I edit the current item to "    buy some sausages  " and press enter
    Then the second todo should be "buy some sausages"

  Scenario: Remove item when empty text is entered
    When I edit the current item to "" and press enter
    Then I should see 2 todo items
    And the first todo should be "buy some cheese"
    And the second todo should be "book a doctors appointment"

  Scenario: Cancel edits on escape
    When I edit the current item to "foo" and press escape
    Then the second todo should be "feed the cat"