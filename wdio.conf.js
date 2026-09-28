const path = require('path');
const fs = require('fs');

// Optional .apk: if present in apps/, Appium installs it before the run.
// Otherwise the tests use the 99.co app already installed on the device (from the Play Store).
const APP_PACKAGE = 'com.urbanindo.android';
const apkPath = path.resolve(__dirname, 'apps', process.env.APP_FILE || '99co.apk');
const hasApk = fs.existsSync(apkPath);

function stepDefinitionFiles() {
    const dir = path.join(__dirname, 'features', 'step-definitions');
    return fs.readdirSync(dir)
        .filter(file => file.endsWith('.js'))
        .map(file => path.join(dir, file));
}

exports.config = {
    runner: 'local',
    port: 4723,

    specs: ['./features/**/*.feature'],
    exclude: [],
    maxInstances: 1,

    capabilities: [{
        platformName: 'Android',
        'appium:automationName': 'UiAutomator2',
        'appium:deviceName': process.env.DEVICE_NAME || 'Android Emulator',
        ...(process.env.UDID ? { 'appium:udid': process.env.UDID } : {}),
        ...(hasApk ? { 'appium:app': apkPath } : {}),
        'appium:appPackage': APP_PACKAGE,
        'appium:appActivity': 'app.nine_nine.MainActivity',
        'appium:autoGrantPermissions': true,
        'appium:noReset': true,
        'appium:newCommandTimeout': 240
    }],

    logLevel: 'warn',
    bail: 0,
    waitforTimeout: 15000,
    connectionRetryTimeout: 180000,
    connectionRetryCount: 1,

    services: [
        ['appium', {
            // Uses the globally installed Appium (npm install -g appium)
            command: 'appium',
            args: {
                address: '127.0.0.1',
                port: 4723,
                relaxedSecurity: true
            },
            logPath: './logs'
        }]
    ],

    framework: 'cucumber',
    reporters: ['spec'],

    cucumberOpts: {
        // Step definition files are listed explicitly instead of a "*.js" glob: on Windows,
        // @wdio/cucumber-framework converts the glob to a file URL (spaces -> %20) and matches nothing
        // when the project path contains spaces.
        require: stepDefinitionFiles(),
        backtrace: false,
        dryRun: false,
        failFast: false,
        snippets: true,
        source: true,
        strict: false,
        tags: '',
        timeout: 90000,
        ignoreUndefinedDefinitions: false
    },

    // Save a screenshot whenever a step fails.
    afterStep: async function (step, scenario, result) {
        if (!result.passed) {
            const dir = path.resolve(__dirname, 'screenshots');
            fs.mkdirSync(dir, { recursive: true });
            const name = `${scenario.name}-${step.text}`.replace(/[^a-z0-9]+/gi, '_').slice(0, 120);
            await driver.saveScreenshot(path.join(dir, `${name}.png`));
        }
    }
};
