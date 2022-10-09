// use "import" to import libraries
import express from 'express';
import filterSuperAdmin from './resources/super-admins';
import filterAdmin from './resources/admins';

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/super-admins?', filterSuperAdmin);
app.get('/admins?', filterAdmin);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
