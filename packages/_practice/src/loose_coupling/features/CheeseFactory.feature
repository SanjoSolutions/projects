Feature: Cheese Factory
  As a person who likes to eat cheese
  I'd like to eat cheese regularly
  so that I can fulfill my desire for cheese.

  Scenario: Cheese storage empty
    When no cheese left in storage
    Then new cheese should be delivered and put into storage
