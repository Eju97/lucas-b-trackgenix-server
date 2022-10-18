import express from 'express';
import projectsRouter from './projects';
import employeesRouter from './employees';
import timeSheetsRouter from './time-sheets';
import tasksRouter from './tasks';
import superAdminsRoutes from './super-admins';

const router = express.Router();

router.use('/projects', projectsRouter);
router.use('/Employees', employeesRouter);
router.use('/super-admins', superAdminsRoutes);
router.use('/tasks', tasksRouter);
router.use('/time-sheets', timeSheetsRouter);

export default router;
