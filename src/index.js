// use "import" to import libraries
import express from 'express';
import getAllAdmins from './resources/admins';
import { getTaskById, deleteTaskById } from './resources/tasks';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/admins', getAllAdmins);

app.get('/getTaskById/:id', getTaskById);

app.delete('/deleteTaskById/:id', deleteTaskById);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
