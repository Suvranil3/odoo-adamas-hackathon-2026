const express = require('express');
const employeeController = require('../controllers/employeeController');
const { authenticateToken, authorizeRoles } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/me', authenticateToken, employeeController.getMyProfileController);
router.get('/', authenticateToken, authorizeRoles('admin'), employeeController.getEmployeesController);
router.get('/:id', authenticateToken, authorizeRoles('admin'), employeeController.getEmployeeByIdController);

module.exports = router;
