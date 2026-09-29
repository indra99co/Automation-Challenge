const { Given, When, Then } = require('@wdio/cucumber-framework');
const { expect } = require('@wdio/globals');

const HomePage = require('../pageobjects/home.page');

Given('I open the 99.co Indonesia app', async () => {
    await HomePage.open();
});

Then('I should see the homepage', async () => {
    await expect(HomePage.searchLocation).toBeDisplayed();
});

Then('I should see the main homepage elements', async () => {
    await expect(HomePage.searchLocation).toBeDisplayed();
    await expect(HomePage.filter).toBeDisplayed();
    await expect(HomePage.prioritized).toBeDisplayed();
    await expect(HomePage.priceRange).toBeDisplayed();
    await expect(HomePage.landArea).toBeDisplayed();
    await expect(HomePage.newProperty).toBeDisplayed();
    await expect(HomePage.bankAsset).toBeDisplayed();
    await expect(HomePage.searchTab).toBeDisplayed();
    await expect(HomePage.newPropertyTab).toBeDisplayed();
    await expect(HomePage.myAdsTab).toBeDisplayed();
    await expect(HomePage.createAdTab).toBeDisplayed();
    await expect(HomePage.myAccountTab).toBeDisplayed();
});

When('I tap the location search', async () => {
    await browser.action('pointer', {
        parameters: { pointerType: 'touch' }
    })
    .move({ x: 540, y: 220 })
    .down()
    .up()
    .perform();
});

Then('I should see the location search page', async () => {
    await expect(HomePage.locationSearchPage).toBeDisplayed();
});