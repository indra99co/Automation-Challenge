const { $, $$, browser, driver } = require('@wdio/globals');

const NAVIGATION_TABS = ['Cari', 'Hunian Baru', 'Iklan Saya', 'Buat Iklan', 'Akun Saya'];

class HomePage {
  get searchBar() {
    return this.searchBarShowing('Lokasi, area, project');
  }

  get filterButton() {
    return $('~Filter');
  }

  get quickFilterBar() {
    return $('android.widget.HorizontalScrollView');
  }

  get listingFeed() {
    return $('android.widget.ScrollView');
  }

  get listingHeading() {
    return $('android=new UiSelector().descriptionMatches("Properti (Dijual|Disewa) di .+")');
  }

  get listingSummary() {
    return $('android=new UiSelector().descriptionContains("Iklan Properti")');
  }

  get listingCards() {
    return $$('android=new UiSelector().descriptionMatches("(?s)Rp .+\\n.+")');
  }

  get projectCards() {
    return $$('android=new UiSelector().descriptionMatches("(?s)[^\\n]+\\n[\\d.,]+ (Juta|Miliar) - .+")');
  }

  get nextPageButton() {
    return $('~Next');
  }

  searchBarShowing(text) {
    return $(`~${text}`);
  }

  quickFilter(name) {
    return $(
      `android=new UiSelector().className("android.widget.HorizontalScrollView").childSelector(new UiSelector().description("${name}"))`,
    );
  }

  shortcut(name) {
    return $(`~${name}`);
  }

  section(name) {
    return $(`~${name}`);
  }

  navigationTab(name) {
    const position = NAVIGATION_TABS.indexOf(name) + 1;
    return $(`~${name}\nTab ${position} of ${NAVIGATION_TABS.length}`);
  }

  async open() {
    const { appPackage } = driver.capabilities;
    await driver.terminateApp(appPackage);
    await driver.activateApp(appPackage);
    await this.waitForListings();
  }

  async waitForListings() {
    await this.listingSummary.waitForDisplayed();
    await browser.waitUntil(
      async () => /^[1-9]/.test(await this.listingSummary.getAttribute('content-desc')),
      { timeoutMsg: 'Expected the homepage listings to finish loading' },
    );
  }

  async openLocationSearch() {
    const searchBar = await this.searchBar.getLocation();
    const filterButton = await this.filterButton.getLocation();
    const { height } = await this.filterButton.getSize();
    await browser.tap({
      x: Math.round((searchBar.x + filterButton.x) / 2),
      y: Math.round(filterButton.y + height / 2),
    });
  }

  async openFilter() {
    await this.filterButton.click();
  }

  async revealQuickFilter(name) {
    await this.quickFilter(name).scrollIntoView({
      direction: 'left',
      percent: 0.5,
      maxScrolls: 3,
      scrollableElement: this.quickFilterBar,
    });
  }

  async openQuickFilter(name) {
    await this.revealQuickFilter(name);
    await this.quickFilter(name).click();
  }

  async selectShortcut(name) {
    await this.shortcut(name).click();
  }

  async getListingPrices(count) {
    await this.waitForListings();
    const listings = [];
    for (let swipes = 0; swipes <= count; swipes++) {
      for (const card of await this.listingCards) {
        const description = await card.getAttribute('content-desc');
        if (!listings.includes(description)) {
          listings.push(description);
        }
      }
      if (listings.length >= count) {
        break;
      }
      await browser.swipe({ scrollableElement: this.listingFeed, percent: 0.5 });
    }
    return listings.slice(0, count).map((description) => description.split('\n')[0]);
  }

  async getFirstListingPrice() {
    const [price] = await this.getListingPrices(1);
    return price;
  }

  async openFirstListing() {
    await this.waitForListings();
    await this.listingCards[0].click();
  }

  async scrollToSection(name) {
    await this.section(name).scrollIntoView({ scrollableElement: this.listingFeed });
  }

  async goToNextPage() {
    await this.nextPageButton.scrollIntoView({
      scrollableElement: this.listingFeed,
      duration: 500,
      maxScrolls: 50,
    });
    await this.nextPageButton.click();
  }

  async openNavigationTab(name) {
    await this.navigationTab(name).click();
  }
}

module.exports = new HomePage();
