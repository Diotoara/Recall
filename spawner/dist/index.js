import { Builder, Browser, By, Key, until } from 'selenium-webdriver';
(async function example() {
    let driver = await new Builder().forBrowser(Browser.CHROME).build();
    try {
        await driver.get('http://meet.google.com/hev-hruj-pkd');
        await driver.wait(until.titleIs('anime sake - Google Search'), 10000);
    }
    finally {
        await driver.quit();
    }
})();
//# sourceMappingURL=index.js.map