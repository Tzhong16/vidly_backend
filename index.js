require('express-async-errors');
require('winston-mongodb');
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);
const winston = require('winston');
const error = require('./middleware/error');
const debug = require('debug')('app:startup');
const morgan = require('morgan');
const express = require('express');
const config = require('config');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const auth = require('./routes/auth');
const users = require('./routes/users');
const movies = require('./routes/movies');
const mongoose = require('mongoose');
const rentals = require('./routes/rentals');
const app = express();

winston.handleExceptions(
  new winston.transports.File({ filename: 'uncaughtExceptions.log' })
);

process.on('unhandledRejection', ex => {
  throw ex;
});

winston.add(winston.transports.File, { filename: 'logfile.log' });
winston.add(winston.transports.MongoDB, {
  db: 'mongodb://localhost/vidly-backend',
  level: 'info'
});

if (!config.get('jwtPrivateKey')) {
  console.error('FATA ERROR: jwtPrivateKey is not definded');
  process.exit(1);
}

mongoose
  .connect('mongodb://localhost/vidly-backend', {
    useNewUrlParser: true,
    useFindAndModify: false
  })
  .then(() => console.log('Connected to database....'))
  .catch(() => console.error('Could not connect...'));

mongoose.set('useCreateIndex', true);

app.use(express.json());
app.use(express.static('public'));
app.set('view engine', 'pug');
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);

app.use(error);

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

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listenning ${port} port ...`);
});
