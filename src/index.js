import express from 'express';
import mongoose from 'mongoose';
import routes from './routes/index';

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/', routes);

const MONGO_URL = 'mongodb+srv://BaSP:BaSP2022@cluster0.p9r8v5b.mongodb.net/BaSP-database-Lucas-b?retryWrites=true&w=majority';

mongoose.connect(
  MONGO_URL,
  (error) => {
    if (error) {
      console.log('Fail connection to database', error);
    } else {
      console.log('Connected to database');
      app.listen(port, () => {
        // eslint-disable-next-line no-console
        console.log(`Example app listening on port ${port}`);
      });
    }
  },
);
