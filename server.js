require('dotenv').config()
require('rootpath')();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const errorHandler = require('api/helpers/error-handler');
const doInit = require("./db/models/init");
const routes = require('./api')

const app = express();
const port = process.env.NODE_ENV === 'production' ? 80 : 8080;

doInit()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use('/api', routes);

//глобальный обработчик исключений
app.use(errorHandler);

const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});