import express from 'express';
import { getAdminsbyId, createAdmin, getAdmins } from '../controllers/admins';
import { validateCreation, validateQueryParams } from '../validations/admins';

const router = express.Router();

router
  .get('/', validateQueryParams, getAdmins)
  .get('/:id', getAdminsbyId)
  .post('/', validateCreation, createAdmin);

export default router;
