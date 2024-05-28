Feature: ADP, CSC & other products sync :: ADP Two Wheeler

  @ADP_Two_Wheeler_Liability_New @ADP_Two_Wheeler @TC_APD_TW_0003
  Scenario Outline: <TestCaseId>: To verify the rollover policy for the liability type with NCB as No
    Given Read the input data for the "ADP" Application and Module "Two_Wheeler"
    Then Login into the "ADP Two Wheeler" application
    When Select the Coverage Details
    Then Click on "PROCEED" button
    Then Select office code
    Then Click on "Continue" button
    Then Select the vehicle model for Two wheeler
    Then Click on "CONTINUE" button
    Then Enter Registration Detail For Two Wheeler
    Then Enter Previous policy Expiry Detail For Two Wheeler
    Then Click on "CONTINUE" button
    Then Click on "OK" button
    Then Check third party premium exists
    Then Click on "SAVE" button
    Then Save Quote number
    #Then Click on "Proceed" button

    Examples:
      | TestData | TestCaseId        |
      | TD003    | TC_ADP_ADP001_001 |

