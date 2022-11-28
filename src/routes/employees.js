import express from 'express';
import validateEmployeesBody from '../validations/employees';
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
  .get('/', checkAuth(['SUPER_ADMIN', 'ADMIN']), getEmployees)
  .get('/:id', checkAuth(['SUPER_ADMIN', 'ADMIN', 'EMPLOYEE']), getEmployeesById)
  .delete('/:id', checkAuth(['SUPER_ADMIN', 'ADMIN', 'EMPLOYEE']), deleteEmployee)
  .put('/:id', checkAuth(['SUPER_ADMIN', 'ADMIN', 'EMPLOYEE']), validateEmployeesBody, editEmployee)
  .post('/', validateEmployeesBody, createEmployee);

export default router;
