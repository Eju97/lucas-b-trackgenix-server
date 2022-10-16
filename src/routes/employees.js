import express from 'express';
import employeeValidations from '../validations/employees';

import {
  deleteEmployee,
  editEmployee,

} from '../controllers/employees';

const router = express.Router();

router

  .delete('/:id', deleteEmployee)
  .put('/:id', employeeValidations.validateEmployeesBody, editEmployee);

export default router;
