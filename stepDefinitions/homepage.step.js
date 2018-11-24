import Globals from '../support/Globals';
import ElementHelper from '../support/ElementHelper';
import HomePage from '../pages/HomePage';
import {browser} from 'protractor';
import {Given,When,Then,setDefaultTimeout} from "cucumber";
setDefaultTimeout(500 * 1000);

// Chai
const globals = new Globals();
const expect = globals.expect;
const helpers = new ElementHelper();
const homepageStep = new HomePage();

Given(/^I am on play sample application page with title "(.*?)"$/, async (title) => {
	return expect(await browser.getTitle()).to.equal(title);
});

Then(/^I verify the heading of the landing page to be "(.*?)"$/, async (title) => {
	expect(await homepageStep.landingPageHeader.isDisplayed()).to.be.true,
		expect(await homepageStep.landingPageHeader.getText()).to.equal(title)
	//
	// return Promise.all([
	//     expect(homepageStep.landingPageHeader.isDisplayed()).to.eventually.be.true,
	//     expect(homepageStep.landingPageHeader.getText()).to.eventually.equal("Play sample application — Computer database")
	// ])
});

Then(/^I validate presence of add a new computer button$/, async () => {
	return expect(await homepageStep.addNewComputerButton.isDisplayed()).to.be.true;
});


Then(/^I validate presence of filter by computer name edit box$/, async () => {
	return expect(await homepageStep.filterByComputerNameEditBox.isDisplayed()).to.be.true;
});


Then(/^I validate presence of filter by name button$/, async () => {
	return expect(await homepageStep.filterByNameButton.isDisplayed()).to.be.true;
});

Then(/^I verify that the number of rows in the table equals (.*?)$/, async (rows) => {
	return expect(await homepageStep.tableComputerNameElements.count()).to.equal(Number(rows));
});

Then(/^I validate column "(.*?)" table header text to be "(.*?)"$/, async (col, value) => {
	return expect(await homepageStep.getTableHeaderTextByIndex(col)).to.equal(value);
});

Then(/^I validate that the column "(.*?)" values are sorted in ascending order$/, async (col) => {
	expect(await homepageStep.getFirstColumnSortedAsc()).to.have.ordered.members(await homepageStep.getFirstColumnData());
	// return homepageStep.getFirstColumnSortedAsc().then((text1) => {
	//     return homepageStep.getFirstColumnData().then((text2) => {
	//         //console.log("expect : " + text1 + " to equal " + text2);
	//         expect(text1).to.have.ordered.members(text2);
	//     });
	// });
});

Then(/^I validate column table header text$/, async (data) => {
	let rows = data.hashes();
	let promise = [];

	rows.map(async (rw) => {
		expect(await homepageStep.tableHeaderElements.get(rw.index).getText()).to.equal(rw.header);
	})
});

Given(/^I verify that the "(.*?)" link is disabled on the first or landing page$/, async (title) => {
	expect(await homepageStep.previousLinkDisabled.isDisplayed()).to.be.true;
	expect(await homepageStep.previousLinkDisabled.getText()).to.equal(title);
});

Given(/^I verify that the "(.*?)" link is enabled on the first or landing page$/, async (title) => {
	expect(await homepageStep.nextLinkEnabled.isDisplayed()).to.be.true;
	expect(await homepageStep.nextLinkEnabled.getText()).to.equal(title);
});

// Given(/^I get the total number of computers displayed on the page$/, () => {
//     return homepageStep.getTotalComputerCount();
// });

Given(/^I verify that the Current link displays "(.*?)" total number of computers displayed on the page$/, async (text) => {
	let totalComputerCount = await homepageStep.getTotalComputerCount();
	expect(await homepageStep.getTotalComputerCountFromCurrentLink()).to.equal(totalComputerCount);
	expect(await homepageStep.currentLink.getText()).to.equal(text + totalComputerCount);
});

When(/^I enter search string "(.*?)" in the search box and click on Filter by name button$/, async (search) => {
	await homepageStep.filterByComputerNameEditBox.clear();
	await homepageStep.filterByComputerNameEditBox.sendKeys(search);
	await homepageStep.filterByNameButton.click();
});

Then(/^I verify that the table contains the data for the search string "(.*?)" and row count is "(.*?)"$/, async (search, count) => {
	expect(await homepageStep.tableComputerNameElements.count()).to.equal(Number(count));
	expect(await homepageStep.tableComputerNameElements.get(0).getText()).to.equal(search);
});

Then(/^I verify that the table contains the data for the search string "(.*?)" and row count is greater than "(.*?)"$/, async (search, count) => {
	expect(await homepageStep.getFilteredComputerCountFromTable()).to.be.greaterThan(Number(count));
	await homepageStep.getBackToFirstPage();
	expect(await homepageStep.validateTableDataToContain(search)).to.be.true;
	await homepageStep.getBackToFirstPage();
});

Then(/^I verify that the filtered table row count matches the number of computers displayed on the page$/, async () => {
	let totalComputerCount = await homepageStep.getTotalComputerCount();
	expect(await homepageStep.getFilteredComputerCountFromTable()).to.equal(totalComputerCount);
	await homepageStep.getBackToFirstPage();
});

Then(/^I verify that the number of clicks to Next and Previous link is equal to the number of pages present on the table$/, async () => {
	let totalComputerCount = await homepageStep.getTotalComputerCountFromCurrentLink();
	let clickCounter =homepageStep.getPageCount(totalComputerCount) -1 ;
	if(clickCounter ==0 ){
		expect(await homepageStep.nextLinkDisabled.isPresent()).to.be.true;
		expect(await homepageStep.previousLinkDisabled.isPresent()).to.be.true;
	}else{
		expect(await homepageStep.getNextLinkClickTimes()).to.equal(clickCounter);
		expect(await homepageStep.getPreviousLinkClickTimes()).to.equal(clickCounter);
	}
});


Then(/^I verify the current link text after every click to next page on table$/, async () => {
	let totalComputerCount = await homepageStep.getTotalComputerCountFromCurrentLink();
	let clickCounter =homepageStep.getPageCount(totalComputerCount) -1 ;
	console.log(clickCounter,totalComputerCount)
	let rowStart=0;
	let rowEnd =0;
	for(let i = 0; i <= clickCounter ; i++ ){
		rowStart = 10 * i + 1;
		rowEnd = 10 * i + 10;
		if(totalComputerCount-rowStart < 10){
			rowEnd = 10 * i + (totalComputerCount-rowEnd) +10;
		}
		console.log(rowStart,rowEnd);
		expect(await homepageStep.currentLink.getText()).to.equal(`Displaying ${rowStart} to ${rowEnd} of ${totalComputerCount}`);
		if(await homepageStep.nextLinkEnabled.isPresent())
			await homepageStep.nextLinkEnabled.click();
	}
});


Then(/^Then I should see a message saying "(.*?)"$/, async (message) => {
	expect(await homepageStep.nothingToDisplayMessage.isDisplayed()).to.be.true;
});




