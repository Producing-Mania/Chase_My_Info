const express = require('express');
const DaumCrawler = require('../crawler/daum.crawler');
const GoogleCrawler = require('../crawler/google.crawler');
const NaverCrawler = require('../crawler/naver.crawler');
const router = express.Router();

router.post('/', async (req, res, next) => {
    const daumCrawler = await DaumCrawler.getInstance();
    const googleCrawler = await GoogleCrawler.getInstance();
    const naverCrawler = await NaverCrawler.getInstance();
});

router.get('/', (req, res, next) => {
    res.render('home.html');
});

module.exports = router;
