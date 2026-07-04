const {
  createLeaveRequest,
  getLeavesByEmployee,
  getAllLeaves,
  updateLeaveStatus
} = require('../models/leaveModel');

const applyLeaveController = async (req, res) => {
  try {
    const { leaveType, startDate, endDate, days, reason } = req.body || {};

    if (!leaveType || !startDate || !endDate || !days) {
      return res.status(400).json({ message: 'leaveType, startDate, endDate, and days are required' });
    }

    const result = await createLeaveRequest({
      employeeCode: req.user?.employeeCode,
      leaveType,
      startDate,
      endDate,
      days,
      reason
    });

    if (!result.success) {
      return res.status(result.status).json({ message: result.message });
    }

    return res.status(result.status).json(result);
  } catch (error) {
    console.error('Apply leave error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const getMyLeavesController = async (req, res) => {
  try {
    const leaves = await getLeavesByEmployee(req.user?.employeeCode);
    return res.status(200).json(leaves);
  } catch (error) {
    console.error('Get my leaves error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const getAllLeavesController = async (req, res) => {
  try {
    const leaves = await getAllLeaves();
    return res.status(200).json(leaves);
  } catch (error) {
    console.error('Get all leaves error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const updateLeaveStatusController = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body || {};

    if (!status) {
      return res.status(400).json({ message: 'status is required' });
    }

    const result = await updateLeaveStatus({ leaveId: id, status });

    if (!result.success) {
      return res.status(result.status).json({ message: result.message });
    }

    return res.status(result.status).json(result);
  } catch (error) {
    console.error('Update leave status error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  applyLeaveController,
  getMyLeavesController,
  getAllLeavesController,
  updateLeaveStatusController
};
