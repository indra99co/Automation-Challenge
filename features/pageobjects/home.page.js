const { driver } = require('@wdio/globals');
const BasePage = require('./base.page');

/**
 * HomePage: the first screen shown when the 99.co Indonesia app is opened ("Cari" tab).
 * Locators were collected with `npm run scan` (see docs/03-locator-strategy.md).
 */

// Bottom navigation tabs, in order. Each tab's content-desc is e.g. "Cari\nTab 1 of 5".
const TABS = ['Cari', 'Hunian Baru', 'Iklan Saya', 'Buat Iklan', 'Akun Saya'];

class HomePage extends BasePage {
    // ---------- header: search & filter ----------

    /**
     * Search bar "Lokasi, area, project".
     * In Flutter this content-desc is attached to a container that spans almost the
     * whole screen, so use tapSearchBar() to tap the actual search field.
     */
    get searchBar() { return this.byDesc('Lokasi, area, project'); }
    get filterButton() { return this.byDesc('Filter'); }

    // ---------- quick filter chips ----------
    get sortChip() { return this.byDesc('Diutamakan'); }
    get priceRangeChip() { return this.byDesc('Kisaran Harga'); }
    get landAreaChip() { return this.byDesc('Luas Tanah'); }

    // ---------- title & listing count ----------
    get pageTitle() { return this.byDescStartsWith('Properti Dijual di Indonesia'); }
    get listingCount() { return this.byDescContains('Iklan Properti'); }

    // ---------- category shortcuts ----------
    get newPropertyShortcut() { return this.byDesc('Properti Baru'); }
    get bankAssetShortcut() { return this.byDesc('Aset Bank'); }

    // ---------- listing cards ----------
    /** Every listing card contains "Cicilan Mulai ..." (instalment) in its content-desc */
    get firstListingCard() { return this.byDescContains('Cicilan Mulai'); }
    get listingCards() { return this.allByDescContains('Cicilan Mulai'); }

    // ---------- bottom navigation ----------
    tab(name) {
        const index = TABS.indexOf(name);
        if (index === -1) {
            throw new Error(`Unknown tab "${name}". Expected one of: ${TABS.join(', ')}`);
        }
        return this.byDescContains(`Tab ${index + 1} of ${TABS.length}`);
    }

    get tabNames() { return TABS; }

    // ---------- actions ----------

    /** Wait until the homepage is ready (Filter button and "Cari" tab visible) */
    async waitForLoaded() {
        await this.waitForDisplayed(this.filterButton, 45000);
        await this.waitForDisplayed(this.tab('Cari'), 20000);
    }

    async open() {
        await this.restartApp();
        await this.waitForLoaded();
    }

    /**
     * Tap the search field. Its position is derived from the Filter button:
     * same vertical center, to the left of it.
     */
    async tapSearchBar() {
        const filter = await this.waitForDisplayed(this.filterButton);
        const { x, y } = await filter.getLocation();
        const { height } = await filter.getSize();
        await this.tapAt(x * 0.4, y + height / 2);
    }

    async tapFilter() { await this.tap(this.filterButton); }
    async tapSortChip() { await this.tap(this.sortChip); }
    async tapPriceRangeChip() { await this.tap(this.priceRangeChip); }
    async tapLandAreaChip() { await this.tap(this.landAreaChip); }
    async tapNewPropertyShortcut() { await this.tap(this.newPropertyShortcut); }

    async openTab(name) { await this.tap(this.tab(name)); }

    async isTabSelected(name) { return this.isSelected(this.tab(name)); }

    /** Parse the listing count, e.g. "1.335.766 Iklan Properti | ..." -> 1335766 */
    async getListingCount() {
        const desc = await this.getDesc(this.listingCount);
        const match = desc.match(/([\d.]+)\s+Iklan Properti/);
        return match ? Number(match[1].replace(/\./g, '')) : NaN;
    }

    /**
     * Right after launch the header reads "0 Iklan Properti" while data is loading.
     * Poll until the count is greater than 0 and return it.
     */
    async waitForListingCount(timeout = 30000) {
        let count = 0;
        await driver.waitUntil(async () => {
            count = await this.getListingCount();
            return count > 0;
        }, { timeout, timeoutMsg: 'Listing count stayed at 0 (listings did not load)' });
        return count;
    }

    async getFirstListingDesc() {
        return this.getDesc(this.firstListingCard);
    }
}

module.exports = new HomePage();
