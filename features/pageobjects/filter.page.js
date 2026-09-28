const BasePage = require('./base.page');

/**
 * FilterPage: "Filter" screen opened from the homepage Filter button.
 */
class FilterPage extends BasePage {
    get title() { return this.byDesc('Filter'); }
    get listingTypeLabel() { return this.byDesc('Tipe Iklan'); }
    get propertyTypeLabel() { return this.byDesc('Tipe Properti'); }
    get priceRangeLabel() { return this.byDesc('Kisaran Harga'); }
    get resetButton() { return this.byDesc('Reset'); }
    get applyButton() { return this.byDescStartsWith('Terapkan'); }

    /** Any option on the filter screen, e.g. 'Dijual', 'Rumah', 'Apartment' */
    option(name) { return this.byDesc(name); }

    async waitForLoaded() {
        await this.waitForDisplayed(this.listingTypeLabel);
    }
}

module.exports = new FilterPage();
