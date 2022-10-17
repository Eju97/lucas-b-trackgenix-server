import express from 'express';
import { getAllTimeSheets, getTimeSheetById, createTimeSheet } from '../controllers/time-sheets';
// import validateTimeSheet from '../validations/time-sheets';

const router = express.Router();

router
  .get('/', getAllTimeSheets)
  .get('/:id', getTimeSheetById)
  .post('/', createTimeSheet);
export default router;
