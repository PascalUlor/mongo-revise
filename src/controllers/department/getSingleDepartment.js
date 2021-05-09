const mongoose = require('mongoose');

const { handleResponse, OK } = require('../../utils/success');
const {
  createError,
  GENERIC_ERROR,
  NOT_FOUND,
} = require('../../utils/error');

const Department = mongoose.model('Department');

/**
 * @description Returns a single department
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getSingleDepartment = async (req, res, next) => {
  try {
    const departmentId = req.params.id;

    const department = await Department.findOne({
      _id: departmentId,
    });

    return res.status(OK).json(
      handleResponse({
        data: department,
      }),
    );
  } catch (error) {
    if (error.name && error.name === 'CastError') {
      return next(
        createError({
          status: NOT_FOUND,
          message: 'Department with the specified ID not found',
        }),
      );
    }

    return next(
      createError({
        status: GENERIC_ERROR,
        message: `Try again something went wrong \
        ${error}`,
      }),
    );
  }
};

module.exports = getSingleDepartment;
