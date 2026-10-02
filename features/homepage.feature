
Feature: 99 Homepage

  As a user
  I want to open the 99 app
  So that I can access the homepage

  Scenario: User can access the homepage
    Given the 99 app is launched
    Then the homepage should be displayed

  Scenario: Homepage displays the search element
    Given the 99 app is launched
    Then the search element should be visible

  Scenario: Homepage displays the main navigation
    Given the 99 app is launched
    Then the main navigation should be visible

  
  Scenario: Homepage displays property filters
    Given the 99 app is launched
    Then the property filters should be visible

  Scenario: Homepage displays property categories
    Given the 99 app is launched
    Then the property categories should be visible