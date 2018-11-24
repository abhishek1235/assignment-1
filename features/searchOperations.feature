Feature: To do search operation on the computers table by entering text in the search box

	@SearchOperations @Search001
	Scenario: Search string completely matches the Computer Name in the table
		Given I am on play sample application page with title "Computers database"
		When I enter search string "Amiga 1200" in the search box and click on Filter by name button
		Then I verify that the Current link displays "Displaying 1 to 1 of " total number of computers displayed on the page
		Then I verify that the filtered table row count matches the number of computers displayed on the page
		Then I verify that the table contains the data for the search string "Amiga 1200" and row count is "1"
		And I verify that the number of clicks to Next and Previous link is equal to the number of pages present on the table


	@SearchOperations @Search002
	Scenario: Search string partially matches the Computer Name in the table
		Given I am on play sample application page with title "Computers database"
		When I enter search string "Amiga" in the search box and click on Filter by name button
		Then I verify that the Current link displays "Displaying 1 to 10 of " total number of computers displayed on the page
		Then I verify that the filtered table row count matches the number of computers displayed on the page
		And I verify that the table contains the data for the search string "Amiga" and row count is greater than "1"
		And I verify that the number of clicks to Next and Previous link is equal to the number of pages present on the table
		And I verify the current link text after every click to next page on table
		And I verify that default sorting order of Computers table with pagination is by computer name in ascending order
		And I verify that the Introduced and Discontinued dates are either hyphen or a valid date

	@SearchOperations @Search003
	Scenario: Search string EMPTY matches all the Computer Name in the table
		Given I am on play sample application page with title "Computers database"
		When I enter search string "EMPTY" in the search box and click on Filter by name button
		Then I verify that the Current link displays "Displaying 1 to 10 of " total number of computers displayed on the page
		Then I verify that the filtered table row count matches the number of computers displayed on the page
		And I verify that the table contains the data for the search string "" and row count is greater than "1"
		And I verify that the number of clicks to Next and Previous link is equal to the number of pages present on the table
		And I verify the current link text after every click to next page on table
		And I verify that default sorting order of Computers table with pagination is by computer name in ascending order
		And I verify that the Introduced and Discontinued dates are either hyphen or a valid date




	@SearchOperations @Search004
	Scenario: Search string doesnot match any Computer Name in the table
		Given I am on play sample application page with title "Computers database"
		When I enter search string "abhishek" in the search box and click on Filter by name button
		Then I should see a message saying "Nothing to display"

