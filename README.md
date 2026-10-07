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

## Implementation

Android UI automation for the revamped homepage of the regular 99 app, **99.co Indonesia** (`com.urbanindo.android`, published on Google Play by 99 Group Indonesia). Scenarios are written in Gherkin, executed by the WebdriverIO Cucumber framework against Appium with the UiAutomator2 driver, and organised with the Page Object Model in CommonJS.

## Tech Stack

| Component | Version |
| --- | --- |
| Appium | 3.8.0 |
| Appium UiAutomator2 driver | 8.7.0 |
| WebdriverIO (`@wdio/cli`, `@wdio/local-runner`, `@wdio/cucumber-framework`, `@wdio/appium-service`, `@wdio/spec-reporter`) | 9.32.0 |
| `@wdio/globals` | 9.31.3 |
| Cucumber (bundled with `@wdio/cucumber-framework`) | 10.9.0 |
| Node.js | 20.19+, 22.12+ or 24+ |

Appium and the UiAutomator2 driver are project dependencies, so `npm install` provides the complete toolchain and no global Appium installation is needed. WebdriverIO 10.0.0 was released on 5 October 2026 and requires Node.js 22.19+, so the suite uses the latest 9.x release, which supports every Node.js version that Appium 3 supports.

Verified on a Pixel 9 Pro emulator (Android 16, API 36, Google Play image) with 99.co Indonesia 6.18.0 and Node.js 22.16.0.

## Project Structure

```
.
├── features
│   ├── homepage.feature
│   ├── pageobjects
│   │   ├── homepage.page.js
│   │   ├── filter.page.js
│   │   ├── location-search.page.js
│   │   ├── listing-detail.page.js
│   │   ├── new-property.page.js
│   │   └── login-prompt.page.js
│   └── step-definitions
│       ├── homepage.steps.js
│       └── navigation.steps.js
├── package.json
└── wdio.conf.js
```

| Page object | Screen |
| --- | --- |
| `HomePage` | Homepage: search bar, Filter button, quick filters, shortcuts, listing feed, pagination and bottom navigation |
| `FilterPage` | Filter screen and the quick filter bottom sheets (sort, price, land area, building area) |
| `LocationSearchPage` | Location search opened from the search bar |
| `ListingDetailPage` | Listing detail opened from a listing card |
| `NewPropertyPage` | Hunian Baru tab |
| `LoginPromptPage` | Guest login prompt shown by Iklan Saya, Buat Iklan and Akun Saya |

## Prerequisites

- Node.js 20.19+, 22.12+ or 24+ with npm 10+
- A JDK with `JAVA_HOME` set (the JDK bundled with Android Studio works)
- Android SDK platform-tools with `ANDROID_HOME` set
- An Android device or emulator (Android 7.0 / API 24 or newer) with **99.co Indonesia** installed from Google Play, not the Rumah123 Pro agent app

## Android Setup

1. Export the SDK and Java locations (macOS example):

   ```bash
   export ANDROID_HOME="$HOME/Library/Android/sdk"
   export JAVA_HOME="/Applications/Android Studio.app/Contents/jbr/Contents/Home"
   ```

