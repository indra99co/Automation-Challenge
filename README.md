# 99.co Indonesia – Homepage Mobile Automation

End-to-end UI automation for the revamped homepage of the **99.co Indonesia** Android app, built for the
[99 Group Automation Mobile Challenge](https://github.com/indra99co/Automation-Challenge).

| Requirement | Implementation |
|---|---|
| Newest Appium version | Appium **3.8.0** with the **UiAutomator2 8.7.0** driver |
| WebdriverIO as framework | WebdriverIO **9** (`@wdio/cli`, `local-runner`, `appium-service`, `cucumber-framework`, `spec-reporter`) |
| CommonJS | `require` / `module.exports` throughout; no `"type": "module"` in `package.json` |
| Page Object Model | `features/pageobjects/`: a `BasePage` plus one page object per screen/component |
| Gherkin test cases | `features/homepage.feature`: 18 scenarios / 76 steps executed by Cucumber |

**App under test:** 99.co Indonesia (Play Store, not the Pro app) · package `com.urbanindo.android` · activity `app.nine_nine.MainActivity` · verified on v6.18.0

## Quick start

```bash
# one-time setup
npm install -g appium
appium driver install uiautomator2
npm install

# run
adb devices                          # emulator/device must be in "device" state
npm test                             # full suite
npm run test:smoke                   # @smoke only
npm run test:tag -- "@navigation"    # any tag expression
```

`@wdio/appium-service` starts and stops Appium automatically. See [docs/02-setup-and-execution.md](docs/02-setup-and-execution.md) for prerequisites and options.

**Latest run:** 18 scenarios, 76 steps passed in ~1m40s on an Android 15 emulator (Pixel 6, Google Play image).

## Project structure

```
├── wdio.conf.js                     # WebdriverIO + Appium service + Cucumber configuration
├── features/
│   ├── homepage.feature             # Gherkin scenarios
│   ├── step-definitions/
│   │   ├── hooks.js                 # Before hook: relaunch app for scenario isolation
│   │   └── homepage.steps.js        # Given/When/Then -> page object calls + assertions
│   └── pageobjects/
│       ├── base.page.js             # locator helpers, gestures, app lifecycle
│       ├── home.page.js             # homepage: search, filter, chips, listings, bottom nav
│       ├── search.page.js
│       ├── filter.page.js
│       ├── bottom-sheet.page.js     # sort / price range / land area sheets
│       └── login-prompt.page.js
├── scripts/scan-locators.js         # `npm run scan`: dumps all homepage locators
├── apps/                            # optional .apk (otherwise the installed app is used)
└── docs/
```

## Test coverage

| Tag | Scenarios |
|---|---|
| `@smoke` | All primary homepage elements are rendered; listing card shows price and instalment |
| `@listing` `@scroll` | Listing feed renders and scrolls |
| `@search` | Search bar opens the search screen; typing a location returns related suggestions |
| `@filter` `@sort` | Filter screen; sort, price range and land area bottom sheets |
| `@shortcut` | "Properti Baru" shortcut filters the feed (listing count decreases) |
| `@navigation` `@login` | All bottom-navigation tabs; guest users get a login prompt on account tabs |

Full breakdown, out-of-scope items and findings: [docs/04-test-coverage.md](docs/04-test-coverage.md).

## Documentation

1. [Architecture and design decisions](docs/01-architecture.md)
2. [Setup and execution](docs/02-setup-and-execution.md)
3. [Locator strategy and locator inventory](docs/03-locator-strategy.md)
4. [Test coverage and findings](docs/04-test-coverage.md)
5. [Troubleshooting](docs/05-troubleshooting.md)
