import express from 'express';
import validateEmployeesBody from '../validations/employees';

import {
  getEmployees,
  getEmployeesById,
  createEmployee,
  deleteEmployee,
  editEmployee,
} from '../controllers/employees';

const router = express.Router();

router
  .get('/', getEmployees)
  .get('/:id', getEmployeesById)
  .delete('/:id', deleteEmployee)
  .put('/:id', validateEmployeesBody, editEmployee)
  .post('/', validateEmployeesBody, createEmployee);

export default router;
