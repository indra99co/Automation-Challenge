// features/step-definitions/homepage.steps.js

const { Given, When, Then } = require('@wdio/cucumber-framework');
const HomePage = require('../pageobjects/homepage.page');

Given(/^I open the 99 application$/, async () => {
    // Aplikasi terbuka otomatis berdasarkan wdio.conf.js
});

When(/^I am on the homepage$/, async () => {
    // Memastikan halaman utama sudah terbuka
    await HomePage.headerTitle.waitForDisplayed({ timeout: 15000 });
});

Then(/^I should see the homepage elements properly displayed$/, async () => {
    // Memvalidasi seluruh elemen hasil scan Anda tampil dengan benar
    await HomePage.verifyHomepageRevampElements();
});