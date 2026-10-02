Feature: 99.co ID Homepage

  Scenario: User opens the 99.co ID application and opens filters
    Given I open the 99.co ID app
    Then I should see the 99.co ID homepage
    When I tap the filter button
    Then I should see the filter page

  Scenario: User selects property for sale
  Given I open the 99.co ID app
  When I tap the filter button
  Then I should see the filter page
  When I select property for sale
  When I select house property
  When I select a price range
  When I apply the filters