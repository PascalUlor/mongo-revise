const mongoose = require('mongoose');

const { handleResponse, OK } = require('../../utils/success');
const {
  createError,
  GENERIC_ERROR,
  NOT_FOUND,
} = require('../../utils/error');

const Department = mongoose.model('Department');

/**
 * @description Delete a single product given the id is valid
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const deleteDepartment = async (req, res, next) => {
  try {
    const departmentId = req.params.id;

    const department = await Department.findByIdAndDelete(departmentId);

    if (!department) {
      return next(
        createError({
          status: NOT_FOUND,
          message: 'Please provide a valid department ID',
        }),
      );
    }

    return res.status(OK).json(
      handleResponse({
        data: department,
        message: 'Department deleted successfully',
      }),
    );
  } catch (error) {
    if (error.name && error.name === 'CastError') {
      return next(
        createError({
          status: NOT_FOUND,
          message: 'Please provide a valid department ID',
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

module.exports = deleteDepartment;
