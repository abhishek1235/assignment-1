import ElementHelper from "../support/ElementHelper";
import {browser} from "protractor/built/index";

const EC = browser.ExpectedConditions;

class HomePage extends ElementHelper {
	constructor(ele) {
		super(ele);
		this.searchTextBox = $("input[name='q']");
		this.searchButton = $("input[value='Google Search']");

		this.tableRowElements = $$("table.computers.zebra-striped tbody tr");
		this.tableComputerNameElements = $$("table.computers.zebra-striped tbody tr td:nth-child(1) a");
		this.tableHeaderElements = $$("table.computers.zebra-striped thead tr th");

		this.addNewComputerButton = $("#add");
		this.filterByComputerNameEditBox = $("input#searchbox[placeholder='Filter by computer name...']");
		this.filterByNameButton = $("input#searchsubmit[value='Filter by name']");

		this.landingPageHeader = $("body > header > h1 > a");
		this.previousLinkDisabled = $("#pagination > ul > li.prev.disabled > a");
		this.previousLinkEnabled = $("#pagination > ul > li.prev:not(.disabled) > a");

		this.nextLinkEnabled = $("#pagination > ul > li.next:not(.disabled)> a");
		this.nextLinkDisabled = $("#pagination > ul > li.next.disabled > a");

		this.currentLink = $("#pagination > ul > li.current > a");
		this.pageHeader = $("#main > h1");
		this.nothingToDisplayMessage = $("div.well > em");


	}

	async getTableHeaderTextByIndex(index) {
		return await this.tableHeaderElements.get(index).getText();
	}

	async getFirstColumnSortedAsc() {
		let unsorted = await this.tableComputerNameElements.getText();
		return unsorted.sort();
	}

	async getFirstColumnData() {
		return await this.tableComputerNameElements.getText();
	}

	async getTotalComputerCount() {
		let temp = await this.pageHeader.getText();
		if (temp.split(' ')[0].toUpperCase() === 'ONE') {
			return 1;
		} else {
			return Number(temp.split(' ')[0]);
		}
	}

	async getTotalComputerCountFromCurrentLink() {
		let text = await this.currentLink.getText();
		return Number(text.split(' ')[5]);
	}

	async getFilteredComputerCountFromTable() {
		let flag = await this.nextLinkEnabled.isPresent();
		let pageCounter = 1;
		let totalTableRows = await this.tableComputerNameElements.count();

		while (flag) {
			await this.nextLinkEnabled.click();
			pageCounter++;
			totalTableRows = totalTableRows + await this.tableComputerNameElements.count();
			flag = await this.nextLinkEnabled.isPresent();
		}
		return totalTableRows;
	}

	async getBackToFirstPage() {
		let flag = await this.previousLinkEnabled.isPresent();
		while (flag) {
			this.previousLinkEnabled.click();
			flag = await this.previousLinkEnabled.isPresent();
		}
	}

	async validateTableDataToContain(text) {
		let flag = await this.nextLinkEnabled.isPresent();
		let pageCounter = 1;
		let match = await this.isListContains(text);
		while (flag) {
			await this.nextLinkEnabled.click();
			pageCounter++;
			match = await this.isListContains(text);
			if (!match) flag = false;
			else flag = await this.nextLinkEnabled.isPresent();
		}
		return match;
	}

	async isListContains(substring) {
		let list = await this.tableComputerNameElements.getText();
		return (list.filter((item) => {
			return item.includes(substring)
		})
			.length === list.length);
	}


	async getNextLinkClickTimes() {
		let flag = await this.nextLinkEnabled.isPresent();
		let clickCounter = 0;

		while (flag) {
			clickCounter++;
			await this.nextLinkEnabled.click();
			flag = await this.nextLinkEnabled.isPresent();
		}
		return clickCounter;
	}

	async getPreviousLinkClickTimes() {
		let flag = await this.previousLinkEnabled.isPresent();
		let clickCounter = 0;

		while (flag) {
			await this.previousLinkEnabled.click();
			clickCounter++;
			flag = await this.previousLinkEnabled.isPresent();
		}
		return clickCounter;
	}

	getPageCount(totalComputerCount) {
		let pages = 0;
		if (totalComputerCount > 10) {
			pages = (totalComputerCount - (totalComputerCount % 10)) / 10 + 1;
		}
		else pages = 1;
		return pages;
	}

}

export default HomePage;
