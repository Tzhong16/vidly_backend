const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  email: {
    type: String,
    unique: true,
    required: true,
    minlength: 5,
    maxlength: 100
  },
  password: {
    type: String,
    minlength: 5,
    maxlength: 50,
    required: true
  }
});

const User = mongoose.model('User', usersSchema);

function userValidation(user) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required(),
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .required()
  };

  return Joi.validate(user, schema);
}

module.exports.User = User;
module.exports.validate = userValidation;
