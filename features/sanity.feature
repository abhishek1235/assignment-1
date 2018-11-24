Feature: To do Sanity check of all the locators present on the page

	@SanityTests @Sanity001
	Scenario: Homepage WebElements Validation
		Given I am on play sample application page with title "Computers database"
		Then I verify the heading of the landing page to be "Play sample application — Computer database"
		And I validate presence of add a new computer button
		And I validate presence of filter by computer name edit box
		And I validate presence of filter by name button
		And I verify that the "← Previous" link is disabled on the first or landing page
		And I verify that the "Next →" link is enabled on the first or landing page
		And I verify that the Current link displays "Displaying 1 to 10 of " total number of computers displayed on the page
		And I verify that the number of rows in the table equals 10
		And I validate column table header text
			| index | header        |
			| 0     | Computer name |
			| 1     | Introduced    |
			| 2     | Discontinued  |
			| 3     | Company       |
		And I validate that the column "0" values are sorted in ascending order
