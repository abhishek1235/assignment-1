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
const addcomputerpagestep = new AddComputerPage();
const homepageStep = new HomePage();


When(/^I click on the computer name in the table to Edit the computer details$/, async () => {
	await addcomputerpagestep.tableComputerName.click();
});

When(/^I verify thet "(.*?)" page is displayed$/, async (text) => {
	expect(await addcomputerpagestep.pageHeader.getText()).to.equal(text);
});

When(/^I change some of the details of the computer and verify if the changes are reflected or not$/, async (data) => {
	let rows = data.hashes();
	await addcomputerpagestep.computerNameEditBox.clear();
	await addcomputerpagestep.introducedDateEditBox.clear();
	await addcomputerpagestep.discontinuedDateEditBox.clear();

	await addcomputerpagestep.computerNameEditBox.sendKeys(rows[0].computerName);
	await addcomputerpagestep.introducedDateEditBox.sendKeys(rows[0].introducedDate)
	await addcomputerpagestep.discontinuedDateEditBox.sendKeys(rows[0].discontinuedDate);
	await addcomputerpagestep.companyNameDropDown.click();
	await addcomputerpagestep.selectDropdownValueByText(rows[0].company);
	await addcomputerpagestep.saveComputerButton.click();
	expect(await addcomputerpagestep.successMessage.isDisplayed()).to.be.true;
	expect(await addcomputerpagestep.successMessage.getText()).to.equal(`Done! Computer ${rows[0].computerName} has been updated`);

});

When(/^I click on Delete this computer button on Edit computer page$/, async () => {
	await addcomputerpagestep.deleteComputerButton.click();
});

When(/^I validate the success message upon deletion$/, async () => {
	expect(await addcomputerpagestep.successMessage.isDisplayed()).to.be.true;
	expect(await addcomputerpagestep.successMessage.getText()).to.equal(`Done! Computer has been deleted`);
});



