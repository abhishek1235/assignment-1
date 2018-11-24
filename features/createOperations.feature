Feature: To do Create operation on the computers table by adding new computers

	@CreateOperations @Create001
	Scenario: Add a new Computer and check if it gets added to the table
		Given I am on play sample application page with title "Computers database"
		When I click on Add a new computer button
		Then "Add a computer" page should open
		And I should be able to successfully create a new computer using the following details
		|computerName|introducedDate|discontinuedDate|company|
		|Lenovo 9876|2006-06-12|2012-09-15|Lenovo Group|
		Then I search the newly created computer and validate the data
		|computerName|introducedDate|discontinuedDate|company|
		|Lenovo 9876|2006-06-12|2012-09-15|Lenovo Group|



	@CreateOperations @Create002
	Scenario: Add a new Computer using blank computer name
		Given I am on play sample application page with title "Computers database"
		When I click on Add a new computer button
		Then "Add a computer" page should open
		And I should not be able to successfully create a new computer using blank computer name
			|computerName|introducedDate|discontinuedDate|company|
			|  |2006-06-12|2012-09-15|Lenovo Group|


	@CreateOperations @Create003
	Scenario: Add a new Computer using blank introduced date, discontinued date and company name
		Given I am on play sample application page with title "Computers database"
		When I click on Add a new computer button
		Then "Add a computer" page should open
		And I should be able to successfully create a new computer using blank introduced date, discontinued date and company name
			|computerName|introducedDate|discontinuedDate|company|
			|Lenovo 687  ||||
		Then I search the newly created computer and validate the Blank data
			|computerName|introducedDate|discontinuedDate|company|
			|Lenovo 687  ||||


	@CreateOperations @Create004
	Scenario: Add a new Computer using invalid introduced and discontinued date
		Given I am on play sample application page with title "Computers database"
		When I click on Add a new computer button
		Then "Add a computer" page should open
		And I should not be able to successfully create a new computer using invalid introduced date
			|computerName|introducedDate|discontinuedDate|company|
			|Lenovo 643  |2011-15-34|2012-09-15|Lenovo Group|

	@CreateOperations @Create005
	Scenario: Add a new Computer using invalid introduced and discontinued date
		Given I am on play sample application page with title "Computers database"
		When I click on Add a new computer button
		Then "Add a computer" page should open
		And I should not be able to successfully create a new computer using invalid discontinued date
			|computerName|introducedDate|discontinuedDate|company|
			|Lenovo 643  |2011-09-15|2015-15-34|Lenovo Group|



