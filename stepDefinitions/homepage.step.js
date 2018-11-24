import Globals from '../support/Globals';
import ElementHelper from '../support/ElementHelper';
import HomePage from '../pages/HomePage';
import {browser} from 'protractor';
import {Given, When, Then, setDefaultTimeout} from "cucumber";

const _ = require('underscore');
const moment = require('moment');

setDefaultTimeout(500 * 1000);
const globals = new Globals();
const expect = globals.expect;
const helpers = new ElementHelper();
const homePage = new HomePage();

Given(/^I am on play sample application page with title "(.*?)"$/, async (title) => {
	return expect(await browser.getTitle()).to.equal(title);
});

Then(/^I verify the heading of the landing page to be "(.*?)"$/, async (title) => {
	expect(await homePage.landingPageHeader.isDisplayed()).to.be.true;
	expect(await homePage.landingPageHeader.getText()).to.equal(title);

});

Then(/^I validate presence of add a new computer button$/, async () => {
	return expect(await homePage.addNewComputerButton.isDisplayed()).to.be.true;
});


Then(/^I validate presence of filter by computer name edit box$/, async () => {
	return expect(await homePage.filterByComputerNameEditBox.isDisplayed()).to.be.true;
});


Then(/^I validate presence of filter by name button$/, async () => {
	return expect(await homePage.filterByNameButton.isDisplayed()).to.be.true;
});

Then(/^I verify that the number of rows in the table equals (.*?)$/, async (rows) => {
	return expect(await homePage.tableComputerNameElements.count()).to.equal(Number(rows));
});

Then(/^I validate column "(.*?)" table header text to be "(.*?)"$/, async (col, value) => {
	return expect(await homePage.getTableHeaderTextByIndex(col)).to.equal(value);
});

Then(/^I validate that the column "(.*?)" values are sorted in ascending order$/, async (col) => {
	expect(await homePage.getFirstColumnSortedAsc()).to.have.ordered.members(await homePage.getFirstColumnData());
});

Then(/^I validate column table header text$/, async (data) => {
	let rows = data.hashes();
	let promise = [];

	rows.map(async (rw) => {
		expect(await homePage.tableHeaderElements.get(rw.index).getText()).to.equal(rw.header);
	})
});

Given(/^I verify that the "(.*?)" link is disabled on the first or landing page$/, async (title) => {
	expect(await homePage.previousLinkDisabled.isDisplayed()).to.be.true;
	expect(await homePage.previousLinkDisabled.getText()).to.equal(title);
});

Given(/^I verify that the "(.*?)" link is enabled on the first or landing page$/, async (title) => {
	expect(await homePage.nextLinkEnabled.isDisplayed()).to.be.true;
	expect(await homePage.nextLinkEnabled.getText()).to.equal(title);
});


Given(/^I verify that the Current link displays "(.*?)" total number of computers displayed on the page$/, async (text) => {
	let totalComputerCount = await homePage.getTotalComputerCount();
	expect(await homePage.getTotalComputerCountFromCurrentLink()).to.equal(totalComputerCount);
	expect(await homePage.currentLink.getText()).to.equal(text + totalComputerCount);
});

When(/^I enter search string "(.*?)" in the search box and click on Filter by name button$/, async (search) => {
	await homePage.filterByComputerNameEditBox.clear();
	if(search !="EMPTY")
		await homePage.filterByComputerNameEditBox.sendKeys(search);
	await homePage.filterByNameButton.click();
});

Then(/^I verify that the table contains the data for the search string "(.*?)" and row count is "(.*?)"$/, async (search, count) => {
	expect(await homePage.tableComputerNameElements.count()).to.equal(Number(count));
	expect(await homePage.tableComputerNameElements.get(0).getText()).to.equal(search);
});

Then(/^I verify that the table contains the data for the search string "(.*?)" and row count is greater than "(.*?)"$/, async (search, count) => {
	expect(await homePage.getFilteredComputerCountFromTable()).to.be.greaterThan(Number(count));
	await homePage.getBackToFirstPage();
	expect(await homePage.validateTableDataToContain(search)).to.be.true;
	await homePage.getBackToFirstPage();
});

Then(/^I verify that the filtered table row count matches the number of computers displayed on the page$/, async () => {
	let totalComputerCount = await homePage.getTotalComputerCount();
	expect(await homePage.getFilteredComputerCountFromTable()).to.equal(totalComputerCount);
	await homePage.getBackToFirstPage();
});

Then(/^I verify that the number of clicks to Next and Previous link is equal to the number of pages present on the table$/, async () => {
	let totalComputerCount = await homePage.getTotalComputerCountFromCurrentLink();
	let clickCounter = homePage.getPageCount(totalComputerCount) - 1;
	if (clickCounter == 0) {
		expect(await homePage.nextLinkDisabled.isPresent()).to.be.true;
		expect(await homePage.previousLinkDisabled.isPresent()).to.be.true;
	} else {
		expect(await homePage.getNextLinkClickTimes()).to.equal(clickCounter);
		expect(await homePage.getPreviousLinkClickTimes()).to.equal(clickCounter);
	}
});


Then(/^I verify the current link text after every click to next page on table$/, async () => {
	let totalComputerCount = await homePage.getTotalComputerCountFromCurrentLink();
	let clickCounter = homePage.getPageCount(totalComputerCount) - 1;
	let rowStart = 0;
	let rowEnd = 0;
	for (let i = 0; i <= clickCounter; i++) {
		rowStart = 10 * i + 1;
		rowEnd = 10 * i + 10;
		if (totalComputerCount - rowStart < 10) {
			rowEnd = 10 * i + (totalComputerCount - rowEnd) + 10;
		}
		expect(await homePage.currentLink.getText()).to.equal(`Displaying ${rowStart} to ${rowEnd} of ${totalComputerCount}`);
		if (await homePage.nextLinkEnabled.isPresent())
			await homePage.nextLinkEnabled.click();
	}
});


Then(/^I should see a message saying "(.*?)"$/, async (message) => {
	expect(await homePage.nothingToDisplayMessage.isDisplayed()).to.be.true;
	expect(await homePage.nothingToDisplayMessage.getText()).to.equal(message);
});


Then(/^I verify that default sorting order of Computers table with pagination is by computer name in ascending order$/, async () => {
	while (await homePage.nextLinkEnabled.isPresent()) {
		expect(await homePage.getFirstColumnSortedAsc()).to.have.ordered.members(await homePage.getFirstColumnData());
		await homePage.nextLinkEnabled.click();
	}
	await homePage.getBackToFirstPage();
});


Then(/^I verify that the Introduced and Discontinued dates are either hyphen or a valid date$/, async () => {
	let columnDataList = await homePage.getSecondcolumnData();
	let columnDataWithout_ = _.without(columnDataList,'-');
	let flag = false;
	while (await homePage.nextLinkEnabled.isPresent()) {
		if(columnDataWithout_.length > 0){
			flag = _.every(columnDataWithout_,(data)=>{return moment(data, "DD MMM YYYY").isValid()});
		}
		expect(flag).to.be.true;
		await homePage.nextLinkEnabled.click();
	}
	await homePage.getBackToFirstPage();
});




