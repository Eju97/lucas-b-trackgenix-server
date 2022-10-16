import express from 'express';
import tasksRouter from './tasks';
import superAdminsRoutes from './super-admins';

const router = express.Router();
router.use('/super-admins', superAdminsRoutes);
router.use('/tasks', tasksRouter);

export default router;
