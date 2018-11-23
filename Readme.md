<h3>Backbase Assignment Setup Guide</h3>

<i><strong>This project demonstrates the basic protractor-cucumber framework project setup with Allure Reports integration</strong></i>
</p>

---


### Features
* Page Object design pattern implementation
* Extensive hooks implemented for BeforeAll, After etc.
* MultiCapabilities and Test Sharing example
* Screenshots on failure feature scenarios
* Support for cucumber-html-reports

### To Get Started

#### Pre-requisites
1.NodeJS installed globally in the system.
https://nodejs.org/en/download/

**Note** Min node version 6.9.x

2.Chrome or Firefox browsers installed.

3.Text Editor(Optional) installed-->Sublime/Visual Studio Code/Idea Intellij.

#### Run Scripts
* Clone the repository into a folder
* Go inside the folder and run following command from terminal/command prompt which would then install all the dependencies from package.json

```
npm install
```

* Then first step is to start the selenium server,  **webdriver-manager** is used for this.The below command should download the **chrome & gecko driver** locally

```
npm run webdriver-update
``` 

* Then start your selenium server
```
npm run webdriver-start
```

* Following command will launch the chrome browser and run the scripts

```
npm test
```

#### Cucumber Hooks
Following method takes screenshot on failure of each scenario

```     
     
After(function(scenario) {
    if (scenario.result.status === Status.FAILED) {
    const attach = this.attach;
        return browser.takeScreenshot().then(function(png) {
        const decodedImage = new Buffer(png, "base64");
        return attach(decodedImage, "image/png");
    });
}
       
```

#### CucumberOpts Tags
Following configuration shows to call specific tags from feature files

```     
	cucumberOpts: {
		strict: true,
		format: 'json:./reports/json/cucumber_report.json',
		require: ["./stepDefinitions/*.js", "./support/*.js","./support/env.js'"],
		// tags: "(@Edit001)",@SanityTests or @searchOperations or @CreateOperations or @EditOperations or @DeleteOperations
		tags: "(@DEBUG) and (not @DatabaseTest)",
		keepAlive: false

	},
```

#### HTML Reports
The project has been integrated with two types of cucumber HTML repororts, which are generated when you run `npm test` in the `reports` folder.

#### Allure Reports

##### Caveat

These reports do not support latest **cucumber 2.0 version**, however works with older **version cucumber 1.3.5 & less**.

The reporter.js file in Support folder generates the target directory "Reports" in which the xml files are generated.
