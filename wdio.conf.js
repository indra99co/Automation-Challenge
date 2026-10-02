
exports.config = {
    runner: "local",

    specs: ["./features/**/*.feature"],

    maxInstances: 1,

    capabilities: [{
        platformName: "Android",
        "appium:automationName": "UiAutomator2",
        "appium:deviceName": "RRCY306TX5V",
        "appium:udid": "RRCY306TX5V",
        "appium:appPackage": "com.urbanindo.android",
        "appium:appActivity": "app.nine_nine.MainActivity",
        "appium:noReset": true
    }],

    hostname: "127.0.0.1",
    port: 4723,
    path: "/",

    framework: "cucumber",

    cucumberOpts: {
        require: ["./step-definitions/**/*.js"],
        timeout: 60000
    },

    reporters: ["spec"],
    logLevel: "info"
};