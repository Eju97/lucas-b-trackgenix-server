const fs = require('fs');
const tasks = require('../data/tasks.json');

export const createNewTask = (req, res) => {
  const newTask = {
    id: req.body.id,
    name: req.body.name,
    description: req.body.description,
  };
  const taskList = [...tasks, { ...newTask }];
  fs.writeFileSync('./src/data/tasks.json', JSON.stringify(taskList));
  res.status(200).json({
    data: taskList,
  });
};

export const editTask = (req, res) => {
  const searchId = parseInt(req.params.id, 10);
  let taskIndex;
  const tasksList = tasks;
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
  const editedTasks = [...tasksList];
  fs.writeFileSync('./src/data/tasks.json', JSON.stringify(editedTasks));
  res.status(200).json({
    editedTasks,
  });
};
