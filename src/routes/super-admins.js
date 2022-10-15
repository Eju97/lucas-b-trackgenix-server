import express from 'express';
import { createSuperAdmin, getAllSuperAdmins, getByIdSuperAdmin } from '../controllers/super-admins';
import validateSuperAdmins from '../validations/super-admins';

const router = express.Router();

router
  .get('/', getAllSuperAdmins)
  .get('/:id', getByIdSuperAdmin)
  .post('/', validateSuperAdmins, createSuperAdmin);

export default router;
