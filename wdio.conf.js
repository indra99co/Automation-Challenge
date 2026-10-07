const fs = require('node:fs');
const path = require('node:path');

const screenshotDirectory = path.join(__dirname, 'screenshots');

exports.config = {
  runner: 'local',
  specs: ['./features/**/*.feature'],
  maxInstances: 1,
  capabilities: [
    {
      platformName: 'Android',
      'appium:automationName': 'UiAutomator2',
      'appium:udid': process.env.ANDROID_UDID,
      'appium:appPackage': 'com.urbanindo.android',
      'appium:appActivity': 'app.nine_nine.MainActivity',
      'appium:noReset': false,
      'appium:autoGrantPermissions': true,
    },
  ],
  logLevel: 'warn',
  waitforTimeout: 20000,
  connectionRetryTimeout: 180000,
  connectionRetryCount: 2,
  services: [['appium', { logPath: './logs' }]],
  framework: 'cucumber',
  reporters: ['spec'],
  cucumberOpts: {
    require: ['./features/step-definitions/*.js'],
    timeout: 120000,
  },
  onPrepare() {
    fs.mkdirSync(screenshotDirectory, { recursive: true });
  },
  async afterStep(step, scenario, result) {
    if (!result.passed) {
      const fileName = `${scenario.name.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}.png`;
      await browser.saveScreenshot(path.join(screenshotDirectory, fileName));
    }
  },
};
