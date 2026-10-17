const BasePage = require('./base.page');

class FilterPage extends BasePage {
    get title() { return this.byDesc('Filter'); }
    get listingTypeLabel() { return this.byDesc('Tipe Iklan'); }
    get forSaleOption() { return this.byDesc('Dijual'); }
    get forRentOption() { return this.byDesc('Disewa'); }
    get propertyTypeLabel() { return this.byDesc('Tipe Properti'); }
    get seeAllPropertyTypes() { return this.byDesc('Lihat Semua Tipe Properti'); }
    get priceRangeLabel() { return this.byDesc('Kisaran Harga'); }
    get resetButton() { return this.byDesc('Reset'); }
    get applyButton() { return this.byDescStartsWith('Terapkan'); }

    propertyType(name) {
        return this.byDesc(name);
    }
}

module.exports = new FilterPage();
