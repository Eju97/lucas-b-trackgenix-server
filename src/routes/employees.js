import express from 'express';
import { validateEmployeesBody, validateEmployeesBodyEdit } from '../validations/employees';
import checkAuth from '../middlewares/authMiddleware';

import {
  getEmployees,
  getEmployeesById,
  createEmployee,
  deleteEmployee,
  editEmployee,
} from '../controllers/employees';

const router = express.Router();

router
  .get('/', checkAuth(['SUPER_ADMIN', 'ADMIN', 'EMPLOYEE']), getEmployees)
  .get('/:id', checkAuth(['SUPER_ADMIN', 'ADMIN', 'EMPLOYEE']), getEmployeesById)
  .delete('/:id', checkAuth(['SUPER_ADMIN', 'ADMIN', 'EMPLOYEE']), deleteEmployee)
  .put('/:id', checkAuth(['SUPER_ADMIN', 'ADMIN', 'EMPLOYEE']), validateEmployeesBodyEdit, editEmployee)
  .post('/', validateEmployeesBody, createEmployee);

export default router;
