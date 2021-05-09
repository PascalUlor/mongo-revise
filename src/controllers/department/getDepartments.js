const mongoose = require('mongoose');
const { handleResponse, OK } = require('../../utils/success');
const {
  createError,
  GENERIC_ERROR,
} = require('../../utils/error');

const Department = mongoose.model('Department');

/**
 * @description Returns paginated list of departments
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getDepartments = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const resultPerPage = 10;

    // Get department on demand | limiting the department to 8 per page
    const Departments = await Department.find()
      .skip(resultPerPage * page - resultPerPage)
      .limit(resultPerPage);

    // return total number of department in store
    const totalNumberOfDepartments = await Department.countDocuments();

    const totalPages = Math.ceil(totalNumberOfDepartments / resultPerPage);

    return res.status(OK).json(
      handleResponse({
        data: {
          Departments,
          currentPage: page,
          totalPages,
          numOfResults: Departments.length,
          totalDepartments: totalNumberOfDepartments,
        },
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

module.exports = getDepartments;
