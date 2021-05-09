const mongoose = require('mongoose');

const { handleResponse, OK } = require('../../utils/success');
const {
  createError,
  GENERIC_ERROR,
  NOT_FOUND,
  BAD_REQUEST,
} = require('../../utils/error');

const Department = mongoose.model('Department');

/**
 * @description Update a single Department
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const updateDepartment = async (req, res, next) => {
  try {
    const anyFieldIsEmpty = Object.values(req.body).some(
      (value) => value === null || value.trim() === '',
    );

    if (anyFieldIsEmpty) {
      return next(
        createError({
          status: BAD_REQUEST,
          message: 'Request body cant be empty and key and value must exist',
        }),
      );
    }

    const departmentId = req.params.id;

    const updatedDept = await Department.findOneAndUpdate(
      { _id: departmentId },
      req.body,
      { new: true },
    );

    return res.status(OK).json(
      handleResponse({
        data: updatedDept,
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

module.exports = updateDepartment;
