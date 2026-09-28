# Architecture and Design Decisions

## Execution flow

```
homepage.feature (Gherkin)
      │  Cucumber matches each step text against a Cucumber Expression
      ▼
homepage.steps.js (step definitions)        ── assertions via expect-webdriverio
      │  calls
      ▼
pageobjects/*.page.js (Page Object Model)   ── locators + screen-level actions
      │  WebdriverIO commands ($, click, execute('mobile: ...'))
      ▼
WebdriverIO 9 ── W3C WebDriver over HTTP ──► Appium 3 server (:4723)
                                                  │
                                                  ▼
                                    UiAutomator2 driver ──► Android device / emulator
```

`@wdio/appium-service` owns the Appium process lifecycle, so a single `npm test` is enough to run the suite.

## Layers

| Layer | Responsibility | Must not contain |
|---|---|---|
| Feature files | Business-readable behaviour, test data via data tables / `Examples` | Locators, technical detail |
| Step definitions | Glue between Gherkin and page objects; **all assertions live here** | Raw selectors |
| Page objects | Locators and user-level actions for one screen | Assertions, scenario logic |
| `BasePage` | Locator helpers, gestures, app lifecycle | Screen-specific locators |
| `wdio.conf.js` | Capabilities, timeouts, services, reporters, hooks | Test logic |

## Design decisions

**Appium 3 + UiAutomator2.** Latest major Appium release (requires Node 20+). Drivers are installed independently of the server; UiAutomator2 is the standard Android driver. Gestures use the driver's `mobile:` extensions (`swipeGesture`, `terminateApp`, `activateApp`) rather than the removed legacy TouchAction API.

**WebdriverIO 9.** Provides the runner, auto-waiting element API, `expect-webdriverio` matchers, the Appium service and first-party Cucumber integration from a single config file.

**CommonJS.** Required by the challenge. `package.json` has no `"type": "module"`, and all files use `require` / `module.exports`. The config is exported with `exports.config`.

**Page Object Model.**
- Each page object is exported as a singleton (`module.exports = new HomePage()`).
- Locators are **getters**, so elements are resolved lazily at call time, after the session exists, and re-queried on every access. This avoids stale references on Flutter re-renders.
- `BasePage` centralises the locator strategy, so switching a strategy later (for example to Flutter semantics identifiers) is a single-file change.

**Gherkin / Cucumber.**
- A `Background` asserts the homepage is loaded, and a `Before` hook relaunches the app. Every scenario is therefore independent and order-agnostic.
- `Scenario Outline` is used for data-driven cases (tabs, bottom sheets). Data tables are used for element lists.
- Tags (`@smoke`, `@navigation`, …) allow targeted runs.
- Cross-step state (for example the initial listing count) is kept in the Cucumber World (`this`). Those steps use `function` rather than arrow functions so that `this` is bound.
- `ignoreUndefinedDefinitions: false` makes any typo in a step fail fast.

**Synchronisation.** There are no fixed sleeps in assertions. Presence is handled by `waitForDisplayed` and auto-waiting matchers, and backend-driven values by `browser.waitUntil` (for example the listing count, which reads `0` while the feed is loading).

**Diagnostics.** The `afterStep` hook saves a screenshot to `screenshots/` for every failed step, and Appium server logs are written to `logs/`.

## Notable implementation details

| Problem | Resolution |
|---|---|
| The app is Flutter: no `resource-id`s, and visible text is exposed via `content-desc` | Accessibility id (`~`) is the primary strategy, with UiSelector `description*` for partial or dynamic text. See [03-locator-strategy.md](03-locator-strategy.md) |
| The search bar's semantics node spans `[0,128][1080,2190]`, so `click()` lands on a listing card | `HomePage.tapSearchBar()` taps relative to the Filter button (same row, to its left) |
| Listing count shows `0 Iklan Properti` during load | `HomePage.waitForListingCount()` polls until the count is greater than 0 |
| On Windows, a step-definition glob resolves to nothing when the path contains spaces (`@wdio/cucumber-framework` converts it to a `file://` URL before globbing) | `wdio.conf.js` lists step-definition files explicitly via `fs.readdirSync` |
| Bottom-nav tabs expose a two-line content-desc (`Cari\nTab 1 of 5`) | Tabs are located by their stable positional suffix (`Tab n of 5`), and selection is verified via the `selected` attribute |
