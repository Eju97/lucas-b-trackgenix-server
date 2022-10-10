const fs = require('fs');
const tasks = require('../data/tasks.json');

export const getTaskById = (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const foundTask = tasks.find((task) => task.id === taskId);
  if (foundTask) {
    res.status(200).json({
      data: foundTask,
    });
  } else {
    res.status(404).json({
      message: 'Task not found',
    });
  }
};

export const deleteTaskById = (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const deletedTask = tasks.filter((task) => task.id !== taskId);
  if (deletedTask.length < tasks.length) {
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

export const getTaskList = (req, res) => {
  const taskName = req.query.name;
  const taskDescription = req.query.description;
  let filteredList = tasks;
  if (taskName) {
    filteredList = filteredList.filter((task) => task.name.includes(taskName));
  }
  if (taskDescription) {
    filteredList = filteredList.filter((task) => task.description.includes(taskDescription));
  }
  res.status(200).json({
    data: filteredList,
  });
};
