import express from 'express';
import { getAdminsbyId, createAdmin } from '../controllers/admins';
import validateCreation from '../validations/admins';

const router = express.Router();

router
  .get('/:id', getAdminsbyId)
  .post('/', validateCreation, createAdmin);

export default router;
