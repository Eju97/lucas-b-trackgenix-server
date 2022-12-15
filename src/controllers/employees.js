import Employees from '../models/Employees';
import APIError from '../utils/APIError';
import firebase from '../helpers/firebase';
import isValidObjectId from '../middlewares/idValidator';

export const getEmployees = async (req, res) => {
  try {
    const employees = await Employees.find(req.query);
    if (!employees) {
      throw new APIError({
        message: 'Employees not found',
        status: 404,
      });
    }
    if (employees.length === 0) {
      return res.status(200).json({
        message: 'Employees list is empty',
        data: employees,
        error: false,
      });
    }
    return res.status(200).json({
      message: 'Employees found successfully',
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
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      throw new APIError({
        message: 'Invalid Employee ID',
        status: 400,
      });
    }
    const employee = await Employees.findById(id);
    if (!employee) {
      throw new APIError({
        message: 'Employee not found',
        status: 404,
      });
    }
    return res.status(200).json({
      message: 'Employee found successfully',
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
    const createFirebaseEmployee = await firebase.auth().createUser({
      email: req.body.email,
      password: req.body.password,
    });

    await firebase.auth().setCustomUserClaims(createFirebaseEmployee.uid, { role: 'EMPLOYEE' });

    const newEmployee = new Employees({
      name: req.body.name,
      lastName: req.body.lastName,
      phone: req.body.phone,
      email: req.body.email,
      firebaseUid: createFirebaseEmployee.uid,
    });

    const result = await newEmployee.save();

    return res.status(201).json({
      message: 'Employee created successfully',
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
    if (!isValidObjectId(id)) {
      throw new APIError({
        message: 'Invalid Employee ID',
        status: 400,
      });
    }
    const result = await Employees.findByIdAndDelete(id);
    await firebase.auth().deleteUser(result.firebaseUid);
    if (!result) {
      throw new APIError({
        message: 'Employee not found',
        status: 404,
      });
    }
    return res.status(204).json({
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
    if (!isValidObjectId(id)) {
      throw new APIError({
        message: 'Invalid Employee ID',
        status: 400,
      });
    }
    const result = await Employees.findByIdAndUpdate(id, req.body, { new: true });
    await firebase.auth().updateUser(result.firebaseUid, {
      email: req.body.email,
      password: req.body.password,
    });
    if (!result) {
      throw new APIError({
        message: 'Employee not found',
        status: 404,
      });
    }

    return res.status(200).json({
      message: 'Employee updated successfully',
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
