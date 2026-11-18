Feature: Rumah123 Homepage Revamp Test
  
    Background: As a QA tester, I want to test the revamped layout of the 99 app's homepage to ensure that all key elements are displayed correctly

    Scenario Outline: I open the app and view the revamped homepage elements
        Given I open the 99 application
        When I am on the homepage
        Then I should see the homepage elements properly displayed