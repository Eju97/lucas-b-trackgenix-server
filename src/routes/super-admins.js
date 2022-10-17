import express from 'express';
import { editSuperAdmins, deletedSuperAdmins } from '../controllers/super-admins';
import superAdminsValidation from '../validations/super-admins';

const router = express.Router();

router
  .put('/:id', superAdminsValidation, editSuperAdmins)
  .delete('/:id', deletedSuperAdmins);

export default router;
