Feature: Rumah123 Homepage Revamp
  As a QA Engineer at Rumah123
  I want to verify the homepage revamp
  So that bugs can be caught earlier and testing time is reduced

  Background:
    Given I have installed the Rumah123 Consumer App
    When I open the application
    Then I should see the homepage

  @Smoke
  Scenario: Verify homepage core elements are displayed
    Given I am on the homepage
    Then I should see the search bar
    And I should see the property type button
    And I should see the discovery section
    And I should see the recommendation section
    And I should see property cards
    And I should see the bottom navigation tabs

  @Smoke @UI
  Scenario: Verify homepage discovery chips are displayed
    Given I am on the homepage
    Then I should see the discovery section
    And I should see a discovery chip containing "Properti"

  @UI
  Scenario: Verify property recommendation cards details
    Given I am on the homepage
    Then I should see property cards
    And each property card should have title, price, and location

  @Functional
  Scenario: Search for a property from homepage
    Given I am on the homepage
    When I click on the search bar
    And I type "rumah dijual di jakarta"
    And I submit the search
    Then I should see search results

  @Functional
  Scenario: Navigate using bottom navigation tabs
    Given I am on the homepage
    When I click on the "Cari" tab
    Then I should see the "Cari" page
    When I click on the "Disimpan" tab
    Then I should see the "Disimpan" page
    When I click on the "Profil" tab
    Then I should see the "Profil" page
    When I click on the "Beranda" tab
    Then I should see the "Beranda" page

  @Functional @UI
  Scenario: Swipe property recommendation cards
    Given I am on the homepage
    When I swipe left on recommendation cards
    Then I should still see property cards

  @UI
  Scenario: Verify recommendation features section
    Given I am on the homepage
    When I scroll to recommendation features
    Then I should see the recommendation features title
    And I should see the KPR simulation card

  @Negative
  Scenario: Search with invalid keyword
    Given I am on the homepage
    When I click on the search bar
    And I type "qwertyuiopasdfghjkl"
    And I submit the search
    Then the search flow should complete without app crash
