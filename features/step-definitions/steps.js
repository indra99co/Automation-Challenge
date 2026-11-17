const { Given, Then } = require('@wdio/cucumber-framework');
const HomePage = require('../pageobjects/home.page');

Given('the user opens the 99 app', async () => {
    await HomePage.waitForHomepage();
});

Then('the user should see the search bar', async () => {
    await expect(HomePage.searchBar).toBeDisplayed();
});

Then('the user should see the filter button', async () => {
    await expect(HomePage.filterButton).toBeDisplayed();
});

Then('the user should see the {string} button', async (name) => {
    await expect(HomePage.quickButton(name)).toBeDisplayed();
});

Then('the user should see the {string} tab', async (name) => {
    await expect(HomePage.tab(name)).toBeDisplayed();
});