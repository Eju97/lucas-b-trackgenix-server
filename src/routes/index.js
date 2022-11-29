import express from 'express';
import projectsRouter from './projects';
import employeesRouter from './employees';
import timeSheetsRouter from './time-sheets';
import tasksRouter from './tasks';
import superAdminsRoutes from './super-admins';
import adminRouter from './admins';
import getUserProfileRouter from './auth/getUserProfile';

const router = express.Router();

router.use('/getUserProfile', getUserProfileRouter);
router.use('/projects', projectsRouter);
router.use('/Employees', employeesRouter);
router.use('/super-admins', superAdminsRoutes);
router.use('/tasks', tasksRouter);
router.use('/time-sheets', timeSheetsRouter);
router.use('/admins', adminRouter);

export default router;
