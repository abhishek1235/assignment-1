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

When(/^I click on Add a new computer button$/, async () => {
	await addComputerPage.addNewComputerButton.click();
});

Then(/^"(.*?)" page should open$/, async (text) => {
	return expect(await addComputerPage.pageHeader.getText()).to.equal(text);
});


Then(/^I should be able to successfully create a new computer using the following details$/, async (data) => {
	let rows = data.hashes();
	await addComputerPage.computerNameEditBox.sendKeys(rows[0].computerName);
	await addComputerPage.introducedDateEditBox.sendKeys(rows[0].introducedDate)
	await addComputerPage.discontinuedDateEditBox.sendKeys(rows[0].discontinuedDate);
	await addComputerPage.companyNameDropDown.click();
	await addComputerPage.selectDropdownValueByText(rows[0].company);
	await addComputerPage.saveComputerButton.click();
	expect(await addComputerPage.successMessage.isDisplayed()).to.be.true;
	expect(await addComputerPage.successMessage.getText()).to.equal(`Done! Computer ${rows[0].computerName} has been created`);

});


Then(/^I should not be able to successfully create a new computer using blank computer name$/, async (data) => {
	let rows = data.hashes();
	await addComputerPage.computerNameEditBox.sendKeys(rows[0].computerName);
	await addComputerPage.introducedDateEditBox.sendKeys(rows[0].introducedDate)
	await addComputerPage.discontinuedDateEditBox.sendKeys(rows[0].discontinuedDate);
	await addComputerPage.companyNameDropDown.click();
	await addComputerPage.selectDropdownValueByText(rows[0].company);
	await addComputerPage.saveComputerButton.click();
	expect(await addComputerPage.errorMessage.isDisplayed()).to.be.true;
	expect(await addComputerPage.errorMessage.getCssValue('background')).to.include('rgb(250, 229, 227');
	await addComputerPage.cancelButton.click();

});


Then(/^I should be able to successfully create a new computer using blank introduced date, discontinued date and company name$/, async (data) => {
	let rows = data.hashes();
	await addComputerPage.computerNameEditBox.sendKeys(rows[0].computerName);
	await addComputerPage.introducedDateEditBox.sendKeys(rows[0].introducedDate)
	await addComputerPage.discontinuedDateEditBox.sendKeys(rows[0].discontinuedDate);
	await addComputerPage.companyNameDropDown.click();
	await addComputerPage.saveComputerButton.click();
	expect(await addComputerPage.successMessage.isDisplayed()).to.be.true;
	expect(await addComputerPage.successMessage.getText()).to.equal(`Done! Computer ${rows[0].computerName} has been created`);

});

Then(/^I should not be able to successfully create a new computer using invalid introduced date$/, async (data) => {
	let rows = data.hashes();
	await addComputerPage.computerNameEditBox.sendKeys(rows[0].computerName);
	await addComputerPage.introducedDateEditBox.sendKeys(rows[0].introducedDate)
	await addComputerPage.discontinuedDateEditBox.sendKeys(rows[0].discontinuedDate);
	await addComputerPage.companyNameDropDown.click();
	await addComputerPage.saveComputerButton.click();
	expect(await addComputerPage.errorMessage.isDisplayed()).to.be.true;
	expect(await addComputerPage.errorMessage.getCssValue('background')).to.include('rgb(250, 229, 227');
	await addComputerPage.cancelButton.click();
});

Then(/^I should not be able to successfully create a new computer using invalid discontinued date$/, async (data) => {
	let rows = data.hashes();
	await addComputerPage.computerNameEditBox.sendKeys(rows[0].computerName);
	await addComputerPage.introducedDateEditBox.sendKeys(rows[0].introducedDate)
	await addComputerPage.discontinuedDateEditBox.sendKeys(rows[0].discontinuedDate);
	await addComputerPage.companyNameDropDown.click();
	await addComputerPage.saveComputerButton.click();
	expect(await addComputerPage.errorMessage.isDisplayed()).to.be.true;
	expect(await addComputerPage.errorMessage.getCssValue('background')).to.include('rgb(250, 229, 227');
	await addComputerPage.cancelButton.click();
});


Then(/^I search the newly created computer and validate the data$/, async (data) => {
	let rows = data.hashes();
	await homePage.filterByComputerNameEditBox.clear();
	await homePage.filterByComputerNameEditBox.sendKeys(rows[0].computerName);
	await homePage.filterByNameButton.click();

	expect(await addComputerPage.tableComputerName.getText()).to.equal(rows[0].computerName);
	expect(await addComputerPage.tableIntroducedDate.getText()).to.equal(moment(rows[0].introducedDate).format('DD MMM YYYY'));
	expect(await addComputerPage.tableDiscontinuedDate.getText()).to.equal(moment(rows[0].discontinuedDate).format('DD MMM YYYY'));
	expect(await addComputerPage.tableCompanyName.getText()).to.equal(rows[0].company);

});

Then(/^I search the newly created computer and validate the Blank data$/, async (data) => {
	let rows = data.hashes();
	await homePage.filterByComputerNameEditBox.clear();
	await homePage.filterByComputerNameEditBox.sendKeys(rows[0].computerName);
	await homePage.filterByNameButton.click();

	expect(await addComputerPage.tableComputerName.getText()).to.equal(rows[0].computerName);
	expect(await addComputerPage.tableIntroducedDate.getText()).to.equal('-');
	expect(await addComputerPage.tableDiscontinuedDate.getText()).to.equal('-');
	expect(await addComputerPage.tableCompanyName.getText()).to.equal('-');

});


