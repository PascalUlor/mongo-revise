const { Router } = require('express');
const departmentController = require('../controllers/department');
const validateDepartmentData = require('../middleware/validateInput');

const router = Router();

router
  .route('/')
  .post(validateDepartmentData, departmentController.createDepartment)
  .get(departmentController.getDepartments);

router
  .route('/:id')
  .get(departmentController.getSingleDepartment)
  .put(departmentController.updateDepartment)
  .delete(departmentController.deleteDepartment);

module.exports = router;
