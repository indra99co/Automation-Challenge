Feature: App Login

    Background: As an user, I want to login so that I can enter home page

    Scenario Outline: Successful login
        Given I am on login page
        And my username is "username99"
        And my password is "password"
        When I fill in "Username" with "username99"
        And I fill in "Password" with "password"
        And I press "Submit"
        Then I should go to home page