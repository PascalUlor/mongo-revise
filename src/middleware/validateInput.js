/* eslint-disable implicit-arrow-linebreak */
const Joi = require('@hapi/joi');
const joiValidate = require('../utils/validate');

/**
 * Product validation schema
 */
const departmentSchema = Joi.object().keys({
  name: Joi.string().trim().required(),
  email: Joi.string().trim().required(),
  phone: Joi.number().required(),
});

/**
 * Validate product data against defined schema
 */
const validateDepartmentData = (req, res, next) =>
  joiValidate(req, res, next, departmentSchema);

module.exports = validateDepartmentData;
