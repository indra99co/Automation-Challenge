Dengan hormat,

Perkenalkan saya Nadya Salsabila, kandidat untuk posisi Quality Assurance Engineer (Intern) di 99 Group. Melalui dokumen ini, saya izin menyampaikan jawaban atas assignment yang telah diberikan melalui email pada tanggal \[isi tanggal email diterima\].

Berikut adalah jawaban saya untuk soal nomor 1 sampai 3\. Untuk soal nomor 4 (Automation Mobile), saya telah menyelesaikannya dan mengirimkan Pull Request melalui GitHub, dengan link terlampir di bagian akhir dokumen ini / pada email balasan.

Terima kasih atas kesempatan yang diberikan, saya sangat menantikan proses selanjutnya.

NOMOR 1

Feature: As a User, I want to login so that I can see my account page

Scenario: Successful login  
  Given I am on login page  
  And my email is registered as "username@99.co" with password "password"  
  When I fill in "Email" with "username@99.co"  
  And I fill in "Password" with "password"  
  And I press "Login"  
  Then I should go to home page

Scenario: Wrong Email Address  
  Given I am on login page  
  And my email is registered as "username@99.co" with password "password"  
  When I fill in "Email" with "username1@99.co"  
  And I fill in "Password" with "password"  
  And I press "Login"  
  Then I should see "Email not found"

Scenario: Wrong Password  
  Given I am on login page  
  And my email is registered as "username@99.co" with password "password"  
  When I fill in "Email" with "username@99.co"  
  And I fill in "Password" with "wrongpassword"  
  And I press "Login"  
  Then I should see "Wrong Password"

Scenario: Empty Email  
  Given I am on login page  
  When I fill in "Email" with ""  
  And I fill in "Password" with "password"  
  And I press "Login"  
  Then I should see "Email is required"

Scenario: Empty Password  
  Given I am on login page  
  When I fill in "Email" with "username@99.co"  
  And I fill in "Password" with ""  
  And I press "Login"  
  Then I should see "Password is required"

Scenario: Invalid Email Format  
  Given I am on login page  
  When I fill in "Email" with "username99.co"  
  And I fill in "Password" with "password"  
  And I press "Login"  
  Then I should see "Invalid email format"

NOMOR 2

Feature: As a User, I want to login using email or phone number

  Scenario: Successful login with valid email  
    Given I am on login page  
    And my account is registered with email "user@99.co" and password "Password1\!"  
    When I fill in "Username" with "user@99.co"  
    And I fill in "Password" with "Password1\!"  
    And I press "Login"  
    Then I should go to home page

  Scenario: Successful login with valid SG phone number  
    Given I am on login page  
    And my account is registered with phone "+6591234567" and password "Password1\!"  
    When I fill in "Username" with "+6591234567"  
    And I fill in "Password" with "Password1\!"  
    And I press "Login"  
    Then I should go to home page

  Scenario: Failed login \- empty username  
    Given I am on login page  
    When I fill in "Username" with ""  
    And I fill in "Password" with "Password1\!"  
    And I press "Login"  
    Then I should see "Email or Phone Number is required"

  Scenario: Failed login \- email without domain  
    Given I am on login page  
    When I fill in "Username" with "user@99"  
    And I fill in "Password" with "Password1\!"  
    And I press "Login"  
    Then I should see "Invalid email format"

  Scenario: Failed login \- phone number without country code  
    Given I am on login page  
    When I fill in "Username" with "91234567"  
    And I fill in "Password" with "Password1\!"  
    And I press "Login"  
    Then I should see "Phone number must include country code"

  Scenario: Failed login \- non-SG phone number  
    Given I am on login page  
    When I fill in "Username" with "+14155552671"  
    And I fill in "Password" with "Password1\!"  
    And I press "Login"  
    Then I should see "Only SG phone numbers are accepted"

  Scenario: Failed login \- username not registered  
    Given I am on login page  
    When I fill in "Username" with "unknown@99.co"  
    And I fill in "Password" with "Password1\!"  
    And I press "Login"  
    Then I should see "Account not found"

  Scenario: Failed login \- empty password  
    Given I am on login page  
    When I fill in "Username" with "user@99.co"  
    And I fill in "Password" with ""  
    And I press "Login"  
    Then I should see "Password is required"

  Scenario: Failed login \- password less than 8 characters  
    Given I am on login page  
    When I fill in "Username" with "user@99.co"  
    And I fill in "Password" with "Ab1\!"  
    And I press "Login"  
    Then I should see "Password must be at least 8 characters"

  Scenario: Failed login \- password without uppercase letter  
    Given I am on login page  
    When I fill in "Username" with "user@99.co"  
    And I fill in "Password" with "password1\!"  
    And I press "Login"  
    Then I should see "Password must contain at least one uppercase letter"

  Scenario: Failed login \- password without lowercase letter  
    Given I am on login page  
    When I fill in "Username" with "user@99.co"  
    And I fill in "Password" with "PASSWORD1\!"  
    And I press "Login"  
    Then I should see "Password must contain at least one lowercase letter"

  Scenario: Failed login \- password without symbol  
    Given I am on login page  
    When I fill in "Username" with "user@99.co"  
    And I fill in "Password" with "Password1"  
    And I press "Login"  
    Then I should see "Password must contain at least one symbol"

  Scenario: Failed login \- wrong password  
    Given I am on login page  
    And my account is registered with email "user@99.co" and password "Password1\!"  
    When I fill in "Username" with "user@99.co"  
    And I fill in "Password" with "WrongPass1\!"  
    And I press "Login"  
    Then I should see "Wrong Password"

NOMOR 3

FUNCTION filterOddNumbers(array):  
    oddNumbers \= empty list

    FOR each number IN array:  
        IF number MOD 2 is NOT equal to 0:  
            ADD number TO oddNumbers  
        END IF  
    END FOR

    RETURN oddNumbers

// contoh pemanggilan  
result \= filterOddNumbers(\[1, 22, 4, 23, 10, 90, 8\])  
// result \= \[1, 23\]

NOMOR 4

Izin sudah saya lampirkan di github: [https\://github.com/nadyasals/Automation-Challenge](https://github.com/nadyasals/Automation-Challenge)

