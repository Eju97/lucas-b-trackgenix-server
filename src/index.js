// use 'import' to import libraries
import express from 'express';
import {
  postAdmins,
  deleteAdmins,
  filterAdmin,
  getAdminsId,
  editAdmins,
} from './resources/admins';
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

import {
  createNewTimeSheet, editTimeSheet, getTimeById, deleteTimeById, getFilteredList,
} from './resources/time-sheets';
import {
  getProjects,
  getProjectById,
  createProjects,
  deleteProjects,
  assignEmployee,
  editProject,
} from './resources/projects';
import {
  createEmployees,
  getEmployeeById,
  getEmployees,
  editEmployee,
  deleteEmployees,
} from './resources/employees';

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Admins
app.get('/admins', filterAdmin);
app.get('/admins/find/:id', getAdminsId);
app.put('/admins/edit/:id', editAdmins);
app.post('/admins/add', postAdmins);
app.delete('/admins/delete/:id', deleteAdmins);

// Super Admins
app.get('/super-admins', filterSuperAdmin);
app.get('/super-admins/find/:id', getSuperAdminsId);
app.put('/super-admins/edit/:id', editSuperAdmins);
app.post('/super-admins/add', postSuperAdmins);
app.delete('/super-admins/delete/:id', deleteSuperAdmins);

// Employees
app.get('/employees', getEmployees);
app.get('/emplyees/find/:id', getEmployeeById);
app.put('/employees/edit/:id', editEmployee);
app.post('/employees/add', createEmployees);
app.delete('/employees/delete/:id', deleteEmployees);

// Projects
app.get('/projects', getProjects);
app.get('/projects/:id', getProjectById);
app.put('/projects/edit/:id', editProject);
app.put('/projects/:id/assign', assignEmployee);
app.post('/projects/add', createProjects);
app.delete('/projects/delete/:id', deleteProjects);

// Tasks
app.get('/tasks', getTaskList);
app.get('/tasks/find/:id', getTaskById);
app.put('/tasks/edit/:id', editTask);
app.post('/tasks/add', createNewTask);
app.delete('/tasks/delete/:id', deleteTaskById);

// Timesheets
app.get('/time-sheets', getFilteredList);
app.get('/time-sheets/find/:id', getTimeById);
app.put('/time-sheets/edit/:id', editTimeSheet);
app.post('/time-sheets/add', createNewTimeSheet);
app.delete('/time-sheets/delete/:id', deleteTimeById);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
