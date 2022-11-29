import express from 'express';
import {
  getAllTimeSheets, getTimeSheetById, createTimeSheet, editTimeSheet, deleteTimeSheet,
} from '../controllers/time-sheets';
import validateTimeSheetBody from '../validations/time-sheets';
import checkAuth from '../middlewares/authMiddleware';

const router = express.Router();

router
  .get('/', checkAuth(['SUPER_ADMIN', 'ADMIN', 'EMPLOYEE']), getAllTimeSheets)
  .get('/:id', checkAuth(['SUPER_ADMIN', 'ADMIN', 'EMPLOYEE']), getTimeSheetById)
  .post('/', checkAuth(['SUPER_ADMIN', 'ADMIN', 'EMPLOYEE']), validateTimeSheetBody, createTimeSheet)
  .put('/:id', checkAuth(['SUPER_ADMIN', 'ADMIN', 'EMPLOYEE']), validateTimeSheetBody, editTimeSheet)
  .delete('/:id', checkAuth(['SUPER_ADMIN', 'ADMIN', 'EMPLOYEE']), deleteTimeSheet);

export default router;
