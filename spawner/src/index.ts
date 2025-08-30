import { Builder, Browser, By, Key, until } from 'selenium-webdriver';
import { Options} from 'selenium-webdriver/chrome';

(async function example() {
  const options = new Options({})
  options.addArguments("--disable-blinkfeatures=AutomationControlled")
  options.addArguments("--use-fake-ui-for-media-stream");
  let driver = await new Builder().forBrowser(Browser.CHROME).setChromeOptions(options).build()
  try {
    await driver.get('http://meet.google.com/hev-hruj-pkd')
    await driver.wait(until.titleIs('anime sake - Google Search'), 10000)
  } finally {
    await driver.quit()
  }
})()