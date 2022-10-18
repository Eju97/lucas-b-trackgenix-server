import express from 'express';
import {
  getAllTimeSheets, getTimeSheetById, createTimeSheet, editTimeSheet, deleteTimeSheet,
} from '../controllers/time-sheets';
import validateTimeSheetBody from '../validations/time-sheets';

const router = express.Router();

router
  .get('/', getAllTimeSheets)
  .get('/:id', getTimeSheetById)
  .post('/', validateTimeSheetBody, createTimeSheet)
  .put('/:id', validateTimeSheetBody, editTimeSheet)
  .delete('/:id', deleteTimeSheet);

export default router;
