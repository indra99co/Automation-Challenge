Feature: Login with email or phone number
  As a registered user
  I want to log in with my email or Singapore phone number and a password
  So that I can access my account

  Background:
    Given a registered user with email "user@99.co", phone "+6581234567" and password "Secure@Pass"
    And I am on the login page

  # ---------- Success ----------
  Scenario Outline: Successful login with valid identifier
    When I fill in "Email or Phone Number" with "<identifier>"
    And I fill in "Password" with "Secure@Pass"
    And I press "Login"
    Then I should be redirected to my account page

    Examples:
      | identifier  |
      | user@99.co  |
      | +6581234567 |

  # ---------- Required fields ----------
  Scenario Outline: Login fails when a required field is empty
    When I fill in "Email or Phone Number" with "<identifier>"
    And I fill in "Password" with "<password>"
    And I press "Login"
    Then I should see "<message>"
    And I should stay on the login page

    Examples:
      | identifier | password    | message                                         |
      |            | Secure@Pass | Email or phone number is required               |
      | user@99.co |             | Password is required                            |
      |            |             | Email or phone number and password are required |

  # ---------- Email format ----------
  Scenario Outline: Login fails when email has no valid domain
    When I fill in "Email or Phone Number" with "<email>"
    And I fill in "Password" with "Secure@Pass"
    And I press "Login"
    Then I should see "Email must include a valid domain"

    Examples:
      | email   |
      | user    |
      | user@   |
      | user@99 |
      | @99.co  |

  # ---------- Phone format ----------
  Scenario: Login fails when phone number has no country code
    When I fill in "Email or Phone Number" with "81234567"
    And I fill in "Password" with "Secure@Pass"
    And I press "Login"
    Then I should see "Phone number must use country code"

  Scenario Outline: Login fails when phone number is not from Singapore
    When I fill in "Email or Phone Number" with "<phone>"
    And I fill in "Password" with "Secure@Pass"
    And I press "Login"
    Then I should see "Only Singapore phone numbers are allowed"

    Examples:
      | phone          |
      | +6281234567890 |
      | +60123456789   |

  Scenario Outline: Login fails when Singapore phone number has invalid length
    When I fill in "Email or Phone Number" with "<phone>"
    And I fill in "Password" with "Secure@Pass"
    And I press "Login"
    Then I should see "Please enter a valid phone number"

    Examples:
      | phone        |
      | +65812345    |
      | +65812345678 |

  # ---------- Password rules ----------
  Scenario Outline: Login fails when password is not secure
    When I fill in "Email or Phone Number" with "user@99.co"
    And I fill in "Password" with "<password>"
    And I press "Login"
    Then I should see "<message>"

    Examples:
      | password    | message                                             |
      | Se@pass     | Password must be at least 8 characters              |
      | secure@pass | Password must contain at least one uppercase letter |
      | SECURE@PASS | Password must contain at least one lowercase letter |
      | SecurePass  | Password must contain at least one symbol           |

  Scenario: Password with exactly 8 characters meeting all rules is accepted
    Given a registered user with email "eight@99.co" and password "Secur@pw"
    When I fill in "Email or Phone Number" with "eight@99.co"
    And I fill in "Password" with "Secur@pw"
    And I press "Login"
    Then I should be redirected to my account page

  # ---------- Wrong credentials ----------
  Scenario Outline: Login fails with valid format but wrong credentials
    When I fill in "Email or Phone Number" with "<identifier>"
    And I fill in "Password" with "<password>"
    And I press "Login"
    Then I should see "Invalid email/phone number or password"
    And I should stay on the login page

    Examples:
      | identifier  | password    |
      | other@99.co | Secure@Pass |
      | +6591234567 | Secure@Pass |
      | user@99.co  | Wrong@Pass1 |
      | +6581234567 | Wrong@Pass1 |

  Scenario: Password input is masked
    When I fill in "Password" with "Secure@Pass"
    Then the "Password" field should hide the characters
