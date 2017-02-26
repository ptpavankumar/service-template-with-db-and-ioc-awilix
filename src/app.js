const _ = require('lodash');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const routes = require('./routes');
const container = require('./ioc/ioc');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Register all the routes
app.use((req, res, next) => {
  req.scope = container.createScope(); // eslint-disable-line no-param-reassign
  next();
});

app.use()

module.exports = app;
