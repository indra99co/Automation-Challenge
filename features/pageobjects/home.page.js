const BasePage = require('./base.page');

class HomePage extends BasePage {
    // Header
    // Note: in Flutter this node wraps the whole page (bounds [0,72][720,1400]),
    // so use tapSearchBox() instead of clicking it directly.
    get searchBar() { return this.byDesc('Lokasi, area, project'); }
    get filterButton() { return this.byDesc('Filter'); }

    // Quick filter chips
    get sortChip() { return this.byDesc('Diutamakan'); }
    get priceRangeChip() { return this.byDesc('Kisaran Harga'); }
    get landAreaChip() { return this.byDesc('Luas Tanah'); }
    get buildingAreaChip() { return this.scrollRightTo('Luas Bangunan'); }

    // Listing header
    get pageTitle() { return this.byDescStartsWith('Properti Dijual di'); }
    get resultCount() { return this.byDescContains('Iklan Properti'); }
    get newPropertyButton() { return this.byDesc('Properti Baru'); }
    get bankAssetButton() { return this.byDesc('Aset Bank'); }

    // Listing feed
    // Every listing card label contains "Diperbarui pada <date>"
    get firstListingCard() { return $('android=new UiSelector().clickable(true).descriptionContains("Diperbarui pada")'); }
    get listingPhoneButton() { return this.byDescStartsWith('+62'); }
    get listingWhatsappButton() { return this.byDesc('WhatsApp'); }
    get newPropertySection() { return this.scrollDownTo('Pilihan Properti Baru'); }
    get emptyStateTitle() { return this.byDesc('Properti yang Kamu Cari Belum Tersedia'); }

    // Bottom navigation
    get searchTab() { return this.byDescContains('Tab 1 of 5'); }
    get newHousingTab() { return this.byDescContains('Tab 2 of 5'); }
    get myListingTab() { return this.byDescContains('Tab 3 of 5'); }
    get createListingTab() { return this.byDescContains('Tab 4 of 5'); }
    get myAccountTab() { return this.byDescContains('Tab 5 of 5'); }

    element(name) {
        // Functions, so only the requested element is searched.
        // ($() runs right away, and the scroll locators would move the page.)
        const map = {
            'search bar': () => this.searchBar,
            'filter button': () => this.filterButton,
            'sort chip': () => this.sortChip,
            'price range chip': () => this.priceRangeChip,
            'land area chip': () => this.landAreaChip,
            'building area chip': () => this.buildingAreaChip,
            'page title': () => this.pageTitle,
            'result count': () => this.resultCount,
            'new property button': () => this.newPropertyButton,
            'bank asset button': () => this.bankAssetButton,
            'listing card': () => this.firstListingCard,
            'listing phone button': () => this.listingPhoneButton,
            'listing whatsapp button': () => this.listingWhatsappButton,
            'new property section': () => this.newPropertySection,
            'search tab': () => this.searchTab,
            'new housing tab': () => this.newHousingTab,
            'my listing tab': () => this.myListingTab,
            'create listing tab': () => this.createListingTab,
            'my account tab': () => this.myAccountTab,
        };
        if (!map[name]) {
            throw new Error(`Unknown homepage element: ${name}`);
        }
        return map[name]();
    }

    async tapElement(name) {
        if (name === 'search bar') {
            await this.tapSearchBox();
        } else {
            await this.tap(this.element(name));
        }
    }

    async tapSearchBox() {
        // The search box sits on the left of the Filter button, on the same row
        await this.waitDisplayed(this.filterButton);
        const { x, y } = await this.filterButton.getLocation();
        const { height } = await this.filterButton.getSize();
        await driver.tap({ x: Math.round(x / 2), y: Math.round(y + height / 2) });
    }

    async waitForLoaded() {
        await this.waitDisplayed(this.searchBar, 30000);
        // While loading, the label shows "0 Iklan Properti", so wait until the real count is shown
        await browser.waitUntil(
            async () => (await this.resultCount.isExisting()) && (await this.getResultCount()) > 0,
            { timeout: 30000, interval: 1000, timeoutMsg: 'Homepage listing did not finish loading' }
        );
    }

    async getResultCount() {
        // Label example: "1.325.120 Iklan Properti | 1 dari 500 Halaman"
        const label = await this.resultCount.getAttribute('content-desc');
        return parseInt(label.split(' ')[0].replace(/\./g, ''), 10);
    }

    async getFirstListingInfo() {
        const label = await this.firstListingCard.getAttribute('content-desc');
        const lines = label.split('\n');
        return { price: lines[0], title: lines[2] };
    }

    async isTabSelected(tab) {
        return (await tab.getAttribute('selected')) === 'true';
    }
}

module.exports = new HomePage();
