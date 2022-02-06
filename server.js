require('rootpath')();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('helpers/error-handler');
const doInit = require("./models/init");

const app = express();
const port = process.env.NODE_ENV === 'production' ? 80 : 4000;

doInit()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use('/users', require('./controllers/users.controller'));

//глобальный обработчик исключений
app.use(errorHandler);

const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});