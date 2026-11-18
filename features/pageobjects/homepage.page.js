// features/pageobjects/homepage.page.js

const Page = require('./page'); // Mengimpor base page bawaan WDIO (jika ada)

// features/pageobjects/homepage.page.js

class HomePage {
    // Definisi Locator menggunakan accessibility id (paling stabil)
    get filterButton() {
        return $('~Filter');
    }

    get headerTitle() {
        return $('~Properti Dijual di Indonesia | Harga Terbaru 2026');
    }

    get contactNumber() {
        return $('~+62811xxxxx');
    }

    get whatsappButton() {
        return $('~WhatsApp');
    }

    get pilihanPropertiBaru() {
        return $('~Pilihan Properti Baru');
    }

    // Fungsi untuk memvalidasi kemunculan seluruh elemen revamp di homepage
    async verifyHomepageRevampElements() {
        // Tunggu salah satu elemen utama muncul untuk memastikan halaman sudah termuat
        await this.headerTitle.waitForDisplayed({ timeout: 15000 });

        // Lakukan pengecekan tampil (displayed) untuk semua elemen yang dipindai
        await expect(this.filterButton).toBeDisplayed();
        await expect(this.headerTitle).toBeDisplayed();
        await expect(this.contactNumber).toBeDisplayed();
        await expect(this.whatsappButton).toBeDisplayed();
        await expect(this.pilihanPropertiBaru).toBeDisplayed();
    }
}

module.exports = new HomePage();