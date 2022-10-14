import express from 'express';
import superAdminsController from '../controllers/super-admins';
import superAdminsValidation from '../validations/super-admins';

const router = express.Router();

router
  .delete('/:id', superAdminsController.deletedSuperAdmins)
  .put('/:id', superAdminsValidation.validateCreation, superAdminsController.editSuperAdmins);

export default router;
