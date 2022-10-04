const express = require('express')

const app = express()
const port = 3000
const bodyParser = require('body-parser')
const nunjucks = require('nunjucks')
const scriptTag = require("nunjucks-script-tag");

const homeRouter = require('./routes/home')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
env = nunjucks.configure('views', {
    express: app
});
scriptTag.configure(env);

app.use('/', homeRouter)

app.use(function (error, req, res, next) {
    res.json({ message: error.message });
  });

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})