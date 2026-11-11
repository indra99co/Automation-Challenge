const { $, expect } = require('@wdio/globals');

class HomePage {
    get tabCari() { return $('~Cari\nTab 1 of 5'); }
    get tabHunianBaru() { return $('~Hunian Baru\nTab 2 of 5'); }
    get btnFilter() { return $('~Filter'); }
    get filterDiutamakan() { return $('~Diutamakan'); }
    get iklanProperti() { return $('//android.view.View[contains(@content-desc, "Miliar")]'); }

    async verifyHomepageLoad() {
        await this.tabCari.waitForDisplayed({ timeout: 15000 });
        await expect(this.tabCari).toBeDisplayed();
        await expect(this.btnFilter).toBeDisplayed();
        await expect(this.filterDiutamakan).toBeDisplayed();
        await expect(this.iklanProperti).toBeDisplayed();
    }
}

module.exports = new HomePage();