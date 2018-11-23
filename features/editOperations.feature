Feature: To do Edit operation on the computers table

	@EditOperations @Edit001
	Scenario: Edit details of one of the computer from the table
		Given I am on play sample application page with title "Computers database"
		When I enter search string "Lenovo 9876" in the search box and click on Filter by name button
		Then I click on the computer name in the table to Edit the computer details
		Then I verify thet "Edit computer" page is displayed
		Then I change some of the details of the computer and verify if the changes are reflected or not
		|computerName|introducedDate|discontinuedDate|company|
		|ACE 6876|2006-06-06|2011-11-11|OMRON|
		Then I search the newly created computer and validate the data
		|computerName|introducedDate|discontinuedDate|company|
		|ACE 6876|2006-06-06|2011-11-11|OMRON|





