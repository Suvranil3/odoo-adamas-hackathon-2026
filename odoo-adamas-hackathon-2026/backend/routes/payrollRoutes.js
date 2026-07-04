const express = require('express');
const {
  generatePayrollController,
  getMyPayrollController,
  getPayrollListController,
  markPaidController
} = require('../controllers/payrollController');
const { authenticateToken, authorizeRoles } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/me', authenticateToken, getMyPayrollController);
router.get('/', authenticateToken, authorizeRoles('admin'), getPayrollListController);
router.post('/', authenticateToken, authorizeRoles('admin'), generatePayrollController);
router.patch('/:id/paid', authenticateToken, authorizeRoles('admin'), markPaidController);

module.exports = router;
