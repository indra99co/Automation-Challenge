/**
 * Locator scanner for the 99.co homepage.
 *
 * Usage:
 *   1. Start Appium in another terminal:  appium
 *   2. Make sure a device/emulator is running with 99.co installed
 *   3. npm run scan   (optional: SCROLLS=10 npm run scan)
 *
 * Output (locator-scan/): page source XML and a screenshot per scroll position.
 * plus locators.md / locators.json listing every element with a resource-id, content-desc or text.
 */
const { remote } = require('webdriverio');
const fs = require('fs');
const path = require('path');

const OUT_DIR = path.resolve(__dirname, '..', 'locator-scan');
const SCROLLS = Number(process.env.SCROLLS || 8);

function parseElements(xml) {
    const nodes = [];
    const re = /<([\w.$]+)\s([^>]*?)\/?>/g;
    let m;
    while ((m = re.exec(xml)) !== null) {
        const attrs = {};
        m[2].replace(/([\w-]+)="([^"]*)"/g, (_, k, v) => { attrs[k] = v; });
        if (!attrs.bounds) continue;
        nodes.push({
            className: attrs.class || m[1],
            resourceId: attrs['resource-id'] || '',
            contentDesc: attrs['content-desc'] || '',
            text: attrs.text || '',
            clickable: attrs.clickable === 'true',
            bounds: attrs.bounds
        });
    }
    return nodes.filter(n => n.resourceId || n.contentDesc || n.text);
}

(async () => {
    fs.mkdirSync(OUT_DIR, { recursive: true });
    const driver = await remote({
        hostname: '127.0.0.1',
        port: 4723,
        logLevel: 'error',
        capabilities: {
            platformName: 'Android',
            'appium:automationName': 'UiAutomator2',
            'appium:appPackage': 'com.urbanindo.android',
            'appium:appActivity': 'app.nine_nine.MainActivity',
            'appium:noReset': true,
            'appium:autoGrantPermissions': true
        }
    });

    const seen = new Map();
    try {
        await driver.pause(8000);
        for (let i = 0; i <= SCROLLS; i++) {
            const xml = await driver.getPageSource();
            fs.writeFileSync(path.join(OUT_DIR, `page-${i}.xml`), xml);
            await driver.saveScreenshot(path.join(OUT_DIR, `page-${i}.png`));
            for (const el of parseElements(xml)) {
                const key = `${el.resourceId}|${el.contentDesc}|${el.text}`;
                if (!seen.has(key)) seen.set(key, { ...el, screen: i });
            }
            const { width, height } = await driver.getWindowSize();
            await driver.execute('mobile: swipeGesture', {
                left: Math.round(width * 0.1), top: Math.round(height * 0.3),
                width: Math.round(width * 0.8), height: Math.round(height * 0.5),
                direction: 'up', percent: 0.75
            });
            await driver.pause(1500);
        }
    } finally {
        await driver.deleteSession();
    }

    const rows = [...seen.values()];
    fs.writeFileSync(path.join(OUT_DIR, 'locators.json'), JSON.stringify(rows, null, 2));
    const md = ['| screen | class | resource-id | content-desc | text | clickable |', '|---|---|---|---|---|---|']
        .concat(rows.map(r => `| ${r.screen} | ${r.className.split('.').pop()} | ${r.resourceId} | ${r.contentDesc.replace(/\|/g, '/')} | ${r.text.replace(/\|/g, '/').replace(/\n/g, ' ')} | ${r.clickable} |`));
    fs.writeFileSync(path.join(OUT_DIR, 'locators.md'), md.join('\n'));
    console.log(`Done: ${rows.length} elements written to ${OUT_DIR}`);
})().catch(err => { console.error(err); process.exit(1); });
