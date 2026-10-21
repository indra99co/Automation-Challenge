
### Catatan App

App yang digunakan untuk pengujian ini adalah **99.co Indonesia** (package: `com.urbanindo.android`),
karena versi ini yang tersedia di Play Store region akun yang digunakan saat pengerjaan.

### Cara Install & Menjalankan

```bash
# 1. Install dependencies
npm install

# 2. Install Appium driver untuk Android
npx appium driver install uiautomator2

# 3. Jalankan test (Appium server otomatis dijalankan oleh @wdio/appium-service)
npm test
```

Pastikan emulator Android (atau device fisik) sudah menyala dan app 99.co Indonesia
sudah ter-install sebelum menjalankan `npm test`.

### Hasil Pengujian

Semua skenario di `test/features/homepage.feature` berhasil dijalankan dan **lulus (28/28 passing)**,
mencakup:
- Homepage berhasil dimuat setelah app dibuka
- Search bar tampil
- Tombol filter tampil dan bisa ditekan
- Listing card properti tampil
- Kelima tab bottom navigation (Cari, Hunian Baru, Iklan Saya, Buat Iklan, Akun Saya) tampil dan bisa ditekan

