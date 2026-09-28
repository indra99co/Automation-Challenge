const { $, $$, driver } = require('@wdio/globals');

const APP_ID = 'com.urbanindo.android';

/**
 * BasePage: parent class for all page objects.
 * Holds the locator helpers and generic actions shared by every screen.
 *
 * The 99.co app is built with Flutter. Flutter widgets do not expose resource-ids,
 * so the primary locator strategy is content-desc (accessibility id).
 */
class BasePage {
    // ---------- locator helpers ----------

    /** Exact content-desc, e.g. byDesc('Filter') -> $('~Filter') */
    byDesc(desc) {
        return $(`~${desc}`);
    }

    /** content-desc starting with the given text */
    byDescStartsWith(prefix) {
        return $(`android=new UiSelector().descriptionStartsWith("${prefix}")`);
    }

    /** content-desc containing the given text */
    byDescContains(part) {
        return $(`android=new UiSelector().descriptionContains("${part}")`);
    }

    /** All elements whose content-desc contains the given text */
    allByDescContains(part) {
        return $$(`android=new UiSelector().descriptionContains("${part}")`);
    }

    /** Element by Android class name, e.g. 'android.widget.EditText' */
    byClass(className) {
        return $(`android=new UiSelector().className("${className}")`);
    }

    // ---------- generic actions ----------

    async waitForDisplayed(element, timeout = 20000) {
        await element.waitForDisplayed({ timeout });
        return element;
    }

    async isDisplayed(element, timeout = 10000) {
        try {
            await element.waitForDisplayed({ timeout });
            return true;
        } catch (e) {
            return false;
        }
    }

    async tap(element) {
        await element.waitForDisplayed();
        await element.click();
    }

    /** Tap on screen coordinates (for widgets that have no node of their own) */
    async tapAt(x, y) {
        await driver.action('pointer', { parameters: { pointerType: 'touch' } })
            .move({ x: Math.round(x), y: Math.round(y) })
            .down()
            .pause(80)
            .up()
            .perform();
    }

    async typeText(element, value) {
        await element.waitForDisplayed();
        await element.setValue(value);
    }

    /** Read content-desc; Flutter exposes visible text through this attribute */
    async getDesc(element) {
        await element.waitForDisplayed();
        return element.getAttribute('content-desc');
    }

    async isSelected(element) {
        await element.waitForDisplayed();
        return (await element.getAttribute('selected')) === 'true';
    }

    /** Swipe up (scroll the content down) */
    async swipeUp(percent = 0.7) {
        const { width, height } = await driver.getWindowSize();
        await driver.execute('mobile: swipeGesture', {
            left: Math.round(width * 0.1),
            top: Math.round(height * 0.25),
            width: Math.round(width * 0.8),
            height: Math.round(height * 0.5),
            direction: 'up',
            percent
        });
        await driver.pause(800);
    }

    async goBack() {
        await driver.back();
        await driver.pause(800);
    }

    /** Terminate and relaunch the app so the scenario starts on the homepage */
    async restartApp() {
        await driver.execute('mobile: terminateApp', { appId: APP_ID });
        await driver.execute('mobile: activateApp', { appId: APP_ID });
    }
}

module.exports = BasePage;
