const puppeteer = require('puppeteer')
const SearchData = require('./searchData')

module.exports = class Crawler {
  browser = null

  constructor() {}

  async _openBrowser() {
    this.browser = await puppeteer.launch({
      headless: true,
    })
  }

  async _openPage(url) {
    const page = await this.browser.newPage()

    await page.goto(url)

    return page
  }

  async destroy() {
    if (this.browser) {
      this.browser.close()
    }
  }

  async getSearchDataList(queryStr) {
    // Nothing
    return [new SearchData()]
  }
}
