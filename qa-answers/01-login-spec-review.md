# 1. Login Specification Review

## Issues found in the PM's specification

1. **Inconsistent outcome.** The Feature title says "see my account page", but the successful scenario says "go to home page".
2. **Wrong error message.** The "Wrong Email Address" scenario expects "Wrong Password". The message should be generic ("Invalid email or password") so it does not reveal which emails are registered.
3. **Ambiguous precondition.** `And my email is ...` does not state that the account is registered. It should be `Given a registered user with email ... and password ...`.
4. **Incomplete negative outcome.** Nothing checks that the user stays on the login page and is not logged in.
5. **Missing scenarios:** wrong password, unregistered email, empty email, empty password, both empty, invalid email format.
6. **Duplicated steps.** "Given I am on login page" is repeated in every scenario. Use `Background`, and group negative cases with `Scenario Outline`.

## Corrected specification

```gherkin
Feature: Login
  As a registered user
  I want to log in with my email and password
  So that I can see my account page

  Background:
    Given a registered user with email "username@99.co" and password "password"
    And I am on the login page

  Scenario: Successful login with valid credentials
    When I fill in "Email" with "username@99.co"
    And I fill in "Password" with "password"
    And I press "Login"
    Then I should be redirected to my account page

  Scenario Outline: Failed login with invalid credentials
    When I fill in "Email" with "<email>"
    And I fill in "Password" with "<password>"
    And I press "Login"
    Then I should see "<message>"
    And I should stay on the login page

    Examples:
      | email           | password  | message                         |
      | username1@99.co | password  | Invalid email or password       |
      | username@99.co  | wrongpass | Invalid email or password       |
      |                 | password  | Email is required               |
      | username@99.co  |           | Password is required            |
      |                 |           | Email and password are required |
      | username99.co   | password  | Please enter a valid email      |
```
