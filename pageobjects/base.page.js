// pageobjects/base.page.js
// Base class berisi fungsi umum yang dipakai di semua Page Object

class BasePage {
  /**
   * Menunggu sebuah elemen muncul dan terlihat di layar
   * @param {string} selector
   * @param {number} timeout
   */
  async waitForDisplayed(selector, timeout = 15000) {
    const element = await $(selector);
    await element.waitForDisplayed({ timeout });
    return element;
  }

  /**
   * Klik elemen setelah memastikan elemen sudah tampil
   * @param {string} selector
   */
  async clickElement(selector) {
    const element = await this.waitForDisplayed(selector);
    await element.click();
  }

  /**
   * Cek apakah elemen tampil di layar, return boolean (tidak throw error jika tidak ada)
   * @param {string} selector
   */
  async isElementDisplayed(selector) {
    const element = await $(selector);
    return element.isDisplayed().catch(() => false);
  }

  /**
   * Ambil text dari elemen
   * @param {string} selector
   */
  async getElementText(selector) {
    const element = await this.waitForDisplayed(selector);
    return element.getText();
  }

  /**
   * Scroll ke bawah pada layar (umum dipakai di homepage yang panjang)
   */
  async scrollDown() {
    const { width, height } = await driver.getWindowSize();
    await driver.touchAction([
      { action: 'press', x: width / 2, y: height * 0.8 },
      { action: 'wait', ms: 300 },
      { action: 'moveTo', x: width / 2, y: height * 0.2 },
      { action: 'release' },
    ]);
  }
}

module.exports = BasePage;
