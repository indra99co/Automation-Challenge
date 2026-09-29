Feature: 99.co Indonesia Homepage

  Scenario: As a user, I can access the homepage
    Given I open the 99.co Indonesia app
    Then I should see the homepage

  Scenario: As a user, I can see the main homepage elements
    Given I open the 99.co Indonesia app
    Then I should see the main homepage elements

  Scenario: As a user, I can open the location search
    Given I open the 99.co Indonesia app
    When I tap the location search
    Then I should see the location search page