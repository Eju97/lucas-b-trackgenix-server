import express from 'express';
import { validateTaskBody, validateTaskQueryParams } from '../validations/tasks';
import {
  getTaskList,
  getTaskById,
  deleteTaskById,
  createNewTask,
  editTask,
} from '../controllers/tasks';

const router = express.Router();

router
  .get('/', validateTaskQueryParams, getTaskList)
  .get('/:id', getTaskById)
  .delete('/:id', deleteTaskById)
  .post('/', validateTaskBody, createNewTask)
  .put('/:id', editTask);

export default router;
