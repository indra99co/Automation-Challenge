const Page = require('./page');

class HomePage extends Page {

    open () {
        return super.open();
    }

    // Search
    get searchLocation () {
        return $('~Lokasi, area, project');
    }

    get locationSearchPage () {
        return $('//android.widget.EditText[@hint="Masukan Lokasi"]');
    }

    get searchButton () {
        return $('~Cari');
    }

    // Filter section
    get filter () {
        return $('~Filter');
    }

    get prioritized () {
        return $('~Diutamakan');
    }

    get priceRange () {
        return $('~Kisaran Harga');
    }

    get landArea () {
        return $('~Luas Tanah');
    }

    // Property categories
    get newProperty () {
        return $('~Properti Baru');
    }

    get bankAsset () {
        return $('~Aset Bank');
    }

    // Bottom navigation
    get searchTab () {
        return $('~Cari\nTab 1 of 5');
    }

    get newPropertyTab () {
        return $('~Hunian Baru\nTab 2 of 5');
    }

    get myAdsTab () {
        return $('~Iklan Saya\nTab 3 of 5');
    }

    get createAdTab () {
        return $('~Buat Iklan\nTab 4 of 5');
    }

    get myAccountTab () {
        return $('~Akun Saya\nTab 5 of 5');
    }
}

module.exports = new HomePage();