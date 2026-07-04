const {
  generatePayroll,
  getPayrollHistoryByEmployee,
  getPayrollList,
  markPayrollPaid
} = require('../models/payrollModel');

const generatePayrollController = async (req, res) => {
  try {
    const { employeeCode, payPeriodStart, payPeriodEnd, basicSalary, allowances, deductions } = req.body || {};

    if (!employeeCode || !payPeriodStart || !payPeriodEnd) {
      return res.status(400).json({ message: 'employeeCode, payPeriodStart, and payPeriodEnd are required' });
    }

    const result = await generatePayroll({
      employeeCode,
      payPeriodStart,
      payPeriodEnd,
      basicSalary,
      allowances,
      deductions
    });

    if (!result.success) {
      return res.status(result.status).json({ message: result.message });
    }

    return res.status(result.status).json(result);
  } catch (error) {
    console.error('Generate payroll error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const getMyPayrollController = async (req, res) => {
  try {
    const payroll = await getPayrollHistoryByEmployee(req.user?.employeeCode);
    return res.status(200).json(payroll);
  } catch (error) {
    console.error('Get my payroll error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const getPayrollListController = async (req, res) => {
  try {
    const payroll = await getPayrollList();
    return res.status(200).json(payroll);
  } catch (error) {
    console.error('Get payroll list error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const markPaidController = async (req, res) => {
  try {
    const result = await markPayrollPaid(req.params.id);

    if (!result.success) {
      return res.status(result.status).json({ message: result.message });
    }

    return res.status(result.status).json(result);
  } catch (error) {
    console.error('Mark payroll paid error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  generatePayrollController,
  getMyPayrollController,
  getPayrollListController,
  markPaidController
};
