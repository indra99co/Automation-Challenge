const { $ } = require('@wdio/globals');

class FilterPage {
  get applyButton() {
    return $('android=new UiSelector().descriptionStartsWith("Terapkan")');
  }

  option(label) {
    return $(`~${label}`);
  }

  async select(label) {
    await this.option(label).waitForDisplayed();
    await this.option(label).click();
  }

  async apply() {
    await this.applyButton.click();
    await this.applyButton.waitForExist({ reverse: true });
  }
}

module.exports = new FilterPage();
