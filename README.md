# Automation-Challenge



Welcome to Rumah123 Automation Mobile Challenge, please follow below instruction for this chanllenge

## Requirement:

* use newest Appium Version
* use WebdriverIO as framework
* use CommonJS as a code
* use Page Object Model for code structure
* use Gherkin as Test Cases

## Test Cases:

* You are as an QA at 99, please download latest version of 99 (do not download the Pro Apps). You have the project to testing the revamp part on homepage, please scan all the locators and make it into the automation. so you can reduce testing time and also catch the bugs very sooner.
* How to access the homepage
1. please open the app
2. once it's open you will see the homepage



Rule:

* Please forking this repository
* Invite indra99co as collaborator
* once you done, please push into your branch and create the PR



\-How to Run-



1\. Install Node.js, Java 17, Appium (`npm i -g appium`), driver (`appium driver install uiautomator2`), and Android platform-tools.

2\. Set `ANDROID\_HOME`, connect an Android device with USB debugging, and install the 99 app.

3\. Run `npm install`

4\. Update `appium:udid` in `wdio.conf.js` with your device ID (`adb devices`)

5\. Run `npx wdio run ./wdio.conf.js`



\-Tests-



Homepage checks: search bar, filter button, category tabs, property listing, bottom navigation menu.

