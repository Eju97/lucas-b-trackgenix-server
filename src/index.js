// use "import" to import libraries
import express from 'express';
import { postAdmins, deleteAdmins, filterAdmin } from './resources/admins';
import {
  getTaskById,
  deleteTaskById,
  getTaskList,
  createNewTask,
  editTask,
} from './resources/tasks';
import {
  postSuperAdmins,
  deleteSuperAdmins,
  getSuperAdminsId,
  editSuperAdmins,
  filterSuperAdmin,
} from './resources/super-admins';
import { getProjects, getProjectById } from './resources/projects';
import { createEmployees, getEmployeeById, getEmployees } from './resources/employees';

import { createNewTimeSheet, editTimeSheet } from './resources/time-sheets';

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.post('/admins', postAdmins);
app.delete('/admins/:id', deleteAdmins);
app.get('/admins', filterAdmin);

app.get('/super-admins/find/:id', getSuperAdminsId);
app.put('/super-admins/edit/:id', editSuperAdmins);
app.get('/super-admins', filterSuperAdmin);
app.post('/super-admins', postSuperAdmins);
app.delete('/super-admins/:id', deleteSuperAdmins);

app.get('/employees', getEmployees);
app.get('/getEmployeeById/:id', getEmployeeById);
app.post('/employees/add', createEmployees);
app.get('/projects', getProjects);
app.get('/projects/:id', getProjectById);
app.post('/tasks/createNewTask', createNewTask);
app.put('/tasks/modifyTask/:id', editTask);

app.post('/time-sheets/createNewTimeSheet', createNewTimeSheet);
app.put('/time-sheets/modifyTimeSheet/:id', editTimeSheet);

app.get('/getTaskById/:id', getTaskById);

app.delete('/deleteTaskById/:id', deleteTaskById);

app.get('/getTaskList', getTaskList);

app.listen(port, () => {
// eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
