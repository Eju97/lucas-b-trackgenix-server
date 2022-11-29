import express from 'express';
import checkAuth from '../middlewares/authMiddleware';

import {
  createSuperAdmin, getAllSuperAdmins, getByIdSuperAdmin, editSuperAdmins, deletedSuperAdmins,
} from '../controllers/super-admins';
import superAdminsValidation from '../validations/super-admins';

const router = express.Router();

router
  .get('/', checkAuth(['SUPER_ADMIN']), getAllSuperAdmins)
  .get('/:id', checkAuth(['SUPER_ADMIN']), getByIdSuperAdmin)
  .post('/', checkAuth(['SUPER_ADMIN']), superAdminsValidation, createSuperAdmin)
  .put('/:id', checkAuth(['SUPER_ADMIN']), superAdminsValidation, editSuperAdmins)
  .delete('/:id', checkAuth(['SUPER_ADMIN']), deletedSuperAdmins);

export default router;
