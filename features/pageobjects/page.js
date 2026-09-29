/**
 * Main page object containing all methods, selectors and functionality
 * that is shared across all page objects
 */
module.exports = class Page {
    /**
     * Helper method to wait for element to be displayed
     */
    async waitForDisplayed(element) {
        await element.waitForDisplayed({ timeout: 10000 });
    }
}