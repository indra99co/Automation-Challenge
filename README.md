# Automation-Challenge


Welcome to Rumah123 Automation Mobile Challenge, please follow below instruction for this chanllenge

## Requirement:
- use newest Appium Version
- use WebdriverIO as framework
- use CommonJS as a code
- use Page Object Model for code structure
- use Gherkin as Test Cases

## Test Cases:
- You are as an QA at 99, please download latest version of 99 (do not download the Pro Apps). You have the project to testing the revamp part on homepage, please scan all the locators and make it into the automation. so you can reduce testing time and also catch the bugs very sooner.
- How to access the homepage
1. please open the app
2. once it's open you will see the homepage


Rule:
- Please forking this repository
- Invite indra99co as collaborator
- once you done, please push into your branch and create the PR

---

## Solution - Jessica Eileen

### Tech stack
- Appium 3.8.0 + UiAutomator2 driver 8.7.0
- WebdriverIO v10 (local runner, Appium service, spec reporter)
- Cucumber (Gherkin) for test cases
- CommonJS + Page Object Model

### App under test
- 99 (Rumah123 / 99.co Indonesia) version **6.18.0**
- Package: `com.urbanindo.android`
- Activity: `app.nine_nine.MainActivity`
- Tested on a real device: OPPO CPH2239, Android 11

### Project structure
```
features/
├── homepage.feature              # test cases (Gherkin)
├── pageobjects/
│   ├── base.page.js              # shared helpers (locators, wait, tap, swipe)
│   ├── home.page.js              # homepage locators + actions
│   ├── search.page.js            # search location page
│   ├── filter.page.js            # filter page
│   ├── sort.page.js              # "Urutkan" bottom sheet
│   ├── price-range.page.js       # "Kisaran Harga" bottom sheet
│   └── property-detail.page.js   # listing detail page
└── step-definitions/
    ├── hooks.js                  # restart the app before every scenario
    └── homepage.steps.js
wdio.conf.js
```

### About the locators
The 99 app is built with Flutter, so most elements don't have a `resource-id`.
I scanned the homepage with `uiautomator dump` / Appium page source and used the accessibility label (`content-desc`) as the locator:
- `~Filter`, `~Diutamakan`, `~Kisaran Harga`, `~Properti Baru`, `~Aset Bank`, ...
- `UiSelector().descriptionContains(...)` for labels with dynamic text, e.g. the result count `"1.325.120 Iklan Properti | 1 dari 500 Halaman"` and listing cards (`"Diperbarui pada ..."`)
- `UiScrollable` to reach elements outside the screen (`Luas Bangunan` chip, `Pilihan Properti Baru` section)

### What is covered on the homepage
| Area | Scenario |
|---|---|
| Header | search bar, filter button |
| Quick filter chips | Diutamakan (sort), Kisaran Harga, Luas Tanah, Luas Bangunan (horizontal scroll) |
| Listing header | page title, result count, Properti Baru, Aset Bank |
| Listing feed | listing card, phone & WhatsApp buttons, Pilihan Properti Baru section |
| Bottom navigation | 5 tabs, "Cari" tab selected |
| Navigation from homepage | search suggestions, filter page, sort options, price range sheet, listing detail + back |

### How to run
Requirements: Node.js 18+, Java 17, Android platform-tools (`adb`), `ANDROID_HOME` and `JAVA_HOME` set, an Android device with USB debugging on and the 99 app installed.

```bash
npm install
npx appium driver install uiautomator2   # skip if already installed

adb devices                # make sure the device is listed

npm test                   # run all scenarios
npm run test:smoke         # only @smoke scenarios
npm run test:no-bug        # skip scenarios tagged @bug
```

Optional env variables: `DEVICE_UDID`, `APP_PACKAGE`, `APP_ACTIVITY`.

Screenshot + page source of every failed step are saved to `reports/failures/`.

### Result
61 steps, 60 passed and 1 failed (about 2.5 minutes on my device).

### Bug found
**"Aset Bank" quick filter shows no listing** (`@bug` scenario)
- Steps: open the app → tap "Aset Bank" on the homepage
- Expected: list of bank asset properties is shown
- Actual: "0 Iklan Properti | 1 dari 0 Halaman" and the empty state "Properti yang Kamu Cari Belum Tersedia". The empty state text also says "Rumah Dijual", not bank asset.

### Notes / problems I ran into
- On some devices (OPPO / ColorOS) Appium can't change hidden API settings, so `appium:ignoreHiddenApiPolicyError` is turned on.
- The search bar node (`Lokasi, area, project`) wraps the whole page in the accessibility tree, so clicking it taps the middle of the screen (a listing card). The test taps the real search box position instead.
- On Windows, WebdriverIO converts the step definition glob into a file URL, so a path with a space breaks it. The step files are listed in `wdio.conf.js` instead of using a glob.
