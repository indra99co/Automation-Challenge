const Page = require('./page');

class HomePage extends Page {
    // Locator pemindaian (Scanning Locators) dari Appium Inspector
    get homeHeader() {
        return $('~header_rumah123'); // contoh menggunakan accessibility id
    }

    get updateSectionTitle() {
        return $('//*[@resource-id="com.rumah123.consumer:id/tv_update_section_title"]');
    }

    get updateCards() {
        return $$('//*[@resource-id="com.rumah123.consumer:id/card_update_item"]');
    }

    get firstUpdateCard() {
        return $('(//*[@resource-id="com.rumah123.consumer:id/card_update_item"])[1]');
    }

    get detailPageTitle() {
        return $('//*[@resource-id="com.rumah123.consumer:id/tv_detail_title"]');
    }

    // Actions/Methods
    async isHomePageDisplayed() {
        await this.waitForDisplayed(await this.homeHeader);
        return await this.homeHeader.isDisplayed();
    }

    async scrollToUpdateSection() {
        // Android UIAutomator scroll down hingga menemukan elemen judul update section
        const selector = 'new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().textContains("Pembaruan"))';
        await $(`android=${selector}`);
    }

    async isUpdateSectionDisplayed() {
        return await this.updateSectionTitle.isDisplayed();
    }

    async areUpdateCardsDisplayed() {
        const cards = await this.updateCards;
        return cards.length > 0;
    }

    async clickFirstUpdateCard() {
        await this.firstUpdateCard.click();
    }

    async isDetailPageDisplayed() {
        await this.waitForDisplayed(await this.detailPageTitle);
        return await this.detailPageTitle.isDisplayed();
    }
}

module.exports = new HomePage();