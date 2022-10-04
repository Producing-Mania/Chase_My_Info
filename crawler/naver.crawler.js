const Crawler = require('./crawler');
const SearchData = require('./searchData');

const URL = 'https://search.naver.com/search.naver';
const searchDataSelector = 'li.bx div.total_wrap';

const mainTagContentSelector = 'a.link_tit';
const subTagContentSelector = 'a.total_dsc';
const sourceUrlSelector = 'a.link_tit';

module.exports = class NaverCrawler extends Crawler {
    _getSearchUrl(queryStr, page = 1) {
        return `${URL}?query=${queryStr}&page=${page}`;
    }

    static async getInstance() {
        if (!NaverCrawler.crawler) {
            NaverCrawler.crawler = new NaverCrawler();
            await NaverCrawler.crawler._openBrowser();
        }

        return NaverCrawler.crawler;
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
