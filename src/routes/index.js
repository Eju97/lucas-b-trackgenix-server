import express from 'express';
import employeesRoute from './employees';
import timeSheetsRouter from './time-sheets';
import tasksRouter from './tasks';
import superAdminsRoutes from './super-admins';

const router = express.Router();

router.use('/Employees', employeesRoute);
router.use('/super-admins', superAdminsRoutes);
router.use('/tasks', tasksRouter);
router.use('/time-sheets', timeSheetsRouter);

export default router;
