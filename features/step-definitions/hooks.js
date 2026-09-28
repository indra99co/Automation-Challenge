const { Before } = require('@wdio/cucumber-framework');
const HomePage = require('../pageobjects/home.page');

// Relaunch the app before every scenario so each scenario starts from a clean
// homepage and does not depend on the state left by a previous one.
Before(async () => {
    await HomePage.open();
});
