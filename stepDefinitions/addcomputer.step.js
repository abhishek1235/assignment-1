import Globals from '../support/Globals';
import ElementHelper from '../support/ElementHelper';
import HomePage from '../pages/HomePage';
import {browser} from 'protractor';
import {Given,When,Then,setDefaultTimeout} from "cucumber";
import AddComputerPage from "../pages/AddComputerPage";
setDefaultTimeout(500 * 1000);
const moment = require("moment");
const globals = new Globals();
const expect = globals.expect;
const helpers = new ElementHelper();
const addcomputerStep = new AddComputerPage();
const homepageStep = new HomePage();

When(/^I click on Add a new computer button$/, async () => {
	await addcomputerStep.addNewComputerButton.click();
});

Then(/^"(.*?)" page should open$/, async (text) => {
	return expect(await addcomputerStep.pageHeader.getText()).to.equal(text);
});


Then(/^I should be able to successfully create a new computer using the following details$/,  async (data) => {
	let rows = data.hashes();
	await addcomputerStep.computerNameEditBox.sendKeys(rows[0].computerName);
	await addcomputerStep.introducedDateEditBox.sendKeys(rows[0].introducedDate)
	await addcomputerStep.discontinuedDateEditBox.sendKeys(rows[0].discontinuedDate);
	await addcomputerStep.companyNameDropDown.click();
	await addcomputerStep.selectDropdownValueByText(rows[0].company);
	await addcomputerStep.saveComputerButton.click();
	expect(await addcomputerStep.successMessage.isDisplayed()).to.be.true;
	expect(await addcomputerStep.successMessage.getText()).to.equal(`Done! Computer ${rows[0].computerName} has been created`);

});


Then(/^I should not be able to successfully create a new computer using blank computer name$/,  async (data) => {
	let rows = data.hashes();
	await addcomputerStep.computerNameEditBox.sendKeys(rows[0].computerName);
	await addcomputerStep.introducedDateEditBox.sendKeys(rows[0].introducedDate)
	await addcomputerStep.discontinuedDateEditBox.sendKeys(rows[0].discontinuedDate);
	await addcomputerStep.companyNameDropDown.click();
	await addcomputerStep.selectDropdownValueByText(rows[0].company);
	await addcomputerStep.saveComputerButton.click();
	expect(await addcomputerStep.errorMessage.isDisplayed()).to.be.true;
	await addcomputerStep.cancelButton.click();

});


Then(/^I should be able to successfully create a new computer using blank introduced date, discontinued date and company name$/,  async (data) => {
	let rows = data.hashes();
	await addcomputerStep.computerNameEditBox.sendKeys(rows[0].computerName);
	await addcomputerStep.introducedDateEditBox.sendKeys(rows[0].introducedDate)
	await addcomputerStep.discontinuedDateEditBox.sendKeys(rows[0].discontinuedDate);
	await addcomputerStep.companyNameDropDown.click();
	await addcomputerStep.saveComputerButton.click();
	expect(await addcomputerStep.successMessage.isDisplayed()).to.be.true;
	expect(await addcomputerStep.successMessage.getText()).to.equal(`Done! Computer ${rows[0].computerName} has been created`);

});


Then(/^I search the newly created computer and validate the data$/, async (data) => {
	let rows = data.hashes();
	await homepageStep.filterByComputerNameEditBox.clear();
	await homepageStep.filterByComputerNameEditBox.sendKeys(rows[0].computerName);
	await homepageStep.filterByNameButton.click();

	expect(await addcomputerStep.tableComputerName.getText()).to.equal(rows[0].computerName);
	expect(await addcomputerStep.tableIntroducedDate.getText()).to.equal(moment(rows[0].introducedDate).format('DD MMM YYYY'));
	expect(await addcomputerStep.tableDiscontinuedDate.getText()).to.equal(moment(rows[0].discontinuedDate).format('DD MMM YYYY'));
	expect(await addcomputerStep.tableCompanyName.getText()).to.equal(rows[0].company);

});

Then(/^I search the newly created computer and validate the Blank data$/, async (data) => {
	let rows = data.hashes();
	await homepageStep.filterByComputerNameEditBox.clear();
	await homepageStep.filterByComputerNameEditBox.sendKeys(rows[0].computerName);
	await homepageStep.filterByNameButton.click();

	expect(await addcomputerStep.tableComputerName.getText()).to.equal(rows[0].computerName);
	expect(await addcomputerStep.tableIntroducedDate.getText()).to.equal('-');
	expect(await addcomputerStep.tableDiscontinuedDate.getText()).to.equal('-');
	expect(await addcomputerStep.tableCompanyName.getText()).to.equal('-');

});


