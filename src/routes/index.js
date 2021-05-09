const { Router } = require('express');
const departmentRoute = require('./department');

const router = Router();

router.use('/department', departmentRoute);

module.exports = router;
