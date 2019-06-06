const mongoose = require('mongoose');
const winston = require('winston');

module.exports = function() {
  mongoose
    .connect('mongodb://localhost/vidly-backend', {
      useNewUrlParser: true,
      useFindAndModify: false
    })
    .then(() => winston.info('Connected to database....'));
  mongoose.set('useCreateIndex', true);
};
