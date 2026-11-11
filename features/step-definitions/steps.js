const { Given, Then } = require('@wdio/cucumber-framework');
const HomePage = require('../pageobjects/home.page.js');

Given(/^I open the 99 app$/, async () => {
    console.log("Membuka aplikasi 99...");
    await driver.pause(3000); 
});

Then(/^I should see the homepage revamp elements$/, async () => {
    await HomePage.verifyHomepageLoad();
});