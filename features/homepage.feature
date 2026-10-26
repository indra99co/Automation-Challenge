Feature: As a QA, I want to verify the revamped homepage so that bugs are caught early

  Scenario: Search and filter are displayed
    Given I open the 99 app
    Then I should see the search bar
    And I should see the filter button

  Scenario: Filter chips are displayed
    Given I open the 99 app
    Then I should see the "Diutamakan" filter chip
    And I should see the "Kisaran Harga" filter chip
    And I should see the "Luas Tanah" filter chip

  Scenario: Header is displayed
    Given I open the 99 app
    Then I should see the page title
    And I should see the total listing

  Scenario: Quick action buttons are displayed
    Given I open the 99 app
    Then I should see the "Properti Baru" button
    And I should see the "Aset Bank" button

  Scenario: Listing card is displayed
    Given I open the 99 app
    Then I should see the listing card
    And I should see the call and WhatsApp buttons

  Scenario: Pilihan Properti Baru section is displayed
    Given I open the 99 app
    When I scroll to the "Pilihan Properti Baru" section
    Then I should see the "Pilihan Properti Baru" section
    And I should see the property type tabs

  Scenario: Bottom navigation is displayed
    Given I open the 99 app
    Then I should see the bottom navigation tabs