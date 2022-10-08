// use "import" to import libraries
import express from 'express';
import getAllAdmins from './resources/admins';
import { getAllEmployees, createEmployees } from './resources/employees';
import { createNewTask, editTask } from './resources/tasks';
import { createNewTimeSheet, editTimeSheet } from './resources/time-sheets';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/admins', getAllAdmins);
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
