const Joi = require('joi');
const RoleValidator = require('./role');

const RolesArrayValidator = Joi.array().items(RoleValidator);

module.exports = RolesArrayValidator;