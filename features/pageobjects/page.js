const { browser } = require('@wdio/globals');

/**
 * Base page object containing shared functionality
 * for all mobile page objects.
 */
module.exports = class Page {

    /**
     * Opens the 99.co Indonesia application.
     */
    open () {
        return browser.activateApp('com.urbanindo.android');
    }
};