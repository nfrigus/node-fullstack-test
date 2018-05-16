const express = require('express');
const enableAsyncMiddleware = require('express-async-patch');
const bodyParser = require('body-parser');
const router = require('./router');
const services = require('./services');

const app = express();

enableAsyncMiddleware(app);
app.use(passAppToRequestMiddleware);
app.use(bodyParser.json());
app.use(router);

for (const key in services) {
  app.set(key, services[key]);
}

module.exports = app;


function passAppToRequestMiddleware(req, res, next) {
  req.app = app;
  next();
}
