import express from 'express';
import { validateTaskBody, validateTaskQueryParams } from '../validations/tasks';
import {
  getTaskList,
  getTaskById,
  deleteTaskById,
  createNewTask,
  editTask,
} from '../controllers/tasks';
import checkAuth from '../middlewares/authMiddleware';

const router = express.Router();

router
  .get('/', checkAuth(['SUPER_ADMIN', 'ADMIN', 'EMPLOYEE']), validateTaskQueryParams, getTaskList)
  .get('/:id', checkAuth(['SUPER_ADMIN', 'ADMIN', 'EMPLOYEE']), getTaskById)
  .delete('/:id', checkAuth(['SUPER_ADMIN', 'ADMIN', 'EMPLOYEE']), deleteTaskById)
  .post('/', checkAuth(['SUPER_ADMIN', 'ADMIN', 'EMPLOYEE']), validateTaskBody, createNewTask)
  .put('/:id', checkAuth(['SUPER_ADMIN', 'ADMIN', 'EMPLOYEE']), validateTaskBody, editTask);

export default router;
