const { until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

let service = new chrome.ServiceBuilder()
  .loggingTo('/my/log/file.txt')
  .enableVerboseLogging()
  .build();
let options = new chrome.Options();
chrome.Driver.createSession(options, service);

class BasePage {
  constructor(driver) {
    this.driver = driver;
  }

  async visit(url) {
    await this.driver.get(url);
  }

  async findElement(locator) {
    await this.driver.wait(until.elementLocated(locator));
    return await this.driver.findElement(locator);
  }

  async findElements(locator) {
    await this.driver.wait(until.elementsLocated(locator));
    return await this.driver.findElements(locator);
  }
}

module.exports = BasePage;