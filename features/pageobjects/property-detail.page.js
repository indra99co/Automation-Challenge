const BasePage = require('./base.page');

class PropertyDetailPage extends BasePage {
    get backButton() { return this.byDesc('Back'); }
    get viewOnMapButton() { return this.byDesc('Lihat di Peta'); }
    get propertyDetailTitle() { return this.byDesc('Detail Properti'); }
    get whatsappButton() { return this.byDesc('WhatsApp'); }

    text(value) {
        return this.byDesc(value);
    }
}

module.exports = new PropertyDetailPage();
