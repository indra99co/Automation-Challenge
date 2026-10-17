const BasePage = require('./base.page');

class PriceRangePage extends BasePage {
    get title() { return this.byDesc('Kisaran Harga'); }
    get minPriceInput() { return $('android=new UiSelector().className("android.widget.EditText").instance(0)'); }
    get maxPriceInput() { return $('android=new UiSelector().className("android.widget.EditText").instance(1)'); }
    get resetButton() { return this.byDesc('Reset'); }
    get applyButton() { return this.byDescStartsWith('Terapkan'); }

    preset(label) {
        return this.byDesc(label);
    }
}

module.exports = new PriceRangePage();
