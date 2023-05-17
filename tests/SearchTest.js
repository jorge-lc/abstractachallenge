const { Builder, By } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const BasePage = require('../pages/basePage');
const MainPage = require('../pages/mainPage');
const ResultsPage = require('../pages/resultsPage');
const fs = require('fs');

describe('Search Test', function () {
  let driver;
  let basePage;
  let mainPage;
  let resultsPage;

  before(async function () {
    let service = new chrome.ServiceBuilder()
      .loggingTo('/my/log/file.txt')
      .enableVerboseLogging()
      .build();
    let options = new chrome.Options();
    chrome.Driver.createSession(options, service);

    driver = await new Builder().forBrowser('chrome').build();
    basePage = new BasePage(driver);
    mainPage = new MainPage(driver);
    resultsPage = new ResultsPage(driver);
  });

  after(async function () {
    await driver.quit();
  });

  it('should retrieve item information from the first 3 pages of search results', async function () {
    const searchTerm = 'camisetas';
    const maxPages = 3;

    await basePage.visit('https://www.mercadolibre.com.ar');
    await mainPage.acceptCookies(driver);
    await mainPage.searchForItem(searchTerm);
    await mainPage.clickSearchButton();

    const itemsInfo = [];
    for (let page = 1; page <= maxPages; page++) {
      const currentPageItems = await resultsPage.getItems();
      itemsInfo.push(...currentPageItems);

      if (page < maxPages) {
        await driver.findElement(By.css('.andes-pagination__button--next a')).click();
        await basePage.driver.sleep(2000);
      }
    }

    const outputFileName = 'itemsInfo.txt';
    const outputStream = fs.createWriteStream(outputFileName);

    itemsInfo.forEach((item) => {
      outputStream.write(`Name: ${item.title}\n`);
      outputStream.write(`Price: ${item.price}\n`);
      outputStream.write(`Link: ${item.link}\n\n`);
    });

    outputStream.end();

    console.log(`Item information saved to ${outputFileName}`);
  });
});