const { Given, When, Then } = require('@wdio/cucumber-framework');
const homePage = require('../pageobjects/home.page');
const filterPage = require('../pageobjects/filter.page');

Given('I open the 99.co ID app', async () => {
    await browser.activateApp('com.urbanindo.android');
});

Then('I should see the 99.co ID homepage', async () => {
    await expect(homePage.locationSearch).toBeExisting();
});

When('I tap the filter button', async () => {
    await homePage.filter.click();
});

Then('I should see the filter page', async () => {
    await expect(filterPage.title).toBeExisting();
});

When('I select property for sale', async () => {
    await filterPage.sale.click();
});

When('I select house property', async () => {
    await filterPage.house.click();
});

When('I select a price range', async () => {
    await filterPage.price100to350.click();
});

When('I apply the filters', async () => {

    await browser.pause(10000);

    await filterPage.apply.click();

});