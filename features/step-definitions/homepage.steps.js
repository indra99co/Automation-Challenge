const { Given, When, Then } = require('@wdio/cucumber-framework');
const { expect, browser } = require('@wdio/globals');

const HomePage = require('../pageobjects/home.page');
const SearchPage = require('../pageobjects/search.page');
const FilterPage = require('../pageobjects/filter.page');
const BottomSheet = require('../pageobjects/bottom-sheet.page');
const LoginPrompt = require('../pageobjects/login-prompt.page');

// ---------- Given ----------

Given('the 99.co app is open on the homepage', async () => {
    await HomePage.waitForLoaded();
});

Given('I note the current listing count', async function () {
    // `this` is the Cucumber World, shared between steps of the same scenario
    this.initialCount = await HomePage.waitForListingCount();
    expect(this.initialCount).toBeGreaterThan(0);
});

// ---------- When ----------

When('I tap the search bar', async () => {
    await HomePage.tapSearchBar();
});

When('I type {string} into the search field', async (keyword) => {
    await SearchPage.waitForLoaded();
    await SearchPage.search(keyword);
});

When('I tap the Filter button', async () => {
    await HomePage.tapFilter();
});

When('I tap the {string} chip', async (chip) => {
    await HomePage.tap(HomePage.byDesc(chip));
});

When('I tap the {string} shortcut', async (shortcut) => {
    await HomePage.tap(HomePage.byDesc(shortcut));
});

When('I open the {string} tab', async (tab) => {
    await HomePage.openTab(tab);
});

When('I scroll down the homepage {int} times', async (times) => {
    for (let i = 0; i < times; i++) {
        await HomePage.swipeUp();
    }
});

// ---------- Then: homepage ----------

Then('the search bar {string} is displayed', async (placeholder) => {
    await expect(HomePage.byDesc(placeholder)).toBeDisplayed();
});

Then('the {string} button is displayed', async (label) => {
    // The apply button reads "Terapkan (1335849)", so it is matched by prefix
    const button = label === 'Terapkan'
        ? HomePage.byDescStartsWith(label)
        : HomePage.byDesc(label);
    await expect(button).toBeDisplayed();
});

Then('the following quick filter chips are displayed', async (table) => {
    for (const { chip } of table.hashes()) {
        await expect(HomePage.byDesc(chip)).toBeDisplayed();
    }
});

Then('the page title starts with {string}', async (prefix) => {
    await expect(HomePage.pageTitle).toBeDisplayed();
    expect(await HomePage.getDesc(HomePage.pageTitle)).toContain(prefix);
});

Then('the listing count is greater than 0', async () => {
    expect(await HomePage.waitForListingCount()).toBeGreaterThan(0);
});

Then('the following category shortcuts are displayed', async (table) => {
    for (const { shortcut } of table.hashes()) {
        await expect(HomePage.byDesc(shortcut)).toBeDisplayed();
    }
});

Then('at least 1 property listing card is displayed', async () => {
    await expect(HomePage.firstListingCard).toBeDisplayed();
});

Then('the first listing card contains a price in {string}', async (currency) => {
    const desc = await HomePage.getFirstListingDesc();
    expect(desc).toMatch(new RegExp(`${currency}\\s?[\\d.,]+`));
});

Then('the first listing card contains the text {string}', async (text) => {
    expect(await HomePage.getFirstListingDesc()).toContain(text);
});

Then('the bottom navigation has {int} tabs', async (count) => {
    expect(HomePage.tabNames).toHaveLength(count);
    for (const name of HomePage.tabNames) {
        await expect(HomePage.tab(name)).toBeDisplayed();
        expect(await HomePage.getDesc(HomePage.tab(name))).toContain(name);
    }
});

Then('the {string} tab is selected', async (tab) => {
    await expect(HomePage.tab(tab)).toHaveAttribute('selected', 'true');
});

Then('the listing count decreases', async function () {
    // Results are re-fetched from the backend, so poll until the count changes
    await browser.waitUntil(
        async () => (await HomePage.getListingCount()) < this.initialCount,
        { timeout: 20000, timeoutMsg: `Listing count did not decrease from ${this.initialCount}` }
    );
});

Then('the text {string} is displayed', async (text) => {
    await expect(HomePage.byDesc(text)).toBeDisplayed();
});

// ---------- Then: search ----------

Then('the search screen is displayed with an input field', async () => {
    await SearchPage.waitForLoaded();
    await expect(SearchPage.searchInput).toBeDisplayed();
    await expect(SearchPage.searchButton).toBeDisplayed();
});

Then('the {string} section is displayed', async (section) => {
    await expect(SearchPage.byDesc(section)).toBeDisplayed();
});

Then('the location suggestion {string} is displayed', async (keyword) => {
    await expect(SearchPage.suggestion(keyword)).toBeDisplayed();
});

// ---------- Then: filter & bottom sheets ----------

Then('the filter screen is displayed with the following options', async (table) => {
    await FilterPage.waitForLoaded();
    for (const { option } of table.hashes()) {
        await expect(FilterPage.option(option)).toBeDisplayed();
    }
});

Then('the {string} bottom sheet is displayed', async (title) => {
    await expect(BottomSheet.title(title)).toBeDisplayed();
});

Then('the following sort options are displayed', async (table) => {
    for (const { option } of table.hashes()) {
        await expect(BottomSheet.option(option)).toBeDisplayed();
    }
});

Then('the preset option {string} is displayed', async (preset) => {
    await expect(BottomSheet.option(preset)).toBeDisplayed();
});

// ---------- Then: login ----------

Then('the login prompt is displayed', async () => {
    await expect(LoginPrompt.message).toBeDisplayed();
});
