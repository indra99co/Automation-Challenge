const { $ } = require('@wdio/globals');

class LoginPromptPage {
  get loginButton() {
    return $('~Login / Daftar');
  }
}

module.exports = new LoginPromptPage();
