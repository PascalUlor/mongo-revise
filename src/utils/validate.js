/**
 * Validate request body
 *
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @param {object} schema
 */
const joiValidate = (req, res, next, schema) => {
  // validate request body against predefined schema
  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
  });

  // check for validation error
  if (error) {
    // Format error object of JOI
    const errors = error.details.map((current) => {
      if (current.context.key === 'attributes') {
        return {
          field: current.context.key,
          message:
            'attributes must be an array with at least one object ({}) which contains {price: 0, imageUrl, sizes: [strings], color: strings, rating: number} of a product',
        };
      }
      return {
        field: current.context.key,
        message: current.message.replace(/['"]/g, ''),
      };
    });

    return res.status(400).json({
      errors,
    });
  }

  req.body = value;

  return next();
};

module.exports = joiValidate;
