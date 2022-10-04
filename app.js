const express = require('express');
require('express-async-error');

const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const scriptTag = require('nunjucks-script-tag');

const homeRouter = require('./routes/home');
const errorHandler = require('./middlewares/errorHandler');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
env = nunjucks.configure('views', {
    express: app,
});
scriptTag.configure(env);

app.use('/', homeRouter);

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
