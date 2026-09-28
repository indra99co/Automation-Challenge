# Setup and Execution

## Prerequisites

| Component | Version used | Check |
|---|---|---|
| Node.js | 20+ (tested on 24.16) | `node -v` |
| JDK | 17+ (tested on 21, Android Studio JBR) | `echo %JAVA_HOME%` |
| Android SDK | platform-tools, emulator | `adb version`, `echo %ANDROID_HOME%` |
| Appium | 3.x (tested on 3.8.0), global | `appium -v` |
| UiAutomator2 driver | 8.x (tested on 8.7.0) | `appium driver list --installed` |

```bash
npm install -g appium
appium driver install uiautomator2
appium driver doctor uiautomator2     # expect "0 required fixes needed"
npm install
```

`JAVA_HOME` and `ANDROID_HOME` (or `ANDROID_SDK_ROOT`) must be set, and `platform-tools` must be on `PATH`.

## Device and app

1. Start an emulator with a **Google Play** system image, or connect a physical device with USB debugging enabled.
   ```bash
   emulator -list-avds
   emulator -avd <avd_name>
   adb devices          # state must be "device"
   ```
2. Install **99.co Indonesia** (`com.urbanindo.android`) from the Play Store, then open it once manually to dismiss any first-run dialogs.
   With `noReset: true`, the app state is preserved between sessions.
3. Alternative: place an APK at `apps/99co.apk` (or set `APP_FILE`), and Appium will install it at session start.

## Running

| Command | Description |
|---|---|
| `npm test` | Full suite |
| `npm run test:smoke` | `@smoke` scenarios |
| `npm run test:tag -- "<expr>"` | Tag expression, e.g. `"@filter or @sort"`, `"not @scroll"` |
| `npm run scan` | Locator scan (requires Appium to be running separately: `appium`) |
| `npm run doctor` | `appium driver doctor uiautomator2` |

Environment variables:

| Variable | Purpose | Default |
|---|---|---|
| `UDID` | Target a specific device when several are connected | first available |
| `DEVICE_NAME` | `appium:deviceName` | `Android Emulator` |
| `APP_FILE` | APK file name under `apps/` | `99co.apk` (optional) |

## Key configuration (`wdio.conf.js`)

| Setting | Value | Rationale |
|---|---|---|
| `appium:automationName` | `UiAutomator2` | Android driver |
| `appium:appPackage` / `appActivity` | `com.urbanindo.android` / `app.nine_nine.MainActivity` | Resolved with `adb shell cmd package resolve-activity --brief com.urbanindo.android` |
| `appium:noReset` | `true` | Keeps app data, so onboarding is not repeated |
| `appium:autoGrantPermissions` | `true` | Prevents runtime-permission dialogs from blocking the UI |
| `waitforTimeout` | 15 s | Default explicit wait |
| `cucumberOpts.timeout` | 90 s | Per-step ceiling |
| `connectionRetryTimeout` | 180 s | The first session installs the UiAutomator2 server APKs |
| `maxInstances` | 1 | Single device |

## Output

- **Console:** the spec reporter prints per-step results (`✓` passed, `✖` failed, `-` skipped) and a summary (`76 passing`, `Spec Files: 1 passed`).
- **`screenshots/`:** a screenshot for every failed step (`afterStep` hook).
- **`logs/`:** Appium server log (`wdio-appium.log`) and WebdriverIO worker logs.

Exit code `0` means every scenario passed. Any other value means at least one failure, so the command can be used as a CI gate.
