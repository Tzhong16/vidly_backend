const express = require('express');
const error = require('../middleware/error');
const genres = require('../routes/genres');
const customers = require('../routes/customers');
const auth = require('../routes/auth');
const users = require('../routes/users');
const movies = require('../routes/movies');
const rentals = require('../routes/rentals');

module.exports = function(app) {
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
};
