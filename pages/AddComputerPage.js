import ElementHelper from "../support/ElementHelper";
import {browser} from "protractor/built/index";

const EC = browser.ExpectedConditions;

class AddComputerPage extends ElementHelper{
	constructor(ele){
		super(ele);
		this.addNewComputerButton = $("#add");
		this.pageHeader = $("#main > h1");
		this.computerNameEditBox = $("#name");
		this.introducedDateEditBox = $("#introduced");
		this.discontinuedDateEditBox = $("#discontinued");
		this.companyNameDropDown = $("#company");
		this.companyNameDropDownList = $$("#company > option");

		this.saveComputerButton = $("input[type='submit'].primary");
		this.cancelButton = $("a[href='/computers']");
		this.deleteComputerButton = $("input.danger");

		this.successMessage = $("div.alert-message.warning");
		this.errorMessage = $("form > fieldset > div.clearfix.error");

		this.tableComputerName= $("table.computers.zebra-striped tbody tr:nth-child(1) td:nth-child(1) a");
		this.tableIntroducedDate= $("table.computers.zebra-striped tbody tr:nth-child(1) td:nth-child(2)");
		this.tableDiscontinuedDate= $("table.computers.zebra-striped tbody tr:nth-child(1) td:nth-child(3)");
		this.tableCompanyName= $("table.computers.zebra-striped tbody tr:nth-child(1) td:nth-child(4)");


	}


	selectDropdownValueByText(dropdownText){
		return this.companyNameDropDownList.filter((elem) => {
			return elem.getText().then(text => {
				return text === dropdownText;
			})
		}).first()
			.click();
	}

	async setComputerName(text){
		return await this.computerNameEditBox.sendKeys(text);
	}


}

export default AddComputerPage;
