const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const { genresSchema } = require('./genre');

const moviesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 255
  },
  genre: {
    type: genresSchema,
    required: true
  },
  numberInStock: {
    type: Number,
    required: true,
    min: 0,
    max: 255
  },
  dailyRentalRate: {
    type: Number,
    required: true,
    min: 0,
    max: 255
  }
});

const Movie = mongoose.model('Movie', moviesSchema);

function moviesValidation(movie) {
  const schema = {
    title: Joi.string()
      .min(5)
      .max(255)
      .required(),
    genreId: Joi.objectId().required(),
    numberInStock: Joi.number()
      .min(0)
      .required(),
    dailyRentalRate: Joi.number()
      .min(0)
      .required()
  };

  return Joi.validate(movie, schema);
}

module.exports.Movie = Movie;
module.exports.validate = moviesValidation;
module.exports.moviesSchema = moviesSchema;
