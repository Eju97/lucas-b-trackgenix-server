// use "import" to import libraries
import express from 'express';
import getAllAdmins from './resources/admins';
import {
  allSuperAdmins, singleSuperAdmin, postSuperAdmins, deleteSuperAdmins,
} from './resources/super-admins';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/admins', getAllAdmins);
app.get('/super-admins', allSuperAdmins);
app.get('/super-admins/:id', singleSuperAdmin);
app.post('/super-admins', postSuperAdmins);
app.delete('/super-admins/:id', deleteSuperAdmins);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
