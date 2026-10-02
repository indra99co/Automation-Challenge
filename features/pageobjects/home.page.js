class HomePage {
    get locationSearch() {
        return $('~Lokasi, area, project');
    }

    get filter() {
        return $('~Filter');
    }

    get prioritized() {
        return $('~Diutamakan');
    }

    get priceRange() {
        return $('~Kisaran Harga');
    }

    get landArea() {
        return $('~Luas Tanah');
    }

    get newProperty() {
        return $('~Properti Baru');
    }

    get bankAsset() {
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
}

module.exports = new HomePage();