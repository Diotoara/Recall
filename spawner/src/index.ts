import { Builder, Browser, By, Key, until, WebDriver } from "selenium-webdriver";
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
    await driver.get('https://meet.google.com/wgt-pfpi-pod')
    const popup = await driver.wait(until.elementLocated(By.xpath('//span[contains(text(),"Got it")]')),10000)
    await popup.click()
    const name_input = await driver.wait(until.elementLocated(By.xpath('//input[@placeholder="Your name"]')),9000);
    await name_input.clear();
    await name_input.click();
    await name_input.sendKeys("DioBot")
    const buttonInput = await driver.wait(until.elementLocated(By.xpath('//span[contains(text(),"Ask to join") or contains(text(), "Join")]')),10000)
    await buttonInput.click()
    console.log("meeting joined")
  } finally {
    // await driver.quit()
  }
}


async function startScreenshare(driver: WebDriver) {

  const response = await driver.executeScript(`

    function wait(delayInMS) {
      return new Promise((resolve) => setTimeout(resolve, delayInMS));
    }
    
    function startRecording(stream, lengthInMS) {
      let recorder = new MediaRecorder(stream);
      let data = [];

      recorder.ondataavailable = (event) => data.push(event.data);
      recorder.start();

      let stopped = new Promise((resolve, reject) => {
        recorder.onstop = resolve;
        recorder.onerror = (event) => reject(event.name);
      });

      let recorded = wait(lengthInMS).then(() => {
        if (recorder.state === "recording") {
          recorder.stop();
        }
      });

      return Promise.all([stopped, recorded]).then(() => data);
    }
    
    console.log("before media devicees")
    window.navigator.mediaDevices.getDisplayMedia().then(async stream => {
      console.log("before recoridng")
      const recordedChunks = await startRecording(stream, 10000)
      console.log("after start recoridng")
      let recordedBlob = new Blob(recordedChunks, { type: "video/webm" });
        const recording = document.createElement("video")
        recording.src = URL.createObjectURL(recordedBlob);
        const downloadButton = document.createElement("a")
        downloadButton.href = recording.src;
        downloadButton.download = "RecordedVideo.webm";
        downloadButton.click()
        console.log("after download button click")
    })
    `)

    console.log(response)
  
}

async function main() {
  console.log("hi")
  const driver = await getDriver()
  await openMeet(driver);

  await startScreenshare(driver)

}

main()