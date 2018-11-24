import Globals from '../support/Globals';
import ElementHelper from '../support/ElementHelper';
import HomePage from '../pages/HomePage';
import {browser} from 'protractor';
import {Given, When, Then, setDefaultTimeout} from "cucumber";
import AddComputerPage from "../pages/AddComputerPage";

setDefaultTimeout(500 * 1000);
const moment = require("moment");
const globals = new Globals();
const expect = globals.expect;
const helpers = new ElementHelper();
const addComputerPage = new AddComputerPage();
const homePage = new HomePage();


When(/^I click on the computer name in the table to Edit the computer details$/, async () => {
	await addComputerPage.tableComputerName.click();
});

When(/^I verify thet "(.*?)" page is displayed$/, async (text) => {
	expect(await addComputerPage.pageHeader.getText()).to.equal(text);
});

When(/^I change some of the details of the computer and verify if the changes are reflected or not$/, async (data) => {
	let rows = data.hashes();
	await addComputerPage.computerNameEditBox.clear();
	await addComputerPage.introducedDateEditBox.clear();
	await addComputerPage.discontinuedDateEditBox.clear();

	await addComputerPage.computerNameEditBox.sendKeys(rows[0].computerName);
	await addComputerPage.introducedDateEditBox.sendKeys(rows[0].introducedDate)
	await addComputerPage.discontinuedDateEditBox.sendKeys(rows[0].discontinuedDate);
	await addComputerPage.companyNameDropDown.click();
	await addComputerPage.selectDropdownValueByText(rows[0].company);
	await addComputerPage.saveComputerButton.click();
	expect(await addComputerPage.successMessage.isDisplayed()).to.be.true;
	expect(await addComputerPage.successMessage.getText()).to.equal(`Done! Computer ${rows[0].computerName} has been updated`);

});

When(/^I click on Delete this computer button on Edit computer page$/, async () => {
	await addComputerPage.deleteComputerButton.click();
});

When(/^I validate the success message upon deletion$/, async () => {
	expect(await addComputerPage.successMessage.isDisplayed()).to.be.true;
	expect(await addComputerPage.successMessage.getText()).to.equal(`Done! Computer has been deleted`);
});



