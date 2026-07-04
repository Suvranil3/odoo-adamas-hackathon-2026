const { pool } = require('../config/db');

const getMyProfile = async (employeeCode) => {
  const [rows] = await pool.execute(
    `SELECT
      e.employee_code AS employee_code,
      u.full_name AS full_name,
      u.email AS email,
      e.phone AS phone,
      e.department AS department,
      e.position AS designation,
      u.role AS role,
      e.hire_date AS hire_date,
      e.status AS status
    FROM employees AS e
    INNER JOIN users AS u ON u.id = e.user_id
    WHERE e.employee_code = ?
    LIMIT 1`,
    [employeeCode]
  );

  return rows[0] || null;
};

const getAllEmployees = async (search) => {
  let query = `
    SELECT
      e.employee_code AS employee_code,
      u.full_name AS full_name,
      u.email AS email,
      e.phone AS phone,
      e.department AS department,
      e.position AS designation,
      u.role AS role,
      e.hire_date AS hire_date,
      e.status AS status
    FROM employees AS e
    INNER JOIN users AS u ON u.id = e.user_id
  `;

  const params = [];

  if (search && search.trim()) {
    query += `WHERE e.employee_code LIKE ? OR u.full_name LIKE ?`;
    const searchPattern = `%${search.trim()}%`;
    params.push(searchPattern, searchPattern);
  }

  query += ` ORDER BY e.id ASC`;

  const [rows] = await pool.execute(query, params);
  return rows;
};

const getEmployeeById = async (id) => {
  const [rows] = await pool.execute(
    `SELECT
      e.employee_code AS employee_code,
      u.full_name AS full_name,
      u.email AS email,
      e.phone AS phone,
      e.department AS department,
      e.position AS designation,
      u.role AS role,
      e.hire_date AS hire_date,
      e.status AS status
    FROM employees AS e
    INNER JOIN users AS u ON u.id = e.user_id
    WHERE e.id = ?
    LIMIT 1`,
    [id]
  );

  return rows[0] || null;
};

module.exports = {
  getMyProfile,
  getAllEmployees,
  getEmployeeById
};
