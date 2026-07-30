const fs = require('fs');
const path = require('path');

class Helpers {
    static async waitForCondition(condition, timeout = 10000, interval = 500) {
        const startTime = Date.now();
        while (Date.now() - startTime < timeout) {
            if (await condition()) {
                return true;
            }
            await driver.pause(interval);
        }
        return false;
    }

    static async takeScreenshot(name) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const filename = `${name}_${timestamp}.png`;
        const dir = path.join(process.cwd(), 'screenshots');

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        const filepath = path.join(dir, filename);
        await driver.saveScreenshot(filepath);
        return filename;
    }
}

module.exports = Helpers;
