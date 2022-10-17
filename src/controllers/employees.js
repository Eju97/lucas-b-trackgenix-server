import Employees from '../models/Employees';

export const getEmployees = async (req, res) => {
  try {
    const employees = await Employees.find();

    if (!employees.length) {
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
      message: `An error has occurred: ${error}`,
      data: undefined,
      error: true,
    });
  }
};

export const getEmployeesById = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employees.findById(id, req.body, { new: true });
    if (!employee) {
      return res.status(404).json({
        message: 'Employee does not exists',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Employees found',
      data: employee,
      error: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: `An error has occurred: ${error}`,
      data: undefined,
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
    return res.status(400).json({
      message: `An error has occurred: ${error}`,
      data: undefined,
      error: true,
    });
  }
};
