const express = require('express');
const taskValidation = require('../validations/tasks');

const {
  getTaskList,
  getTaskById,
  deleteTaskById,
  createNewTask,
  editTask,
} = require('../controllers/tasks');

const router = express.Router();

router
  .get('/', getTaskList)
  .get('/:id', getTaskById)
  .delete('/:id', deleteTaskById)
  .post('/', taskValidation.validateCreation, createNewTask)
  .put('/:id', editTask);

module.exports = router;
