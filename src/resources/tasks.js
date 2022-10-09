const fs = require('fs');
const tasks = require('../data/tasks.json');

export const getTaskById = (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const foundTask = tasks.find((task) => task.id === taskId);
  if (foundTask) {
    res.send(foundTask);
  } else {
    res.send('Task not found');
  }
};

export const deleteTaskById = (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const deletedTask = tasks.filter((task) => task.id !== taskId);
  if (deletedTask.length < tasks.length) {
    fs.writeFileSync('src/data/tasks.json', JSON.stringify(deletedTask));
    res.send('Task has been deleted');
  } else {
    res.send('Task could not be deleted');
  }
};

/* export const getTaksList = (req, res) => {
    const taskName = req.
} */
