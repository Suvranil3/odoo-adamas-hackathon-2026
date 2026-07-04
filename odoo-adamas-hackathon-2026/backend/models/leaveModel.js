const { pool } = require('../config/db');

const getEmployeeIdByCode = async (employeeCode) => {
  const [rows] = await pool.execute(
    'SELECT id FROM employees WHERE employee_code = ? LIMIT 1',
    [employeeCode]
  );

  return rows[0]?.id || null;
};

const createLeaveRequest = async ({ employeeCode, leaveType, startDate, endDate, days, reason }) => {
  const employeeId = await getEmployeeIdByCode(employeeCode);

  if (!employeeId) {
    return { success: false, status: 404, message: 'Employee not found' };
  }

  const [result] = await pool.execute(
    `INSERT INTO leave_requests (employee_id, leave_type, start_date, end_date, days, reason, status)
     VALUES (?, ?, ?, ?, ?, ?, 'pending')`,
    [employeeId, leaveType, startDate, endDate, days, reason || null]
  );

  const [rows] = await pool.execute(
    `SELECT
       lr.id,
       lr.leave_type,
       lr.start_date,
       lr.end_date,
       lr.days,
       lr.reason,
       lr.status,
       lr.requested_at,
       e.employee_code,
       u.full_name
     FROM leave_requests AS lr
     INNER JOIN employees AS e ON e.id = lr.employee_id
     INNER JOIN users AS u ON u.id = e.user_id
     WHERE lr.id = ?
     LIMIT 1`,
    [result.insertId]
  );

  return {
    success: true,
    status: 201,
    message: 'Leave request submitted successfully',
    leave: rows[0]
  };
};

const getLeavesByEmployee = async (employeeCode) => {
  const employeeId = await getEmployeeIdByCode(employeeCode);

  if (!employeeId) {
    return [];
  }

  const [rows] = await pool.execute(
    `SELECT
       lr.id,
       lr.leave_type,
       lr.start_date,
       lr.end_date,
       lr.days,
       lr.reason,
       lr.status,
       lr.requested_at,
       lr.reviewed_at,
       e.employee_code,
       u.full_name
     FROM leave_requests AS lr
     INNER JOIN employees AS e ON e.id = lr.employee_id
     INNER JOIN users AS u ON u.id = e.user_id
     WHERE lr.employee_id = ?
     ORDER BY lr.requested_at DESC`,
    [employeeId]
  );

  return rows;
};

const getAllLeaves = async () => {
  const [rows] = await pool.execute(
    `SELECT
       lr.id,
       lr.leave_type,
       lr.start_date,
       lr.end_date,
       lr.days,
       lr.reason,
       lr.status,
       lr.requested_at,
       lr.reviewed_at,
       e.employee_code,
       u.full_name
     FROM leave_requests AS lr
     INNER JOIN employees AS e ON e.id = lr.employee_id
     INNER JOIN users AS u ON u.id = e.user_id
     ORDER BY lr.requested_at DESC`
  );

  return rows;
};

const updateLeaveStatus = async ({ leaveId, status }) => {
  const [result] = await pool.execute(
    'UPDATE leave_requests SET status = ?, reviewed_at = CURRENT_TIMESTAMP WHERE id = ?',
    [status, leaveId]
  );

  if (result.affectedRows === 0) {
    return { success: false, status: 404, message: 'Leave request not found' };
  }

  const [rows] = await pool.execute(
    `SELECT
       lr.id,
       lr.leave_type,
       lr.start_date,
       lr.end_date,
       lr.days,
       lr.reason,
       lr.status,
       lr.requested_at,
       lr.reviewed_at,
       e.employee_code,
       u.full_name
     FROM leave_requests AS lr
     INNER JOIN employees AS e ON e.id = lr.employee_id
     INNER JOIN users AS u ON u.id = e.user_id
     WHERE lr.id = ?
     LIMIT 1`,
    [leaveId]
  );

  return {
    success: true,
    status: 200,
    message: `Leave request ${status} successfully`,
    leave: rows[0]
  };
};

module.exports = {
  createLeaveRequest,
  getLeavesByEmployee,
  getAllLeaves,
  updateLeaveStatus
};
