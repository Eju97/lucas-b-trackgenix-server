import express from 'express';
import superAdminsControllers from '../controllers/super-admins';

const router = express.Router();

router.get('/', superAdminsControllers.getAllSuperAdmins);

export default router;
