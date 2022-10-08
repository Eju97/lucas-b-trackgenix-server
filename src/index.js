// use "import" to import libraries
import express from 'express';
import {
  postSuperAdmins, deleteSuperAdmins,
} from './resources/super-admins';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/super-admins', postSuperAdmins);
app.delete('/super-admins/:id', deleteSuperAdmins);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
