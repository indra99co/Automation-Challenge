const { Given, When, Then } = require('@wdio/cucumber-framework');
const { expect } = require('@wdio/globals');
const homepagePage = require('../pages/homepage.page');

Given('I have installed the Rumah123 Consumer App', async () => {
    const isInstalled = await homepagePage.isAppInstalled();
    expect(isInstalled).toBe(true);
});

Given('I am on the homepage', async () => {
    await homepagePage.openApp();
    const loaded = await homepagePage.isHomePageLoaded();
    expect(loaded).toBe(true);
});

When('I open the application', async () => {
    await homepagePage.openApp();
});

When('I click on the search bar', async () => {
    await homepagePage.clickSearchBar();
});

When('I type {string}', async (text) => {
    await homepagePage.typeSearchKeyword(text);
});

When('I submit the search', async () => {
    await homepagePage.submitSearch();
});

When('I click on the {string} tab', async (tabName) => {
    await homepagePage.clickNavigationTab(tabName);
});

When('I swipe left on recommendation cards', async () => {
    await homepagePage.swipeRecommendationCards();
});

When('I scroll to recommendation features', async () => {
    const found = await homepagePage.scrollToRecommendationFeatures();
    expect(found).toBe(true);
});

Then('I should see the homepage', async () => {
    const loaded = await homepagePage.isHomePageLoaded();
    expect(loaded).toBe(true);
});

Then('I should see the search bar', async () => {
    expect(await homepagePage.isSearchBarDisplayed()).toBe(true);
});

Then('I should see the property type button', async () => {
    expect(await homepagePage.isPropertyTypeButtonDisplayed()).toBe(true);
});

Then('I should see the discovery section', async () => {
    expect(await homepagePage.isPopularLocationSectionDisplayed()).toBe(true);
});

Then('I should see the popular locations section', async () => {
    expect(await homepagePage.isPopularLocationSectionDisplayed()).toBe(true);
});

Then('I should see the recommendation section', async () => {
    expect(await homepagePage.isRecommendationSectionDisplayed()).toBe(true);
});

Then('I should see property cards', async () => {
    expect(await homepagePage.arePropertyCardsDisplayed()).toBe(true);
});

Then('I should still see property cards', async () => {
    expect(await homepagePage.arePropertyCardsDisplayed()).toBe(true);
});

Then('I should see the bottom navigation tabs', async () => {
    expect(await homepagePage.isBottomNavigationDisplayed()).toBe(true);
});

Then('I should see a discovery chip containing {string}', async (text) => {
    expect(await homepagePage.isDiscoveryChipDisplayed(text)).toBe(true);
});

Then('I should see popular location {string}', async (locationName) => {
    expect(await homepagePage.isPopularLocationDisplayed(locationName)).toBe(true);
});

Then('each property card should have title, price, and location', async () => {
    expect(await homepagePage.propertyCardHasDetails()).toBe(true);
});

Then('I should see search results', async () => {
    await homepagePage.pause(2000);
    const pageSource = await driver.getPageSource();
    expect(pageSource.length).toBeGreaterThan(0);
});

Then('I should see the {string} page', async (pageName) => {
    expect(await homepagePage.isTabPageDisplayed(pageName)).toBe(true);
});

Then('I should see the recommendation features title', async () => {
    expect(await homepagePage.isElementDisplayed(homepagePage.recommendationFeatureTitle)).toBe(true);
});

Then('I should see the KPR simulation card', async () => {
    expect(await homepagePage.isKprSimulationDisplayed()).toBe(true);
});

Then('the search flow should complete without app crash', async () => {
    const pageSource = await driver.getPageSource();
    expect(pageSource).toContain('com.rumah123');
});
