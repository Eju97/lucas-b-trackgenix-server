import express from 'express';
import { validateCreation, validateQuery } from '../validations/tasks';
import {
  getTaskList,
  getTaskById,
  deleteTaskById,
  createNewTask,
  editTask,
} from '../controllers/tasks';

const router = express.Router();

router
  .get('/', validateQuery, getTaskList)
  .get('/:id', getTaskById)
  .delete('/:id', deleteTaskById)
  .post('/', validateCreation, createNewTask)
  .put('/:id', editTask);

export default router;
