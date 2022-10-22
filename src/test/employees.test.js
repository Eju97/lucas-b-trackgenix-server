import request from 'supertest';
import app from '../app';
import Employees from '../models/Employees';
import employeesSeed from '../seed/employees';

describe('Employee - Tests', () => {
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

  // let emploteeID;
  describe('GET /employees', () => {
    test('should get code 200', async () => {
      const response = await request(app).get('/Employees').send();
      expect(response.status).toBe(200);
      expect(response.body.error).toBeFalsy();
      expect(response.body.data.length).toBeGreaterThan(0);
    });
  });

  describe('POST /employees', () => {
    test('should create a employee', async () => {
      const response = await request(app).post('/Employees').send(mockedEmployee);
      // emploteeID = response.body.data.id;
      expect(response.status).toBe(201);
      expect(response.body.error).toBeFalsy();
      expect(response.body.data).toMatchObject({
        name: mockedEmployee.name,
        lastName: mockedEmployee.lastName,
        phone: mockedEmployee.phone,
        email: mockedEmployee.email,
        password: mockedEmployee.password,
      });
    });

    test('should not create a employee', async () => {
      const response = await request(app).post('/Employees').send();
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).toBeUndefined();
    });

    test('the employee should not be created because the name is wrong', async () => {
      const response = await request(app).post('/Employees').send({
        ...mockedEmployee,
        name: 'te',
      });
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
    });

    test('the employee should not be created because the last name is wrong', async () => {
      const response = await request(app).post('/Employees').send({
        ...mockedEmployee,
        lastName: 'te',
      });
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
    });

    test('the employee should not be created because the phone is wrong', async () => {
      const response = await request(app).post('/Employees').send({
        ...mockedEmployee,
        phone: '102a',
      });
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
    });

    test('the employee should not be created because the email is wrong', async () => {
      const response = await request(app).post('/Employees').send({
        ...mockedEmployee,
        email: 'email.com',
      });
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
    });

    test('the employee should not be created because the password is wrong', async () => {
      const response = await request(app).post('/Employees').send({
        ...mockedEmployee,
        password: 'test12',
      });
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
    });
  });

  describe('PUT /employees', () => {
    let newEmployee;
    const invalidID = '123c68f3658f142935ea7f6z';

    beforeEach(async () => {
      newEmployee = await Employees.create(mockedEmployee);
    });

    afterEach(async () => {
      await Employees.findByIdAndUpdate(newEmployee.id);
    });

    test('the employee should be editable', async () => {
      const response = await request(app).put(`/Employees/${newEmployee.id}`).send({
        ...mockedEmployee,
        name: 'newName',
      });
      expect(response.status).toBe(200);
      expect(response.body.error).toBeFalsy();
    });

    test('should have an invalid information error', async () => {
      const response = await request(app).put(`/Employees/${invalidID}`).send();
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).toBeUndefined();
    });
  });
});
