const mongoose = require('mongoose');
const { handleResponse, CREATED } = require('../../utils/success');
const {
  createError,
  GENERIC_ERROR,
} = require('../../utils/error');

const Department = mongoose.model('Department');

/**
 * @description Create new department
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const createDepartment = async (req, res, next) => {
  try {
    const departmentDetails = req.body;

    const newDepartment = await Department.create({
      ...departmentDetails,
    });

    const newDepartmentToObject = newDepartment.toObject({ versionKey: false });

    return res.status(CREATED).json(
      handleResponse({
        data: { ...newDepartmentToObject },
        message: 'Department created successfully',
      }),
    );
  } catch (error) {
    return next(
      createError({
        status: GENERIC_ERROR,
        message: `Try again something went wrong \
        ${error}`,
      }),
    );
  }
};

module.exports = createDepartment;
