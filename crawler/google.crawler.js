const Crawler = require('./crawler');
const SearchData = require('./searchData');

const URL = 'https://www.google.com/search';
const searchDataSelector = 'div[jscontroller="SC7lYd"]';

const mainTagContentSelector = 'h3.LC20lb.MBeuO.DKV0Md';
const subTagContentSelector = 'div.VwiC3b.yXK7lf.MUxGbd.yDYNvb.lyLwlc.lEBKkf';
const sourceUrlSelector = 'div.yuRUbf>a';

module.exports = class GoogleCrawler extends Crawler {
    _getSearchUrl(queryStr, start = 0) {
        return `${URL}?q=${queryStr}&start=${start}`;
    }

    static async getInstance() {
        if (!GoogleCrawler.crawler) {
            GoogleCrawler.crawler = new GoogleCrawler();
            await GoogleCrawler.crawler._openBrowser();
        }

        return GoogleCrawler.crawler;
    }

    async getSearchDataList(queryStr) {
        const searchUrl = this._getSearchUrl(queryStr);

        const page = await this._openPage(searchUrl);
        const tags = await page.$$(searchDataSelector);

        const searchDataList = [];

        for (let tag of tags) {
            try {
                let searchData = new SearchData();
                // mainTagContent
                searchData.mainTagContent = await tag.$eval(
                    mainTagContentSelector,
                    e => e.textContent,
                );
                // subTagContent
                searchData.subTagContent = await tag.$eval(
                    subTagContentSelector,
                    e => e.textContent,
                );
                // sourceUrl
                searchData.sourceUrl = await tag.$eval(sourceUrlSelector, e =>
                    e.getAttribute('href'),
                );

                searchDataList.push(searchData);
            } catch (e) {
                console.error('error on [tag] ' + tag + '\n' + e);
            }
        }

        page.close();

        return searchDataList;
    }
};
