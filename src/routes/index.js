import express from 'express';
import timeSheetsRouter from './time-sheets';

import employeesRouter from './employees';
import tasksRouter from './tasks';
import superAdminsRoutes from './super-admins';

const router = express.Router();

router.use('/Employees', employeesRouter);
router.use('/super-admins', superAdminsRoutes);
router.use('/tasks', tasksRouter);
router.use('/time-sheets', timeSheetsRouter);

export default router;
