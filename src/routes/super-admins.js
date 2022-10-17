import express from 'express';
import {
  createSuperAdmin, getAllSuperAdmins, getByIdSuperAdmin, editSuperAdmins, deletedSuperAdmins,
} from '../controllers/super-admins';
import superAdminsValidation from '../validations/super-admins';

const router = express.Router();

router
  .get('/', getAllSuperAdmins)
  .get('/:id', getByIdSuperAdmin)
  .post('/', superAdminsValidation, createSuperAdmin)
  .put('/:id', superAdminsValidation, editSuperAdmins)
  .delete('/:id', deletedSuperAdmins);

export default router;
