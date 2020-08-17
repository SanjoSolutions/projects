Feature: My feature
  As a user
  I want to do …
  so that I can get … fulfilled.

  Scenario: No gas
    Given I have a car
    And the car has no gas
    When I call ADAC
    Then an ADAC service worker should be there to help in 30 minutes or less

  Scenario: Motor defect
    Given I have a car
    And the motor has a defect
    When I call ADAC
    Then an ADAC service worker should be there to repair the motor in 60 minutes or less
