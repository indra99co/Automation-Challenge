Feature: Homepage revamp 99.co

  Background:
    Given the app is opened on the homepage

  Scenario: Search bar and filter button are displayed
    Then the search bar is displayed
    And the filter button is displayed

  Scenario: Content tabs are displayed
    Then the "Properti Baru" tab is displayed
    And the "Aset Bank" tab is displayed

  Scenario: Page title and total listing are displayed
    Then the page title "Properti Dijual di Indonesia" is displayed
    And the total listing count is displayed
    And the current page is 1

  Scenario: Listing card is displayed
    Then at least one listing card is displayed

  Scenario Outline: Bottom navigation tabs are displayed
    Then the "<tab>" bottom navigation tab is displayed

    Examples:
      | tab         |
      | Cari        |
      | Hunian Baru |
      | Iklan Saya  |
      | Buat Iklan  |
      | Akun Saya   |

  Scenario Outline: Filter chips are displayed
    Then the "<chip>" filter chip is displayed

    Examples:
      | chip          |
      | Diutamakan    |
      | Kisaran Harga |
      | Luas Tanah    |

  Scenario: User can scroll down until the Next button
    When I scroll down until the "Next" button is displayed
    Then the "Next" button is displayed

  Scenario: User can scroll up until the Diutamakan filter
    Given I scroll down until the "Next" button is displayed
    When I scroll up until the "Diutamakan" filter is displayed
    Then the "Diutamakan" filter is displayed