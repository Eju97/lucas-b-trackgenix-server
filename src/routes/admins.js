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
  .get('/', checkAuth(['SUPER_ADMIN']), validateQueryParams, getAdmins)
  .get('/:id', checkAuth(['SUPER_ADMIN']), getAdminsById)
  .post('/', checkAuth(['SUPER_ADMIN']), validateCreation, createAdmin)
  .delete('/:id', checkAuth(['SUPER_ADMIN']), deleteAdmin)
  .put('/:id', checkAuth(['SUPER_ADMIN']), validateEdit, editAdmin);

export default router;
