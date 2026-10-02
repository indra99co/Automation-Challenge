
class HomepagePage {
    get searchElement() {
        return $('~Lokasi, area, project');
    }

    get buyButton() {
        return $('android=new UiSelector().descriptionContains("Cari")');
    }

    get rentButton() {
        return $('android=new UiSelector().descriptionContains("Hunian Baru")');
    }

    get myAdsButton() {
        return $('android=new UiSelector().descriptionContains("Iklan Saya")');
    }

    get createAdButton() {
        return $('android=new UiSelector().descriptionContains("Buat Iklan")');
    }

    get myAccountButton() {
        return $('android=new UiSelector().descriptionContains("Akun Saya")');
    }

    get filterButton() {
        return $('~Filter');
    }

    
    get filterChip() {
        return $('~Filter');
    }

    get priorityChip() {
        return $('~Diutamakan');
    }

    get priceRangeChip() {
        return $('~Kisaran Harga');
    }

    get landAreaChip() {
        return $('~Luas Tanah');
    }

    get newPropertiesButton() {
        return $('~Properti Baru');
    }

    get bankAssetsButton() {
        return $('~Aset Bank');
    }
}

module.exports = new HomepagePage();