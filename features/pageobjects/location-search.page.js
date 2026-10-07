const { $ } = require('@wdio/globals');

class LocationSearchPage {
  get locationInput() {
    return $('android.widget.EditText');
  }

  suggestion(location) {
    return $(`android=new UiSelector().descriptionStartsWith("${location}")`);
  }

  async searchFor(location) {
    await this.locationInput.waitForDisplayed();
    await this.locationInput.setValue(location);
    await this.suggestion(location).waitForDisplayed();
    await this.suggestion(location).click();
  }
}

module.exports = new LocationSearchPage();
