const BasePage = require('./base.page');

/**
 * SearchPage: search screen opened by tapping the homepage search bar.
 */
class SearchPage extends BasePage {
    get searchInput() { return this.byClass('android.widget.EditText'); }
    get searchButton() { return this.byDesc('Cari'); }
    get relatedLocationsHeader() { return this.byDesc('Lokasi Terkait'); }

    /** Location suggestion starting with the given keyword */
    suggestion(keyword) { return this.byDescStartsWith(keyword); }

    async waitForLoaded() {
        await this.waitForDisplayed(this.searchInput);
    }

    async search(keyword) {
        await this.typeText(this.searchInput, keyword);
    }
}

module.exports = new SearchPage();
