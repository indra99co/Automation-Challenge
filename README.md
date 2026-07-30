npm test                
npm run allure:serve

Total test case yang dibuat: 8 scenario

| 1 | Verify homepage core elements are displayed | `@Smoke` | Smoke / UI check | Memastikan elemen inti homepage tampil |
| 2 | Verify homepage discovery chips are displayed | `@Smoke` `@UI` | Smoke / UI | Memastikan chip discovery (lokasi / lanjutkan pencarian) tampil |
| 3 | Verify property recommendation cards details | `@UI` | UI | Memastikan kartu properti punya title, harga, lokasi |
| 4 | Search for a property from homepage | `@Functional` | Functional | Menguji alur search dari homepage |
| 5 | Navigate using bottom navigation tabs | `@Functional` | Functional | Menguji pindah tab Beranda / Cari / Disimpan / Profil |
| 6 | Swipe property recommendation cards | `@Functional` `@UI` | Functional / UI | Menguji gesture swipe carousel kartu |
| 7 | Verify recommendation features section | `@UI` | UI | Menguji section Fitur Rekomendasi + Simulasi KPR |
| 8 | Search with invalid keyword | `@Negative` | Negative | Memastikan keyword tidak valid tidak membuat app crash |

Sebelum tiap scenario di atas, Cucumber selalu menjalankan:

1. 'Given I have installed the Rumah123 Consumer App' — memastikan app Consumer 'com.rumah123' terpasang
2. 'When I open the application' — membuka/mengaktifkan aplikasi
3. 'Then I should see the homepage' — memastikan user sudah berada di homepage

Ini membuat setiap TC punya prekondisi yang sama: app siap dan homepage terlihat.