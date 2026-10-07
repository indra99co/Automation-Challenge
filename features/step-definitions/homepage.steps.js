const { Given, When, Then } = require('@wdio/cucumber-framework');
const { expect } = require('@wdio/globals');
const HomePage = require('../pageobjects/homepage.page');
const FilterPage = require('../pageobjects/filter.page');
const LocationSearchPage = require('../pageobjects/location-search.page');
const ListingDetailPage = require('../pageobjects/listing-detail.page');

const PRICE_UNITS = { Ribu: 1e3, Juta: 1e6, Miliar: 1e9, Triliun: 1e12 };

function parsePrice(label) {
  const match = label.match(/^Rp\s*([\d.,]+)\s*(Ribu|Juta|Miliar|Triliun)?/);
  if (!match) {
    throw new Error(`Unrecognised price label "${label}"`);
  }
  const [, amount, unit] = match;
  return Number(amount.replace(/\./g, '').replace(',', '.')) * (PRICE_UNITS[unit] ?? 1);
}

async function expectQuickFilterDisplayed(name) {
  await HomePage.revealQuickFilter(name);
  await expect(HomePage.quickFilter(name)).toBeDisplayed();
}

Given('the 99 application is open on the homepage', async () => {
  await HomePage.open();
});

When('I search for the location {string}', async (location) => {
  await HomePage.openLocationSearch();
  await LocationSearchPage.searchFor(location);
});

When('I filter the listings by the listing type {string}', async (listingType) => {
  await HomePage.openFilter();
  await FilterPage.select(listingType);
  await FilterPage.apply();
});

When('I sort the listings by {string}', async (sortOption) => {
  await HomePage.openQuickFilter('Diutamakan');
  await FilterPage.select(sortOption);
});

When('I apply the {string} preset from the {string} quick filter', async (preset, quickFilter) => {
  await HomePage.openQuickFilter(quickFilter);
  await FilterPage.select(preset);
  await FilterPage.apply();
});

When('I select the {string} shortcut', async (shortcut) => {
  await HomePage.selectShortcut(shortcut);
});

When('I open the first listing', async function () {
  this.selectedListingPrice = await HomePage.getFirstListingPrice();
  await HomePage.openFirstListing();
});

When('I scroll down to the {string} section', async (section) => {
  await HomePage.scrollToSection(section);
});

When('I go to the next page of listings', async () => {
  await HomePage.goToNextPage();
});

Then('the homepage should be displayed', async () => {
  await expect(HomePage.searchBar).toBeDisplayed();
  await expect(HomePage.listingHeading).toHaveAttribute('content-desc', 'Properti Dijual di Indonesia', {
    atStart: true,
  });
});

Then('the listing summary should show page {int}', async (page) => {
  await expect(HomePage.listingSummary).toHaveAttribute(
    'content-desc',
    new RegExp(`^[1-9][\\d.]* Iklan Properti \\| ${page} dari [1-9]\\d* Halaman$`),
  );
});

Then('the location search bar should be displayed', async () => {
  await expect(HomePage.searchBar).toBeDisplayed();
});

Then('the location search bar should show {string}', async (text) => {
  await expect(HomePage.searchBarShowing(text)).toBeDisplayed();
});

Then('the filter button should be displayed', async () => {
  await expect(HomePage.filterButton).toBeDisplayed();
});

Then('the following quick filters should be available:', async (table) => {
  for (const [name] of table.raw()) {
    await expectQuickFilterDisplayed(name);
  }
});

Then('the {string} quick filter should be active', async (name) => {
  await expectQuickFilterDisplayed(name);
});

Then('the following shortcuts should be available:', async (table) => {
  for (const [name] of table.raw()) {
    await expect(HomePage.shortcut(name)).toBeDisplayed();
  }
});

Then('the listing heading should be {string}', async (heading) => {
  await expect(HomePage.listingHeading).toHaveAttribute('content-desc', heading);
});

Then('the listing heading should start with {string}', async (heading) => {
  await expect(HomePage.listingHeading).toHaveAttribute('content-desc', heading, { atStart: true });
});

Then('the listings should be ordered from the lowest price', async () => {
  const prices = (await HomePage.getListingPrices(2)).map(parsePrice);
  expect(prices).toHaveLength(2);
  expect(prices[0]).toBeLessThanOrEqual(prices[1]);
});

Then('the first listing price should be between {string} and {string}', async (minimum, maximum) => {
  const price = parsePrice(await HomePage.getFirstListingPrice());
  expect(price).toBeGreaterThanOrEqual(parsePrice(minimum));
  expect(price).toBeLessThanOrEqual(parsePrice(maximum));
});

Then('only new property projects should be listed', async () => {
  await expect(HomePage.projectCards).toBeElementsArrayOfSize({ gte: 1 });
  await expect(HomePage.listingCards).toBeElementsArrayOfSize(0);
});

Then('the listing details should show the price of the selected listing', async function () {
  await expect(ListingDetailPage.price).toHaveAttribute('content-desc', this.selectedListingPrice);
});

Then('the {string} section should be displayed', async (section) => {
  await expect(HomePage.section(section)).toBeDisplayed();
});
