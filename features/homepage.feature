@homepage
Feature: 99.co Indonesia homepage (revamp)
  As a QA engineer at 99 Group
  I want every element of the revamped homepage to be verified automatically
  So that regressions on the homepage are caught early

  Background:
    Given the 99.co app is open on the homepage

  @smoke
  Scenario: All main homepage elements are displayed
    Then the search bar "Lokasi, area, project" is displayed
    And the "Filter" button is displayed
    And the following quick filter chips are displayed
      | chip          |
      | Diutamakan    |
      | Kisaran Harga |
      | Luas Tanah    |
    And the page title starts with "Properti Dijual di Indonesia"
    And the listing count is greater than 0
    And the following category shortcuts are displayed
      | shortcut      |
      | Properti Baru |
      | Aset Bank     |
    And at least 1 property listing card is displayed
    And the bottom navigation has 5 tabs
    And the "Cari" tab is selected

  @smoke @listing
  Scenario: Listing card shows price and instalment information
    Then the first listing card contains a price in "Rp"
    And the first listing card contains the text "Cicilan Mulai"

  @listing @scroll
  Scenario: Homepage can be scrolled to load more listings
    When I scroll down the homepage 2 times
    Then at least 1 property listing card is displayed
    And the "Cari" tab is selected

  @search
  Scenario: Tapping the search bar opens the search screen
    When I tap the search bar
    Then the search screen is displayed with an input field

  @search
  Scenario: Searching for a location shows related location suggestions
    When I tap the search bar
    And I type "Jakarta Selatan" into the search field
    Then the "Lokasi Terkait" section is displayed
    And the location suggestion "Jakarta Selatan" is displayed

  @filter
  Scenario: Filter button opens the filter screen
    When I tap the Filter button
    Then the filter screen is displayed with the following options
      | option        |
      | Tipe Iklan    |
      | Dijual        |
      | Disewa        |
      | Tipe Properti |
      | Rumah         |
      | Apartment     |
      | Kisaran Harga |
      | Reset         |
    And the "Terapkan" button is displayed

  @sort
  Scenario: "Diutamakan" chip opens the sort options
    When I tap the "Diutamakan" chip
    Then the "Urutkan" bottom sheet is displayed
    And the following sort options are displayed
      | option          |
      | Diutamakan      |
      | Terbaru         |
      | Harga Terendah  |
      | Harga Tertinggi |

  @filter
  Scenario Outline: "<chip>" chip opens a bottom sheet with Reset and Apply buttons
    When I tap the "<chip>" chip
    Then the "<chip>" bottom sheet is displayed
    And the preset option "<preset>" is displayed
    And the "Reset" button is displayed
    And the "Terapkan" button is displayed

    Examples:
      | chip          | preset       |
      | Kisaran Harga | 100 - 350 Jt |
      | Luas Tanah    | 100 m²       |

  @shortcut
  Scenario: "Properti Baru" shortcut filters the listings
    Given I note the current listing count
    When I tap the "Properti Baru" shortcut
    Then the listing count decreases

  @navigation
  Scenario Outline: "<tab>" tab in the bottom navigation can be opened
    When I open the "<tab>" tab
    Then the "<tab>" tab is selected

    Examples:
      | tab         |
      | Hunian Baru |
      | Iklan Saya  |
      | Akun Saya   |
      | Cari        |

  @navigation
  Scenario: "Hunian Baru" tab shows featured new properties
    When I open the "Hunian Baru" tab
    Then the text "Properti Pilihan 99.co" is displayed

  @navigation @login
  Scenario Outline: "<tab>" tab asks a guest user to log in
    When I open the "<tab>" tab
    Then the login prompt is displayed
    And the "Login / Daftar" button is displayed

    Examples:
      | tab        |
      | Iklan Saya |
      | Buat Iklan |
      | Akun Saya  |
