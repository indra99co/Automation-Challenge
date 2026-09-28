# Troubleshooting

Triage order: **device → Appium → locator → synchronisation → test logic.**

| Symptom | Likely cause | Fix |
|---|---|---|
| `Could not find a connected Android device` | No running emulator or device | Start the emulator, then check `adb devices` |
| `Neither ANDROID_HOME nor ANDROID_SDK_ROOT ... was exported` | SDK environment variables not set | Set `ANDROID_HOME`, then restart the terminal |
| `JAVA_HOME is not set` / Java version errors | JDK missing or older than 17 | Point `JAVA_HOME` at JDK 17+ |
| `ECONNREFUSED 127.0.0.1:4723` or port already in use | Appium not running, or another instance holds the port | Stop any stray `appium` process and re-run `npm test` |
| `Step "..." is not defined` for every step | Step files not loaded | Keep the explicit file list in `cucumberOpts.require` (see [01-architecture.md](01-architecture.md)) |
| `Step "..." is not defined` for one step | Step text does not match the expression | Align wording, quotes and parameter types |
| `Multiple step definitions match` | Ambiguous expressions | Make one expression more specific |
| `element ("~...") still not displayed after …ms` | Locator changed, or the screen is slow to load | Re-scan (`npm run scan`) or inspect with Appium Inspector; increase the timeout only if the element is genuinely slow |
| `Activity used to start app doesn't exist` | App not installed, or wrong activity | Install from the Play Store; resolve the activity with `adb shell cmd package resolve-activity --brief com.urbanindo.android` |
| First-run dialog or permission prompt covers the UI | Fresh install | Open the app once manually (`noReset: true` preserves state); `autoGrantPermissions` handles runtime permissions |
| Session creation is slow the first time | UiAutomator2 server APKs are being installed | Expected; `connectionRetryTimeout` is 180 s |

## Diagnostic tools

- **`screenshots/`**: captured automatically for every failed step.
- **`logs/`**: Appium server and WebdriverIO worker logs. Raise `logLevel` in `wdio.conf.js` (`info` / `debug`) for more detail.
- **`npm run scan`**: page source, screenshots and a locator table for the current screen and its scroll positions.
- **Appium Inspector**: interactive element inspection using the same capabilities as `wdio.conf.js`.
- **`await browser.debug()`**: pauses the run and opens a REPL inside the session (for example `await $('~Filter').isDisplayed()`).
- **Isolating a scenario**: tag it `@wip` and run `npm run test:tag -- "@wip"`.
