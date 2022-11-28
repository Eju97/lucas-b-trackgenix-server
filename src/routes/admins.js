import express from 'express';
import checkAuth from '../middlewares/authMiddleware';
import {
  getAdminsById,
  createAdmin,
  getAdmins,
  deleteAdmin,
  editAdmin,
} from '../controllers/admins';
import { validateCreation, validateEdit, validateQueryParams } from '../validations/admins';

const router = express.Router();

router
  .get('/', checkAuth(['SUPER_ADMIN', 'ADMIN']), validateQueryParams, getAdmins)
  .get('/:id', checkAuth(['SUPER_ADMIN', 'ADMIN']), getAdminsById)
  .post('/', checkAuth(['SUPER_ADMIN', 'ADMIN']), validateCreation, createAdmin)
  .delete('/:id', checkAuth(['SUPER_ADMIN', 'ADMIN']), deleteAdmin)
  .put('/:id', checkAuth(['SUPER_ADMIN', 'ADMIN']), validateEdit, editAdmin);

export default router;
