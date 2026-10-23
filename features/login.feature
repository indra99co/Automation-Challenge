
Feature: 99 App Homepage

  Scenario: Homepage displays its main search controls
    Given the 99 app is open
    Then the location search should be visible
    And the filter button should be visible

  Scenario: Homepage displays property shortcuts
    Given the 99 app is open
    Then the new properties shortcut should be visible
    And the bank assets shortcut should be visible

  Scenario: Homepage displays bottom navigation
    Given the 99 app is open
    Then the search tab should be visible
    And the new housing tab should be visible
    And the my ads tab should be visible
    And the create ad tab should be visible
    And the my account tab should be visible
  
  Scenario: Homepage displays property filters
    Given the 99 app is open
    Then the price range filter should be visible
    And the land area filter should be visible

    Scenario: Homepage displays its heading and listing count
    Given the 99 app is open
    Then the homepage heading should be visible
    And the property listing count should be visible

Scenario: Homepage displays all filter shortcuts
    Given the 99 app is open
    Then the priority filter should be visible
    And the price range filter should be visible
    And the land area filter should be visible

Scenario: Homepage displays property listing information
    Given the 99 app is open
    Then a property card should be visible
    And the land type label should be visible
