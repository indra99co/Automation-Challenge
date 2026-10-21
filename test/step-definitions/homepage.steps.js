// test/step-definitions/homepage.steps.js
const { Given, When, Then } = require('@wdio/cucumber-framework');
const { expect } = require('expect-webdriverio');
const HomePage = require('../../pageobjects/homepage.page');

Given(/^I open the 99.co app$/, async () => {
  // Karena noReset: true, app tidak benar-benar restart bersih di setiap skenario,
  // cuma dibawa ke foreground dalam keadaan terakhir ia ditinggalkan. Jadi kalau
  // skenario sebelumnya membuka filter modal atau pindah ke tab lain (misal
  // "Hunian Baru"), app akan mulai dari situ, bukan dari homepage.
  // Di awal setiap skenario kita "pulangkan" app ke homepage dengan cara:
  // 1. Tutup filter modal kalau sedang terbuka (ditandai tombol "Terapkan")
  // 2. Tap tab "Cari" (home) untuk pastikan berada di homepage, bukan tab lain

  const filterModalOpen = await $('~Terapkan').isDisplayed().catch(() => false);
  if (filterModalOpen) {
    await driver.back();
    await driver.pause(500);
  }

  let isAlreadyOnHomepage = await $(HomePage.searchBar).isDisplayed().catch(() => false);
  if (!isAlreadyOnHomepage) {
    const cariTabDisplayed = await $(HomePage.bottomNavCari).isDisplayed().catch(() => false);
    if (cariTabDisplayed) {
      await $(HomePage.bottomNavCari).click();
      await driver.pause(500);
    } else {
      // Bottom nav sendiri tidak terlihat (misal tab "Akun Saya" membuka halaman
      // login layar penuh tanpa bottom nav). Coba tekan Back beberapa kali
      // sampai balik ke homepage, maksimal 5 kali supaya tidak infinite loop.
      for (let i = 0; i < 5; i += 1) {
        isAlreadyOnHomepage = await $(HomePage.searchBar).isDisplayed().catch(() => false);
        if (isAlreadyOnHomepage) break;
        await driver.back();
        await driver.pause(500);
      }
    }
  }

  // Tunggu homepage benar-benar tampil sebagai gerbang awal sebelum test lain berjalan
  await HomePage.waitForDisplayed(HomePage.searchBar, 40000);
});

Then(/^I should see the homepage$/, async () => {
  const displayed = await HomePage.isHomepageDisplayed();
  expect(displayed).toBe(true);
});

Then(/^I should see the search bar$/, async () => {
  const displayed = await HomePage.isSearchBarDisplayed();
  expect(displayed).toBe(true);
});

Then(/^I should see the filter button$/, async () => {
  const displayed = await HomePage.isFilterButtonDisplayed();
  expect(displayed).toBe(true);
});

When(/^I tap on the filter button$/, async () => {
  await HomePage.tapFilterButton();
});

Then(/^the filter button should still be visible$/, async () => {
  const displayed = await HomePage.isFilterButtonDisplayed();
  expect(displayed).toBe(true);
});

Then(/^I should see at least one listing card$/, async () => {
  const displayed = await HomePage.isListingCardDisplayed();
  expect(displayed).toBe(true);
});

Then(/^I should see the "([^"]*)" tab in the bottom navigation$/, async (tabName) => {
  const displayed = await HomePage.isBottomNavTabDisplayed(tabName);
  expect(displayed).toBe(true);
});

When(/^I tap on the "([^"]*)" tab$/, async (tabName) => {
  await HomePage.tapBottomNav(tabName);
});

Then(/^I should see the bottom navigation with all 5 menus$/, async () => {
  const displayed = await HomePage.isBottomNavDisplayed();
  expect(displayed).toBe(true);
});
