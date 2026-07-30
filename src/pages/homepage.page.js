const BasePage = require('./base.page');
const { APP_PACKAGE, WAIT_TIMEOUT } = require('../utils/constants');

class HomepagePage extends BasePage {
    // Locators scanned from Rumah123 Consumer App homepage (ui.xml)

    get propertyTypeButton() {
        return $('~Dijual');
    }

    get searchBar() {
        return $('~Lokasi, keyword, area, project, developer');
    }

    get popularLocationTitle() {
        return $('~Cari di Lokasi Terpopuler');
    }

    get continueSearchTitle() {
        return $('~Lanjutkan Pencarianmu');
    }

    get recommendationTitle() {
        return $('~Rekomendasi Sesuai Pencarianmu');
    }

    get seeAllButton() {
        return $('~Lihat Semua');
    }

    get recommendationFeatureTitle() {
        return $('~Fitur Rekomendasi');
    }

    get kprSimulationCard() {
        return $('android=new UiSelector().descriptionContains("Simulasi KPR")');
    }

    get propertyCardsScroll() {
        return $('android.widget.HorizontalScrollView');
    }

    get whatsappButtons() {
        return $$('~Whatsapp');
    }

    get homeTab() {
        return $('android=new UiSelector().descriptionContains("Beranda").descriptionContains("Tab 1")');
    }

    get searchTab() {
        return $('android=new UiSelector().descriptionContains("Cari").descriptionContains("Tab 2")');
    }

    get savedTab() {
        return $('android=new UiSelector().descriptionContains("Disimpan").descriptionContains("Tab 3")');
    }

    get profileTab() {
        return $('android=new UiSelector().descriptionContains("Profil").descriptionContains("Tab 4")');
    }

    get homepageScrollView() {
        return $('android.widget.ScrollView');
    }

    locationByName(name) {
        return $(`~${name}`);
    }

    getNavigationTab(tabName) {
        const tabs = {
            beranda: this.homeTab,
            home: this.homeTab,
            cari: this.searchTab,
            search: this.searchTab,
            explore: this.searchTab,
            disimpan: this.savedTab,
            bookmarks: this.savedTab,
            saved: this.savedTab,
            profil: this.profileTab,
            profile: this.profileTab
        };

        const tab = tabs[tabName.toLowerCase()];
        if (!tab) {
            throw new Error(`Tab "${tabName}" is not supported`);
        }
        return tab;
    }

    get skipButton() {
        return $('android=new UiSelector().descriptionContains("Lewati")');
    }

    get closeButton() {
        return $('~Close');
    }

    async dismissGateScreens() {
        for (let i = 0; i < 6; i++) {
            if (await this.isElementDisplayed(this.searchBar, 1500)) {
                return true;
            }

            if (await this.isElementDisplayed(this.closeButton, 1000)) {
                await this.clickElement(this.closeButton);
                await this.pause(1000);
                continue;
            }

            if (await this.isElementDisplayed(this.skipButton, 1000)) {
                await this.clickElement(this.skipButton);
                await this.pause(1000);
                continue;
            }

            await driver.back();
            await this.pause(800);
        }

        return this.isElementDisplayed(this.searchBar, 3000);
    }

    async openApp() {
        await driver.activateApp(APP_PACKAGE);
        await this.pause(2000);
        await this.dismissGateScreens();
        await this.ensureHomepage();
    }

    async isAppInstalled() {
        return driver.isAppInstalled(APP_PACKAGE);
    }

    async ensureHomepage() {
        const isHomeSelected = async () => {
            if (!(await this.isElementDisplayed(this.homeTab, 2000))) {
                return false;
            }
            const selected = await this.homeTab.getAttribute('selected');
            return selected === 'true' || selected === true;
        };

        if (await this.isElementDisplayed(this.searchBar, 3000) && await isHomeSelected()) {
            return true;
        }

        try {
            if (await this.isElementDisplayed(this.homeTab, 3000)) {
                await this.clickElement(this.homeTab);
                await this.pause(1500);
            }
        } catch (error) {
            // Continue with back navigation
        }

        if (await this.isElementDisplayed(this.searchBar, 3000)) {
            return true;
        }

        for (let i = 0; i < 3; i++) {
            await driver.back();
            await this.pause(1000);
            if (await this.isElementDisplayed(this.searchBar, 2000)) {
                return true;
            }
        }

        await driver.terminateApp(APP_PACKAGE);
        await this.pause(1000);
        await driver.activateApp(APP_PACKAGE);
        await this.pause(4000);
        return this.isElementDisplayed(this.searchBar, WAIT_TIMEOUT);
    }

    async scrollHomepageToTop() {
        try {
            await $(
                'android=new UiScrollable(new UiSelector().className("android.widget.ScrollView")).scrollToBeginning(10)'
            );
        } catch (error) {
            // Scrollable action may throw after reaching the top; safe to ignore
        }
        await this.pause(800);
    }

    async isHomePageLoaded() {
        const ready = await this.ensureHomepage();
        const homeTabVisible = await this.isElementDisplayed(this.homeTab, WAIT_TIMEOUT);
        if (ready) {
            await this.scrollHomepageToTop();
        }
        return ready && homeTabVisible;
    }

    async isSearchBarDisplayed() {
        return this.isElementDisplayed(this.searchBar);
    }

    async isPropertyTypeButtonDisplayed() {
        return this.isElementDisplayed(this.propertyTypeButton);
    }

