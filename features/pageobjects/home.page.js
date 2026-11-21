const Page = require('./page');

class HomePage extends Page {
    get searchBar() { return '~Lokasi, area, project'; }
    get filterButton() { return '~Filter'; }
    get listingCard() { return '//android.view.View[contains(@content-desc,"Cicilan")]'; }

    tab(name) { return `~${name}`; }
    bottomMenu(name) { return `//android.widget.ImageView[contains(@content-desc,"${name}")]`; }

    async waitForHomepage() {
        await $(this.searchBar).waitForDisplayed({ timeout: 30000 });
    }
}

module.exports = new HomePage();