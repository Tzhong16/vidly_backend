const mongoose = require('mongoose');
const winston = require('winston');
const config = require('config');

module.exports = function() {
  mongoose
    .connect(config.get('db'), {
      useNewUrlParser: true,
      useFindAndModify: false
    })
    .then(() => winston.info(`Connected to ${config.get('db')}....`));
  mongoose.set('useCreateIndex', true);
};
