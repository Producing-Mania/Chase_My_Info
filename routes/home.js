const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
    try {
        res.render('home.html')
    } catch (e) {
        console.error(e)
        next(e)
    }
})

module.exports = router