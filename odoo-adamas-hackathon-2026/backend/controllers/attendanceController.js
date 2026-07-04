const {
  createAttendanceEntry,
  checkoutAttendance,
  getAttendanceForEmployee,
  getAttendanceRecords
} = require('../models/attendanceModel');

const checkInController = async (req, res) => {
  try {
    const result = await createAttendanceEntry(req.user?.employeeCode);

    if (!result.success) {
      return res.status(result.status).json({ message: result.message });
    }

    return res.status(result.status).json(result);
  } catch (error) {
    console.error('Check-in error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const checkOutController = async (req, res) => {
  try {
    const result = await checkoutAttendance(req.user?.employeeCode);

    if (!result.success) {
      return res.status(result.status).json({ message: result.message });
    }

    return res.status(result.status).json(result);
  } catch (error) {
    console.error('Check-out error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const getMyAttendanceController = async (req, res) => {
  try {
    const records = await getAttendanceForEmployee(req.user?.employeeCode);
    return res.status(200).json(records);
  } catch (error) {
    console.error('Get my attendance error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const getAttendanceController = async (req, res) => {
  try {
    const { employee, date } = req.query;
    const records = await getAttendanceRecords({ employee, date });
    return res.status(200).json(records);
  } catch (error) {
    console.error('Get attendance error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  checkInController,
  checkOutController,
  getMyAttendanceController,
  getAttendanceController
};
