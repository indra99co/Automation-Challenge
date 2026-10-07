const { $ } = require('@wdio/globals');

class NewPropertyPage {
  get projectSearch() {
    return $('~Cari Lokasi, area, atau Nama Proyek');
  }
}

module.exports = new NewPropertyPage();
