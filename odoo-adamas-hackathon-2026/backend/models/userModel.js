const { pool } = require('../config/db');

const findByEmployeeCode = async (employeeCode) => {
  const [rows] = await pool.execute(
    `SELECT
      u.id AS user_id,
      u.full_name,
      u.password_hash,
      u.role,
      u.status AS user_status,
      e.id AS employee_id,
      e.employee_code,
      e.department,
      e.position,
      e.phone,
      e.address,
      e.hire_date,
      e.salary,
      e.status AS employee_status
    FROM users AS u
    INNER JOIN employees AS e ON e.user_id = u.id
    WHERE e.employee_code = ?
    LIMIT 1`,
    [employeeCode]
  );

  return rows[0] || null;
};

module.exports = {
  findByEmployeeCode
};
