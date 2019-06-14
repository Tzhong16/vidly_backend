const express = require('express');
const app = express();
const winston = require('winston');

require('./startup/logging');
require('./startup/database')();
require('./startup/routes')(app);
require('./startup/config')();
require('./startup/validate')();

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  winston.info(`Listenning ${port} port ...`);
});

module.exports = server;
