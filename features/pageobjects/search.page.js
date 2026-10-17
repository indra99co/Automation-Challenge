const BasePage = require('./base.page');

class SearchPage extends BasePage {
    get searchInput() { return $('android.widget.EditText'); }
    get searchButton() { return $('android=new UiSelector().className("android.widget.Button").description("Cari")'); }
    get relatedLocationTitle() { return this.byDesc('Lokasi Terkait'); }

    suggestion(name) {
        return this.byDescStartsWith(`${name}\n`);
    }

    async typeKeyword(keyword) {
        await this.waitDisplayed(this.searchInput);
        await this.searchInput.click();
        await this.searchInput.setValue(keyword);
    }
}

module.exports = new SearchPage();
