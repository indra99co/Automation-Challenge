exports.config = {
    runner: 'local',
    port: 4723,

    specs: [
        './features/**/*.feature'
    ],
    exclude: [],

    maxInstances: 1,

    capabilities: [{
        platformName: 'Android',
        'appium:deviceName': 'Pixel 7',
        'appium:platformVersion': '17.0',
        'appium:automationName': 'UiAutomator2',
        'appium:appPackage': 'com.urbanindo.android',
        'appium:appActivity': 'app.nine_nine.MainActivity',
        'appium:noReset': true
    }],

    logLevel: 'info',
    bail: 0,
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,

    services: ['appium'],

    framework: 'cucumber',

    reporters: ['spec'],

    cucumberOpts: {
        require: ['./features/step-definitions/steps.js'],
        backtrace: false,
        requireModule: [],
        dryRun: false,
        failFast: false,
        name: [],
        snippets: true,
        source: true,
        strict: false,
        tagExpression: '',
        timeout: 60000,
        ignoreUndefinedDefinitions: false
    }
}