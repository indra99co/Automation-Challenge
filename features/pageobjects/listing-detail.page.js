const { $ } = require('@wdio/globals');

class ListingDetailPage {
  get price() {
    return $('android=new UiSelector().descriptionStartsWith("Rp ")');
  }
}

module.exports = new ListingDetailPage();
