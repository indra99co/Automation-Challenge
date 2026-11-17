class HomePage {
    get searchBar() {
        return $('~Lokasi, area, project');
    }

    get filterButton() {
        return $('~Filter');
    }

    quickButton(name) {
        return $(`~${name}`);
    }

    tab(name) {
        return $(`android=new UiSelector().descriptionStartsWith("${name}")`);
    }

    async waitForHomepage() {
        await this.searchBar.waitForDisplayed({ timeout: 30000 });
    }
}

module.exports = new HomePage();