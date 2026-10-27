const { Given, When, Then, Before } = require('@wdio/cucumber-framework');
const { expect } = require('@wdio/globals');
const HomePage = require('../../test/pageobjects/HomePage');
Before(async function () {
    const homepageVisible = await HomePage.searchField.isDisplayed().catch(() => false);

    if (!homepageVisible) {
        await driver.terminateApp('com.urbanindo.android');
        await driver.activateApp('com.urbanindo.android');
        await HomePage.searchField.waitForDisplayed({ timeout: 30000 });
    }
});
Given('the 99.co app is open', async function () {
    await HomePage.searchField.waitForDisplayed({ timeout: 30000 });
});

Then('the homepage search field should be displayed', async function () {
    const isDisplayed = await HomePage.isSearchFieldDisplayed();
    expect(isDisplayed).toBe(true);
});

Then('the homepage filter button should be displayed', async function () {
    await expect(HomePage.filterButton).toBeDisplayed();
});

Then('the homepage sort priority should be displayed', async function () {
    await expect(HomePage.sortPriority).toBeDisplayed();
});

Then('the homepage price range should be displayed', async function () {
    await expect(HomePage.priceRange).toBeDisplayed();
});

Then('the homepage land area filter should be displayed', async function () {
    await expect(HomePage.landArea).toBeDisplayed();
});

Then('the new properties category should be displayed', async function () {
    await expect(HomePage.newProperties).toBeDisplayed();
});

Then('the bank assets category should be displayed', async function () {
    await expect(HomePage.bankAssets).toBeDisplayed();
});

Then('the house category should be displayed', async function () {
    await expect(HomePage.houseCategory).toBeDisplayed();
});
When('I open the homepage filters', async function () {
    await HomePage.openFilters();
});
Then('the filter panel should be displayed', async function () {
    await expect(HomePage.filterTitle).toBeDisplayed();
});
When('I apply the homepage filters', async function () {
    await HomePage.applyFilters();
});
