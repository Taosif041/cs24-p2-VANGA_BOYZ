const Joi = require('joi');
const RoleValidator = require('./role');

const UserValidator = Joi.object({
  email: Joi.string().email().required(),
  firstName: Joi.string().optional(),
  lastName: Joi.string().optional(),
  roles: Joi.array().items(RoleValidator).optional(),
  dateOfBirth: Joi.date().optional(),
  phoneNumber: Joi.string().optional(),
  address: Joi.string().optional(),
  city: Joi.string().optional(),
  state: Joi.string().optional(),
  postalCode: Joi.string().optional(),
  country: Joi.string().optional(),
  createdAt: Joi.date().optional(),
  updatedAt: Joi.date().optional(),
});

module.exports = UserValidator;