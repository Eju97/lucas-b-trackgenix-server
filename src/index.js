// use "import" to import libraries
import express from 'express';
import filterAdmin from './resources/admins';
import {
  postSuperAdmins, deleteSuperAdmins,
  getSuperAdminsId, editSuperAdmins, filterSuperAdmin,
} from './resources/super-admins';
import { getAllEmployees, createEmployees } from './resources/employees';
import { createNewTask, editTask } from './resources/tasks';
import { createNewTimeSheet, editTimeSheet } from './resources/time-sheets';

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.get('/super-admins/find/:id', getSuperAdminsId);
app.put('/super-admins/edit/:id', editSuperAdmins);

app.get('/super-admins', filterSuperAdmin);
app.get('/admins', filterAdmin);
app.post('/super-admins', postSuperAdmins);
app.delete('/super-admins/:id', deleteSuperAdmins);
app.get('/employees', getAllEmployees);
app.post('/employees/add', createEmployees);

app.post('/tasks/createNewTask', createNewTask);
app.put('/tasks/modifyTask/:id', editTask);

app.post('/time-sheets/createNewTimeSheet', createNewTimeSheet);
app.put('/time-sheets/modifyTimeSheet/:id', editTimeSheet);

app.listen(port, () => {
// eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
