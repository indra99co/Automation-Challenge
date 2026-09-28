const BasePage = require('./base.page');

/**
 * BottomSheet: panel that slides up when a homepage chip is tapped
 * ("Diutamakan" -> "Urutkan" sort sheet, "Kisaran Harga", "Luas Tanah").
 */
class BottomSheet extends BasePage {
    title(text) { return this.byDesc(text); }
    option(text) { return this.byDesc(text); }
    get resetButton() { return this.byDesc('Reset'); }
    get applyButton() { return this.byDescStartsWith('Terapkan'); }

    async close() {
        await this.goBack();
    }
}

module.exports = new BottomSheet();
