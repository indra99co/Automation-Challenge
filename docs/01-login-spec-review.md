Feature: As a User, I want to login so that I can see my account page

Background: 
    Given I am on login page

Scenario: Successful login
    When I fill the email with “username@99.co”
    And I fill the password with “password”
    And I pressed the login button
    Then I should go to the home page
    And I can see my account displayed

Scenario: Wrong email address
    When I fill the email with “username1@99.co”
    And I fill the password with “password”
    And I pressed the login button
    Then I should see the “Wrong Email Address” error message
    And I should have stayed on the login page

Scenario: Wrong password 
    When I fill the email with “username@99.co”
    And I fill the password with “password1”
    And I pressed the login button
    Then I should see the “Wrong Password” error message
    And I should have stayed on the login page

Scenario: Empty email
    When I do not fill the email 
    And I fill the password with “password”
    And I pressed the login button
    Then I should see the “Email is empty” error message
    And I should have stayed on the login page

Scenario: Empty password
    When I fill the email with “username@99.co”
    And I do not fill the password
    And I pressed the login button
    Then I should see the “Password is empty” error message
    And I should have stayed on the login page

Scenario: Both fields empty
    When I pressed the login button
    Then I should see the “Email is empty” error message
    And I should see the “password is empty” error message
    And I should have stayed on the login page
