const { Given, Then } = require('@wdio/cucumber-framework');
const assert = require('assert');
const HomePage = require('../pageobjects/home.page');

Given('I open the 99 app', async () => {
    await HomePage.waitForHomepage();
});

Then('I should see the search bar', async () => {
    assert.ok(await HomePage.isDisplayed(HomePage.searchBar));
});

Then('I should see the filter button', async () => {
    assert.ok(await HomePage.isDisplayed(HomePage.filterButton));
});

Then('I should see the {string} tab', async (name) => {
    assert.ok(await HomePage.isDisplayed(HomePage.tab(name)));
});

Then('I should see at least one property listing', async () => {
    assert.ok(await HomePage.isDisplayed(HomePage.listingCard));
});

Then('I should see the {string} bottom menu', async (name) => {
    assert.ok(await HomePage.isDisplayed(HomePage.bottomMenu(name)));
});