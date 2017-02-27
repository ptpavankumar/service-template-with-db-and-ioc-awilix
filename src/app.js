const _ = require('lodash');
const knex = require('knex');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const container = require('./ioc');
const routes = require('./routes');
const dbConfig = require('./config/dbconfig');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Register all the routes
app.use((req, res, next) => {
  const stack = process.env.STACK || 'development';
  const knexInstance = knex(dbConfig[stack]);
  container.registerValue({
    knex: knexInstance
  });
  req.scope = container.createScope(); // eslint-disable-line no-param-reassign
  next();
});

// Register all the routers
_.forEach(routes, router => app.use(router));

module.exports = app;
