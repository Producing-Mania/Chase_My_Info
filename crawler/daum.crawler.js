const Crawler = require('./crawler');
const SearchData = require('./searchData');

const URL = 'https://search.daum.net/search';
const searchDataSelector = 'ul.list_info>li';

const mainTagContentSelector = 'a.tit_main';
const subTagContentSelector = 'p.desc';
const sourceUrlSelector = 'a.tit_main';

module.exports = class DaumCrawler extends Crawler {
    _getSearchUrl(queryStr, page = 1) {
        return `${URL}?w=fusion&q=${queryStr}&p=${page}`;
    }

    static async getInstance() {
        if (!DaumCrawler.crawler) {
            DaumCrawler.crawler = new DaumCrawler();
            await DaumCrawler.crawler._openBrowser();
        }

        return DaumCrawler.crawler;
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
