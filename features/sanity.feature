Feature: To do Sanity check of all the locators present on the page

	@SanityTests @Sanity001
	Scenario: Homepage WebElements Validation
		Given I am on play sample application page with title "Computers database"
		Then I verify the heading of the landing page to be "Play sample application — Computer database"
		Then I validate presence of add a new computer button
		Then I validate presence of filter by computer name edit box
		Then I validate presence of filter by name button
		Then I verify that the "← Previous" link is disabled on the first or landing page
		Then I verify that the "Next →" link is enabled on the first or landing page
		Then I verify that the Current link displays "Displaying 1 to 10 of " total number of computers displayed on the page
		Then I verify that the number of rows in the table equals 10
		Then I validate column table header text
			| index | header        |
			| 0     | Computer name |
			| 1     | Introduced    |
			| 2     | Discontinued  |
			| 3     | Company       |
		Then I validate that the column "0" values are sorted in ascending order
