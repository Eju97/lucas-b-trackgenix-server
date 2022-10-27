import express from 'express';
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
  .get('/', validateQueryParams, getAdmins)
  .get('/:id', getAdminsById)
  .post('/', validateCreation, createAdmin)
  .delete('/:id', deleteAdmin)
  .put('/:id', validateEdit, editAdmin);

export default router;
