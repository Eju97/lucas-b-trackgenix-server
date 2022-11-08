import request from 'supertest';
import app from '../app';
import Admins from '../models/Admins';
import adminsSeed from '../seed/admins';

const notFoundId = '63548c0849d3451aa2e435af';
const invalidId = '63548c0849d3451';
const mockedAdmin = {
  name: 'Radium',
  lastName: 'Rocket',
  email: 'radium@rocket.com',
  password: 'Radium789',
};

describe('Admins - Unit tests', () => {
  beforeAll(async () => {
    await Admins.collection.insertMany(adminsSeed);
  });

  describe('GET /admins', () => {
    test('Should return status code 200 and the admins when path is correct.', async () => {
      const res = await request(app).get('/admins').send();
      expect(res.status).toBe(200);
      expect(res.body.error).toBeFalsy();
      expect(res.body.data.length).toBeGreaterThan(0);
      expect(res.body.message).toEqual('Admins found');
    });
  });

  describe('POST /admins', () => {
    test('Should return status code 201 and create an admin when we are sending valid parameters.', async () => {
      const res = await request(app).post('/admins').send(mockedAdmin);
      expect(res.status).toBe(201);
      expect(res.body.error).toBeFalsy();
      expect(res.body.data).toMatchObject({
        name: mockedAdmin.name,
        lastName: mockedAdmin.lastName,
        email: mockedAdmin.email,
        password: mockedAdmin.password,
      });
      expect(res.body.message).toEqual('Admin created successfully.');
    });

    test('Should return status code 400 and not create an admin when we are sending an invalid name in the request body.', async () => {
      const res = await request(app).post('/admins').send({ ...mockedAdmin, name: 'R' });
      expect(res.status).toBe(400);
      expect(res.body.error).toBeTruthy();
      expect(res.body.message[0].message).toEqual('"name" length must be at least 3 characters long');
    });

    test('Should return status code 400 and not create an admin when we are sending an invalid last name in the request body.', async () => {
      const res = await request(app).post('/admins').send({ ...mockedAdmin, lastName: 'R' });
      expect(res.status).toBe(400);
      expect(res.body.error).toBeTruthy();
      expect(res.body.message[0].message).toEqual('"lastName" length must be at least 3 characters long');
    });

    test('Should return status code 400 and not create an admin when we are sending an invalid email in the request body.', async () => {
      const res = await request(app).post('/admins').send({ ...mockedAdmin, email: 'R' });
      expect(res.status).toBe(400);
      expect(res.body.error).toBeTruthy();
      expect(res.body.message[0].message).toEqual('"email" must be a valid email');
    });

    test('Should return status code 400 and not create an admin when we are sending an invalid password in the request body.', async () => {
      const res = await request(app).post('/admins').send({ ...mockedAdmin, password: 'R' });
      expect(res.status).toBe(400);
      expect(res.body.error).toBeTruthy();
      expect(res.body.message[0].message).toEqual('"password" with value "R" fails to match the required pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$/');
    });
  });

  describe('GET BY ID /admins', () => {
    test('Should return admin by id found and status code 200 when we are sending a valid id.', async () => {
      // eslint-disable-next-line no-underscore-dangle
      const res = await request(app).get(`/admins/${adminsSeed[0]._id}`).send();
      expect(res.status).toBe(200);
      expect(res.body.error).toBeFalsy();
      expect(res.body.data).toBeDefined();
      expect(res.body.message).toEqual('Admin found');
    });

    test('Should return admin by id not found and status code 404 when we are sending an id not found in the database.', async () => {
      const res = await request(app).get(`/admins/${notFoundId}`).send();
      expect(res.status).toBe(404);
      expect(res.body.error).toBeTruthy();
      expect(res.body.message).toEqual('Admin not found');
    });

    test('Should return status code 500 when we are sending an invalid id in the request body', async () => {
      const res = await request(app).get(`/admins/${invalidId}`).send();
      expect(res.status).toBe(500);
      expect(res.body.error).toBeTruthy();
      expect(res.body.data).toBeUndefined();
      expect(res.body.message).toEqual('Cast to ObjectId failed for value "63548c0849d3451" (type string) at path "_id" for model "Admins"');
    });
  });

  describe('DELETE /admins', () => {
    test('Should return status code 204 and delete an admin when we are sending a valid id.', async () => {
      // eslint-disable-next-line no-underscore-dangle
      const res = await request(app).delete(`/admins/${adminsSeed[2]._id}`).send();
      expect(res.status).toBe(201);
      expect(res.body.error).toBeFalsy();
      expect(res.body.message).toEqual('Admin deleted');
    });

    test('Should return admin by id not found and status code 404 when we are sending an id not found in the database.', async () => {
      const res = await request(app).delete(`/admins/${notFoundId}`).send();
      expect(res.status).toBe(404);
      expect(res.body.data).toBeUndefined();
      expect(res.body.error).toBeTruthy();
      expect(res.body.message).toEqual('Admin not found');
    });

    test('Should return status code 500 when we are sending an invalid id in the request body', async () => {
      const res = await request(app).delete(`/admins/${invalidId}`).send();
      expect(res.status).toBe(500);
      expect(res.body.error).toBeTruthy();
      expect(res.body.data).toBeUndefined();
      expect(res.body.message).toEqual('Cast to ObjectId failed for value "63548c0849d3451" (type string) at path "_id" for model "Admins"');
    });
  });

  describe('PUT /admins', () => {
    test('Should return status code 200 and edit an admin when we are sending a valid id.', async () => {
      // eslint-disable-next-line no-underscore-dangle
      const res = await request(app).put(`/admins/${adminsSeed[1]._id}`).send();
      expect(res.status).toBe(201);
      expect(res.body.error).toBeFalsy();
      expect(res.body.message).toEqual('Admin updated');
    });

    test('Should return status code 404 when we are sending an id not found in the database.', async () => {
      const res = await request(app).put(`/admins/${notFoundId}`).send();
      expect(res.status).toBe(404);
      expect(res.body.error).toBeTruthy();
      expect(res.body.message).toEqual('Admin not found');
    });

    test('Should return status code 500 when we are sending an invalid id in the request body.', async () => {
      const res = await request(app).put(`/admins/${invalidId}`).send();
      expect(res.status).toBe(500);
      expect(res.body.error).toBeTruthy();
      expect(res.body.message).toEqual('Cast to ObjectId failed for value "63548c0849d3451" (type string) at path "_id" for model "Admins"');
    });
  });
});
