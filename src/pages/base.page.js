class BasePage {
    constructor() {
        this.timeout = 15000;
    }

    async getScreenSize() {
        return driver.getWindowRect();
    }

    async waitForElement(element, timeout = this.timeout) {
        await element.waitForDisplayed({ timeout });
        return element;
    }

    async clickElement(element) {
        await this.waitForElement(element);
        await element.click();
        await driver.pause(500);
    }

    async setValue(element, value) {
        await this.waitForElement(element);
        try {
            await element.clearValue();
        } catch (error) {
            // Some Flutter inputs do not support clearValue
        }
        await element.setValue(value);
        try {
            await driver.hideKeyboard();
        } catch (error) {
            // Keyboard may already be hidden
        }
    }

    async getText(element) {
        await this.waitForElement(element);
        const text = await element.getText();
        if (text) {
            return text;
        }
        return element.getAttribute('content-desc');
    }

    async isElementDisplayed(element, timeout = 5000) {
        try {
            await element.waitForDisplayed({ timeout });
            return true;
        } catch (error) {
            return false;
        }
    }

    async performSwipe(startX, startY, endX, endY) {
        await driver.performActions([
            {
                type: 'pointer',
                id: 'finger1',
                parameters: { pointerType: 'touch' },
                actions: [
                    { type: 'pointerMove', duration: 0, x: Math.round(startX), y: Math.round(startY) },
                    { type: 'pointerDown', button: 0 },
                    { type: 'pause', duration: 300 },
                    { type: 'pointerMove', duration: 600, x: Math.round(endX), y: Math.round(endY) },
                    { type: 'pointerUp', button: 0 }
                ]
            }
        ]);
        await driver.releaseActions();
        await driver.pause(800);
    }

    async swipeUp() {
        const { width, height } = await this.getScreenSize();
        await this.performSwipe(width / 2, height * 0.75, width / 2, height * 0.25);
    }

    async swipeDown() {
        const { width, height } = await this.getScreenSize();
        await this.performSwipe(width / 2, height * 0.25, width / 2, height * 0.75);
    }

    async swipeLeft() {
        const { width, height } = await this.getScreenSize();
        await this.performSwipe(width * 0.8, height / 2, width * 0.2, height / 2);
    }

    async swipeRight() {
        const { width, height } = await this.getScreenSize();
        await this.performSwipe(width * 0.2, height / 2, width * 0.8, height / 2);
    }

    async pause(ms) {
        await driver.pause(ms);
    }
}

module.exports = BasePage;
