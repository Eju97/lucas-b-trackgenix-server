import Employees from '../models/Employees';
import APIError from '../utils/APIError';

export const getEmployees = async (req, res) => {
  try {
    const employees = await Employees.find(req.query);

    return res.status(200).json({
      message: 'Employees found',
      data: employees,
      error: false,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || error,
      error: true,
    });
  }
};

export const getEmployeesById = async (req, res) => {
  try {
    const employee = await Employees.findById(req.params.id);
    if (!employee) {
      throw new APIError({
        message: 'Employee not found',
        status: 404,
      });
    }
    return res.status(200).json({
      message: 'Employees found',
      data: employee,
      error: true,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || error,
      error: true,
    });
  }
};

export const createEmployee = async (req, res) => {
  try {
    const newEmployee = new Employees({
      name: req.body.name,
      lastName: req.body.lastName,
      phone: req.body.phone,
      email: req.body.email,
      password: req.body.password,
    });

    const result = await newEmployee.save();

    return res.status(201).json({
      message: 'Employees created',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || error,
      error: true,
    });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Employees.findByIdAndDelete(id);
    if (!result) {
      throw new APIError({
        message: 'Employee not found',
        status: 404,
      });
    }
    return res.status(200).json({
      message: `Employee with ID ${id} deleted.`,
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || error,
      error: true,
    });
  }
};

export const editEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Employees.findByIdAndUpdate(id, req.body, { new: true });
    if (!result) {
      throw new APIError({
        message: 'Employee not found',
        status: 404,
      });
    }
    return res.status(200).json({
      message: `Employee with ID ${id} edited.`,
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || error,
      error: true,
    });
  }
};