2. Connect a device with USB debugging enabled, or start an emulator with hardware rendering:

   ```bash
   "$ANDROID_HOME/emulator/emulator" -avd <avd_name> -gpu host
   ```

   The app is built with Flutter. With software rendering (the emulator's `auto` GPU mode selected `lavapipe` on the test machine), app start-up took 20–30 s and every swipe 15–20 s, which is too slow for the configured timeouts.

3. Install **99.co Indonesia** from Google Play on the device.
4. Confirm the device is listed by `adb devices`.
5. Optionally check the driver setup with `npx appium driver doctor uiautomator2`.

## Installation

```bash
npm install
```

## Running the Tests

```bash
npm test
```

`npm run test:android` runs the same suite. `@wdio/appium-service` starts and stops the Appium server automatically. When more than one device is connected, select one by its `adb devices` serial:

```bash
ANDROID_UDID=emulator-5554 npm test
```

- `appium:noReset: false` clears the app data when the session starts, so every run begins from a first-launch state.
- `appium:autoGrantPermissions: true` re-grants the app's runtime permissions (notifications) after that reset, so no system permission dialog can cover the homepage.
- Every scenario relaunches the app and waits for the listings to load, so it always starts on the default homepage.
- A failed step saves a screenshot to `screenshots/`, and the Appium server log is written to `logs/`.

## Test Coverage

`features/homepage.feature` contains 16 scenarios (57 steps):

| Scenario | Verifies |
| --- | --- |
| Homepage is displayed after launching the application | Search bar, `Properti Dijual di Indonesia` heading, `Cari` tab selected, listing summary on page 1 with a non-zero count |
| Primary homepage controls are available | Search bar, Filter button, quick filters (Diutamakan, Kisaran Harga, Luas Tanah, Luas Bangunan), shortcuts (Properti Baru, Aset Bank) and the five bottom navigation tabs |
| Searching for a location updates the listings | Searching `Jakarta Selatan` updates the heading to `Properti Dijual di Jakarta Selatan` and the search bar to `Jakarta Selatan, Jakarta` |
| Filtering the listings to properties for rent | Filter → `Disewa` updates the heading to `Properti Disewa di Indonesia` and shows the rent-only `Kamar Tidur` quick filter |
| Sorting the listings by the lowest price | `Harga Terendah` replaces `Diutamakan` and the first two listings are in ascending price order |
| Filtering the listings by a price range | The `350 - 600 Jt` preset activates `350 Jt - 600 Jt` and the first listing is priced within that range |
| Filtering the listings by Luas Tanah / Luas Bangunan | The `100 m²` and `70 m²` presets activate `Maks. LT 100 m²` and `Maks. LB 70 m²` |
| The new property shortcut shows only new property projects | `Properti Baru` replaces the regular listings with new development project cards |
| Opening a listing from the homepage | The detail page shows the same price as the selected listing card |
| Scrolling the homepage reveals the new property recommendations | The `Pilihan Properti Baru` section appears while scrolling the feed |
| Moving to the next page of listings | `Next` at the end of the feed loads page 2 |
| Opening the new property tab from the homepage | The `Hunian Baru` tab becomes selected and shows its project search |
| Guest users are asked to log in when opening Iklan Saya, Buat Iklan and Akun Saya | Each tab shows the `Login / Daftar` prompt |

## Locator Strategy

All locators come from the live UiAutomator2 page source of 99.co Indonesia 6.18.0. The app is built with Flutter and exposes no resource-ids, so the selectors follow this order:

1. **Accessibility id** (content-desc) by default: `~Filter`, `~Properti Baru`, `~Aset Bank`, `~Pilihan Properti Baru`, `~Next`, `~Login / Daftar`, and the bottom tabs, whose labels include their position (`Cari\nTab 1 of 5`).
2. **Android UiAutomator** where a label is dynamic or has to be scoped:
   - quick filter chips are matched only inside the chip bar (`HorizontalScrollView` → `childSelector`), so a bottom-sheet option or title with the same label is never matched;
   - `descriptionMatches` / `descriptionStartsWith` for the listing heading, the listing summary (`1.326.008 Iklan Properti | 1 dari 500 Halaman`), listing cards, project cards and `Terapkan (<count>)`.
3. **Class name** only for single unlabelled widgets: the location `EditText`, the feed `ScrollView` and the chip bar `HorizontalScrollView`.

No XPath and no fixed coordinates are used.

## Known Limitations

- The search bar has no accessibility node of its own. Its label is merged into the container that wraps the whole result list (the node spans most of the screen), so a plain element click lands on the first listing card. `HomePage.openLocationSearch()` therefore taps the search row at a point calculated from the live bounds of that container and the Filter button.
- Listing data is live, so assertions compare what is on screen (ascending order, price within the selected range, matching detail price) instead of fixed values.
- The highlighted state of the shortcuts and of the Filter screen options is not exposed to accessibility services, so those scenarios assert the resulting listings rather than the highlight.
- On 7 October 2026 the `Aset Bank` shortcut returned 0 listings for the whole of Indonesia (`Properti yang Kamu Cari Belum Tersedia`), so it is covered for availability only.
