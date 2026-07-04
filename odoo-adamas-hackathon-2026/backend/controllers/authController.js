const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { findByEmployeeCode } = require('../models/userModel');

const getJwtSecret = () => {
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new Error('JWT_SECRET is not configured');
  }

  return jwtSecret;
};

const login = async (req, res) => {
  const { employeeId, password } = req.body || {};

  if (!employeeId || !password) {
    return res.status(400).json({
      message: 'Employee ID and password are required'
    });
  }

  const normalizedEmployeeId = String(employeeId).trim();
  const normalizedPassword = String(password);

  if (!normalizedEmployeeId || !normalizedPassword) {
    return res.status(400).json({
      message: 'Employee ID and password are required'
    });
  }

  try {
    const user = await findByEmployeeCode(normalizedEmployeeId);

    if (!user) {
      return res.status(401).json({
        message: 'Invalid employee ID or password'
      });
    }

    if (user.user_status !== 'active' || user.employee_status !== 'active') {
      return res.status(403).json({
        message: 'Account is inactive'
      });
    }

    const isPasswordValid = await bcrypt.compare(normalizedPassword, user.password_hash);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: 'Invalid employee ID or password'
      });
    }

    const token = jwt.sign(
      {
        userId: user.user_id,
        employeeCode: user.employee_code,
        role: user.role
      },
      getJwtSecret(),
      {
        expiresIn: process.env.JWT_EXPIRES_IN || '8h'
      }
    );

    return res.status(200).json({
      token,
      employeeId: user.employee_code,
      employeeName: user.full_name,
      role: user.role,
      profilePictureUrl: null
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      message: 'Internal server error'
    });
  }
};

module.exports = {
  login
};
