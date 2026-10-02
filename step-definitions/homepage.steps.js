
const { Given, Then } = require("@wdio/cucumber-framework");
const HomepagePage = require("../pageobjects/homepage.page");

Given("the 99 app is launched", async function () {
    // Appium akan membuka aplikasi melalui konfigurasi WebdriverIO.
    // Tunggu sebentar agar homepage sempat dimuat.
    await driver.pause(3000);
});

Then("the homepage should be displayed", async function () {
    await expect(HomepagePage.searchElement).toBeDisplayed();
});

Then("the search element should be visible", async function () {
    await expect(HomepagePage.searchElement).toBeDisplayed();
});

Then("the main navigation should be visible", async function () {
    await expect(HomepagePage.buyButton).toBeDisplayed();
    await expect(HomepagePage.rentButton).toBeDisplayed();
    await expect(HomepagePage.myAdsButton).toBeDisplayed();
    await expect(HomepagePage.createAdButton).toBeDisplayed();
    await expect(HomepagePage.myAccountButton).toBeDisplayed();

    
});


Then("the property filters should be visible", async function () {
    await expect(HomepagePage.filterChip).toBeDisplayed();
    await expect(HomepagePage.priorityChip).toBeDisplayed();
    await expect(HomepagePage.priceRangeChip).toBeDisplayed();
    await expect(HomepagePage.landAreaChip).toBeDisplayed();
});

Then("the property categories should be visible", async function () {
    await expect(HomepagePage.newPropertiesButton).toBeDisplayed();
    await expect(HomepagePage.bankAssetsButton).toBeDisplayed();
});