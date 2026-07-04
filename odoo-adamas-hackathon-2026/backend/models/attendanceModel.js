const { pool } = require('../config/db');

const getTodayDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const getCurrentTime = () => {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
};

const getEmployeeIdByCode = async (employeeCode) => {
  const [rows] = await pool.execute(
    'SELECT id FROM employees WHERE employee_code = ? LIMIT 1',
    [employeeCode]
  );

  return rows[0]?.id || null;
};

const getAttendanceByEmployeeAndDate = async (employeeId, date) => {
  const [rows] = await pool.execute(
    'SELECT id, employee_id, date, check_in, check_out, status, remarks FROM attendance WHERE employee_id = ? AND date = ? LIMIT 1',
    [employeeId, date]
  );

  return rows[0] || null;
};

const createAttendanceEntry = async (employeeCode) => {
  const employeeId = await getEmployeeIdByCode(employeeCode);

  if (!employeeId) {
    return { success: false, status: 404, message: 'Employee not found' };
  }

  const today = getTodayDate();
  const existingAttendance = await getAttendanceByEmployeeAndDate(employeeId, today);

  if (existingAttendance) {
    if (existingAttendance.check_in && existingAttendance.check_out) {
      return { success: false, status: 409, message: 'Attendance already recorded for today' };
    }

    return { success: false, status: 409, message: 'Already checked in for today' };
  }

  const checkInTime = getCurrentTime();

  const [result] = await pool.execute(
    'INSERT INTO attendance (employee_id, date, check_in, status) VALUES (?, ?, ?, ?)',
    [employeeId, today, checkInTime, 'present']
  );

  const [rows] = await pool.execute(
    'SELECT id, employee_id, date, check_in, check_out, status, remarks FROM attendance WHERE id = ? LIMIT 1',
    [result.insertId]
  );

  return {
    success: true,
    status: 201,
    message: 'Checked in successfully',
    attendance: rows[0]
  };
};

const checkoutAttendance = async (employeeCode) => {
  const employeeId = await getEmployeeIdByCode(employeeCode);

  if (!employeeId) {
    return { success: false, status: 404, message: 'Employee not found' };
  }

  const today = getTodayDate();
  const existingAttendance = await getAttendanceByEmployeeAndDate(employeeId, today);

  if (!existingAttendance) {
    return { success: false, status: 404, message: 'No check-in found for today' };
  }

  if (existingAttendance.check_out) {
    return { success: false, status: 409, message: 'Already checked out for today' };
  }

  if (!existingAttendance.check_in) {
    return { success: false, status: 400, message: 'Check-in time is missing' };
  }

  const checkOutTime = getCurrentTime();
  const [checkInParts, checkOutParts] = [existingAttendance.check_in.split(':'), checkOutTime.split(':')];
  const checkInMinutes = Number(checkInParts[0]) * 60 + Number(checkInParts[1]);
  const checkOutMinutes = Number(checkOutParts[0]) * 60 + Number(checkOutParts[1]);
  const durationMinutes = Math.max(0, checkOutMinutes - checkInMinutes);
  const workingHours = Number((durationMinutes / 60).toFixed(2));

  await pool.execute(
    'UPDATE attendance SET check_out = ?, status = ?, remarks = ? WHERE id = ?',
    [checkOutTime, 'present', `Worked ${workingHours} hours`, existingAttendance.id]
  );

  const [rows] = await pool.execute(
    'SELECT id, employee_id, date, check_in, check_out, status, remarks FROM attendance WHERE id = ? LIMIT 1',
    [existingAttendance.id]
  );

  return {
    success: true,
    status: 200,
    message: 'Checked out successfully',
    attendance: {
      ...rows[0],
      workingHours
    }
  };
};

const getAttendanceForEmployee = async (employeeCode) => {
  const employeeId = await getEmployeeIdByCode(employeeCode);

  if (!employeeId) {
    return [];
  }

  const [rows] = await pool.execute(
    `SELECT
      a.id,
      a.date,
      a.check_in,
      a.check_out,
      a.status,
      a.remarks,
      e.employee_code,
      u.full_name
    FROM attendance AS a
    INNER JOIN employees AS e ON e.id = a.employee_id
    INNER JOIN users AS u ON u.id = e.user_id
    WHERE a.employee_id = ?
    ORDER BY a.date DESC, a.created_at DESC`,
    [employeeId]
  );

  return rows;
};

const getAttendanceRecords = async ({ employee, date }) => {
  let query = `
    SELECT
      a.id,
      a.date,
      a.check_in,
      a.check_out,
      a.status,
      a.remarks,
      e.employee_code,
      u.full_name
    FROM attendance AS a
    INNER JOIN employees AS e ON e.id = a.employee_id
    INNER JOIN users AS u ON u.id = e.user_id
    WHERE 1 = 1
  `;

  const params = [];

  if (employee && employee.trim()) {
    query += `AND (e.employee_code = ? OR e.id = ?)`;
    params.push(employee.trim(), Number(employee.trim()) || 0);
  }

  if (date && date.trim()) {
    query += `AND a.date = ?`;
    params.push(date.trim());
  }

  query += ` ORDER BY a.date DESC, a.created_at DESC`;

  const [rows] = await pool.execute(query, params);
  return rows;
};

module.exports = {
  createAttendanceEntry,
  checkoutAttendance,
  getAttendanceForEmployee,
  getAttendanceRecords
};
