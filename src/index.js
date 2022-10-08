// use "import" to import libraries
import express from 'express';
import getAllAdmins from './resources/admins';

import { getAllSuperAdmins, getSuperAdminsId, editSuperAdmins } from './resources/super-admins';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.get('/admins', getAllAdmins);
app.get('/super-admins', getAllSuperAdmins);
app.get('/super-admins/find/:id', getSuperAdminsId);
app.put('/super-admins/edit/:id', editSuperAdmins);

app.listen(port, () => {
// eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
