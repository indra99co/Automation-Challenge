const BasePage = require('./base.page');

const byDesc = (t) => $(`android=new UiSelector().descriptionContains("${t}")`);
const byStart = (t) => $(`android=new UiSelector().descriptionStartsWith("${t}")`);

class HomePage extends BasePage {
  // Search & filter
  get searchBar()    { return $('~Lokasi, area, project'); }
  get filterButton() { return $('~Filter'); }

  // Filter chips
  get chipDiutamakan()   { return $('~Diutamakan'); }
  get chipKisaranHarga() { return $('~Kisaran Harga'); }
  get chipLuasTanah()    { return $('~Luas Tanah'); }

  // Header
  get pageTitle()    { return byDesc('Properti Dijual di Indonesia'); }
  get totalListing() { return byDesc('Iklan Properti'); }

  // Quick actions
  get propertiBaru() { return $('~Properti Baru'); }
  get asetBank()     { return $('~Aset Bank'); }

  // Listing card
  get listingCard()  { return byDesc('Cicilan Mulai'); }
  get callButton()   { return $('android=new UiSelector().descriptionStartsWith("+62")'); }
  get whatsappButton() { return $('~WhatsApp'); }

  // Section Pilihan Properti Baru
  get sectionPilihan() { return byStart('Pilihan Properti Baru'); }
  get tabApartemen()   { return $('~Apartemen'); }
  get tabRumah()       { return $('//android.view.View[@content-desc="Apartemen"]/following::android.view.View[@content-desc="Rumah"][1]'); }
  get labelHargaMulai(){ return $('~Harga Mulai'); }

  // Bottom navigation
  get tabCari()       { return byStart('Cari'); }
  get tabHunianBaru() { return byStart('Hunian Baru'); }
  get tabIklanSaya()  { return byStart('Iklan Saya'); }
  get tabBuatIklan()  { return byStart('Buat Iklan'); }
  get tabAkunSaya()   { return byStart('Akun Saya'); }
}

module.exports = new HomePage();