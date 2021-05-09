const { Router } = require('express');
const departmentController = require('../controllers/department');

const router = Router();

router
  .route('/')
  .post(departmentController.createDepartment)
  .get(departmentController.getDepartments);

router
  .route('/:id')
  .get(departmentController.getSingleDepartment)
  .put(departmentController.updateDepartment)
  .delete(departmentController.deleteDepartment);

module.exports = router;
