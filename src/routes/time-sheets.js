import express from 'express';
import {
  getAllTimeSheets, editTimeSheet, deleteTimeSheet,
} from '../controllers/time-sheets';
import validateTimeSheetBody from '../validations/time-sheets';

const router = express.Router();

router
  .get('/', getAllTimeSheets)
  .put('/:id', validateTimeSheetBody, editTimeSheet)
  .delete('/:id', deleteTimeSheet);

export default router;