    async isPopularLocationSectionDisplayed() {
        await this.scrollHomepageToTop();
        if (await this.isElementDisplayed(this.popularLocationTitle, 5000)) {
            return true;
        }
        // Homepage is personalized: after searching, this becomes "Lanjutkan Pencarianmu"
        if (await this.isElementDisplayed(this.continueSearchTitle, 5000)) {
            return true;
        }
        const sampleLocations = ['Tangerang', 'Surabaya', 'Bekasi', 'Jakarta Selatan'];
        for (const location of sampleLocations) {
            if (await this.isElementDisplayed(this.locationByName(location), 1500)) {
                return true;
            }
        }
        return this.isElementDisplayed(
            $('android=new UiSelector().descriptionContains("Properti dijual")'),
            3000
        );
    }

    async isDiscoveryChipDisplayed(chipName) {
        await this.scrollHomepageToTop();
        if (await this.isElementDisplayed(this.locationByName(chipName), 5000)) {
            return true;
        }
        // Personalized recent-search chip may contain the keyword
        return this.isElementDisplayed(
            $(`android=new UiSelector().descriptionContains("${chipName}")`),
            5000
        );
    }

    async isRecommendationSectionDisplayed() {
        await this.scrollHomepageToTop();
        if (await this.isElementDisplayed(this.recommendationTitle, 5000)) {
            return true;
        }
        // Alternate homepage modules in the revamp
        if (await this.isElementDisplayed($('~Properti Baru dengan 360 Tur Virtual'), 3000)) {
            return true;
        }
        return this.isElementDisplayed(this.recommendationFeatureTitle, 3000);
    }

    async arePropertyCardsDisplayed() {
        await this.scrollHomepageToTop();
        if (await this.isElementDisplayed(this.propertyCardsScroll, 4000)) {
            return true;
        }
        const whatsapp = await this.whatsappButtons;
        if (whatsapp.length > 0) {
            return true;
        }
        const pricedCards = await $$('//*[contains(@content-desc, "Rp")]');
        return pricedCards.length > 0;
    }

    async isBottomNavigationDisplayed() {
        const home = await this.isElementDisplayed(this.homeTab);
        const search = await this.isElementDisplayed(this.searchTab);
        const saved = await this.isElementDisplayed(this.savedTab);
        const profile = await this.isElementDisplayed(this.profileTab);
        return home && search && saved && profile;
    }

    async getPropertyCardCount() {
        const buttons = await this.whatsappButtons;
        return buttons.length;
    }

    async isPopularLocationDisplayed(locationName) {
        return this.isDiscoveryChipDisplayed(locationName);
    }

    async clickSearchBar() {
        await this.clickElement(this.searchBar);
    }

    async typeSearchKeyword(keyword) {
        const editable = await $('android.widget.EditText');
        if (await this.isElementDisplayed(editable, 5000)) {
            await this.setValue(editable, keyword);
            return;
        }
        await this.setValue(this.searchBar, keyword);
    }

    async submitSearch() {
        try {
            await driver.pressKeyCode(66);
        } catch (error) {
            await driver.execute('mobile: performEditorAction', { action: 'search' });
        }
        await this.pause(2000);
    }

    async clickNavigationTab(tabName) {
        await this.clickElement(this.getNavigationTab(tabName));
        await this.pause(1500);
    }

    async isTabPageDisplayed(tabName) {
        const tab = this.getNavigationTab(tabName);
        await this.waitForElement(tab);
        const selected = await tab.getAttribute('selected');
        return selected === 'true' || selected === true;
    }

    async clickSeeAll() {
        await this.clickElement(this.seeAllButton);
    }

    async swipeRecommendationCards() {
        const scroll = await this.propertyCardsScroll;
        if (await this.isElementDisplayed(scroll)) {
            const location = await scroll.getLocation();
            const size = await scroll.getSize();
            const y = location.y + size.height / 2;
            const startX = location.x + size.width * 0.85;
            const endX = location.x + size.width * 0.15;
            await this.performSwipe(startX, y, endX, y);
            return;
        }
        await this.swipeLeft();
    }

    async scrollToRecommendationFeatures() {
        for (let i = 0; i < 4; i++) {
            if (await this.isElementDisplayed(this.recommendationFeatureTitle, 2000)) {
                return true;
            }
            await this.swipeUp();
        }
        return this.isElementDisplayed(this.recommendationFeatureTitle, 3000);
    }

    async isKprSimulationDisplayed() {
        return this.isElementDisplayed(this.kprSimulationCard);
    }

    async propertyCardHasDetails() {
        const cards = await $$('//*[contains(@content-desc, "Rp")]');
        if (cards.length === 0) {
            const pageSource = await driver.getPageSource();
            const hasPrice = pageSource.includes('Rp');
            const hasLocation = /Jakarta|Bandung|Surabaya|Bekasi|Tangerang/i.test(pageSource);
            const hasPropertyType = pageSource.includes('Rumah') || pageSource.includes('Apartemen');
            return hasPrice && hasLocation && hasPropertyType;
        }

        const content = await cards[0].getAttribute('content-desc');
        if (!content) {
            return false;
        }

        const hasPrice = content.includes('Rp');
        const hasLocation = /Jakarta|Bandung|Surabaya|Bekasi|Tangerang|Bogor|Depok/i.test(content);
        const hasTitle = content.split('\n').length >= 3;
        return hasPrice && hasTitle && hasLocation;
    }
}

module.exports = new HomepagePage();
