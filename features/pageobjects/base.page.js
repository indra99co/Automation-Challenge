class BasePage {
    // The 99 app is built with Flutter, so most elements have no resource-id.
    // Locators use the accessibility label (content-desc) instead.
    byDesc(desc) {
        return $(`~${desc}`);
    }

    byDescStartsWith(text) {
        return $(`android=new UiSelector().descriptionStartsWith("${text}")`);
    }

    byDescContains(text) {
        return $(`android=new UiSelector().descriptionContains("${text}")`);
    }

    scrollDownTo(desc) {
        return $(
            'android=new UiScrollable(new UiSelector().className("android.widget.ScrollView"))' +
            `.scrollIntoView(new UiSelector().description("${desc}"))`
        );
    }

    scrollRightTo(desc) {
        return $(
            'android=new UiScrollable(new UiSelector().className("android.widget.HorizontalScrollView"))' +
            `.setAsHorizontalList().scrollIntoView(new UiSelector().description("${desc}"))`
        );
    }

    async waitDisplayed(element, timeout = 15000) {
        await element.waitForDisplayed({ timeout });
        return element;
    }

    async tap(element) {
        await this.waitDisplayed(element);
        await element.click();
    }

    async shouldBeDisplayed(element, message, timeout = 15000) {
        await element.waitForDisplayed({ timeout, timeoutMsg: message });
    }

    async shouldNotBeDisplayed(element, message, timeout = 5000) {
        await element.waitForDisplayed({ timeout, reverse: true, timeoutMsg: message });
    }

    async isShown(element, timeout = 10000) {
        try {
            await element.waitForDisplayed({ timeout });
            return true;
        } catch (e) {
            return false;
        }
    }

    async swipeVertical(fromRatio, toRatio) {
        const { width, height } = await driver.getWindowSize();
        const x = Math.round(width / 2);
        await driver.action('pointer', { parameters: { pointerType: 'touch' } })
            .move({ x, y: Math.round(height * fromRatio) })
            .down()
            .pause(100)
            .move({ duration: 600, x, y: Math.round(height * toRatio) })
            .up()
            .perform();
    }

    async back() {
        await driver.back();
    }
}

module.exports = BasePage;
