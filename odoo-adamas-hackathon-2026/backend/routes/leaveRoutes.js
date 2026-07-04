const express = require('express');
const {
  applyLeaveController,
  getMyLeavesController,
  getAllLeavesController,
  updateLeaveStatusController
} = require('../controllers/leaveController');
const { authenticateToken, authorizeRoles } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authenticateToken, applyLeaveController);
router.get('/me', authenticateToken, getMyLeavesController);
router.get('/', authenticateToken, authorizeRoles('admin'), getAllLeavesController);
router.patch('/:id', authenticateToken, authorizeRoles('admin'), updateLeaveStatusController);

module.exports = router;
