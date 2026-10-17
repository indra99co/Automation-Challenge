const fs = require('fs');
const path = require('path');

// List step definition files explicitly instead of using a glob.
// On Windows, WebdriverIO turns the glob into a file URL, so a folder name with a space
// (e.g. "C:\Users\Jessica Ei") becomes "%20" and the glob does not match anything.
const stepDir = path.join(__dirname, 'features', 'step-definitions');
const stepFiles = fs.readdirSync(stepDir)
    .filter((file) => file.endsWith('.js'))
    .map((file) => path.join(stepDir, file));

exports.config = {
    runner: 'local',
    port: 4723,

    specs: ['./features/**/*.feature'],
    maxInstances: 1,

    capabilities: [{
        platformName: 'Android',
        'appium:automationName': 'UiAutomator2',
        'appium:deviceName': process.env.DEVICE_NAME || 'Android Device',
        'appium:udid': process.env.DEVICE_UDID,
        'appium:appPackage': process.env.APP_PACKAGE || 'com.urbanindo.android',
        'appium:appActivity': process.env.APP_ACTIVITY || 'app.nine_nine.MainActivity',
        'appium:noReset': true,
        'appium:autoGrantPermissions': true,
        'appium:newCommandTimeout': 240,
        // Some devices (e.g. OPPO / ColorOS) block Appium from changing hidden API settings
        'appium:ignoreHiddenApiPolicyError': true,
        // Flutter keeps animating (image carousel, loaders), so don't wait for the UI to be idle
        'appium:waitForIdleTimeout': 0,
    }],

    logLevel: 'warn',
    bail: 0,
    waitforTimeout: 15000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    // The listing feed has many cards with the same pattern, so allow $() to take the first match
    strictSelectors: false,

    services: [
        ['appium', {
            // Uses the Appium installed in node_modules
            args: { relaxedSecurity: true },
            logPath: './logs',
        }],
    ],

    framework: 'cucumber',
    reporters: ['spec'],

    cucumberOpts: {
        require: stepFiles,
        backtrace: false,
        dryRun: false,
        failFast: false,
        snippets: true,
        source: true,
        strict: false,
        timeout: 60000,
    },

    // Save a screenshot and the page source of every failed step, to make debugging easier
    afterStep: async function (step, scenario, result) {
        if (!result.passed) {
            const dir = path.join(__dirname, 'reports', 'failures');
            fs.mkdirSync(dir, { recursive: true });
            const name = `${Date.now()}-${step.text.replace(/[^a-z0-9]+/gi, '_').slice(0, 60)}`;
            await browser.saveScreenshot(path.join(dir, `${name}.png`));
            fs.writeFileSync(path.join(dir, `${name}.xml`), await browser.getPageSource());
        }
    },
};
