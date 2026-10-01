const { Given, When, Then } = require('@wdio/cucumber-framework');
const assert = require('assert');
const HomePage = require('../../pageobjects/homepage.page');

Given('the app is opened on the homepage', async () => {
  await HomePage.searchBar.waitForDisplayed({ timeout: 30000 });
  await HomePage.waitForListingLoaded();
});

Then('the search bar is displayed', async () => {
  assert.ok(await HomePage.searchBar.isDisplayed());
});

Then('the filter button is displayed', async () => {
  assert.ok(await HomePage.filterBtn.isDisplayed());
});

Then('the {string} tab is displayed', async (name) => {
  assert.ok(await HomePage.byDesc(name).isDisplayed());
});

Then('the page title {string} is displayed', async (title) => {
  assert.ok(await HomePage.byDescContains(title).isDisplayed());
});

Then('the total listing count is displayed', async () => {
  assert.ok(await HomePage.totalListing.isDisplayed());
});

Then('the current page is {int}', async (page) => {
  assert.strictEqual(await HomePage.getCurrentPage(), page);
});

Then('at least one listing card is displayed', async () => {
  await HomePage.listingCard.waitForDisplayed({ timeout: 20000 });
  assert.ok(await HomePage.listingCard.isDisplayed());
});

Then('the {string} bottom navigation tab is displayed', async (tab) => {
  assert.ok(await HomePage.navTab(tab).isDisplayed());
});

Then('the {string} filter chip is displayed', async (name) => {
  assert.ok(await HomePage.byDescContains(name).isDisplayed());
});

When('I scroll down until the {string} button is displayed', async (name) => {
  const found = await HomePage.scrollDownUntil(HomePage.byDescContains(name));
  assert.ok(found, `"${name}" not found after scrolling down`);
});

Then('the {string} button is displayed', async (name) => {
  assert.ok(await HomePage.isInViewport(HomePage.byDescContains(name)));
});

When('I scroll up until the {string} filter is displayed', async (name) => {
  const found = await HomePage.scrollUpUntil(HomePage.byDescContains(name));
  assert.ok(found, `"${name}" not found after scrolling up`);
});

Then('the {string} filter is displayed', async (name) => {
  assert.ok(await HomePage.isInViewport(HomePage.byDescContains(name)));
});