import express from 'express';
import {
  getAllTimeSheets, editTimeSheet,
} from '../controllers/time-sheets';
// import timeSheetsValidations from '../validations/time-sheets';

const router = express.Router();

router
  .get('/', getAllTimeSheets)
  .put('/:id', editTimeSheet);

export default router;
