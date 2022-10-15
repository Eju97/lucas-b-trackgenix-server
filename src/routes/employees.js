import express from 'express';
import employeesControllers from '../controllers/employees';
import employeeValidations from '../validations/employees';

const router = express.Router();

router
  .get('/', employeesControllers.getEmployees)
  .get('/:id', employeesControllers.getEmployeesById)
  .post('/', employeeValidations.validateCreation, employeesControllers.createEmployee);

export default router;
