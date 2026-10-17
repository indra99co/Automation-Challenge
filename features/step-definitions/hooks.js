const { Before } = require('@wdio/cucumber-framework');

const APP_PACKAGE = process.env.APP_PACKAGE || 'com.urbanindo.android';

// Restart the app before every scenario so each test starts from a fresh homepage
Before(async () => {
    await driver.terminateApp(APP_PACKAGE);
    await driver.activateApp(APP_PACKAGE);
});
