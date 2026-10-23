
class HomePage {
    get searchLocation() {
        return $('~Lokasi, area, project');
    }

    get filterButton() {
        return $('~Filter');
    }

    get newPropertiesButton() {
        return $('~Properti Baru');
    }

    get bankAssetsButton() {
        return $('~Aset Bank');
    }

    
    get searchTab() {
        return $('~Cari\nTab 1 of 5');
    }

    get newHousingTab() {
        return $('~Hunian Baru\nTab 2 of 5');
    }

    get myAdsTab() {
        return $('~Iklan Saya\nTab 3 of 5');
    }

    get createAdTab() {
        return $('~Buat Iklan\nTab 4 of 5');
    }

    get myAccountTab() {
        return $('~Akun Saya\nTab 5 of 5');
    }

    async openFilter() {
        await this.filterButton.click();
    }

    get priceRangeFilter() {
        return $('~Kisaran Harga');
    }

    get landAreaFilter() {
        return $('~Luas Tanah');
    }

    get priorityFilter() {
        return $('~Diutamakan');
    }

    get homepageHeading() {
        return $('~Properti Dijual di Indonesia | Harga Terbaru 2026');
    }

    get propertyListingCount() {
    return $('~1.332.140 Iklan Properti | 1 dari 500 Halaman');
    }

    get propertyCard() {
        return $('//android.view.View[contains(@content-desc, "Rp 1,32 Miliar")]');
    }

    get landTypeLabel() {
        return $('~Tanah');
    }

}

module.exports = new HomePage();

