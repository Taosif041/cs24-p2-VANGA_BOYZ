const Joi = require('joi');
const RoleValidator = require('./role');

const UserValidator = Joi.object({
  firstName: Joi.string().optional(),
  lastName: Joi.string().optional(),
  dateOfBirth: Joi.date().optional(),
  phoneNumber: Joi.string().optional(),
  address: Joi.string().optional(),
  city: Joi.string().optional(),
  state: Joi.string().optional(),
  postalCode: Joi.string().optional(),
  country: Joi.string().optional(),
  
});

module.exports = UserValidator;