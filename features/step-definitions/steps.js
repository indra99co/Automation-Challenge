
const { Given, Then } = require('@cucumber/cucumber');
const HomePage = require('../pageobjects/home.page');

Given('the 99 app is open', async function () {
    await driver.activateApp('com.urbanindo.android');
});

Then('the location search should be visible', async function () {
    await expect(HomePage.searchLocation).toBeDisplayed();
});

Then('the filter button should be visible', async function () {
    await expect(HomePage.filterButton).toBeDisplayed();
});

Then('the new properties shortcut should be visible', async function () {
    await expect(HomePage.newPropertiesButton).toBeDisplayed();
});

Then('the bank assets shortcut should be visible', async function () {
    await expect(HomePage.bankAssetsButton).toBeDisplayed();
});

Then('the search tab should be visible', async function () {
    await expect(HomePage.searchTab).toBeDisplayed();
});

Then('the new housing tab should be visible', async function () {
    await expect(HomePage.newHousingTab).toBeDisplayed();
});

Then('the my ads tab should be visible', async function () {
    await expect(HomePage.myAdsTab).toBeDisplayed();
});

Then('the create ad tab should be visible', async function () {
    await expect(HomePage.createAdTab).toBeDisplayed();
});

Then('the my account tab should be visible', async function () {
    await expect(HomePage.myAccountTab).toBeDisplayed();
});

Then('the price range filter should be visible', async function () {
    await expect(HomePage.priceRangeFilter).toBeDisplayed();
});

Then('the land area filter should be visible', async function () {
    await expect(HomePage.landAreaFilter).toBeDisplayed();
});

Then('the priority filter should be visible', async function () {
    await expect(HomePage.priorityFilter).toBeDisplayed();
});

Then('the homepage heading should be visible', async function () {
    await expect(HomePage.homepageHeading).toBeDisplayed();
});

Then('the property listing count should be visible', async function () {
    await expect(HomePage.propertyListingCount).toBeDisplayed();
});

Then('a property card should be visible', async function () {
    await expect(HomePage.propertyCard).toBeDisplayed();
});

Then('the land type label should be visible', async function () {
    await expect(HomePage.landTypeLabel).toBeDisplayed();
});
