const { Given, Then } = require('@wdio/cucumber-framework');
const { expect } = require('@wdio/globals');
const homePage = require('../pageobjects/homepage.page');

Given(/^I open the 99 app$/, async () => {
    await browser.pause(3000);
});

Then(/^I should see the search bar$/, async () => {
    await expect(homePage.searchBar).toBeDisplayed();
});

Then(/^I should see the "Filter" button$/, async () => {
    await expect(homePage.filterButton).toBeDisplayed();
});

Then(/^I should see the "Properti Baru" button$/, async () => {
    await expect(homePage.propertiBaruButton).toBeDisplayed();
});