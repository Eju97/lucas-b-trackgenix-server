import express from 'express';
import {
  getAllTimeSheets,
} from '../controllers/time-sheets';
// import validateCreation from '../validations/time-sheets';

const router = express.Router();

router
  .get('/', getAllTimeSheets);
export default router;
