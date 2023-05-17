const BasePage = require('../pages/basePage');
const { By, until } = require('selenium-webdriver');

const itemLocator = By.css('.ui-search-layout__item .ui-search-item__group.ui-search-item__group--price');

class ResultsPage extends BasePage {
    constructor(driver) {
        super(driver);
    }

    async getItems() {
        const items = await this.findElements(itemLocator);
        const itemsInfo = [];
        for (let i = 0; i < items.length; i++) {
          const item = items[i];

          
          await this.driver.wait(until.elementLocated(By.css('.ui-search-item__title')));

          const title = await item.findElement(By.xpath(`(//h2[@class="ui-search-item__title shops__item-title"])[${i + 1}]`)).getText()
          const price = await item.findElement(By.xpath(`(//span[@class="price-tag-text-sr-only"])[${i + 1}]`)).getText();
          const link = await item.findElement(By.xpath(`(//a[@class="ui-search-item__group__element shops__items-group-details ui-search-link"])[${i + 1}]`)).getAttribute('href');
          itemsInfo.push({
            title: title,
            price: price,
            link: link
          });
        }
        return itemsInfo;
      }
}

module.exports = ResultsPage;