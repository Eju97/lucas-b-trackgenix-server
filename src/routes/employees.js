import express from 'express';
import employeeValidations from '../validations/employees';

import {
  getEmployees,
  getEmployeesById,
  createEmployee,
} from '../controllers/employees';

const router = express.Router();

router
  .get('/', getEmployees)
  .get('/:id', getEmployeesById)
  .post('/', employeeValidations.validateEmployeesBody, createEmployee);

export default router;
