const { Given, When, Then } = require('@cucumber/cucumber');
const HomePage = require('../pageobjects/home.page');

Given(/^Saya membuka aplikasi Rumah123$/, async () => {
    // Aplikasi otomatis terbuka via Appium Capabilities
});

Given(/^Saya berada di halaman beranda$/, async () => {
    const isDisplayed = await HomePage.isHomePageDisplayed();
    expect(isDisplayed).toBe(true);
});

Then(/^Saya melihat section pembaruan di halaman beranda$/, async () => {
    await HomePage.scrollToUpdateSection();
    const isDisplayed = await HomePage.isUpdateSectionDisplayed();
    expect(isDisplayed).toBe(true);
});

When(/^Saya menggeser ke section pembaruan$/, async () => {
    await HomePage.scrollToUpdateSection();
});

Then(/^Semua kartu pembaruan\/promo ditampilkan dengan benar$/, async () => {
    const hasCards = await HomePage.areUpdateCardsDisplayed();
    expect(hasCards).toBe(true);
});

When(/^Saya menekan salah satu kartu di section pembaruan$/, async () => {
    await HomePage.clickFirstUpdateCard();
});

Then(/^Saya berhasil diarahkan ke halaman detail pembaruan$/, async () => {
    const isDetailDisplayed = await HomePage.isDetailPageDisplayed();
    expect(isDetailDisplayed).toBe(true);
});