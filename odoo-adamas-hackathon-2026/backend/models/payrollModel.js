const { pool } = require('../config/db');

const getEmployeeIdByCode = async (employeeCode) => {
  const [rows] = await pool.execute(
    'SELECT id FROM employees WHERE employee_code = ? LIMIT 1',
    [employeeCode]
  );

  return rows[0]?.id || null;
};

const generatePayroll = async ({ employeeCode, payPeriodStart, payPeriodEnd, basicSalary, allowances, deductions }) => {
  const employeeId = await getEmployeeIdByCode(employeeCode);

  if (!employeeId) {
    return { success: false, status: 404, message: 'Employee not found' };
  }

  const basic = Number(basicSalary || 0);
  const allowance = Number(allowances || 0);
  const deduction = Number(deductions || 0);
  const net = basic + allowance - deduction;

  const [result] = await pool.execute(
    `INSERT INTO payroll (employee_id, pay_period_start, pay_period_end, basic_salary, allowances, deductions, net_salary, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, 'draft')`,
    [employeeId, payPeriodStart, payPeriodEnd, basic, allowance, deduction, net]
  );

  const [rows] = await pool.execute(
    `SELECT
       p.id,
       p.pay_period_start,
       p.pay_period_end,
       p.basic_salary,
       p.allowances,
       p.deductions,
       p.net_salary,
       p.status,
       p.generated_at,
       p.paid_at,
       e.employee_code,
       u.full_name
     FROM payroll AS p
     INNER JOIN employees AS e ON e.id = p.employee_id
     INNER JOIN users AS u ON u.id = e.user_id
     WHERE p.id = ?
     LIMIT 1`,
    [result.insertId]
  );

  return {
    success: true,
    status: 201,
    message: 'Payroll generated successfully',
    payroll: rows[0]
  };
};

const getPayrollHistoryByEmployee = async (employeeCode) => {
  const employeeId = await getEmployeeIdByCode(employeeCode);

  if (!employeeId) {
    return [];
  }

  const [rows] = await pool.execute(
    `SELECT
       p.id,
       p.pay_period_start,
       p.pay_period_end,
       p.basic_salary,
       p.allowances,
       p.deductions,
       p.net_salary,
       p.status,
       p.generated_at,
       p.paid_at,
       e.employee_code,
       u.full_name
     FROM payroll AS p
     INNER JOIN employees AS e ON e.id = p.employee_id
     INNER JOIN users AS u ON u.id = e.user_id
     WHERE p.employee_id = ?
     ORDER BY p.pay_period_end DESC`,
    [employeeId]
  );

  return rows;
};

const getPayrollList = async () => {
  const [rows] = await pool.execute(
    `SELECT
       p.id,
       p.pay_period_start,
       p.pay_period_end,
       p.basic_salary,
       p.allowances,
       p.deductions,
       p.net_salary,
       p.status,
       p.generated_at,
       p.paid_at,
       e.employee_code,
       u.full_name
     FROM payroll AS p
     INNER JOIN employees AS e ON e.id = p.employee_id
     INNER JOIN users AS u ON u.id = e.user_id
     ORDER BY p.pay_period_end DESC`
  );

  return rows;
};

const markPayrollPaid = async (payrollId) => {
  const [result] = await pool.execute(
    'UPDATE payroll SET status = ?, paid_at = CURRENT_TIMESTAMP WHERE id = ?',
    ['paid', payrollId]
  );

  if (result.affectedRows === 0) {
    return { success: false, status: 404, message: 'Payroll record not found' };
  }

  const [rows] = await pool.execute(
    `SELECT
       p.id,
       p.pay_period_start,
       p.pay_period_end,
       p.basic_salary,
       p.allowances,
       p.deductions,
       p.net_salary,
       p.status,
       p.generated_at,
       p.paid_at,
       e.employee_code,
       u.full_name
     FROM payroll AS p
     INNER JOIN employees AS e ON e.id = p.employee_id
     INNER JOIN users AS u ON u.id = e.user_id
     WHERE p.id = ?
     LIMIT 1`,
    [payrollId]
  );

  return {
    success: true,
    status: 200,
    message: 'Payroll marked as paid',
    payroll: rows[0]
  };
};

module.exports = {
  generatePayroll,
  getPayrollHistoryByEmployee,
  getPayrollList,
  markPayrollPaid
};
