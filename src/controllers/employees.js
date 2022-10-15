import employeesModel from '../models/Employees';

const getEmployees = async (req, res) => {
  try {
    const employees = await employeesModel.find();

    return res.status(200).json({
      message: 'Employees found',
      data: employees,
      error: false,
    });
  } catch (error) {
    return res.json({
      message: 'An error has ocurred',
      error,
    });
  }
};

const getEmployeesById = async (req, res) => {
  try {
    const employeeId = req.params.id;
    const employees = await employeesModel.findById(employeeId);

    return res.status(200).json({
      message: 'Employees found',
      data: employees,
      error: false,
    });
  } catch (error) {
    return res.json({
      message: 'An error has ocurred',
      error,
    });
  }
};

export default {
  getEmployees,
  getEmployeesById,
};
