const { Given, When, Then } = require('@wdio/cucumber-framework');
const assert = require('assert');
const HomePage = require('../pageobjects/home.page');

const APP_PACKAGE = 'com.urbanindo.android';

Given('I open the 99 app', async () => {
  await driver.terminateApp(APP_PACKAGE);
  await driver.activateApp(APP_PACKAGE);
  await HomePage.isShown(HomePage.searchBar);
});

When('I scroll to the {string} section', async (name) => {
  const visible = await HomePage.scrollUntilVisible(HomePage.sectionPilihan);
  assert.ok(visible, `Section "${name}" not found after scrolling`);
});

// Search & filter
Then('I should see the search bar', async () => {
  assert.ok(await HomePage.isShown(HomePage.searchBar));
});

Then('I should see the filter button', async () => {
  assert.ok(await HomePage.isShown(HomePage.filterButton));
});

// Filter chips
Then('I should see the {string} filter chip', async (name) => {
  const chips = {
    'Diutamakan': HomePage.chipDiutamakan,
    'Kisaran Harga': HomePage.chipKisaranHarga,
    'Luas Tanah': HomePage.chipLuasTanah,
  };
  assert.ok(await HomePage.isShown(chips[name]));
});

// Header
Then('I should see the page title', async () => {
  assert.ok(await HomePage.isShown(HomePage.pageTitle));
});

Then('I should see the total listing', async () => {
  assert.ok(await HomePage.isShown(HomePage.totalListing));
});

// Quick actions
Then('I should see the {string} button', async (name) => {
  const buttons = {
    'Properti Baru': HomePage.propertiBaru,
    'Aset Bank': HomePage.asetBank,
  };
  assert.ok(await HomePage.isShown(buttons[name]));
});

// Listing card
Then('I should see the listing card', async () => {
  assert.ok(await HomePage.isShown(HomePage.listingCard));
});

Then('I should see the call and WhatsApp buttons', async () => {
  await HomePage.scrollToDesc('WhatsApp');
  assert.ok(await HomePage.isShown(HomePage.callButton));
  assert.ok(await HomePage.isShown(HomePage.whatsappButton));
});

// Pilihan Properti Baru
Then('I should see the {string} section', async (name) => {
  assert.ok(
    await HomePage.sectionPilihan.isDisplayed(),
    `Section "${name}" is not displayed`
  );
});

Then('I should see the property type tabs', async () => {
  assert.ok(await HomePage.isShown(HomePage.tabApartemen));
  assert.ok(await HomePage.isShown(HomePage.tabRumah));
});

// Bottom navigation
Then('I should see the bottom navigation tabs', async () => {
  for (const tab of [
    HomePage.tabCari,
    HomePage.tabHunianBaru,
    HomePage.tabIklanSaya,
    HomePage.tabBuatIklan,
    HomePage.tabAkunSaya,
  ]) {
    assert.ok(await HomePage.isShown(tab));
  }
});