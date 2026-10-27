class HomePage {
    get searchField() {
        return $('~Lokasi, area, project');
    }

    get filterButton() {
        return $('~Filter');
    }
    get filterTitle() {
        return $('~Tipe Iklan');
    }
    get applyFilterButton() {
        return $('~Terapkan');
    }
    get sortPriority() {
        return $('~Diutamakan');
    }

    get priceRange() {
        return $('~Kisaran Harga');
    }

    get landArea() {
        return $('~Luas Tanah');
    }
async openFilters() {
        await this.filterButton.click();
    }
    get newProperties() {
        return $('~Properti Baru');
    }

    get bankAssets() {
        return $('~Aset Bank');
    }

    get houseCategory() {
        return $('~Rumah');
    }

    get myAccountTab() {
        return $('~Akun Saya\nTab 5 of 5');
    }

    async isSearchFieldDisplayed() {
        return await this.searchField.isDisplayed();
    }

    async isFilterButtonDisplayed() {
        return await this.filterButton.isDisplayed();
    }

    async isSortPriorityDisplayed() {
        return await this.sortPriority.isDisplayed();
    }

    async isPriceRangeDisplayed() {
        return await this.priceRange.isDisplayed();
    }

    async isLandAreaDisplayed() {
        return await this.landArea.isDisplayed();
    }

    async isNewPropertiesDisplayed() {
        return await this.newProperties.isDisplayed();
    }

    async isBankAssetsDisplayed() {
        return await this.bankAssets.isDisplayed();
    }

    async isHouseCategoryDisplayed() {
        return await this.houseCategory.isDisplayed();
    }
    async applyFilters() {
        await this.applyFilterButton.click();
    }
}

module.exports = new HomePage();
