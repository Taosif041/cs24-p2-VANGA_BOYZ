const Joi = require('joi');

const RolesArrayValidator = Joi.array().items(Joi.string());

module.exports = RolesArrayValidator;
