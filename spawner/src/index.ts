import { Builder, Browser, By, Key, until, WebDriver } from 'selenium-webdriver';
import { Options} from 'selenium-webdriver/chrome.js';

async function getDriver() {
  const options = new Options({})
  options.addArguments("--disable-blink-features=AutomationControlled")
  options.addArguments("--use-fake-ui-for-media-stream");
  options.addArguments("--window-size=1080,720");
  options.addArguments("--auto-select-desktop-capture-source=[RECORD]");
  options.addArguments("--enable-usermedia-screen-capturing");
  let driver = await new Builder().forBrowser(Browser.CHROME).setChromeOptions(options).build()
  return driver;
}


async function openMeet(driver: WebDriver) {
  

  try {
    await driver.get('https://meet.google.com/jgy-msbd-pwr')
    const popup = await driver.wait(until.elementLocated(By.xpath('//span[contains(text(),"Got it")]')),10000)
    await popup.click()
    const name_input = await driver.wait(until.elementLocated(By.xpath('//input[@placeholder="Your name"]')),9000);
    await name_input.clear();
    await name_input.click();
    await name_input.sendKeys("DioBot")
    const buttonInput = await driver.wait(until.elementLocated(By.xpath('//span[contains(text(),"Ask to join") or contains(text(), "Join")]')),10000)
    await buttonInput.click()
    await driver.wait(until.elementLocated(By.id('c13452')),6000);
  } finally {
    // await driver.quit()
  }
}


async function startScreenshare(driver: WebDriver) {

//   window.navigator.mediaDevices.getDisplayMedia().then(stream => {
//     const videoEl = document.createElement("video");
//     videoEl.srcObject = stream;
//     videoEl.play();
//     // document.querySelector("#style-scope ytd-watch-metadata")[0].
//     document.getElementsByClassName("style-scope-ytd-watch-metadata")[0].appendChild(videoEl);
// })
  
}

async function main() {
  const driver = await getDriver()
  await openMeet(driver);

  await startScreenshare(driver){

  }

}