const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const customersSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 5, maxlength: 50 },
  isGold: { type: Boolean, default: false },
  phone: { type: String, required: true, minlength: 5, maxlength: 50 }
});

const Customer = mongoose.model('Customer', customersSchema);

function customersValidation(customer) {
  const schema = {
    name: Joi.string()
      .min(5)
      .max(50)
      .required(),
    isGold: Joi.boolean(),
    phone: Joi.string()
      .min(5)
      .max(50)
      .required()
  };

  return (result = Joi.validate(customer, schema));
}

module.exports.Customer = Customer;
module.exports.validate = customersValidation;
module.exports.customersSchema = customersSchema;
