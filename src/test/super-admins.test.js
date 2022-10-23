import request from 'supertest';
import app from '../app';
import superAdmin from '../models/Super-admins';
import superAdminSeeds from '../seed/super-admins';

describe('Super-admins - Unit tests', () => {
  beforeAll(async () => {
    await superAdmin.collection.insertMany(superAdminSeeds);
  });

  const mockedSuperAdmin = {
    name: 'Pablo',
    last_name: 'Schivazappa',
    email: 'pablo.schivazappa@gmail.com',
    password: 'blablabla',
  };

  // eslint-disable-next-line no-underscore-dangle
  const validId = superAdminSeeds[0]._id;
  const invalidID = '6349bc420340abc705a7e8a5naid';

  describe('GET /Super-admins', () => {
    test('should return status code 200', async () => {
      const response = await request(app).get('/super-admins').send();
      expect(response.status).toBe(200);
    });

    test('should return error false', async () => {
      const response = await request(app).get('/super-admins').send();
      expect(response.body.error).toBeFalsy();
    });

    test('should return more than one super admin', async () => {
      const response = await request(app).get('/super-admins').send();
      expect(response.body.data.length).toBeGreaterThan(0);
    });
  });

  describe('GETbyID /Super-admins', () => {
    test('should GET a super admin by ID', async () => {
      const response = await request(app).get('/super-admins').send();
      expect(response.status).toBe(200);
      expect(response.body.data).toBeDefined();
    });

    test('should not GET a super admin by ID', async () => {
      const response = await request(app).get(`/super-admins/${invalidID}`).send();
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).toBeUndefined();
    });
  });

  describe('POST /Super-admins', () => {
    test('should create a super admin', async () => {
      const response = await request(app).post('/super-admins').send(mockedSuperAdmin);
      expect(response.status).toBe(201);
      expect(response.body.error).toBeFalsy();
      expect(response.body).toBeInstanceOf(Object);
    });

    test('should return error', async () => {
      const response = await request(app).post('/super-admins').send();
      expect(response.status).toBe(400);
      expect(response.body.data).toBeUndefined();
    });

    test('the super admin should not be created, wrong name', async () => {
      const response = await request(app).post('/super-admins').send({
        ...mockedSuperAdmin,
        name: 'CS',
      });
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
    });

    test('the super admin should not be created, wrong last name', async () => {
      const response = await request(app).post('/super-admins').send({
        ...mockedSuperAdmin,
        lastName: 'GO',
      });
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
    });

    test('the super admin should not be created, wrong e-mail', async () => {
      const response = await request(app).post('/super-admins').send({
        ...mockedSuperAdmin,
        email: 'mirage.com',
      });
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
    });

    test('the super admin should not be created, wrong password', async () => {
      const response = await request(app).post('/super-admins').send({
        ...mockedSuperAdmin,
        password: '2',
      });
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
    });
  });

  describe('DELETE /Super-admins', () => {
    test('should delete a super admin', async () => {
      const response = await request(app).delete(`/super-admins/${validId}`).send();
      expect(response.status).toBe(200);
      expect(response.body.error).toBeFalsy();
      expect(response.body.data).toBeDefined();
    });

    test('should not remove a super admin', async () => {
      const response = await request(app).delete(`/super-admins/${invalidID}`).send();
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).toBeUndefined();
    });
  });

  describe('PUT /Super-admins', () => {
    test('should edit a super admin', async () => {
      const response = await request(app).put(`/super-admins/${validId}`).send({
        ...mockedSuperAdmin,
        name: 'NewName',
      });
      expect(response.status).toBe(200);
      expect(response.body.error).toBeFalsy();
      expect(response.body.data).toBeDefined();
    });

    test('should not edit a super admin', async () => {
      const response = await request(app).put(`/super-admins/${invalidID}`).send();
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).toBeUndefined();
    });
  });
});
