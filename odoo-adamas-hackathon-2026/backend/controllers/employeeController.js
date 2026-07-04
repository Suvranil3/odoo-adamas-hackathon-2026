const { getMyProfile, getAllEmployees, getEmployeeById } = require('../models/employeeModel');

const getMyProfileController = async (req, res) => {
  try {
    const employee = await getMyProfile(req.user?.employeeCode);

    if (!employee) {
      return res.status(404).json({ message: 'Employee profile not found' });
    }

    return res.status(200).json(employee);
  } catch (error) {
    console.error('Get my profile error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const getEmployeesController = async (req, res) => {
  try {
    const { search } = req.query;
    const employees = await getAllEmployees(search);

    return res.status(200).json(employees);
  } catch (error) {
    console.error('Get employees error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const getEmployeeByIdController = async (req, res) => {
  try {
    const employee = await getEmployeeById(req.params.id);

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    return res.status(200).json(employee);
  } catch (error) {
    console.error('Get employee by id error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getMyProfileController,
  getEmployeesController,
  getEmployeeByIdController
};
