// pageobjects/homepage.page.js
// Page Object untuk Homepage 99.co Indonesia (app: com.urbanindo.android)
//
// Semua locator di bawah ini sudah hasil scan asli menggunakan Appium Inspector
// pada app 99.co Indonesia versi terbaru (non-Pro), bukan lagi placeholder.

const BasePage = require('./base.page');

class HomePage extends BasePage {
  // ---------- LOCATORS (hasil scan Appium Inspector) ----------

  // Area pembungkus search bar (accessibility id)
  get searchBar() {
    return '~Lokasi, area, project';
  }

  // Kotak input teks di dalam search bar (dipakai untuk mengetik lokasi)
  get searchInput() {
    return '//android.widget.EditText[@hint="Masukan Lokasi"]';
  }

  // Tombol Filter
  get filterButton() {
    return '~Filter';
  }

  // Kartu listing properti pertama di homepage.
  // Elemen ini tidak punya content-desc/resource-id (class generic android.view.View),
  // jadi kita pakai xpath berbasis class + instance index (instance ke-0 = kartu pertama).
  get listingCard() {
    return '-android uiautomator:new UiSelector().className("android.view.View").instance(0)';
  }

  // Bottom navigation (5 tab), masing-masing pakai accessibility id lengkap
  // sesuai hasil scan: "<Nama Tab>\nTab X of 5"
  get bottomNavCari() {
    return '~Cari\nTab 1 of 5';
  }

  get bottomNavHunianBaru() {
    return '~Hunian Baru\nTab 2 of 5';
  }

  get bottomNavIklanSaya() {
    return '~Iklan Saya\nTab 3 of 5';
  }

  get bottomNavBuatIklan() {
    return '~Buat Iklan\nTab 4 of 5';
  }

  get bottomNavAkunSaya() {
    return '~Akun Saya\nTab 5 of 5';
  }

  // ---------- ACTIONS / VERIFICATIONS ----------

  async isHomepageDisplayed() {
    return this.isElementDisplayed(this.searchBar);
  }

  async isSearchBarDisplayed() {
    return this.isElementDisplayed(this.searchBar);
  }

  async isFilterButtonDisplayed() {
    return this.isElementDisplayed(this.filterButton);
  }

  async tapFilterButton() {
    await this.clickElement(this.filterButton);
  }

  async tapSearchBar() {
    await this.clickElement(this.searchBar);
  }

  async typeLocation(locationText) {
    await this.clickElement(this.searchInput);
    const input = await $(this.searchInput);
    await input.setValue(locationText);
  }

  async isListingCardDisplayed() {
    return this.isElementDisplayed(this.listingCard);
  }

  async tapBottomNav(tabName) {
    const map = {
      Cari: this.bottomNavCari,
      'Hunian Baru': this.bottomNavHunianBaru,
      'Iklan Saya': this.bottomNavIklanSaya,
      'Buat Iklan': this.bottomNavBuatIklan,
      'Akun Saya': this.bottomNavAkunSaya,
    };
    const selector = map[tabName];
    if (!selector) {
      throw new Error(`Unknown bottom nav tab: ${tabName}`);
    }
    await this.clickElement(selector);
  }

  async isBottomNavTabDisplayed(tabName) {
    const map = {
      Cari: this.bottomNavCari,
      'Hunian Baru': this.bottomNavHunianBaru,
      'Iklan Saya': this.bottomNavIklanSaya,
      'Buat Iklan': this.bottomNavBuatIklan,
      'Akun Saya': this.bottomNavAkunSaya,
    };
    const selector = map[tabName];
    if (!selector) {
      throw new Error(`Unknown bottom nav tab: ${tabName}`);
    }
    return this.isElementDisplayed(selector);
  }

  async isBottomNavDisplayed() {
    const cari = await this.isElementDisplayed(this.bottomNavCari);
    const hunianBaru = await this.isElementDisplayed(this.bottomNavHunianBaru);
    const iklanSaya = await this.isElementDisplayed(this.bottomNavIklanSaya);
    const buatIklan = await this.isElementDisplayed(this.bottomNavBuatIklan);
    const akunSaya = await this.isElementDisplayed(this.bottomNavAkunSaya);
    return cari && hunianBaru && iklanSaya && buatIklan && akunSaya;
  }
}

module.exports = new HomePage();
