Feature: Homepage 99

  Background:
    Given I open the 99 app

  Scenario: Search bar is displayed
    Then I should see the search bar

  Scenario: Filter button is displayed
    Then I should see the filter button

  Scenario: Property category tabs are displayed
    Then I should see the "Properti Baru" tab
    And I should see the "Aset Bank" tab

  Scenario: At least one property listing is displayed
    Then I should see at least one property listing

  Scenario Outline: Bottom navigation menu is displayed
    Then I should see the "<menu>" bottom menu

    Examples:
      | menu        |
      | Cari        |
      | Hunian Baru |
      | Iklan Saya  |
      | Buat Iklan  |
      | Akun Saya   |