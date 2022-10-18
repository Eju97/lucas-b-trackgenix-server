import express from 'express';
import {
  getAdminsbyId, createAdmin, getAdmins, deleteAdmin,
} from '../controllers/admins';
import { validateCreation, validateQueryParams } from '../validations/admins';

const router = express.Router();

router
  .get('/', validateQueryParams, getAdmins)
  .get('/:id', getAdminsbyId)
  .post('/', validateCreation, createAdmin)
  .delete('/:id', deleteAdmin);

export default router;
