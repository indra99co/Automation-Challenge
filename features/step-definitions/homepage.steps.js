const { Given, When, Then } = require('@wdio/cucumber-framework');
const { expect } = require('@wdio/globals');

const HomePage = require('../pageobjects/home.page');
const SearchPage = require('../pageobjects/search.page');
const FilterPage = require('../pageobjects/filter.page');
const SortPage = require('../pageobjects/sort.page');
const PriceRangePage = require('../pageobjects/price-range.page');
const PropertyDetailPage = require('../pageobjects/property-detail.page');

// ---------- Given ----------

Given('I open the 99 app', async () => {
    const state = await driver.queryAppState(process.env.APP_PACKAGE || 'com.urbanindo.android');
    // 4 = running in foreground
    expect(state).toBe(4);
});

Given('I am on the homepage', async () => {
    await HomePage.waitForLoaded();
});

Given('I remember the current result count', async function () {
    this.resultCount = await HomePage.getResultCount();
});

Given('I remember the first listing', async function () {
    await HomePage.waitDisplayed(HomePage.firstListingCard);
    this.listing = await HomePage.getFirstListingInfo();
});

// ---------- When ----------

When('I tap the {string} on homepage', async (name) => {
    await HomePage.tapElement(name);
});

When('I scroll the quick filter chips to the right', async () => {
    await HomePage.buildingAreaChip;
});

When('I scroll down the homepage a little', async () => {
    await HomePage.swipeVertical(0.75, 0.35);
});

When('I scroll down to the new property section', async () => {
    await HomePage.newPropertySection;
});

When('I type {string} in the search field', async (keyword) => {
    await SearchPage.typeKeyword(keyword);
});

When('I tap back on the property detail page', async () => {
    await PropertyDetailPage.tap(PropertyDetailPage.backButton);
});

// ---------- Then: homepage ----------

Then('I should be on the homepage', async () => {
    await HomePage.waitForLoaded();
});

Then('I should see these homepage elements', async (table) => {
    for (const { element } of table.hashes()) {
        await HomePage.shouldBeDisplayed(HomePage.element(element), `"${element}" is not displayed on homepage`);
    }
});

Then('the {string} should be selected', async (name) => {
    expect(await HomePage.isTabSelected(HomePage.element(name))).toBe(true);
});

Then('the page title should be {string}', async (title) => {
    await expect(HomePage.pageTitle).toHaveAttribute('content-desc', title);
});

Then('the result count should be more than {int}', async (min) => {
    expect(await HomePage.getResultCount()).toBeGreaterThan(min);
});

Then('the result count should be less than before', async function () {
    await browser.waitUntil(
        async () => (await HomePage.getResultCount()) < this.resultCount,
        { timeout: 15000, timeoutMsg: `Result count did not go down from ${this.resultCount}` }
    );
});

Then('I should see at least one listing card', async () => {
    await HomePage.shouldBeDisplayed(HomePage.firstListingCard, 'No listing card is shown');
});

Then('I should not see the empty state', async () => {
    await HomePage.shouldNotBeDisplayed(HomePage.emptyStateTitle, 'Empty state "Properti yang Kamu Cari Belum Tersedia" is shown');
});

// ---------- Then: search ----------

Then('I should see {string} suggestion section', async (title) => {
    await SearchPage.shouldBeDisplayed(SearchPage.byDesc(title), `"${title}" section is not shown`);
});

Then('I should see location suggestions', async (table) => {
    for (const { location } of table.hashes()) {
        await SearchPage.shouldBeDisplayed(SearchPage.suggestion(location), `Suggestion "${location}" is not shown`);
    }
});

// ---------- Then: filter ----------

Then('I should see the filter page', async () => {
    await FilterPage.shouldBeDisplayed(FilterPage.listingTypeLabel, '"Tipe Iklan" is not shown on filter page');
    await FilterPage.shouldBeDisplayed(FilterPage.propertyTypeLabel, '"Tipe Properti" is not shown on filter page');
});

Then('I should see listing type options {string} and {string}', async (first, second) => {
    await FilterPage.shouldBeDisplayed(FilterPage.byDesc(first), `Listing type "${first}" is not shown`);
    await FilterPage.shouldBeDisplayed(FilterPage.byDesc(second), `Listing type "${second}" is not shown`);
});

Then('I should see these property types', async (table) => {
    for (const { type } of table.hashes()) {
        await FilterPage.shouldBeDisplayed(FilterPage.propertyType(type), `Property type "${type}" is not shown`);
    }
});

// ---------- Then: sort ----------

Then('I should see the sort options', async (table) => {
    await SortPage.shouldBeDisplayed(SortPage.title, '"Urutkan" title is not shown');
    for (const { option } of table.hashes()) {
        await SortPage.shouldBeDisplayed(SortPage.option(option), `Sort option "${option}" is not shown`);
    }
});

// ---------- Then: price range ----------

Then('I should see the price range filter', async () => {
    await PriceRangePage.shouldBeDisplayed(PriceRangePage.minPriceInput, 'Minimum price field is not shown');
    await PriceRangePage.shouldBeDisplayed(PriceRangePage.maxPriceInput, 'Maximum price field is not shown');
    await PriceRangePage.shouldBeDisplayed(PriceRangePage.applyButton, '"Terapkan" button is not shown');
});

Then('I should see these price presets', async (table) => {
    for (const { preset } of table.hashes()) {
        await PriceRangePage.shouldBeDisplayed(PriceRangePage.preset(preset), `Price preset "${preset}" is not shown`);
    }
});

// ---------- Then: property detail ----------

Then('I should see the property detail page of that listing', async function () {
    await PropertyDetailPage.shouldBeDisplayed(PropertyDetailPage.backButton, 'Back button is not shown on detail page');
    await PropertyDetailPage.shouldBeDisplayed(PropertyDetailPage.text(this.listing.price), `Price "${this.listing.price}" is not shown on detail page`);
    await PropertyDetailPage.shouldBeDisplayed(PropertyDetailPage.text(this.listing.title), `Title "${this.listing.title}" is not shown on detail page`);
    await PropertyDetailPage.shouldBeDisplayed(PropertyDetailPage.viewOnMapButton, '"Lihat di Peta" is not shown on detail page');
});
