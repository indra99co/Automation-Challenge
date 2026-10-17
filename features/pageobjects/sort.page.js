const BasePage = require('./base.page');

class SortPage extends BasePage {
    get title() { return this.byDesc('Urutkan'); }

    option(name) {
        return this.byDesc(name);
    }
}

module.exports = new SortPage();
