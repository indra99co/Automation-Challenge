class HomePage {

    get searchBar() {
        return $('~Lokasi, area, project');
    }

    get filterBtn() {
        return $('~Filter');
    }

    get newPropertyTab() {
        return $('~Properti Baru');
    }

    get asetBankTab() {
        return $('~Aset Bank');
    }

    get pageTitle() {
        return $('android=new UiSelector().descriptionContains("Properti Dijual di Indonesia")');
    }

    get totalListing() {
        return $('android=new UiSelector().descriptionContains("Iklan Properti")');
    }

    get listingCard() {
        return $('android=new UiSelector().descriptionContains("Cicilan")');
    }

    byDesc(text) {
        return $(`~${text}`);
    }

    byDescContains(text) {
        return $(`android=new UiSelector().descriptionContains("${text}")`);
    }

    navTab(name) {
        return $(`//android.widget.ImageView[starts-with(@content-desc, "${name}") and contains(@content-desc, "Tab")]`);
    }

    async waitForListingLoaded() {
        await driver.waitUntil(async () => {
            const desc = await this.totalListing.getAttribute('content-desc');
            return desc && !desc.startsWith('0 ');
        }, { timeout: 30000, timeoutMsg: 'Listing did not load' });
    }

    async getCurrentPage() {
        const desc = await this.totalListing.getAttribute('content-desc');
        const match = desc.match(/(\d+)\s+dari\s+(\d+)\s+Halaman/);
        return match ? parseInt(match[1], 10) : null;
    }

    async swipe(direction, percent = 0.6) {
        const { width, height } = await driver.getWindowSize();
        await driver.execute('mobile: swipeGesture', {
            left: Math.round(width * 0.1),
            top: Math.round(height * 0.2),
            width: Math.round(width * 0.8),
            height: Math.round(height * 0.6),
            direction,
            percent
        });
        await driver.pause(700);
    }

    async isInViewport(element) {
        if (!(await element.isDisplayed().catch(() => false))) return false;
        const loc = await element.getLocation();
        const size = await element.getSize();
        const screen = await driver.getWindowSize();
        return loc.y >= 0 && loc.y + size.height <= screen.height;
    }

    async scrollDownUntil(element, maxScroll = 30) {
        for (let i = 0; i < maxScroll; i++) {
            if (await this.isInViewport(element)) return true;
            await this.swipe('up');
        }
        return false;
    }

    async scrollUpUntil(element, maxScroll = 30) {
        for (let i = 0; i < maxScroll; i++) {
            if (await this.isInViewport(element)) return true;
            await this.swipe('down');
        }
        return false;
    }
}

module.exports = new HomePage();