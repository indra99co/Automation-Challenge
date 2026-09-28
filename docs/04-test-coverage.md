# Test Coverage and Findings

## Scenarios (`features/homepage.feature`)

| # | Scenario | Tags | Verification |
|---|---|---|---|
| 1 | All main homepage elements are displayed | `@smoke` | Search bar, Filter, 3 chips, title prefix, listing count > 0, 2 shortcuts, listing card, 5 tabs, "Cari" selected |
| 2 | Listing card shows price and instalment information | `@smoke @listing` | First card matches `Rp <amount>` and contains "Cicilan Mulai" |
| 3 | Homepage can be scrolled to load more listings | `@listing @scroll` | After 2 swipes, cards are still rendered and the "Cari" tab is still selected |
| 4 | Tapping the search bar opens the search screen | `@search` | EditText and "Cari" button displayed |
| 5 | Searching for a location shows related suggestions | `@search` | "Jakarta Selatan" returns the "Lokasi Terkait" section and a matching suggestion |
| 6 | Filter button opens the filter screen | `@filter` | Listing type, property type, price range, Reset, Terapkan |
| 7 | "Diutamakan" chip opens the sort options | `@sort` | "Urutkan" sheet with 4 sort options |
| 8–9 | Price range / land area chips open a bottom sheet | `@filter` (outline) | Sheet title, a preset, Reset, Terapkan |
| 10 | "Properti Baru" shortcut filters the listings | `@shortcut` | Listing count after the tap is lower than before |
| 11–14 | Bottom-nav tab can be opened | `@navigation` (outline) | Hunian Baru, Iklan Saya, Akun Saya, Cari become `selected="true"` |
| 15 | "Hunian Baru" tab shows featured new properties | `@navigation` | "Properti Pilihan 99.co" displayed |
| 16–18 | Account tabs ask a guest user to log in | `@navigation @login` (outline) | Login message and "Login / Daftar" button on Iklan Saya, Buat Iklan, Akun Saya |

Totals: **18 scenarios, 76 steps**, about 1m40s on a local emulator.

"Buat Iklan" is covered only by the login scenario: it opens as a full-screen route without the bottom navigation, so there is no tab to assert as selected.

## Out of scope / next steps

- Property detail page and interactions on listing cards (share, WhatsApp, agent contact)
- Applying filters and sort orders, then asserting on the resulting feed (order, price bounds)
- Authenticated flows (would require a dedicated test account)
- iOS (XCUITest driver) via a second capability set
- CI execution (for example GitHub Actions with an Android emulator runner) and an HTML report (Allure)
- Visual regression of the revamped layout

## Findings raised during automation

| # | Area | Observation | Impact |
|---|---|---|---|
| 1 | Accessibility | The search bar's semantics node spans almost the entire screen (`[0,128][1080,2190]`) instead of the input's bounds | Screen-reader focus and automation taps land on the wrong target. Recommend a dedicated `Semantics` node, ideally with a stable identifier |
| 2 | Testability | No stable identifiers are exposed: locators rely on Indonesian UI copy | Copy changes or localisation will break locators. Recommend Flutter `Semantics(identifier: ...)` (surfaced as `resource-id` on Android) for key widgets |
| 3 | Loading state | The listing header renders `0 Iklan Properti` before data arrives | Harmless to users, but the placeholder can be mistaken for "no results". Tests poll for a non-zero count |
