Feature: The Internet Guinea Pig Website

  Scenario Outline: As a user, I can log into the secure area

    Given I am on the login page
    When I login with <username> and <password>
    Then I should see a flash message saying <message>
    Then consoling output with <helloMsg>

    Examples:
      | username | password             | message                        | helloMsg |
      | tomsmith | SuperSecretPassword! | You logged into a secure area! |     Bye     |
      | foobar   | barfoo               | Your username is invalid!      |       allsuccess   |
