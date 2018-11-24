const path = require("path");
const jsonReports = "/reports/json";
const Reporter = require("./support/reporter");

exports.config = {
	seleniumAddress: "http://localhost:4444/wd/hub",
	baseUrl: "http://computer-database.herokuapp.com/computers",
	capabilities: {
		browserName: process.env.TEST_BROWSER_NAME || "chrome",
		shardTestFiles: true,
		maxInstances : 1,
	},
	// directConnect: true,
	framework: "custom",
	frameworkPath: require.resolve("protractor-cucumber-framework"),
	suites: {
		sanityFeature : ["./features/sanity.feature"],
		searchOperations: ["./features/searchOperations.feature"],
		createOperations: ["./features/createOperations.feature"],
		editOperations: ["./features/editOperations.feature"],
		deleteOperations: ["./features/deleteOperations.feature"],
	},

	exclude: "./features/database.feature",
	onPrepare: function() {
		browser.ignoreSynchronization = true;
		browser.manage().window().maximize();
		require('babel-register');
		Reporter.createDirectory(jsonReports);
	},
	cucumberOpts: {
		strict: true,
		format: 'json:./reports/json/cucumber_report.json',
		require: ["./stepDefinitions/*.js", "./support/*.js"],
		tags: "(@SanityTests or @SearchOperations or @CreateOperations or @EditOperations or @DeleteOperations)",
		keepAlive: false

	},
	onComplete: function () {
		Reporter.createHTMLReport();
	}
};
