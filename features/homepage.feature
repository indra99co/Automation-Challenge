Feature: 99 App Homepage
  As a user of 99 app
  I want to see and use the revamped homepage
  So that I can find the property I am looking for

  Background:
    Given I open the 99 app
    And I am on the homepage

  @smoke
  Scenario: Homepage shows the main components
    Then I should see these homepage elements
      | element             |
      | search bar          |
      | filter button       |
      | sort chip           |
      | price range chip    |
      | land area chip      |
      | page title          |
      | result count        |
      | new property button |
      | bank asset button   |
      | listing card        |

  @smoke
  Scenario: Homepage shows the bottom navigation with Cari tab selected
    Then I should see these homepage elements
      | element            |
      | search tab         |
      | new housing tab    |
      | my listing tab     |
      | create listing tab |
      | my account tab     |
    And the "search tab" should be selected

  Scenario: Page title and result count are shown correctly
    Then the page title should be "Properti Dijual di Indonesia | Harga Terbaru 2026"
    And the result count should be more than 0

  Scenario: Quick filter chips can be scrolled to see more filters
    When I scroll the quick filter chips to the right
    Then I should see these homepage elements
      | element            |
      | building area chip |

  Scenario: User searches a location from the search bar
    When I tap the "search bar" on homepage
    And I type "Jakarta" in the search field
    Then I should see "Lokasi Terkait" suggestion section
    And I should see location suggestions
      | location      |
      | Jakarta       |
      | Jakarta Pusat |

  Scenario: User opens the filter page
    When I tap the "filter button" on homepage
    Then I should see the filter page
    And I should see listing type options "Dijual" and "Disewa"
    And I should see these property types
      | type      |
      | Rumah     |
      | Apartment |
      | Ruko      |
      | Tanah     |
      | Kost      |
      | Kios      |

  Scenario: User opens the sort options
    When I tap the "sort chip" on homepage
    Then I should see the sort options
      | option                   |
      | Diutamakan               |
      | Terbaru                  |
      | Harga Terendah           |
      | Harga Tertinggi          |
      | Luas Tanah Terkecil      |
      | Luas Tanah Terbesar      |
      | Luas Bangunan Terkecil   |
      | Luas Bangunan Terbesar   |

  Scenario: User opens the price range filter
    When I tap the "price range chip" on homepage
    Then I should see the price range filter
    And I should see these price presets
      | preset       |
      | 100 - 350 Jt |
      | 350 - 600 Jt |
      | 600 - 800 Jt |
      | 800 Jt - 1M  |
      | > 1M         |

  Scenario: User filters new property listings
    Given I remember the current result count
    When I tap the "new property button" on homepage
    Then the result count should be less than before
    And I should see at least one listing card

  # Found during testing (99 app v6.18.0): "Aset Bank" returns "0 Iklan Properti"
  # and shows the empty state, so this scenario is currently failing
  @bug
  Scenario: User filters bank asset listings
    When I tap the "bank asset button" on homepage
    Then I should see at least one listing card
    And I should not see the empty state

  Scenario: Listing card shows contact buttons
    When I scroll down the homepage a little
    Then I should see these homepage elements
      | element                 |
      | listing phone button    |
      | listing whatsapp button |

  Scenario: Homepage shows new property recommendation section
    When I scroll down to the new property section
    Then I should see these homepage elements
      | element              |
      | new property section |

  Scenario: User opens a listing detail and goes back to homepage
    Given I remember the first listing
    When I tap the "listing card" on homepage
    Then I should see the property detail page of that listing
    When I tap back on the property detail page
    Then I should be on the homepage
