const Page = require('./page');

class HomePage extends Page {
    get searchBar() {
        return $('~Lokasi, area, project');
    }

    get filterButton() {
        return $('~Filter');
    }

    get propertiBaruButton() {
        return $('~Properti Baru');
    }
}

module.exports = new HomePage();