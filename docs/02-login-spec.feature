Feature: As a registered user, I want to login using my own email or phone number and password, so I can see home page and see my account

Background: 
    Given a registered account exists with email “username@99.co”, phone number “+6593737949”, and password “passwOrd!”
    And I am on login page

Scenario: Successful login with valid email and password
    When I fill the email or phone number with “username@99.co”
    And I fill the password with “passwOrd!”
    And I pressed the login button
    Then  I should be redirected to home page
    And I should see my account displayed

Scenario: Successful login with Singapore phone number and valid password
    When I fill the email or phone number with “+6593737949”
    And I fill the password with “passwOrd!”
    And I pressed the login button
    Then I should be redirected to home page
    And I should see my account displayed

Scenario: Login with empty email or phone number
    When I leave the email or phone number empty
    And I fill the password “passwOrd!”
    And I pressed the login button
    Then I should see the “Email or phone number is required” error message
    And I should have stayed on the login page

Scenario: Login with empty password
    When I fill in the email or phone number with “username@99.co”
    And I leave the password empty
    And I pressed the login button
    Then I should see the “password is required” error message
    And I should have stayed on the login page

Scenario: Login with both fields empty
    When I pressed the login button
    Then I should see the “Email or phone number is required” error message
    And I should see the “Password is required” error message
    And  I should have stayed on the login page

Scenario: Login with minimum 8 characters of password
	Given a registered account exists with email “username2@99.co” and password “Passw0r.”
    When I fill the email or phone number with “username2@99.co”
    And I fill the password with “Passw0r.”
    And I pressed the login button
    Then I should be redirected to the home page

Scenario Outline: Login with invalid email
    When I fill the email or phone number with “<Email>”
    And I fill the password “passwOrd!”
    And I pressed the login button
    Then I should see the “Email invalid” error message
    And I should have stayed on the login page

    Examples:
      | Email				| Note				    |
      | username			| no @ and no domain    |
      | username 1@99.co	| contains space	    |
      | username@			| no domain			    |
      | @99.co				| no local part			|
      | username@99			| no top level domain	|

Scenario Outline: Login with invalid phone number
    When I fill the email or phone number with “<phone number>”
    And I fill the password with “passwOrd!”
    And I pressed the login button
    Then I should see the “<message>” error message 
    And I should have stayed on the login page
    Examples:
      | phone number | message				            | note			        |
      | 81232132     | country code is required		    | no country code	    |
      | +6281232132  | Only Singapore numbers accepted	| wrong country code	|
      | +65812321322 | invalid phone number			    | too long, 9 digits	|
      | +658123213   | invalid phone number			    | too short, 7 digits	|
      | 658123213    | country code is required		    | no “+” sign		    |

Scenario Outline: Login with invalid password
    When I fill the email or phone number with “username@99.co”
    And I fill the password “<password>”
    And I pressed the login button
    Then I should see the “<message>” error message
    And I should have stayed on the login page
    Examples:
      | password	| message				            | note			    |
      | Passw0. 	| Password must be minimum 8 char	| only 7 characters	|
      | PASSWOR!1	| Password must contain lowercase	| no lowercase		|
      | passw0.r	| Password must contain uppercase	| no uppercase		|
      | Passw0rd	| Password must contain symbol	    | no symbol		    |

Scenario: Login with unregistered email
    When I fill the email or phone number with “usernam3@99.co”
    And I fill the password with “passwOrd!”
    And I pressed the login button
    Then I should see the “Account not found” error message
    And I should have stayed on the login page

Scenario: Login with unregistered SG phone number
    When I fill the email or phone number with “+6590113102”
    And I fill the password with “passwOrd!”
    And I pressed the login button
    Then I should see the “Account not found” error message
    And I should have stayed on the login page

Scenario: Login with valid email and wrong password
    When I fill the email or phone number with “username@99.co”
    And I fill the password with “passwO22!”
    And I pressed the login button
    Then I should see the “Wrong password” error message
    And I should have stayed on the login page

Scenario: Login with valid SG phone number and wrong password 
    When I fill the email or phone number with “+6593737949”
    And I fill the password with “passwO22!”
    And I pressed the login button
    Then I should see the “Wrong password” error message
    And I should have stayed on the login page
