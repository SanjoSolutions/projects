Feature: Highlighted Quotes

  As a reader of positions on Forum.eu
  I want to see quotes clearly standing out of the text
  So that I can clearly distinguish them from the rest of the text.

  Scenario: Reading a position with a quote
    Given I'm reading a position with a quote
    When the quote is visible on the screen
    Then it should be formatted with:
    * bold text
    * Typographic quotes
    * A line separator above and below the quotes
    * A bigger font size then the normal paragraph text
    * With the source below the quote in a smaller font
    * With the title optionally on the right of the source with a smaller font.
