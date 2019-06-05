const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const genresSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  }
});

const Genre = mongoose.model('Genre', genresSchema);

function genreValidation(genre) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };

  return Joi.validate(genre, schema);
}

module.exports.genresSchema = genresSchema;
module.exports.Genre = Genre;
module.exports.validate = genreValidation;
