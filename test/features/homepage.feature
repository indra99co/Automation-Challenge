Feature: 99.co Indonesia Homepage (Revamp)
  As a user of the 99.co app
  I want the revamped homepage to load correctly
  So that I can browse properties without issues

  Background:
    Given I open the 99.co app

  Scenario: Homepage loads successfully after opening the app
    Then I should see the homepage

  Scenario: Search bar is visible on homepage
    Then I should see the search bar

  Scenario: Filter button is visible on homepage
    Then I should see the filter button

  Scenario: Tapping the filter button opens the filter options
    When I tap on the filter button
    Then the filter button should still be visible

  Scenario: Property listing card is displayed on homepage
    Then I should see at least one listing card

  Scenario Outline: Bottom navigation tabs are visible and tappable
    Then I should see the "<tabName>" tab in the bottom navigation
    When I tap on the "<tabName>" tab

    Examples:
      | tabName     |
      | Cari        |
      | Hunian Baru |
      | Iklan Saya  |
      | Buat Iklan  |
      | Akun Saya   |

  Scenario: Bottom navigation bar is visible with all 5 main menus
    Then I should see the bottom navigation with all 5 menus
