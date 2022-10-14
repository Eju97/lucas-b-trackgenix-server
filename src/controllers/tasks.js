import Tasks from '../models/Tasks';

const fs = require('fs');
const tasksfs = require('../data/tasks.json');

export const getTaskList = async (req, res) => {
  try {
    const tasks = await Tasks.find();

    return res.status(200).json({
      message: 'Tasks found',
      data: tasks,
      error: false,
    });
  } catch (error) {
    return res.json({
      message: 'An error occurred',
      error,
    });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const tasks = await Tasks.findById(id);

    return res.status(200).json({
      message: 'Tasks found',
      data: tasks,
      error: false,
    });
  } catch (error) {
    return res.json({
      message: 'An error occurred',
      error,
    });
  }
};

export const createNewTask = async (req, res) => {
  try {
    const task = new Tasks({
      description: req.body.description,
    });

    const result = await task.save();
    return res.status(201).json({
      message: 'Task created successfully',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'An error occurred',
      error,
    });
  }
};

export const deleteTaskById = (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const deletedTask = tasksfs.filter((task) => task.id !== taskId);
  if (deletedTask.length < tasksfs.length) {
    fs.writeFileSync('src/data/tasks.json', JSON.stringify(deletedTask));
    res.status(200).json({
      message: 'Task has been deleted',
    });
  } else {
    res.status(404).json({
      message: 'Task could not be deleted',
    });
  }
};

export const editTask = (req, res) => {
  const searchId = parseInt(req.params.id, 10);
  let taskIndex;
  const tasksList = tasksfs;
  for (let i = 0; i < tasksList.length; i += 1) {
    if (tasksList[i].id === searchId) {
      taskIndex = i;
    }
  }
  if (req.body.name) {
    tasksList[taskIndex].name = req.body.name;
  }
  if (req.body.description) {
    tasksList[taskIndex].description = req.body.description;
  }
  fs.writeFileSync('./src/data/tasks.json', JSON.stringify(tasksList));
  res.status(200).json({
    tasksList,
  });
};
