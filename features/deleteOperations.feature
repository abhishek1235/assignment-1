Feature: To do Delete operation on the computers table

	@DeleteOperations @Delete001
	Scenario: Delete one of the computers from the table
		Given I am on play sample application page with title "Computers database"
		When I enter search string "ACE 6876" in the search box and click on Filter by name button
		Then I click on the computer name in the table to Edit the computer details
		Then I verify thet "Edit computer" page is displayed
		Then I click on Delete this computer button on Edit computer page
		Then I validate the success message upon deletion





