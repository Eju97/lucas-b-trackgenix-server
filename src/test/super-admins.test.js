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
  const IdNotFound = '6349bc420340abc705a72222';

  describe('GET /Super-admins', () => {
    test('should return status code 200', async () => {
      const response = await request(app).get('/super-admins').send();
      expect(response.status).toBe(200);
      expect(response.body.error).toBeFalsy();
      expect(response.body.data.length).toBeGreaterThan(0);
    });
  });

  describe('GETbyID /Super-admins', () => {
    test('should return a super admin by ID', async () => {
      const response = await request(app).get(`/super-admins/${validId}`).send();
      expect(response.status).toBe(200);
      expect(response.body.data).toBeDefined();
    });

    test('should return an error when the user sends an invalid id', async () => {
      const response = await request(app).get(`/super-admins/${invalidID}`).send();
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).toBeUndefined();
    });

    test('should not return a super admin, ID not found', async () => {
      const response = await request(app).get(`/super-admins/${IdNotFound}`).send();
      expect(response.status).toBe(404);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).toBeNull();
      expect(response.body.message).toEqual('Super Admin not found');
    });
  });

  describe('POST /Super-admins', () => {
    test('should return an error with status code 400 when we are trying to create an employee without body', async () => {
      const response = await request(app).post('/super-admins').send(mockedSuperAdmin);
      expect(response.status).toBe(201);
      expect(response.body.error).toBeFalsy();
      expect(response.body).toBeInstanceOf(Object);
    });

    test('should return error', async () => {
      const response = await request(app).post('/super-admins').send();
      console.log(response.body.mesage);
      expect(response.status).toBe(400);
      expect(response.body.data).toBeUndefined();
      expect(response.body.error).toBeTruthy();
      expect(response.body.message).toBeDefined();
    });

    test('should return an error with status 400 when we are sending an invalid name in the request body', async () => {
      const response = await request(app).post('/super-admins').send({
        ...mockedSuperAdmin,
        name: 'CS',
      });
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.message).toEqual('There was an error: "name" length must be at least 3 characters long');
    });

    test('should return an error with status 400 when we are sending an invalid last name in the request body', async () => {
      const response = await request(app).post('/super-admins').send({
        ...mockedSuperAdmin,
        lastName: 'GO',
      });
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.message).toEqual('There was an error: "lastName" is not allowed');
    });

    test('should return an error with status 400 when we are sending an invalid e-mail in the request bodythe super admin should not be created, wrong e-mail', async () => {
      const response = await request(app).post('/super-admins').send({
        ...mockedSuperAdmin,
        email: 'mirage.com',
      });
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.message).toEqual('There was an error: "email" must be a valid email');
    });

    test('should return an error with status 400 when we are sending an invalid password in the request body', async () => {
      const response = await request(app).post('/super-admins').send({
        ...mockedSuperAdmin,
        password: '2',
      });
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.message).toEqual('There was an error: "password" with value "2" fails to match the required pattern: /^[a-zA-Z0-9]{3,30}$/');
    });
  });

  describe('DELETE /Super-admins', () => {
    test('should delete a super admin', async () => {
      const response = await request(app).delete(`/super-admins/${validId}`).send();
      expect(response.status).toBe(200);
      expect(response.body.error).toBeFalsy();
      expect(response.body.data).toBeDefined();
    });

    test('should not remove a super admin when the user sends an invalid id', async () => {
      const response = await request(app).delete(`/super-admins/${invalidID}`).send();
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).toBeUndefined();
      expect(response.body.message).toEqual('An error occurred: CastError: Cast to ObjectId failed for value "6349bc420340abc705a7e8a5naid" (type string) at path "_id" for model "SuperAdmins"');
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

    test('should edit a super admin', async () => {
      const response = await request(app).put(`/super-admins/${validId}`).send();
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).toBeUndefined();
      expect(response.body.message).toEqual('There was an error: "name" is required');
    });

    test('should not edit a super admin when the user sends an invalid id', async () => {
      const response = await request(app).put(`/super-admins/${invalidID}`).send({
        ...mockedSuperAdmin,
        name: 'NewName',
      });
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).toBeUndefined();
      expect(response.body.message).toEqual('An error occurred: CastError: Cast to ObjectId failed for value "6349bc420340abc705a7e8a5naid" (type string) at path "_id" for model "SuperAdmins"');
    });
  });
});
