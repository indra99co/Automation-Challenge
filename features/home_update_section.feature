Feature: Beranda Rumah123 - Section Pembaruan (Update Section)
  Sebagai pengguna aplikasi Rumah123
  Saya ingin melihat section pembaruan di halaman beranda
  Agar saya mendapatkan informasi properti dan promo terbaru

  Background:
    Given Saya membuka aplikasi Rumah123
    And Saya berada di halaman beranda

  Scenario: Verifikasi kemunculan dan interaksi di section pembaruan beranda
    Then Saya melihat section pembaruan di halaman beranda
    When Saya menggeser ke section pembaruan
    Then Semua kartu pembaruan/promo ditampilkan dengan benar
    When Saya menekan salah satu kartu di section pembaruan
    Then Saya berhasil diarahkan ke halaman detail pembaruan