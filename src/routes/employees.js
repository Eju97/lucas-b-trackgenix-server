import express from 'express';
import employeesControllers from '../controllers/employees';

const router = express.Router();

router
  .get('/', employeesControllers.getEmployees)
  .get('/:id', employeesControllers.getEmployeesById);

export default router;
