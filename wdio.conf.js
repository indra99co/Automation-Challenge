// wdio.conf.js
// Konfigurasi WebdriverIO untuk mobile automation testing (99.co app)
// Framework: Cucumber (Gherkin) | Driver: Appium UiAutomator2 (Android)

exports.config = {
  runner: 'local',

  // Lokasi file .feature yang akan dijalankan
  specs: ['./test/features/**/*.feature'],
  exclude: [],

  maxInstances: 1,

  capabilities: [
    {
      platformName: 'Android',
      'appium:deviceName': 'Pixel_7', // nama emulator yang sudah dibuat di Android Studio
      'appium:automationName': 'UiAutomator2',
      // App 99.co Indonesia sudah ter-install di emulator lewat Play Store,
      // jadi kita tidak perlu path APK - cukup appPackage + appActivity + noReset: true
      // supaya Appium cuma "membuka" app yang sudah ada, bukan install ulang.
      'appium:appPackage': 'com.urbanindo.android',
      'appium:appActivity': 'app.nine_nine.MainActivity',
      'appium:noReset': true,
      'appium:newCommandTimeout': 240,
    },
  ],

  logLevel: 'info',
  bail: 0,
  baseUrl: '',
  waitforTimeout: 15000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,

  services: [
    [
      'appium',
      {
        // args untuk appium server, kosongkan jika appium dijalankan manual
      },
    ],
  ],

  framework: 'cucumber',

  reporters: ['spec'],

  cucumberOpts: {
    require: ['./test/step-definitions/**/*.js'],
    backtrace: false,
    requireModule: [],
    dryRun: false,
    failFast: false,
    snippets: true,
    source: true,
    strict: false,
    tagExpression: '',
    timeout: 60000,
    ignoreUndefinedDefinitions: false,
  },
};
