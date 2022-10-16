import express from 'express';
import superAdminsRoutes from './super-admins';

const router = express.Router();
router.use('/super-admins', superAdminsRoutes);

export default router;
