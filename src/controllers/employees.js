import Employees from '../models/Employees';

const getEmployees = async (req, res) => {
  try {
    const employees = await Employees.find();

    if (employees.length === 0) {
      return res.status(404).json({
        message: 'There are not registered employees',
        error: false,
      });
    }
    return res.status(200).json({
      message: 'Employees found',
      data: employees,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'An error has ocurred',
      error,
    });
  }
};

const getEmployeesById = async (req, res) => {
  try {
    const employeeId = req.params.id;
    const employees = await Employees.findById(employeeId);

    return res.status(200).json({
      message: 'Employees found',
      data: employees,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'An error has ocurred',
      error,
    });
  }
};

const createEmployee = async (req, res) => {
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
    return res.status(400).json({
      message: 'An error has ocurred',
      data: undefined,
      error,
    });
  }
};

export default {
  getEmployees,
  getEmployeesById,
  createEmployee,
};
