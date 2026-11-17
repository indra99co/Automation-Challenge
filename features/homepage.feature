Feature: 99 Homepage
  As a user, I want to see the homepage so that I can search for properties

  Background:
    Given the user opens the 99 app

  Scenario: Homepage displays the search bar and filter button
    Then the user should see the search bar
    And the user should see the filter button

  Scenario Outline: Homepage displays the quick access buttons
    Then the user should see the "<button>" button

    Examples:
      | button        |
      | Properti Baru |
      | Aset Bank     |

  Scenario Outline: Homepage displays the bottom navigation tabs
    Then the user should see the "<tab>" tab

    Examples:
      | tab         |
      | Cari        |
      | Hunian Baru |
      | Iklan Saya  |
      | Buat Iklan  |
      | Akun Saya   |