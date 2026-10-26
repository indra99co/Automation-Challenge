module.exports = class BasePage {
  async isShown(el) {
    return el.waitForDisplayed({ timeout: 15000 });
  }

  async scrollToDesc(text) {
    return $(
      `android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().descriptionContains("${text}"))`
    );
  }

  // Swipe ke atas sampai elemen benar-benar tampil di layar
  async scrollUntilVisible(el, maxSwipes = 12) {
    for (let i = 0; i < maxSwipes; i++) {
      if (await el.isDisplayed().catch(() => false)) return true;

      const { width, height } = await driver.getWindowSize();
      await driver.performActions([
        {
          type: 'pointer',
          id: 'finger1',
          parameters: { pointerType: 'touch' },
          actions: [
            { type: 'pointerMove', duration: 0, x: Math.round(width / 2), y: Math.round(height * 0.7) },
            { type: 'pointerDown', button: 0 },
            { type: 'pause', duration: 100 },
            { type: 'pointerMove', duration: 600, x: Math.round(width / 2), y: Math.round(height * 0.3) },
            { type: 'pointerUp', button: 0 },
          ],
        },
      ]);
      await driver.releaseActions();
      await driver.pause(500);
    }
    return el.isDisplayed().catch(() => false);
  }
};