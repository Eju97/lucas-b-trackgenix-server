import request from 'supertest';
import app from '../app';
import Employees from '../models/Employees';
import employeesSeed from '../seed/employees';

describe('Employee - Tests', () => {
  // eslint-disable-next-line no-underscore-dangle
  const employeeId = employeesSeed[0]._id;
  const invalidID = '123c68f3658f142935ea7f6z';

  const mockedEmployee = {
    name: 'test',
    lastName: 'test',
    phone: '0123456789',
    email: 'example@email.com',
    password: 'Test123!',
  };

  beforeAll(async () => {
    await Employees.collection.insertMany(employeesSeed);
  });

  describe('GET /employees', () => {
    test('should return the status code 200 and the list of employees', async () => {
      const response = await request(app).get('/Employees').send();
      expect(response.status).toBe(200);
      expect(response.body.error).toBeFalsy();
      expect(response.body.data).toBeDefined();
    });
  });

  describe('GETbyID /employees', () => {
    test('should GET an employee by ID', async () => {
      const response = await request(app).get(`/Employees/${employeeId}`).send();
      expect(response.status).toBe(200);
      expect(response.body.data).toBeDefined();
      expect(response.body.data).toMatchObject({
        _id: employeeId,
      });
    });

    test('should not GET an employee by ID', async () => {
      const response = await request(app).get(`/Employees/${invalidID}`).send();
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).toBeUndefined();
    });
  });

  describe('POST /employees', () => {
    test('should create a employee', async () => {
      const response = await request(app).post('/Employees').send(mockedEmployee);
      expect(response.status).toBe(201);
      expect(response.body.error).toBeFalsy();
      expect(response.body.data).toMatchObject(mockedEmployee);
    });

    test('should return an error with status code 400 when we are trying to create an employee without body', async () => {
      const response = await request(app).post('/Employees').send();
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).toBeUndefined();
      expect(response.body.message).toEqual('There was an error:"name" is required');
    });

    test('should return an error with status 400 when we are sending an invalid name in the request body', async () => {
      const response = await request(app).post('/Employees').send({
        ...mockedEmployee,
        name: 'te',
      });
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.message).toEqual('There was an error:"name" length must be at least 3 characters long');
    });

    test('should return an error with status 400 when we are sending an invalid last name in the request body', async () => {
      const response = await request(app).post('/Employees').send({
        ...mockedEmployee,
        lastName: 'te',
      });
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.message).toEqual('There was an error:"lastName" length must be at least 3 characters long');
    });

    test('should return an error with status 400 when we are sending an phone in the request body', async () => {
      const response = await request(app).post('/Employees').send({
        ...mockedEmployee,
        phone: '102a',
      });
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.message).toEqual('There was an error:"phone" length must be 10 characters long');
    });

    test('should return an error with status 400 when we are sending an email in the request body', async () => {
      const response = await request(app).post('/Employees').send({
        ...mockedEmployee,
        email: 'email.com',
      });
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.message).toEqual('There was an error:"email" must be a valid email');
    });

    test('should return an error with status 400 when we are sending an password in the request body', async () => {
      const response = await request(app).post('/Employees').send({
        ...mockedEmployee,
        password: 'test12',
      });
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.message).toEqual('There was an error:"password" with value "test12" fails to match the required pattern: /^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/');
    });
  });

  describe('PUT /employees', () => {
    test('should edit an existing employee and return the new data', async () => {
      const response = await request(app).put(`/Employees/${employeeId}`).send({
        ...mockedEmployee,
        name: 'newName',
      });
      expect(response.status).toBe(200);
      expect(response.body.error).toBeFalsy();
      expect(response.body.data).toBeDefined();
      expect(response.body.data.name).toBe('newName');
    });

    test('should return an error when the user tries to edit an employee without sending a body', async () => {
      const response = await request(app).put(`/Employees/${invalidID}`).send();
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).toBeUndefined();
      expect(response.body.message).toEqual('There was an error:"name" is required');
    });
  });

  describe('DELETE /employees', () => {
    test('should remove an employee', async () => {
      const response = await request(app).delete(`/Employees/${employeeId}`).send();
      expect(response.status).toBe(200);
      expect(response.body.error).toBeFalsy();
      expect(response.body.data).toBeDefined();
    });

    test('should return an error when the user sends an invalid id', async () => {
      const response = await request(app).delete(`/Employees/${invalidID}`).send();
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).toBeUndefined();
      expect(response.body.message).toEqual('An error has occurred');
    });
  });
});
