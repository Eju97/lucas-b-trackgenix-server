import express from 'express';
import { getAllSuperAdmins, getByIdSuperAdmin } from '../controllers/super-admins';

const router = express.Router();

router
  .get('/', getAllSuperAdmins)
  .get('/:id', getByIdSuperAdmin);

export default router;
