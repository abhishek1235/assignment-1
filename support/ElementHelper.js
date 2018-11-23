import { browser } from 'protractor';
import Globals from "./Globals";

const EC = browser.ExpectedConditions;

const globals = new Globals();
const expect = globals.expect;
/*
This class assists in waiting for non-angular page screen elements
 */
class ElementHelper {
	constructor(ele){
		this.ele = ele;
	}
	waitForPresent(ele) {
		return browser.wait(EC.presenceOf(ele));
	}
	waitForDisplay(ele) {
		return browser.wait(ele.isDisplayed);
	}
	waitForElement(ele) {
		this.waitForPresent(ele);
		this.waitForDisplay(ele);
	}
	getRowCount(ele){
		return ele.count();
	}



}

export default ElementHelper;
