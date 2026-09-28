# Locator Strategy and Inventory

App: 99.co Indonesia v6.18.0 (`com.urbanindo.android`). Locators were collected with `npm run scan` on an Android 15 emulator.

## Strategy

The app is built with **Flutter**. Widgets are rendered as generic `android.view.View` / `ImageView` nodes with no `resource-id`, and visible labels are exposed through **`content-desc`** (Flutter semantics). Locator priority:

| Priority | Strategy | Example | When |
|---|---|---|---|
| 1 | Accessibility id | `$('~Filter')` | Stable, exact label |
| 2 | UiSelector (`android=`) | `descriptionStartsWith("Terapkan")`, `descriptionContains("Tab 1 of 5")` | Label with a dynamic part, or a multi-line description |
| 3 | Class name | `className("android.widget.EditText")` | Native input with no description |
| 4 | Relative coordinates | `HomePage.tapSearchBar()` | Only where the semantics node does not match the visual bounds |
| avoid | XPath | — | Slow on UiAutomator2 and brittle against layout changes |

All strategies are wrapped in `BasePage` (`byDesc`, `byDescStartsWith`, `byDescContains`, `byClass`). Page objects never build raw selectors themselves.

## Homepage ("Cari" tab)

| Element | Locator | Page object member |
|---|---|---|
| Search bar | `~Lokasi, area, project` (see note) | `searchBar`, `tapSearchBar()` |
| Filter button | `~Filter` | `filterButton` |
| Sort chip | `~Diutamakan` | `sortChip` |
| Price range chip | `~Kisaran Harga` | `priceRangeChip` |
| Land area chip | `~Luas Tanah` | `landAreaChip` |
| Page title | `descriptionStartsWith("Properti Dijual di Indonesia")` | `pageTitle` |
| Listing count | `descriptionContains("Iklan Properti")`, e.g. `1.335.766 Iklan Properti \| 1 dari 500 Halaman` | `listingCount`, `getListingCount()` |
| "Properti Baru" shortcut | `~Properti Baru` | `newPropertyShortcut` |
| "Aset Bank" shortcut | `~Aset Bank` | `bankAssetShortcut` |
| Listing card | `descriptionContains("Cicilan Mulai")` | `firstListingCard`, `listingCards` |
| Card property-type badge | `~Rumah`, `~Ruko`, `~Komersial` | — |
| Card WhatsApp button | `~WhatsApp` | — |
| "New properties" section | `~Pilihan Properti Baru` (below the fold) | — |
| Tabs 1–5 | `descriptionContains("Tab n of 5")`; content-desc is e.g. `Cari\nTab 1 of 5`; the active tab has `selected="true"` | `tab(name)` |

**Search bar note:** the `Lokasi, area, project` semantics node has bounds `[0,128][1080,2190]`, which covers the whole scroll area. A plain `click()` taps its centre, which is a listing card, and opens a property detail page. `tapSearchBar()` therefore taps to the left of the Filter button, on the same row. This is worth reporting as an accessibility defect: the search field should have its own `Semantics` node.

## Search screen

| Element | Locator |
|---|---|
| Input | `className("android.widget.EditText")` |
| Search button | `~Cari` |
| Suggestions header | `~Lokasi Terkait` |
| Suggestion rows | `descriptionStartsWith("<keyword>")` |

## Filter screen

`~Tipe Iklan`, `~Dijual`, `~Disewa`, `~Tipe Properti`, `~Rumah`, `~Apartment`, `~Ruko`, `~Tanah`, `~Kost`, `~Kios`, `~Lihat Semua Tipe Properti`,
`~Kisaran Harga`, presets `~100 - 350 Jt` … `~> 1M`, `~Reset`, `descriptionStartsWith("Terapkan")` (the label includes the live result count, e.g. `Terapkan (1335849)`).

## Bottom sheets (from homepage chips)

| Chip | Sheet title | Content |
|---|---|---|
| Diutamakan | `~Urutkan` | Diutamakan, Terbaru, Harga Terendah/Tertinggi, Luas Tanah Terkecil/Terbesar, Luas Bangunan Terkecil/Terbesar, Harga Per Meter Terendah/Tertinggi |
| Kisaran Harga | `~Kisaran Harga` | Price presets, `~Reset`, `Terapkan (n)` |
| Luas Tanah | `~Luas Tanah` | `46 m²` … `120 m²`, `~Reset`, `Terapkan (n)` |

## Other tabs

| Tab | Key elements |
|---|---|
| Hunian Baru | Project banner, `~Properti Pilihan 99.co`, `~Cari Lokasi, area, atau Nama Proyek` |
| Iklan Saya / Buat Iklan / Akun Saya (guest) | `descriptionContains("silahkan Login")`, `~Login / Daftar` |

## Re-scanning after an app update

```bash
appium                  # terminal 1
npm run scan            # terminal 2; SCROLLS=<n> to scan deeper
```

The scan writes page-source XML and screenshots per scroll position, plus `locator-scan/locators.md` and `locators.json`. Diff these against this inventory and update the affected page object.
