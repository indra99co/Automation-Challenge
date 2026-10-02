class FilterPage {
    get title() {
        return $('~Filter');
    }

    get sale() {
        return $('~Dijual');
    }

    get rent() {
        return $('~Disewa');
    }

    get propertyType() {
        return $('~Tipe Properti');
    }

    get house() {
        return $('~Rumah');
    }

    get apartment() {
        return $('~Apartment');
    }

    get shopHouse() {
        return $('~Ruko');
    }

    get land() {
        return $('~Tanah');
    }

    get boardingHouse() {
        return $('~Kost');
    }

    get kiosk() {
        return $('~Kios');
    }

    get priceRange() {
        return $('~Kisaran Harga');
    }

    get price100to350() {
        return $('~100 - 350 Jt');
    }

    get price350to600() {
        return $('~350 - 600 Jt');
    }

    get reset() {
        return $('~Reset');
    }

    get apply() {
    return $('//android.widget.Button[starts-with(@content-desc, "Terapkan")]');
}
}

module.exports = new FilterPage();