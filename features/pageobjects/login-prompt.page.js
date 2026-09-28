const BasePage = require('./base.page');

/**
 * LoginPrompt: "silahkan Login / Daftar" message shown on the
 * Iklan Saya, Buat Iklan and Akun Saya tabs when the user is not logged in.
 */
class LoginPrompt extends BasePage {
    get message() { return this.byDescContains('silahkan Login'); }
    get loginButton() { return this.byDesc('Login / Daftar'); }
}

module.exports = new LoginPrompt();
