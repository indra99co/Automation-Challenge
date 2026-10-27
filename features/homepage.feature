Feature: 99.co Indonesia Homepage

  Scenario: Verify homepage search field is displayed
    Given the 99.co app is open
    Then the homepage search field should be displayed

  Scenario: Verify homepage filter controls are displayed
    Given the 99.co app is open
    Then the homepage filter button should be displayed
    And the homepage sort priority should be displayed
    And the homepage price range should be displayed
    And the homepage land area filter should be displayed

  Scenario: Verify homepage property categories are displayed
    Given the 99.co app is open
    Then the new properties category should be displayed
    And the bank assets category should be displayed
    And the house category should be displayed
  Scenario: Open homepage filters
    Given the 99.co app is open
    When I open the homepage filters
    Then the filter panel should be displayed
  Scenario: Apply homepage filters
    Given the 99.co app is open
    When I open the homepage filters
    When I apply the homepage filters
  Scenario: Verify homepage bottom navigation
    Given the 99.co app is open
    Then the my account tab should be displayed