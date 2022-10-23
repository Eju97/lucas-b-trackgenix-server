import request from 'supertest';
import app from '../app';
import Admins from '../models/Admins';
import adminsSeed from '../seed/admins';

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
    test('Should return status code 404 when the path is wrong.', async () => {
      const res = await request(app).get('/admin').send();
      expect(res.status).toBe(404);
    });
    test('Should return status code 200 and the admins.', async () => {
      const res = await request(app).get('/admins').send();
      expect(res.status).toBe(200);
      expect(res.body.error).toBeFalsy();
      expect(res.body.data.length).toBeGreaterThan(0);
    });
  });

  describe('POST /admins', () => {
    test('Should return status code 201 and create an admin.', async () => {
      const res = await request(app).post('/admins').send(mockedAdmin);
      expect(res.status).toBe(201);
      expect(res.body.error).toBeFalsy();
      expect(res.body.data).toMatchObject({
        name: mockedAdmin.name,
        lastName: mockedAdmin.lastName,
        email: mockedAdmin.email,
        password: mockedAdmin.password,
      });
    });
    test('Should return status code 400 and not create an admin.', async () => {
      const res = await request(app).post('/admins').send({ ...mockedAdmin, name: 'R' });
      expect(res.status).toBe(400);
      expect(res.body.error).toBeTruthy();
      expect(res.body.message).toEqual('There was an error: "name" length must be at least 3 characters long');
    });
    test('Should return status code 400 and not create an admin.', async () => {
      const res = await request(app).post('/admins').send({ ...mockedAdmin, lastName: 'R' });
      expect(res.status).toBe(400);
      expect(res.body.error).toBeTruthy();
      expect(res.body.message).toEqual('There was an error: "lastName" length must be at least 3 characters long');
    });
    test('Should return status code 400 and not create an admin.', async () => {
      const res = await request(app).post('/admins').send({ ...mockedAdmin, email: 'R' });
      expect(res.status).toBe(400);
      expect(res.body.error).toBeTruthy();
      expect(res.body.message).toEqual('There was an error: "email" must be a valid email');
    });
    test('Should return status code 400 and not create an admin.', async () => {
      const res = await request(app).post('/admins').send({ ...mockedAdmin, password: 'R' });
      expect(res.status).toBe(400);
      expect(res.body.error).toBeTruthy();
      expect(res.body.message).toEqual('There was an error: "password" with value "R" fails to match the required pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$/');
    });
  });
});
