const express = require('express');
const {
  checkInController,
  checkOutController,
  getMyAttendanceController,
  getAttendanceController
} = require('../controllers/attendanceController');
const { authenticateToken, authorizeRoles } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/checkin', authenticateToken, checkInController);
router.post('/checkout', authenticateToken, checkOutController);
router.get('/me', authenticateToken, getMyAttendanceController);
router.get('/', authenticateToken, authorizeRoles('admin'), getAttendanceController);

module.exports = router;
