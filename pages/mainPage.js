const BasePage = require('../pages/basePage');
const { By, Key, until } = require('selenium-webdriver');
const searchInputLocator = By.name('as_word');
const searchButtonLocator = By.css('button[type="submit"]');


class MainPage extends BasePage {
  constructor(driver) {
    super(driver);
  }
  
  async acceptCookies(driver) {
    try {
      const acceptButton = await driver.findElement(By.xpath('//button[@data-testid="action:understood-button"]'));
      await driver.wait(until.elementIsVisible(acceptButton), 5000);
      await acceptButton.click();
      console.log('Cookies accepted');
    } catch (error) {
      console.error('Could not find Accept Cookies button or there was an error when accepting Cookies');
    }
  }
  
  async searchForItem(itemName) {
    const searchInput = await this.findElement(searchInputLocator);
    await searchInput.sendKeys(itemName, Key.RETURN);
  }

  async clickSearchButton() {
    const searchButton = await this.findElement(searchButtonLocator);
    await searchButton.click();
  }  
}

module.exports = MainPage;