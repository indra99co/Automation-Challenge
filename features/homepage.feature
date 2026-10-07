Feature: 99 Homepage

  As a property seeker
  I want to use the revamped homepage of the 99 app
  So that I can discover properties that match my needs

  Background:
    Given the 99 application is open on the homepage

  Scenario: Homepage is displayed after launching the application
    Then the homepage should be displayed
    And the "Cari" navigation tab should be selected
    And the listing summary should show page 1

  Scenario: Primary homepage controls are available
    Then the location search bar should be displayed
    And the filter button should be displayed
    And the following quick filters should be available:
      | Diutamakan    |
      | Kisaran Harga |
      | Luas Tanah    |
      | Luas Bangunan |
    And the following shortcuts should be available:
      | Properti Baru |
      | Aset Bank     |
    And the bottom navigation should contain the following tabs:
      | Cari        |
      | Hunian Baru |
      | Iklan Saya  |
      | Buat Iklan  |
      | Akun Saya   |

  Scenario: Searching for a location updates the listings
    When I search for the location "Jakarta Selatan"
    Then the listing heading should be "Properti Dijual di Jakarta Selatan"
    And the location search bar should show "Jakarta Selatan, Jakarta"

  Scenario: Filtering the listings to properties for rent
    When I filter the listings by the listing type "Disewa"
    Then the listing heading should start with "Properti Disewa di Indonesia"
    And the following quick filters should be available:
      | Kamar Tidur |

  Scenario: Sorting the listings by the lowest price
    When I sort the listings by "Harga Terendah"
    Then the "Harga Terendah" quick filter should be active
    And the listings should be ordered from the lowest price

  Scenario: Filtering the listings by a price range
    When I apply the "350 - 600 Jt" preset from the "Kisaran Harga" quick filter
    Then the "350 Jt - 600 Jt" quick filter should be active
    And the first listing price should be between "Rp 350 Juta" and "Rp 600 Juta"

  Scenario Outline: Filtering the listings by <area>
    When I apply the "<preset>" preset from the "<area>" quick filter
    Then the "<active filter>" quick filter should be active

    Examples:
      | area          | preset | active filter   |
      | Luas Tanah    | 100 m² | Maks. LT 100 m² |
      | Luas Bangunan | 70 m²  | Maks. LB 70 m²  |

  Scenario: The new property shortcut shows only new property projects
    When I select the "Properti Baru" shortcut
    Then only new property projects should be listed

  Scenario: Opening a listing from the homepage
    When I open the first listing
    Then the listing details should show the price of the selected listing

  Scenario: Scrolling the homepage reveals the new property recommendations
    When I scroll down to the "Pilihan Properti Baru" section
    Then the "Pilihan Properti Baru" section should be displayed

  Scenario: Moving to the next page of listings
    When I go to the next page of listings
    Then the listing summary should show page 2

  Scenario: Opening the new property tab from the homepage
    When I open the "Hunian Baru" navigation tab
    Then the "Hunian Baru" navigation tab should be selected
    And the new property search should be displayed

  Scenario Outline: Guest users are asked to log in when opening <tab>
    When I open the "<tab>" navigation tab
    Then the login prompt should be displayed

    Examples:
      | tab        |
      | Iklan Saya |
      | Buat Iklan |
      | Akun Saya  |
