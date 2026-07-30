const path = require('path');

function getDeviceInfo() {
    try {
        const exec = require('child_process').execSync;
        const model = exec('adb shell getprop ro.product.model').toString().trim();
        const version = exec('adb shell getprop ro.build.version.release').toString().trim();
        const devicesOutput = exec('adb devices').toString();
        const deviceLine = devicesOutput
            .split(/\r?\n/)
            .find((line) => line.includes('\tdevice'));
        const udid = deviceLine ? deviceLine.split('\t')[0].trim() : undefined;

        return { model, version, udid };
    } catch (error) {
        return { model: 'Android Device', version: '11.0', udid: undefined };
    }
}

const deviceInfo = getDeviceInfo();

const capabilities = {
    platformName: 'Android',
    'appium:platformVersion': deviceInfo.version,
    'appium:deviceName': deviceInfo.model,
    'appium:appPackage': 'com.rumah123',
    'appium:appActivity': '.MainActivity',
    'appium:automationName': 'UiAutomator2',
    'appium:noReset': true,
    'appium:autoGrantPermissions': true,
    'appium:newCommandTimeout': 240
};

// const capabilities = {
//     platformName: 'Android',
//     'appium:platformVersion': '11.0',
//     'appium:deviceName': 'emulator-5554',
//     'appium:udid': 'emulator-5554',
//     'appium:appPackage': 'com.rumah123',
//     'appium:appActivity': '.MainActivity',
//     'appium:automationName': 'UiAutomator2',
//     'appium:noReset': true,
//     'appium:autoGrantPermissions': true,
//     'appium:newCommandTimeout': 240
// };

if (deviceInfo.udid) {
    capabilities['appium:udid'] = deviceInfo.udid;
}

exports.config = {
    runner: 'local',
    specs: ['./src/features/**/*.feature'],
    exclude: [],
    maxInstances: 1,
    capabilities: [capabilities],
    logLevel: 'info',
    bail: 0,
    waitforTimeout: 15000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    framework: 'cucumber',
    reporters: [
        'spec',
        [
            'allure',
            {
                outputDir: './allure-results',
                disableWebdriverStepsReporting: true,
                disableWebdriverScreenshotsReporting: false,
                useCucumberStepReporter: true,
                reportedEnvironmentVars: {
                    Device: deviceInfo.model,
                    Android: deviceInfo.version,
                    AppPackage: 'com.rumah123',
                    Framework: 'WebdriverIO + Cucumber',
                    Automation: 'Appium UiAutomator2'
                }
            }
        ]
    ],
    cucumberOpts: {
        // Use absolute paths (Windows-safe). Avoid globs here — WDIO converts
        // them to file:// URLs on Windows and glob matching can miss files.
        require: [
            path.join(__dirname, 'src', 'step-definitions', 'homepage.steps.js')
        ],
        backtrace: false,
        requireModule: [],
        dryRun: false,
        failFast: false,
        snippets: true,
        source: true,
        strict: true,
        tags: '',
        timeout: 60000,
        ignoreUndefinedDefinitions: false
    },
    services: [
        [
            'appium',
            {
                args: {
                    address: '127.0.0.1',
                    port: 4723,
                    relaxedSecurity: true
                },
                command: 'appium'
            }
        ]
    ],
    before: function () {
        console.log(`Running tests on: ${deviceInfo.model} (Android ${deviceInfo.version})`);
    },
    afterStep: async function (step, scenario, result) {
        if (result.error) {
            await browser.takeScreenshot();
        }
    },
    onComplete: function () {
        console.log('');
        console.log('====================================================');
        console.log(' Allure raw results saved to: ./allure-results');
        console.log(' Open dashboard with: npm run allure:serve');
        console.log(' Or: npm run allure:report');
        console.log('====================================================');
    }
};
