const debug = require('debug')('app:startup');
const morgan = require('morgan');
const config = require('config');
const express = require('express');
const app = express();

module.exports = function() {
  if (!config.get('jwtPrivateKey')) {
    throw new Error('FATA ERROR: jwtPrivateKey is not definded');
  }

  console.log(`Vidly evn is : ${config.get('name')}`);
  console.log(`Vidly mail server is : ${config.get('mail.host')}`);
  // console.log(config.get('mail.password'));
  // console.log(config.get('jwtPrivateKey'));
  // console.log('Mail-password is : ' + process.env.app_password);
  // console.log('Mail-password is : ' + process.env.jwtPrivateKey);

  console.log(`NODE_ENV is : ${process.env.NODE_ENV}`);
  console.log(`app: ${app.get('env')}`);

  if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    debug('Mongan enabled...');
  }
};
